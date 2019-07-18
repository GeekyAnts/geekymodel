import TableSchema from "../TableSchema";
import Table from "../Table";
import Query from "../Query";
import Mutation from "../Mutation";

export default class Database {
  queries: Map<string, Query> = new Map();
  mutation: Map<string, Mutation> = new Map();
  databaseRemote: Map<string, Table> = new Map();
  databaseLocal: Map<string, Table> = new Map();
  databaseSchema: Map<string, TableSchema> = new Map();
}
