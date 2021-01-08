import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';


class App extends React.Component {
  sourceRoot = '/src/';

  constructor(props) {
    super(props);

    this.state = {
      currentTitle: null,
      currentText: null
    };
  }

  changeFile(path) {
    this.setState({
      currentTitle: null,
      currentText: 'empty'
    });

    fetch(this.sourceRoot + path).then(res => {
      res.text().then(text => {
        this.setState({
          currentTitle: path,
          currentText: text
        });
      });
    });
  }

  render() {
    return (
      <div className="app">
        <div className="files">
          <h1>source-viewer</h1>
          <Directory path={this.props.data.path} children={this.props.data.children} changeFunc={this.changeFile.bind(this)} />
        </div>
        <div className="code">
          {this.state.currentTitle === null
            ? <h2>{this.state.currentText === null ? "Open a file!" : "Loading..."}</h2>
            : <Code title={this.state.currentTitle} text={this.state.currentText} />}
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
    this.changeFunc = props.changeFunc;
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
        return <li key={child.path}><Directory path={child.path} children={child.children} parent={this} changeFunc={this.changeFunc} /></li>;
      } else {
        return <li key={child.path}><File path={child.path} parent={this} changeFunc={this.changeFunc} /></li>;
      }
    });
  }

  render() {
    if (this.state.expanded) {
      return (
        <React.Fragment>
          <span className="directory expanded" data-path={this.path} onClick={this.toggle}>{this.name}</span>
          <ul className="directory">{this.getChildElements()}</ul>
        </React.Fragment>
      );
    } else {
      return <span className="directory" data-path={this.path} onClick={this.toggle}>{this.name}</span>
    }
  }
}


class File extends React.Component {
  constructor(props) {
    super(props);

    this.path = props.path;
    this.parent = this.props.parent;
    this.changeFunc = props.changeFunc;

    const split = this.path.split('/');
    this.name = split[split.length - 1];
  }

  render() {
    return <span className="file" data-path={this.path} onClick={this.changeFunc.bind(undefined, this.path)}>{this.name}</span>
  }
}


class Code extends React.Component {
  constructor(props) {
    super(props);
    this.element = React.createRef();
  }

  componentDidMount() {
    window.hljs.highlightBlock(this.element.current);
  }

  componentDidUpdate() {
    window.hljs.highlightBlock(this.element.current);
  }

  render() {
    return (
      <React.Fragment>
        <h2>{this.props.title}</h2>
        <pre><code ref={this.element}>{this.props.text}</code></pre>
      </React.Fragment>
    );
  }
}


fetch('./manifest.json').then(res => res.json().then(data => {
  ReactDOM.render(
    <App data={data} />,
    document.getElementById('root')
  );
}));
