import Deferred from "../Common/Deferred";

import Model from "./Model";
import Page from "./Page";
import ErrorMessage from "../Common/ErrorMessage";

export default class ModelQueryResult implements Deferred<Model | Page> {
  loading: boolean = false;
  error: boolean = false;
  errors: Array<ErrorMessage> = [];
  data: Model | Page;
  promise: Promise<Deferred<Model | Page>>;

  constructor({
    model,
    promise
  }: {
    model: Model;
    promise: Promise<Deferred<Model | Page>>;
  }) {
    this.data = model.createInstance();
    this.promise = promise;
    this.loading = true;
  }
}
