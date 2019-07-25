import Schema from "./Schema";

export default class DatabaseSchema {
  schemas: Map<string, Schema> = new Map();
  addSchema(schema: Schema) {
    this.schemas.set(schema.table, schema);
  }
}
