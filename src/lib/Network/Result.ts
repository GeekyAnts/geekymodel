import Deferred from "../Common/Deferred";
import ErrorMessage from "../Common/ErrorMessage";
import { observable } from "mobx";

export default class Result implements Deferred<any> {
  @observable loading: boolean = false;
  @observable error: boolean = false;
  @observable errors: Array<ErrorMessage> = [];
  @observable data: any;
  promise: Promise<Deferred<any>>;

  constructor({
    loading,
    promise
  }: {
    loading: boolean;
    promise: Promise<Deferred<any>>;
  }) {
    this.loading = loading;
    this.promise = promise;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }
  setError(error: boolean) {
    this.error = error;
  }

  setData(data: any) {
    this.data = data;
  }

  setErrors(errors: Array<ErrorMessage>) {
    this.errors = errors;
  }
}
