import { observable } from "mobx";

import Deferred from "../Common/Deferred";

import Model from "./Model";
import Page from "./Page";
import ErrorMessage from "../Common/ErrorMessage";

export default class ModelQueryResult implements Deferred<Model | Page> {
  @observable loading: boolean = false;
  @observable error: boolean = false;
  @observable errors: Array<ErrorMessage> = [];
  @observable data: Model | Page;
  @observable promise: Promise<Deferred<Model | Page>>;

  constructor({
    model,
    promise
  }: {
    model: Model;
    promise: Promise<Deferred<Model | Page>>;
  }) {
    this.data = model.create();
    this.promise = promise;
    this.loading = true;
  }
}
