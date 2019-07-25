import ConnectionInterface from "./Connection/ConnectionInterface";
import { isArray } from "util";
import IQueryable from "../Common/IQueryable";
import Result from "./Result";

export default class Builder implements IQueryable<any> {
  _connection: ConnectionInterface;
  _select: string = "";
  _from: string = "";
  _where: Array<any> = [];

  _requestMiddleware: any = undefined;
  _responseMiddleware: any = undefined;

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
    method: "get" | "find" | "update" | "delete" | "insert";
    select?: string;
    from: string;
    where?: Array<any>;
    values?: any;
  }) {
    if (this._requestMiddleware)
      requestObject = this._requestMiddleware(requestObject);

    switch (requestObject.method) {
      case "get":
      case "find":
        return this._connection[requestObject.method](
          requestObject.from,
          requestObject.select,
          requestObject.where
        );

        break;

      case "update":
        return this._connection[requestObject.method](
          requestObject.from,
          requestObject.values,
          requestObject.where
        );

        break;

      case "insert":
        return this._connection[requestObject.method](
          requestObject.from,
          requestObject.values
        );

        break;

      case "delete":
        return this._connection[requestObject.method](
          requestObject.from,
          requestObject.where
        );

        break;
    }
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

  insert(values: any) {
    return this._processRequest(
      this.makeConnectionRequest({
        method: "insert",
        from: this._from,
        values: values
      })
    );
  }

  update(values: any) {
    return this._processRequest(
      this.makeConnectionRequest({
        method: "update",
        from: this._from,
        values: values
      })
    );
  }

  delete() {
    return this._processRequest(
      this.makeConnectionRequest({
        method: "insert",
        from: this._from,
        where: this._where
      })
    );
  }

  protected _processRequest(connectionRequestResponse: Promise<Result>) {
    var connectionPromise = connectionRequestResponse;

    var promise: Promise<Result> = new Promise((resolve, reject) => {
      connectionPromise
        .then(
          (data: any) => {
            result.setData(data);
          },
          (data: any) => {
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
}
