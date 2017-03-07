// @flow
import React, {Component, PropTypes} from 'react';
import App from './App';
import {connect} from 'react-redux';
import {updateUsers, updateTags, updateSites, resetState} from '../../redux/reducer';

type stateTypes = {loading: boolean, users: Array<string>, tags: Array<string>, sites: Array<Object>};
const mapStateToProps = ({users, tags, sites, loading}: stateTypes) => ({loading, users, tags, sites});

export class AppContainer extends Component {
  static propTypes = {
      loading: PropTypes.bool.isRequired,
      users: PropTypes.array.isRequired,
      tags: PropTypes.array.isRequired,
      sites: PropTypes.array.isRequired,
      utils: PropTypes.object.isRequired,
      queryConfig: PropTypes.object.isRequired,
      updateUsers: PropTypes.func.isRequired,
      updateTags: PropTypes.func.isRequired,
      updateSites: PropTypes.func.isRequired,
      resetState: PropTypes.func.isRequired
  };

  handleChange = (e: Object) => {
      const query = e.target.value;
      if (!query.length) {
          return this.props.resetState();
      }

      const {users, tags, sites} = this.props.utils.parseQuery({
          query,
          urlValidator: this.props.utils.urlValidator,
          queryConfig: this.props.queryConfig
      });

      if (users.length || this.props.users.length) {
          this.props.updateUsers(users);
      }

      if (tags.length || this.props.tags.length) {
          this.props.updateTags(tags);
      }

      if (sites.length || this.props.sites.length) {
          this.props.updateSites(sites);
      }
};

  render() {
    const {users, tags, loading} = this.props;
    return (
        <App
            loading={loading}
            title='Metadata Preview'
            onChange={this.handleChange}
            users={users}
            tags={tags} />
    );
  }
}

export default connect(mapStateToProps, {updateUsers, updateTags, updateSites, resetState})(AppContainer);
