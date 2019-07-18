import IQueryable from "../Common/IQueryable";
import Controller from "./Controller";

export default class ModelBuilder implements IQueryable<any> {
  _controller: Controller;
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

  constructor(modelController: Controller) {
    this._controller = modelController;
  }

  where(prop: any, op: any, val: any) {
    this._where.push({ prop, op, val });
    return this;
  }

  query(): ModelResult {
    const modelResult = new ModelResult();
    return this._connection.query(this._from, this._select, this._where);
  }

  update(values: any): ModelResult {
    //return this._connection.update(this._from, values, this._where);
    return new ModelResult(this._controller);
  }

  delete(): ModelResult {
    //return this._connection.delete(this._from, this._where);
    return new ModelResult(this._controller);
  }

  insert(values: any): ModelResult {
    //return this._connection.insert(this._from, values);
    return new ModelResult(this._controller);
  }
}
