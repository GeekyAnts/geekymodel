export default class Schema {
  table: string;
  fields: Array<string> = [];
  relationships?: Array<any> = [];

  constructor({ table, fields }: { table: string; fields: Array<string> }) {
    this.table = table;
    this.fields = fields;
  }
}
