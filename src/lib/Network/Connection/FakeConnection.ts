import Builder from "../Builder";
import { resolve } from "path";
import ConnectionInterface from "./ConnectionInterface";

function getNewEntity() {
  return {
    id: Math.random(),
    name: "Geekyframework " + Math.random(),
    first: "Sanket",
    last: "Sahu"
  };
}

function getNewEntityArray() {
  return [getNewEntity(), getNewEntity()];
}

export default class FakeConnection implements ConnectionInterface {
  constructor() {}

  async get(entity: any, select: any, where: any) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(getNewEntityArray()), 1000);
    });
  }
  async find(entity: any, select: any, where: any) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(getNewEntity()), 1000);
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
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(getNewEntity()), 1000);
    });
  }
}
