import ErrorMessage from "./ErrorMessage";

/**
 * Deferred are used over Promises to return observable data in React Components.
 *
 * If we return the Promises over Deferred in React Components then the Component
 * needs to implements it's own `loading` status and `errors` messages.
 *
 * With the use of Deferred interface `loading` status and `errors` need not be separately
 * maitained at a different place (like React Component).
 */

export default interface Deferred<T> {
  loading: boolean;
  error: boolean;
  errors: Array<ErrorMessage>;
  data: T | undefined;
  //promise: Promise<T>;
}
