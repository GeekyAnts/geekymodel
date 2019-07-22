import Database from "./Model/Database";
import Schema from "./Model/Schema";
import ModelController from "./Model/Model";

const database = new Database();

if (window) {
  (window as any).database = database;
}

export function createModel(schema: Schema) {
  return new ModelController({ schema });
}
