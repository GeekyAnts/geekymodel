import Deferred from "../Common/Deferred";
import ErrorMessage from "../Common/ErrorMessage";
import TableSchema from "../Model/TableSchema";
import GlobalStore from "../Store/index";
import NetworkRequest from "./NetworkRequest";

export default class QueryMutationBase implements Deferred<any> {
  loading: boolean = false;
  error: boolean = false;
  errors: Array<ErrorMessage> = [];
  data: any;
  promise: any;
  protected _networkRequest: NetworkRequest;

  protected tableSchema: TableSchema;
  protected globalStore: GlobalStore;

  constructor({
    tableSchema,
    globalStore
  }: {
    tableSchema: TableSchema;
    globalStore: GlobalStore;
  }) {
    this.tableSchema = tableSchema;
    this.globalStore = globalStore;
    this._networkRequest = new NetworkRequest({
      endPoint: "/" + tableSchema.table
    });

    this.loading = true;

    this.data = [];
  }
}
