import Builder from "../Builder";
import { resolve } from "path";
import ConnectionInterface from "./ConnectionInterface";
import DatabaseSchema from "../../Common/DatabaseSchema";
import Schema from "../../Common/Schema";
import faker from "faker";
import fakeDB from "./fakeDB";

function generateFakeData(key: string) {
  switch (key) {
    case "name":
      return faker.name.findName();
    case "fname":
    case "firstName":
      return faker.name.firstName();
    case "lname":
    case "lastName":
      return faker.name.lastName();
    case "age":
      return faker.random.number(100);
    case "id":
      return faker.random.uuid();
    default:
      for (var i in fakeDB) {
        for (var j in fakeDB[i]) {
          if (key == fakeDB[i][j]) {
            return faker[i][fakeDB[i][j]]();
          }
        }
      }
      return "Something";
  }
}

function getNewEntity(schema: Schema, databaseSchema: DatabaseSchema) {
  var ret = {
    id: faker.random.uuid()
  };

  for (let i in schema.fields) {
    ret[schema.fields[i]] = generateFakeData(schema.fields[i]);
  }

  return ret;
}

function getNewEntityArray(schema: Schema, databaseSchema: DatabaseSchema) {
  const ret = [];

  const length = faker.random.number(10);

  for (var i = 0; i < length; i++) {
    ret.push(getNewEntity(schema, databaseSchema));
  }

  return ret;
}

export default class FakeConnection implements ConnectionInterface {
  databaseSchema: DatabaseSchema;

  constructor({ databaseSchema }: { databaseSchema: DatabaseSchema }) {
    this.databaseSchema = databaseSchema;
  }

  async get(entity: any, select: any, where: any) {
    const schema = this.databaseSchema.schemas.get(entity);
    if (!schema) throw new Error("Schema not found");

    return new Promise((resolve, reject) => {
      setTimeout(
        () => resolve(getNewEntityArray(schema, this.databaseSchema)),
        1000
      );
    });
  }
  async find(entity: any, select: any, where: any) {
    const schema = this.databaseSchema.schemas.get(entity);
    if (!schema) throw new Error("Schema not found");

    if (!entity)
      throw new Error("FakeConnection: No entity defined in the find() call");

    return new Promise((resolve, reject) => {
      setTimeout(
        () => resolve(getNewEntity(schema, this.databaseSchema)),
        1000
      );
    });
  }

  async insert(entity: any, values: any) {
    return new Promise((resolve, reject) => {
      setTimeout(
        () =>
          resolve({
            ...values,
            id: faker.random.uuid()
          }),
        1000
      );
    });
  }

  async update(entity: any, values: any, where: any) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve({ ...values }), 1000);
    });
  }

  async delete(entity: any, where: any) {
    const schema = this.databaseSchema.schemas.get(entity);
    if (!schema) throw new Error("Schema not found");

    return new Promise((resolve, reject) => {
      setTimeout(
        () => resolve(getNewEntity(schema, this.databaseSchema)),
        1000
      );
    });
  }
}
