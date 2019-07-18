import QueryMutationBase from "./QueryMutationBase";

export default class Query extends QueryMutationBase {
  send() {
    const self = this;
    this.loading = true;
    this._networkRequest.send().then(data => {
      self.data = data;
      this.loading = false;
    });
  }
}
