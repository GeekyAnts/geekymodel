import ConnectionInterface from "./Connection/ConnectionInterface";
import { isArray } from "util";
import IQueryable from "../Common/IQueryable";
import Result from "./Result";

export default class Builder implements IQueryable<any> {
  _connection: ConnectionInterface;
  _select: string = "";
  _from: string = "";
  _where: Array<any> = [];

  _requestMiddleware: any = () => {};
  _responseMiddleware: any = () => {};

  constructor(
    connection: ConnectionInterface,
    config?: {
      requestMiddleware?: any;
      responseMiddleware?: any;
    }
  ) {
    this._connection = connection;

    if (config && config.requestMiddleware)
      this._requestMiddleware = config.requestMiddleware;

    if (config && config.responseMiddleware)
      this._responseMiddleware = config.responseMiddleware;
  }

  setConnection(connection: ConnectionInterface) {
    this._connection = connection;
  }

  select(field: any = "*") {
    this._select = field;
    return (this as unknown) as IQueryable<any>;
  }

  from(entity: string) {
    this._from = entity;
    return (this as unknown) as IQueryable<any>;
  }

  where(prop: any, op: any, val: any) {
    this._where.push({ prop, op, val });
    return (this as unknown) as IQueryable<any>;
  }

  makeConnectionRequest(requestObject: {
    method: "get" | "find";
    select: string;
    from: string;
    where: Array<any>;
  }) {
    if (this._requestMiddleware)
      requestObject = this._requestMiddleware(requestObject);

    return this._connection[requestObject.method](
      requestObject.from,
      requestObject.select,
      requestObject.where
    );
  }

  handleConnectionResponse(response: any) {
    return response;
  }

  find() {
    return this._processRequest(
      this.makeConnectionRequest({
        method: "find",
        from: this._from,
        select: this._select,
        where: this._where
      })
    );
  }

  get() {
    return this._processRequest(
      this.makeConnectionRequest({
        method: "get",
        from: this._from,
        select: this._select,
        where: this._where
      })
    );
  }

  protected _processRequest(connectionRequestResponse: Promise<Result>) {
    var connectionPromise = connectionRequestResponse;

    var promise: Promise<Result> = new Promise((resolve, reject) => {
      connectionPromise
        .then(
          data => {
            result.setData(data);
          },
          data => {
            result.setData(data);
            result.setError(true);
          }
        )
        .finally(() => {
          result.setLoading(false);
          resolve(this.handleConnectionResponse(result));
        });
    });

    var result = new Result({
      loading: true,
      promise
    });

    return result;
  }

  /*  async find(id: any) {
     return tshis.where("id", "=", id);
  }
  async first() {
    // if (isArray(this)) {
    //   return this[0];
    // }
  }
*/

  /*async query() {
                   return this._connection.query(
                     this._from,
                     this._select,
                     this._where
                   );
                 }

                 async update(values: any) {
                   return this._connection.update(
                     this._from,
                     values,
                     this._where
                   );
                 }

                 async delete() {
                   return this._connection.delete(
                     this._from,
                     this._where
                   );
                 }

                 async insert(values: any) {
                   return this._connection.insert(
                     this._from,
                     values
                   );
                 }*/
}
