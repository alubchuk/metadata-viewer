// @flow
import React, {Component, PropTypes} from 'react';
import logo from './logo.svg';
import './App.css';
import Textarea from './Textarea';
import LinkPreview from './LinkPreview';
import ListPreview from './ListPreview';
import urlValidator from 'url-regex';
import {connect} from 'react-redux';
import {changeUsers, changeTags, changeSites, resetState} from './reducers';

type stateTypes = {loading: boolean, users: Array<string>, tags: Array<string>, sites: Array<Object>};
const mapStateToProps = ({loading, users, tags, sites}: stateTypes) => ({
    users, tags, sites, loading
});

const USER_DELIMITER = '@';
const TAG_DELIMITER = '#';
const LINK_DELIMITER = ' ';

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

  parseAndFilter = (value: string, delimiter: string) => value.split(delimiter).filter((item: string) => item.trim());

  handleChange = (e: Object) => {
      const query = e.target.value;
      if (!query.length) {
          return this.props.resetState();
      }

      if (query.startsWith(USER_DELIMITER)) {
          return this.props.changeUsers(this.parseAndFilter(query, USER_DELIMITER));
      }

      if (query.startsWith(TAG_DELIMITER)) {
          return this.props.changeTags(this.parseAndFilter(query, TAG_DELIMITER));
      }

      if (urlValidator().test(query)) {
          return this.props.changeSites(this.parseAndFilter(query, LINK_DELIMITER));
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
