import { react } from '@babel/types';
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';


class App extends React.Component {
  render() {
    return (
      <div class="app">
        <div class="files">
          <Directory path={this.props.data.path} children={this.props.data.children} />
        </div>
        <div class="code">
          <pre><code>print("hello!")</code></pre>
        </div>
      </div>
    );
  }
}


class Directory extends React.Component {
  constructor(props) {
    super(props);

    this.path = props.path;
    this.parent = this.props.parent || null;
    this.children = props.children;
    this.state = { expanded: false };

    const split = this.path.split('/');
    this.name = split[split.length - 1];

    this.toggle = this.toggle.bind(this);
  }

  static compare(a, b) {
    if (a.children === undefined && b.children === undefined)
        return 0;
    else if (a.children && b.children === undefined)
        return -1;
    else if (a.children === undefined && b.children)
        return 1;
    return 0;
  }

  toggle() {
    this.setState(s => ({ expanded: !s.expanded }));
  }

  getChildElements() {
    return this.children.sort(Directory.compare).map(child => {
      if (child.children && child.children.length > 0) {
        return <li><Directory path={child.path} children={child.children} parent={this} /></li>;
      } else {
        return <li><File path={child.path} parent={this} /></li>;
      }
    });
  }

  render() {
    if (this.state.expanded) {
      return (
        <React.Fragment>
          <span class="directory expanded" data-path={this.path} onClick={this.toggle}>{this.name}</span>
          <ul class="directory">{this.getChildElements()}</ul>
        </React.Fragment>
      );
    } else {
      return <span class="directory" data-path={this.path} onClick={this.toggle}>{this.name}</span>
    }
  }
}

class File extends React.Component {
  constructor(props) {
    super(props);

    this.path = props.path;
    this.parent = this.props.parent;

    const split = this.path.split('/');
    this.name = split[split.length - 1];
  }

  render() {
    return <span class="file" data-path={this.path}>{this.name}</span>
  }
}

fetch('./manifest.json').then(res => res.json().then(data => {
  ReactDOM.render(
    <App data={data} />,
    document.getElementById('root')
  );
}));
