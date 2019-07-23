import Database from "./Model/Database";
import Schema from "./Model/Schema";
import Model from "./Model/Model";
import FakeConnection from "./Network/Connection/FakeConnection";

const globalDatabase = new Database({
  connection: new FakeConnection()
});

if (window) {
  (window as any).globalDatabase = globalDatabase;
}

export function createModel(schema: Schema, namespaceDatabase?: Database) {
  return new Model({
    schema,
    database: namespaceDatabase ? namespaceDatabase : globalDatabase
  });
}

export function useRequestMiddleware(cb: any, namespaceDatabase?: Database) {
  const database = namespaceDatabase ? namespaceDatabase : globalDatabase;
  database.useRequestMiddleware(cb);
}

export function useResponseMiddleware(cb: any, namespaceDatabase: Database) {
  const database = namespaceDatabase ? namespaceDatabase : globalDatabase;
  database.useResponseMiddleware(cb);
}
