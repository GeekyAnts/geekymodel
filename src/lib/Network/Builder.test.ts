import Builder from "./Builder";
import FakeConnection from "./Connection/FakeConnection";
import Deferred from "../Common/Deferred";

import { spy } from "mobx";

let connection = new FakeConnection();

test("Builder: Chaining", () => {
  let builder = new Builder(connection);
  expect(typeof builder.from("user").where("x", "=", 5).where).toBe("function");
});

test("Builder: Test find()", async () => {
  let builder = new Builder(connection);
  let deferredResponse: Deferred<any> = await builder.from("user").find();
  expect(deferredResponse.loading).toBe(true);

  var value = await deferredResponse.promise;
  expect(value.loading).toBe(false);
});
