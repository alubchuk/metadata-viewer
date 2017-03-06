// @flow
import React, {Component, PropTypes} from 'react';
import './App.css';
import App from './App';
import {connect} from 'react-redux';
import {changeUsers, changeTags, changeSites, resetState} from '../../redux/reducer';
import * as utils from '../../framework/utils';
import constants from '../../framework/constants';

type stateTypes = {loading: boolean, users: Array<string>, tags: Array<string>, sites: Array<Object>};
const mapStateToProps = ({users, tags}: stateTypes) => ({users, tags});

export class AppContainer extends Component {
  static propTypes = {
      users: PropTypes.array.isRequired,
      tags: PropTypes.array.isRequired,
      changeUsers: PropTypes.func.isRequired,
      changeTags: PropTypes.func.isRequired,
      changeSites: PropTypes.func.isRequired,
      resetState: PropTypes.func.isRequired
  };

  handleChange = (e: Object) => {
      const query = e.target.value;
      if (!query.length) {
          return this.props.resetState();
      }

      const {users, tags, sites} = utils.parseQuery({
          query,
          urlValidator: utils.urlValidator,
          queryConfig: constants.queryConfig
      });

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
    const {users, tags} = this.props;
    return (
        <App
            title='Metadata Preview'
            onChange={this.handleChange}
            users={users}
            tags={tags} />
    );
  }
}

export default connect(mapStateToProps, {changeUsers, changeTags, changeSites, resetState})(AppContainer);
