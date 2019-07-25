import Builder from "./Builder";
import FakeConnection from "./Connection/FakeConnection";
import Deferred from "../Common/Deferred";
import DatabaseSchema from "../Common/DatabaseSchema";
import Schema from "../Common/Schema";

let databaseSchema = new DatabaseSchema();
let schema = new Schema({
  table: "users",
  fields: ["name", "age"]
});

databaseSchema.addSchema(schema);

let connection = new FakeConnection({ databaseSchema });

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

/*test("Builder: Test insert()", async () => {
  let builder = new Builder(connection);
  let deferredResponse: Deferred<any> = await builder.from("user").insert({
    
  });
  expect(deferredResponse.loading).toBe(true);

  var value = await deferredResponse.promise;
  expect(value.loading).toBe(false);
});
*/

test("Builder: Test requestMiddleware", async () => {
  let builder = new Builder(connection, {
    requestMiddleware: (config: any) => {
      config.from = "someTable";
      return config;
    }
  });

  let deferredResponse: Deferred<any> = await builder.from("user").find();
  expect(deferredResponse.loading).toBe(true);

  var value = await deferredResponse.promise;
  expect(value.loading).toBe(false);
});
