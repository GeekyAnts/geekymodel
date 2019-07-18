import React, { useEffect } from "react";
import { createModel } from "./lib";

const User = createModel({
  table: "users",
  fields: ["name", "dob"]
});

class App extends React.Component {
  componentWillMount() {
    this.query = User.findAll();
    setTimeout(() => this.forceUpdate(), 3000);
  }

  render() {
    return (
      <div>
        <div>
          Loading: <pre>{JSON.stringify(this.query.loading, null, 4)}</pre>
          Data: <pre>{JSON.stringify(this.query.data, null, 4)}</pre>
        </div>
        <div>
          <input type="text" value="Something" />
        </div>
      </div>
    );
  }
}

export default App;
