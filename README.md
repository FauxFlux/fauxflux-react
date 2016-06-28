# FauxFlux-React
React bindings for [FauxFlux](https://github.com/FauxFlux/fauxflux)

This package provides a `<FauxFluxProvider/>` and a `connect` decorator to make working with [FauxFlux](https://github.com/FauxFlux/fauxflux) easier with React.

The `connect` decorator uses the React context api behind the scenes to give any compoenet wrapped in `connect` the `this.store` and `this.dispatch` properties.

However, the `this.store` and `this.dispatch` properties will not be added to the component until the `componentWillMount` lifecycle method so you wont be able to call them in a components constructor method if the component is defined as a JavaScript class. Wait to call them in the `componentWillMount` lifecycle method instead.

```js
@connect
class MessageList extends React.Component {
  constructor(props) {
    super(props);
    // will throw an error
    this.dispatch('fetch_stuff');
  }
  
  componentWillMount() {
    // will fetch stuff
    this.dispatch('fetch_stuff');
  }
  
  render() {
    return (
      // ...  
    );
  }
}
```

### Example Chat App
```js
import React from 'react';
import ReactDOM from 'react-dom';
import FauxFlux from 'fauxflux';
import { FauxFluxProvider, connect } from '../index';

// Generate a random username for this example
let randomUserName = `User${( Math.floor(Math.random() * 100000) + 1  )}`;

let store = {
  name: randomUserName,
  messageText: '',
  messages: [] // array of objects like { name: 'Billie Jean', message: 'She says I am the one' }
};

let actions = [
  {
    name: 'update_message_text',
    action({store}, payload) {
      store.messageText = payload;
    }
  },
  {
    name: 'received_new_message',
    action({store}, message) {
      store.messages.push(message);
    }
  },
  {
    name: 'send_message',
    action({store}) {
      let newMessage = {name: store.name, message: store.messageText};
      // Simulated ajax request to some server
      setTimeout(() => {
        store.messages.push(newMessage);
        store.messageText = '';
      }, 100);
    }
  }
]

let FF = new FauxFlux(store, actions);

@connect
class MessageTextBox extends React.Component {
  constructor(props) {
    super(props);
    
    this._handleChange = this._handleChange.bind(this);
    this._sendMessage = this._sendMessage.bind(this);
  }
  
  _handleChange(e) {
    e.preventDefault();
    this.dispatch('update_message_text', e.target.value);
  }

  _sendMessage(e) {
    e.preventDefault();
    this.dispatch('send_message');
  }
  
  render() {
    return (
      <form onSubmit={this._sendMessage}>
        <input value={this.store.messageText} onChange={this._handleChange} />
        <button>Send</button>
      </form>
    );
  }
}

@connect
class MessageList extends React.Component {
  render() {
    return (
      <ul>
        {this.store.messages.map((message, index) => 
          <li key={index}>{message.name} - {message.message}</li>
        )}
      </ul>
      );
  }
}

// This component wont need an @connect decorator because there is nothing
// directly in the store it relies on.
class App extends React.Component {
  render() {
    return (
      <div>
        <MessageTextBox />
        <MessageList />
      </div>
    );
  }
}

ReactDOM.render(
  <FauxFluxProvider FF={FF}>
      <App/>
  </FauxFluxProvider>,
  document.getElementById('app')
);
```
