// @flow
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Textarea from './Textarea';
import MetadataViewer from './MetadataViewer';
import ListPreview from './ListPreview';
import urlValidator from 'url-regex';

class App extends Component {
  state = {
      users: [],
      tags: [],
      sites: []
  };

  handleChange = (e: Object) => {
      const query = e.target.value;
      if (!query.length) {
          return this.setState({users: [], tags: [], sites: []});
      }
      if (query.startsWith('@')) {
          console.log(`It's a new user: ${query}`);
          this.setState({users: query.split('@').filter((item: string) => item).map((item: string) => item.trim())});
      } else if (query.startsWith('#')) {
          console.log("It's a tagname");
          this.setState({tags: query.split('#').filter((item: string) => item).map((item: string) => item.trim())});
      } else if (urlValidator().test(query)) {
          console.log("It's a url");
          this.setState({sites: query.split(' ').filter((item: string) => item)})
      }
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Metadata Viewer</h2>
        </div>
        <div className="App-content">
          <Textarea onChange={this.handleChange}/>
          <hr />
          <div className="App-content-preview">
              <ListPreview data={this.state.users} title={'Users Preview'} />
              <ListPreview data={this.state.tags} title={'Tags Preview'} />
              <MetadataViewer data={this.state.sites} title={'Site Metadata Preview'} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
