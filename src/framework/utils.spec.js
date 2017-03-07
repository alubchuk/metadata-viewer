import {parseQuery} from './utils';
import constants from './constants';
import {urlValidator} from './utils';

const {queryConfig} = constants;

describe('Test parseQuery utility', () => {
    it('Should return empty arrays if query is empty', () => {
        expect(parseQuery({
            query: '',
            queryConfig,
            urlValidator
        })).toEqual({sites: [], tags: [], users: []});
    });

    it('Should throw an Error if WORDS_DELIMITER is not specified', () => {
        const _parseQuery = () => parseQuery({
            query: '#tag',
            queryConfig: {
                ...queryConfig,
                WORDS_DELIMITER: undefined
            },
            urlValidator
        });
        expect(_parseQuery).toThrowError('WORDS_DELIMITER not specified');
    });

    it('Should return empty arrays for NO DELIMITER FOUND', () => {
        expect(parseQuery({
            query: 'hello',
            queryConfig,
            urlValidator
        })).toEqual({sites: [], tags: [], users: []});
    });

    it('Should trim the empty spaces and return an empty arrays', () => {
        expect(parseQuery({
            query: '     ',
            queryConfig,
            urlValidator
        })).toEqual({sites: [], tags: [], users: []});
    });

    it('Should return empty arrays for ONLY DELIMITER FOUND', () => {
        expect(parseQuery({
            query: '@',
            queryConfig,
            urlValidator
        })).toEqual({sites: [], tags: [], users: []});
    });

    it(`Should return empty arrays if query contains < ${queryConfig.MIN_SYMBOLS_REQUIRED} symbols`, () => {
        expect(parseQuery({
            query: '@',
            queryConfig,
            urlValidator
        })).toEqual({sites: [], tags: [], users: []});
    });

    it('Should return empty array of if delimiters are not at the beginning of the phrases', () => {
        expect(parseQuery({
            query: 'tag1# tag#2',
            queryConfig,
            urlValidator
        })).toEqual({sites: [], tags: [], users: []});
    });

    it('Should return filled array of users for correctly specified users', () => {
        expect(parseQuery({
            query: '@user1 @user2',
            queryConfig,
            urlValidator
        })).toEqual({sites: [], tags: [], users: ['user1', 'user2']});
    });

    it('Should return filled array of tags for correctly specified tags', () => {
        expect(parseQuery({
            query: '#tag1 #tag2',
            queryConfig,
            urlValidator
        })).toEqual({sites: [], tags: ['tag1', 'tag2'], users: []});
    });

    it('Should return filled array of sites for correctly specified site links', () => {
        expect(parseQuery({
            query: 'http://yandex.ua, http://davidwalsh.name',
            queryConfig,
            urlValidator
        })).toEqual({sites: ['http://yandex.ua', 'http://davidwalsh.name'], tags: [], users: []});
    });

    it('Should return filled array of everything for correctly specified queries. ORDER MATTERS!', () => {
        expect(parseQuery({
            query: '@user2, http://yandex.ua, #tag2 http://davidwalsh.name #tag1, @user1',
            queryConfig,
            urlValidator
        })).toEqual({sites: ['http://yandex.ua', 'http://davidwalsh.name'], tags: ['tag2', 'tag1'], users: ['user2', 'user1']});
    });

    it('Should remove all additional wrongly typed delimiters', () => {
        expect(parseQuery({
            query: '####tag1 @@@@user',
            queryConfig,
            urlValidator
        })).toEqual({sites: [], tags: ['tag1'], users: ['user']});
    });
});
