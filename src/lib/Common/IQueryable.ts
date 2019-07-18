import Deferred from "./Deferred";

export default interface IQueryable<T> {
  select(field: any): IQueryable<T>;
  from(entity: string): IQueryable<T>;
  where(prop: any, op: any, val: any): IQueryable<T>;

  find(id: any): Deferred<T> | Promise<T>;
  get(id: any): Deferred<T> | Promise<T>;
  first(): Deferred<T> | Promise<T>;
  update(values: any): Deferred<T> | Promise<T>;
  delete(): Deferred<T> | Promise<T>;
  // save(): Deferred;
  // insert(values: any): Deferred;
}
