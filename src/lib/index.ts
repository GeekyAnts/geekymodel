import GlobalStore from "./Model/Database";
import TableSchema from "./Model/TableSchema";
import ModelController from "./Model/Controller";

const globalStore = new GlobalStore();

if (window) {
  (window as any).globalStore = globalStore;
}

export function createModel(tableSchema: TableSchema) {
  return new ModelController({ tableSchema, globalStore });
}
