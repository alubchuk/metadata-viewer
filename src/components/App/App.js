// @flow
import './App.css';
import React, {PropTypes} from 'react';
import ListPreviewContainer from '../ListPreview/ListPreview';
import LinkPreviewContainer from '../LinkPreview/LinkPreviewContainer';
import Textarea from '../Textarea/Textarea';
const Halogen = require('halogen');

const App = (props: Object) => (
    <div className="App">
      <div className="App-header">
        <img src='http://brandslisten.com/wp-content/uploads/2016/11/logo.png' className="App-logo" alt="logo" />
        <h2>{props.title}</h2>
      </div>

      <div>
        <div className="App-content-search">
            <Textarea onChange={props.onChange}/>
            <div className='App-content-search-spinner'>
                {props.loading ? <Halogen.PulseLoader color='#DD0A1A' /> : null}
            </div>
        </div>

        <div className="App-content-preview">
            <ListPreviewContainer type='users' title={'Users'} itemClassName='user' />
            <ListPreviewContainer type='tags' title={'Tags'} itemClassName='tag' />
            <LinkPreviewContainer title={'Sites Metadata'} />
        </div>
      </div>
    </div>
);

App.propTypes = {
    loading: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    tags: PropTypes.array.isRequired
};

export default App;
