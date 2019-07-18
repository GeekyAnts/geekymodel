export default class TableSchema {
  table: string;
  fields: Array<string> = [];
  relationships: Array<any> = [];

  constructor({ table, fields }: { table: string; fields: Array<string> }) {
    this.table = table;
    this.fields = fields;
  }
}
