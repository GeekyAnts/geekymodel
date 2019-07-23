# 🗄 GeekyModel

> ## ⚠️️️️️ ⚠️️️️️ ⚠️️️️️ Not for production use ⚠️️️️️ ⚠️️️️️ ⚠️️️️️

## What is 🗄 GeekyModel?

GeekyModel is an opinionated State Container with a Database-like API powered by MobX.

The Data Models can later be mapped to a Remote service like Firebase, REST API, GraphQL etc.

## Features ⚡

- Build your front-end models **without worrying about the back-end**. GeekyModel works with LocalStorage by default.

- **Offline First**: Connect to any **back-end at a later stage**, like

  - Firebase / Firestore
  - GraphQL
  - REST APIs

- Write request and response **middlewares to map** the differences in the front-end and the back-end models.

- Built-in standard **validation** and option to add custom validators.

- **Model Relationships**: Relate models with References and Foreign Keys.

- **Built-in Fake Data**: Populate your UI with Fake Data automatically.

## Getting started

```
yarn add geekymodel
```

OR

```
npm install geekymodel --save
```

## Writing your first model

```typescript
import { createModel } from "geekymodel";

const Todo = createModel({
  table: "todos",
  fields: ["caption", "isCompleted"]
});
```

#### Creating a new Todo

```typescript

const newTodo = Todo.create();

newTodo.setField("caption", "Buy milk");
newTodo.setField("isCompleted", false");

newTodo.save();

// newTodo.saving gets populated which an observable

```

#### Fetching all the todos and wiring with React

```tsx

@observable
class TodoApp extends Component {

    componentWillMount() {
        this.todos = Todo.findAll();
    }

    render() {

        const { data, loading } = this.todos;

        if (loading)
            return <span>Loading</span>;

        return <ul>
            {data.map(item) => <li>{item.getField('caption')}</li>}
        </ul>
    }

}

```

#### Adding query params

```tsx
const allCompleted = Todo.where("isCaption", "=", true).get();
```

## Roadmap

- [x] Model creation with Schema
- [x] Injectable Transport Layer
- [ ] Request and Response Middlewares
- [x] Namespace Global variables in Database
- [ ] Build script
- [ ] Middlewares
- [ ] LocalStorageNetworkDriver
- [ ] Normalization
- [ ] Relationships
