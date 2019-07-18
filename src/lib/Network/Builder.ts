import ConnectionInterface from "./Connection/ConnectionInterface";
import { isArray } from "util";
import IQueryable from "../Common/IQueryable";

export default class Builder implements IQueryable<any> {
  _connection: ConnectionInterface;
  _select: string = "";
  _from: string = "";
  _where: Array<any> = [];

  select(field: any = "*") {
    this._select = field;
    return this;
  }

  from(entity: string) {
    this._from = entity;
    return this;
  }

  async find(id: any) {
    // return tshis.where("id", "=", id);
  }
  async first() {
    // if (isArray(this)) {
    //   return this[0];
    // }
  }

  constructor(connection: ConnectionInterface) {
    this._connection = connection;
  }

  setConnection(connection: ConnectionInterface) {
    this._connection = connection;
  }

  where(prop: any, op: any, val: any) {
    this._where.push({ prop, op, val });
    return this;
  }

  async query() {
    return this._connection.query(this._from, this._select, this._where);
  }

  async update(values: any) {
    return this._connection.update(this._from, values, this._where);
  }

  async delete() {
    return this._connection.delete(this._from, this._where);
  }

  async insert(values: any) {
    return this._connection.insert(this._from, values);
  }
}
