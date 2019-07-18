import Deferred from "../Common/Deferred";
import Row from "./Row";
import Page from "./Page";
import ErrorMessage from "../Common/ErrorMessage";

export default class Result implements Deferred<any> {
  loading: boolean = false;
  error: boolean = false;
  errors: Array<ErrorMessage> = [];
  data: any;
}
