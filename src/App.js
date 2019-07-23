import React from "react";
import {
  createModel,
  useRequestMiddleware,
  useResponseMiddleware
} from "./lib";
import { observer } from "mobx-react";

const User = createModel({
  table: "users",
  fields: ["name", "first", "last"]
});

useRequestMiddleware((req, next) => {
  return next(req);
});

useResponseMiddleware((res, next) => {
  return next(res);
});

class App extends React.Component {
  componentWillMount() {
    this.query = User.findById(1);
  }

  render() {
    return (
      <div>
        <div>
          Loading: <pre>{JSON.stringify(this.query.loading, null, 4)}</pre>
          Data: <pre>{JSON.stringify(this.query.data.toJS(), null, 4)}</pre>
        </div>
        <div>
          <input
            type="text"
            value={this.query.data.getField("first")}
            onChange={e => {
              this.query.data.setField("first", e.target.value);
            }}
          />
        </div>
      </div>
    );
  }
}

export default observer(App);
