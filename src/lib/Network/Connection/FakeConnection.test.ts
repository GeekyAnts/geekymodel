import FakeConnection from "./FakeConnection";
import DatabaseSchema from "../../Common/DatabaseSchema";
import Schema from "../../Common/Schema";

let databaseSchema = new DatabaseSchema();

let schema = new Schema({
  table: "users",
  fields: ["name", "age", "ip"]
});

databaseSchema.addSchema(schema);

let connection = new FakeConnection({ databaseSchema });

test("FakeConnection: find()", async () => {
  const response: any = await connection.find("users", "", []);
  expect(response.name).toBeDefined();
  expect(response.age).toBeDefined();
  expect(response.ip).toBeDefined();
});

test("FakeConnection: get()", async () => {
  const response: any = await connection.get("users", "", []);
  expect(Array.isArray(response)).toBe(true);

  if (response.length > 0) {
    expect(response[0].name).toBeDefined();
    expect(response[0].age).toBeDefined();
    expect(response[0].ip).toBeDefined();
  }
});
