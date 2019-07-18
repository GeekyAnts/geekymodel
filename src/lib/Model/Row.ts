import Deferred from "../Common/Deferred";
import ErrorMessage from "../Common/ErrorMessage";

export default class Row implements Deferred<any> {
  locked: boolean = false;
  updating: boolean = false;
  saving: boolean = false;
  deleting: boolean = false;

  loading: boolean = false;
  error: boolean = false;
  errors: Array<ErrorMessage> = [];

  data: Map<string, any> = new Map();

  set(field: string, value: any) {
    this.data.set(field, value);
  }
  validate() {}
}
