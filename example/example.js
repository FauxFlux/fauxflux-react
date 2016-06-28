import React from 'react';
import ReactDOM from 'react-dom';
import FauxFlux from 'fauxflux';
import { FauxFluxProvider, connect } from '../index';
import DevTools from 'mobx-react-devtools';

const FILTER_ALL = 'all';
const FILTER_ACTIVE = 'active';
const FILTER_COMPLETED = 'completed';
const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

let store = {
  newTodoText: '',
  todos: [],
  editing: null,
  filter: FILTER_ALL,
  activeTodoCount() {
    return store.todos.reduce( (accum, todo) => {
      return todo.completed ? accum : accum + 1;
    }, 0);
  },
  completedCount() {
    return store.todos.length - store.activeTodoCount;
  }
};

let actions = [
  {
    name: 'hash_has_changed',
    action({store}, payload) {
      let filter = window.location.hash.substr(2);
      if (!filter) { filter = FILTER_ALL; }
      store.filter = filter;
    }
  },
  {
    name: 'update_new_todo_text',
    action({store}, text) {
      store.newTodoText = text;
    }
  },
  {
    name: 'add_new_todo',
    action({store}, payload) {
      let title = store.newTodoText.trim();

      if (title) {
        store.todos.push({ id: uuid(), completed: false, title, editingText: ''});
        store.newTodoText = '';
      }
    }
  },
  {
    name: 'set_edit_id',
    action({store}, id) {
      store.editing = id;
    }
  },
  {
    name: 'toggle_completed',
    action({store}, todoToToggle) {
      todoToToggle.completed = !todoToToggle.completed;
    }
  },
  ,
  {
    name: 'toggle_all_completed',
    action({store, mobx}, checked) {
      mobx.transaction(() => {
        store.todos.forEach( (todo) => {
          todo.completed = checked;
        });
      });
    }
  },
  {
    name: 'edit_todo_title',
    action({store}, {todoToEdit, title}) {
      todoToEdit.title = title;
    }
  },
  {
    name: 'edit_todo_editingText',
    action({store}, {todoToEdit, editingText}) {
      todoToEdit.editingText = editingText;
    }
  },
  {
    name: 'delete_todo',
    action({store}, todoToDelete) {
      store.todos.remove(todoToDelete);
    }
  },
  {
    name: 'clear_completed',
    action({store}, payload) {
      store.todos = store.todos.filter( (todo) => !todo.completed );
    }
  }
];


let Footer = connect(React.createClass({

/* ------------------------- Component action handlers */

  _clearCompleted() {
    return this.dispatch('clear_completed');
  },

  _isSelectedFilter(filter) {
    return ( filter === this.store.filter ? 'selected' : '' );
  },

/* ------------------------- View render functions */

  _pluralizedItems() {
    return ( this.store.activeTodoCount === 1 ? 'item' : 'items' );
  },

/* ------------------------- React methods and lifecycle events */

  render() {
    return ( this.store.todos.length
      ? <footer className="footer">
          <span className="todo-count">
            <strong>{this.store.activeTodoCount}</strong> {this._pluralizedItems()} left
          </span>
          <ul className="filters">
            <li><a href="#/" className={this._isSelectedFilter(FILTER_ALL)}>All</a></li>
            <li><a href="#/active" className={this._isSelectedFilter(FILTER_ACTIVE)}>Active</a></li>
            <li><a href="#/completed" className={this._isSelectedFilter(FILTER_COMPLETED)}>Completed</a></li>
          </ul>
          {this.store.completedCount > 0
            ? <button className="clear-completed" onClick={this._clearCompleted}>Clear completed</button>
            : null
          }
        </footer>
      : null
    );
  }

}));


let TodoItem = connect(React.createClass({

  propTypes: { 
    todo: React.PropTypes.object.isRequired,
    editing: React.PropTypes.bool.isRequired
  },

/* ------------------------- Component action handlers */

  _setEditId(id) {
    return this.dispatch('set_edit_id', id);
  },

  _editTodo(editingText, e) {
    if (e && e.target.value) { editingText = e.target.value; }
    return this.dispatch('edit_todo_editingText', {
      todoToEdit: this.props.todo,
      editingText
    });
  },

  _setUpTodoToBeEdited() {
    let { todo } = this.props;
    return this._editTodo.bind(this, todo.title)().then( () => {
      return this._setEditId(this.props.todo.id);
    });
  },

  _toggleCompleted() {
    return this.dispatch('toggle_completed', this.props.todo);
  },

  _updateTitle() {
    let { todo } = this.props;
    return this._setEditId(null).then( () => {
      return this.dispatch('edit_todo_title', {
        todoToEdit: todo,
        title: todo.editingText
      });
    });
  },

  _deleteTodo() {
    return this.dispatch('delete_todo', this.props.todo);
  },

  _editingHandleKeyDown(e) {
    if (e.which === ESCAPE_KEY) {
      e.preventDefault();
      return this._setEditId(null);
    } else if (e.which === ENTER_KEY) {
      e.preventDefault();
      return this._updateTitle();
    }
  },

  _getClassNames() {
    let { todo, editing } = this.props;
    let classes = [];
    if (todo.completed) { classes.push('completed'); }
    if (editing) { classes.push('editing'); }
    return classes.join(' ');
  },

/* ------------------------- React methods and lifecycle events */

  componentDidUpdate(prevProps) {
    let node = this.refs.editField;
    if (!prevProps.editing && this.props.editing) {
      node.focus();
      node.setSelectionRange(node.value.length, node.value.length);
    } else if (!this.props.editing && !this.props.todo.title) {
      // If we have edited the todo title to a blank string, just deleted it on blur.
      this._deleteTodo();
    }
  },

  render() {
    let { todo } = this.props;
    return (
      <li className={this._getClassNames()}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={todo.completed} onChange={this._toggleCompleted} />
          <label onDoubleClick={this._setUpTodoToBeEdited}>{todo.title}</label>
          <button className="destroy" onClick={this._deleteTodo}></button>
        </div>
        <input 
          ref="editField"
          className="edit" 
          value={todo.editingText}
          onChange={this._editTodo.bind(this, null)}
          onBlur={this._setEditId.bind(this, null)}
          onKeyDown={this._editingHandleKeyDown}
        />
      </li>
    );
  }

}));


let TodoItems = connect(React.createClass({

/* ------------------------- Component action handlers */

  _toggleAll(e) {
    let checked = e.target.checked;
    return this.dispatch('toggle_all_completed', checked);
  },

/* ------------------------- React methods and lifecycle events */

  render() {
    let { todos, filter, editing, activeTodoCount } = this.store;

    let shownTodos = todos.filter( (todo) => {
      switch (filter) {
        case FILTER_ACTIVE:
          return !todo.completed;
        case FILTER_COMPLETED:
          return todo.completed;
        default:
          return true;
      }
    });

    return (
      <section className="main" style={{display: (todos.length ? 'block' : 'none') }}>
        <input 
          className="toggle-all" 
          type="checkbox" 
          checked={activeTodoCount === 0}
          onChange={this._toggleAll}
        />
        <ul className="todo-list">
          {shownTodos.map( (todo) => 
            <TodoItem 
              key={`todo${todo.id}`} 
              todo={todo} 
              editing={editing === todo.id} 
            />
          )}
        </ul>
      </section>
    );
  }

}));


let Header = connect(React.createClass({

/* ------------------------- Component action handlers */

  _handleKeyDown(e) {
    if (e.keyCode !== ENTER_KEY) {
      return;
    }

    e.preventDefault();
    return this.dispatch('add_new_todo');
  },

  _newTodoChange(e) {
    return this.dispatch('update_new_todo_text', e.target.value);
  },

/* ------------------------- React methods and lifecycle events */

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input 
          className="new-todo" 
          value={this.store.newTodoText}
          onKeyDown={this._handleKeyDown}
          onChange={this._newTodoChange} 
          placeholder="What needs to be done?" 
          autoFocus={true}
        />
      </header>
    );
  }

}));


let App = connect(React.createClass({

/* ------------------------- React methods and lifecycle events */

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.dispatch('hash_has_changed');
    }, false);
    // set the Filter, which is based off the hash, on the inital render.
    this.dispatch('hash_has_changed');
  },

  render() {
    return (
      <div>
        <Header />
        <TodoItems />
        <Footer />
      </div>
    );
  }

}));


let FF = new FauxFlux(store, actions);

ReactDOM.render(
  <FauxFluxProvider FF={FF}>
    <div>
      <App/>
      <DevTools/>
    </div>
  </FauxFluxProvider>,
  document.getElementById('app')
);


////////////////////////// localStorage

// localStorage key
const key = 'todos-app';

// actions used to initilize and set the todos
let localStorageActions = [
  {
    name: 'localStorage_init_todos',
    action({store, mobx}, key) {
      let jsonTodos = localStorage.getItem(key);
      if (jsonTodos) { mobx.extendObservable(store, { todos: JSON.parse(jsonTodos) }); }
    }
  },
  {
    name: 'localStorage_set_todos',
    action({store, mobx}, key) {
      var todos = mobx.toJSON(store.todos);
      localStorage.setItem(key, JSON.stringify(todos));
    }
  }
];

// Register our actions so we can call them with dispatch().
FF.registerActions(localStorageActions);

// Make sure to check for todos in the localStorage before autorunning our localStorage_set_todos dispatch function.
FF.dispatch('localStorage_init_todos', key).then(() => {
  // Run the localStorage_set_todos action anytime an observable inside that action changes.
  // In this case the todos array. --- var todos = mobx.toJSON(store.todos);
  FF.mobx.autorun(() => FF.dispatch('localStorage_set_todos', key) );
});


////////////////////////// Utility Functions

function uuid () {
  let i, random;
  let uuid = '';

  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-';
    }
    uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
      .toString(16);
  }

  return uuid;
}
