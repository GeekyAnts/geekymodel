import Schema from "../Common/Schema";
//import Row from "./Row";

export default class Table {
  schema: Schema;
  rows: Map<string, string> = new Map();

  constructor({ schema }: { schema: Schema }) {
    this.schema = schema;
  }
}
