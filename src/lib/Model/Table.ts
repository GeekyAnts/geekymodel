import TableSchema from "./TableSchema";
import Row from "./Row";

export default class Table {
  schema: TableSchema;
  rows: Map<string, Row> = new Map();

  constructor({ schema }: { schema: TableSchema }) {
    this.schema = schema;
  }
}
