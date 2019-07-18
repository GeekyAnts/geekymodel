import Builder from "../Builder";
import { resolve } from "path";
import ConnectionInterface from "./ConnectionInterface";

function getNewEntity() {
  return {
    id: Math.random(),
    name: "Geekyframework " + Math.random()
  };
}

function getNewEntityArray() {
  return [getNewEntity(), getNewEntity()];
}

export default class FakeConnection implements ConnectionInterface {
  constructor() {}

  async query(entity: any, select: any, where: any) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(getNewEntityArray()), 200);
    });
  }

  async insert(entity: any, values: any) {
    return new Promise((resolve, reject) => {
      setTimeout(
        () =>
          resolve({
            ...values,
            id: Math.random()
          }),
        200
      );
    });
  }

  async update(entity: any, values: any, where: any) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve({ ...values }), 200);
    });
  }

  async delete(entity: any, where: any) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(getNewEntity()), 200);
    });
  }
}
