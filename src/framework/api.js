// @flow
import axios from 'axios';
import config from '../config';

export const fetchMetadata = (sites: Array<string>) => (
    axios.all(sites.map(
        (url: string) => axios(config.metadataServiceUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data: {url}
        })))
);
