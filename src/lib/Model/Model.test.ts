import Deferred from "../Common/Deferred";
import Model from "./Model";

let userModel = new Model({
  schema: {
    table: "users",
    fields: ["first", "last"]
  }
});

test("Model: Chaining", () => {
  expect(typeof userModel.where("x", "=", 5).where).toBe("function");
});

test("Model: Test find()", async () => {
  let deferredResponse: Deferred<any> = await userModel.findById(1);
  expect(deferredResponse.loading).toBe(true);

  var value = await deferredResponse.promise;

  expect(value.data.getField("first")).toBeDefined();
  expect(value.data.getField("last")).toBeDefined();

  expect(value.loading).toBe(false);
});

test("Model: fromJS()", () => {
  const sanketModel = userModel.fromJS({
    first: "Sanket",
    last: "Sahu"
  });

  expect(sanketModel.getField("first")).toBe("Sanket");
  expect(sanketModel.getField("last")).toBe("Sahu");
});
