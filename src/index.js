import { react } from '@babel/types';
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';


class Directory extends React.Component {
  constructor(props) {
    super(props);

    this.name = props.name;
    this.children = props.children;
    this.state = { expanded: false };

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
        return <li><Directory name={child.name} children={child.children} /></li>;
      } else {
        return <li><File name={child.name} /></li>;
      }
    });
  }

  render() {
    if (this.state.expanded) {
      return [<span class="directory expanded" onClick={this.toggle}>{this.name}</span>,
              <ul class="directory">{this.getChildElements()}</ul>];
    } else {
      return <span class="directory" onClick={this.toggle}>{this.name}</span>
    }
  }
}

class File extends React.Component {
  render() {
    return <span class="file">{this.props.name}</span>
  }
}

fetch('./manifest.json').then(res => res.json().then(data => {
  ReactDOM.render(
    <Directory name={data.name} children={data.children} />,
    document.getElementById('root')
  );
}));
