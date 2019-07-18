import GlobalStore from "../Store/index";
import TableSchema from "./TableSchema";
import Query from "../Old/Query";
import uuid from "../Common/uuid";
import IQueryable from "../Common/IQueryable";

export default class ModelController implements IQueryable<any> {
  tableSchema: TableSchema;
  globalStore: GlobalStore;

  constructor({
    tableSchema,
    globalStore
  }: {
    tableSchema: TableSchema;
    globalStore: GlobalStore;
  }) {
    this.tableSchema = tableSchema;
    this.globalStore = globalStore;

    globalStore.databaseSchema.set(tableSchema.table, tableSchema);
  }

  findAll() {
    const query = new Query({
      tableSchema: this.tableSchema,
      globalStore: this.globalStore
    });

    query.send();

    const uniqueId = uuid();

    this.globalStore.queries.set(uniqueId, query);

    return query;
  }
}
