import { observable } from "mobx";

import IQueryable from "../Common/IQueryable";
import Deferred from "../Common/Deferred";
import ErrorMessage from "../Common/ErrorMessage";
import Schema from "./Schema";
import Builder from "../Network/Builder";
import FakeConnection from "../Network/Connection/FakeConnection";
import ModelQueryResult from "./ModelQueryResult";
import Database from "./Database";

/**
 * Model behaves as a Class and an Object both.
 * You can create new instances using the create() method.
 *
 * @export
 * @class Model
 * @implements {IQueryable<any>}
 * @implements {(Deferred<Map<string | number, any>>)}
 */
export default class Model
  implements IQueryable<any>, Deferred<Map<string | number, any>> {
  @observable _select: string = "";
  @observable _from: string = "";
  @observable _where: Array<any> = [];

  @observable locked: boolean = false;
  @observable updating: boolean = false;
  @observable saving: boolean = false;
  @observable deleting: boolean = false;

  @observable loading: boolean = false;
  @observable error: boolean = false;
  @observable errors: Array<ErrorMessage> = [];

  @observable data: Map<string | number, any> = new Map<string, any>();

  @observable promise: Promise<any> = new Promise(() => {});

  schema: Schema;
  database: Database;

  constructor({ schema, database }: { schema: Schema; database: Database }) {
    this.schema = schema;
    this.database = database;
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
    var newModel = this.create();
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
    return new Model({
      schema: this.schema,
      database: this.database
    });
  }

  create() {
    return new Model({
      schema: this.schema,
      database: this.database
    });
  }

  emptyFields() {
    this.data = new Map();
  }

  fromJS(values: any, existingObject?: Model) {
    if (!existingObject) {
      var model = this.create();
    } else {
      var model = existingObject;
      model.emptyFields();
    }

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
