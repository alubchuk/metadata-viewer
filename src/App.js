// @flow
import React, {Component, PropTypes} from 'react';
import logo from './logo.svg';
import './App.css';
import Textarea from './Textarea';
import LinkPreview from './LinkPreview';
import ListPreview from './ListPreview';
import urlValidator from 'url-regex';
import {connect} from 'react-redux';
import {changeUsers, changeTags, changeSites, resetState} from './reducer';

type stateTypes = {loading: boolean, users: Array<string>, tags: Array<string>, sites: Array<Object>};
const mapStateToProps = ({loading, users, tags, sites}: stateTypes) => ({
    users, tags, sites, loading
});

const USER_DELIMITER = '@';
const TAG_DELIMITER = '#';
const MIN_SYMBOLS_REQUIRED = 2;

class App extends Component {
  static propTypes = {
      loading: PropTypes.bool.isRequired,
      users: PropTypes.array.isRequired,
      tags: PropTypes.array.isRequired,
      sites: PropTypes.array.isRequired,
      changeUsers: PropTypes.func.isRequired,
      changeTags: PropTypes.func.isRequired,
      changeSites: PropTypes.func.isRequired,
      resetState: PropTypes.func.isRequired
  };

  parseAndFilter = (value: string, delimiter: string) => {
      return value
        .split(delimiter)
        .filter((v: string) => v.trim().length > MIN_SYMBOLS_REQUIRED);
  }

  handleChange = (e: Object) => {
      const query = e.target.value;
      if (!query.length) {
          return this.props.resetState();
      }

      const {users, tags, sites} = this.parseAndFilter(query, /\s|,\s|,/).reduce((acc: Object, q: string) => {
          if (q.startsWith(USER_DELIMITER)) {acc.users.push(q.slice(1))}
          else if (q.startsWith(TAG_DELIMITER)) {acc.tags.push(q.slice(1))}
          else if (urlValidator().test(q)) {acc.sites.push(q)}
          return acc;
      }, {users: [], tags: [], sites: []});

      if (users.length) {
          this.props.changeUsers(users);
      }

      if (tags.length) {
          this.props.changeTags(tags);
      }

      if (sites.length) {
          this.props.changeSites(sites);
      }
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src='http://brandslisten.com/wp-content/uploads/2016/11/logo.png' className="App-logo" alt="logo" />
          <h2>Metadata Preview</h2>
        </div>
        <div className="App-content">
          <Textarea onChange={this.handleChange}/>
          <hr />
          <div className="App-content-preview">
              <ListPreview data={this.props.users} title={'Users Preview'} itemClassName='user' />
              <ListPreview data={this.props.tags} title={'Tags Preview'} itemClassName='tag' />
              <LinkPreview data={this.props.sites} loading={this.props.loading} title={'Site Metadata Preview'} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, {changeUsers, changeTags, changeSites, resetState})(App);
