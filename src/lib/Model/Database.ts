import ConnectionInterface from "../Network/Connection/ConnectionInterface";

export default class Database {
  requestMiddlewares: Array<() => {}> = [];
  responseMiddlewares: Array<() => {}> = [];
  private _connection: ConnectionInterface;

  useRequestMiddleware(cb: () => {}) {
    this.requestMiddlewares.push(cb);
  }

  useResponseMiddleware(cb: () => {}) {
    this.responseMiddlewares.push(cb);
  }

  constructor({ connection }: { connection: ConnectionInterface }) {
    this._connection = connection;
  }

  setConnection(connection: ConnectionInterface) {
    this._connection = connection;
  }

  getConnection() {
    return this._connection;
  }
}
