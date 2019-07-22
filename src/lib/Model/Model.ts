/*import Database from "./Database";
import Query from "../Old/Query";
import uuid from "../Common/uuid";*/

import IQueryable from "../Common/IQueryable";
import Deferred from "../Common/Deferred";
import ErrorMessage from "../Common/ErrorMessage";
import Schema from "./Schema";
import Builder from "../Network/Builder";
import FakeConnection from "../Network/Connection/FakeConnection";
import ModelQueryResult from "./ModelQueryResult";

export default class Model
  implements IQueryable<any>, Deferred<Map<string | number, any>> {
  _select: string = "";
  _from: string = "";
  _where: Array<any> = [];

  locked: boolean = false;
  updating: boolean = false;
  saving: boolean = false;
  deleting: boolean = false;

  loading: boolean = false;
  error: boolean = false;
  errors: Array<ErrorMessage> = [];

  data: Map<string | number, any> = new Map<string, any>();

  promise: Promise<any> = new Promise(() => {});

  schema: Schema;

  constructor({ schema }: { schema: Schema }) {
    this.schema = schema;
  }

  select(field: any = "*") {
    this._select = field;
    return (this as unknown) as IQueryable<any>;
  }

  from(entity: string) {
    throw new Error("from() isn't allowed on Model");
    return (this as unknown) as IQueryable<any>;
  }

  where(prop: any, op: any, val: any) {
    this._where.push({ prop, op, val });
    return (this as unknown) as IQueryable<any>;
  }

  getField(field: string) {
    return this.data.get(field);
  }

  setField(field: string | number, value: any) {
    return this.data.set(field, value);
  }

  findById(id: any) {
    var newModel = this.createInstance();
    return newModel.where("id", "=", id).find();
  }

  find() {
    var self = this;

    const builder = new Builder(new FakeConnection());

    for (var i in this._where) {
      const { prop, op, val } = this._where[i];
      builder.where(prop, op, val);
    }

    const result = new ModelQueryResult({
      model: this,
      promise: new Promise<any>((resolve, reject) => {
        builder
          .find()
          .promise.then(response => {
            result.data = self.fromJS(response.data);
          })
          .finally(() => {
            result.loading = false;
            resolve(result);
          });
      })
    });

    return result;
  }

  get() {
    return new Model({ schema: this.schema });
  }

  createInstance() {
    return new Model({ schema: this.schema });
  }

  fromJS(values: any) {
    const model = this.createInstance();
    this.schema.fields.forEach(field => {
      model.setField(field, values[field]);
    });
    return model;
  }

  toJS() {
    const ret: any = {};
    this.schema.fields.forEach(field => {
      ret[field] = this.getField(field);
    });
    return ret;
  }
}
