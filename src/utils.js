// @flow
type parseQueryType = {query: string, queryConfig: Object, urlValidator: Function};

export const parseQuery = ({query, queryConfig, urlValidator}: parseQueryType) => {
    if (!queryConfig.WORDS_DELIMITER) {
        throw new Error('WORDS_DELIMITER not specified');
    }

    return query
      .split(queryConfig.WORDS_DELIMITER)
      .filter((v: string) => v.trim().length >= queryConfig.MIN_SYMBOLS_REQUIRED)
      .reduce((acc: Object, q: string) => {
          if (q.startsWith(queryConfig.USER_DELIMITER)) {acc.users.push(q.replace(new RegExp(queryConfig.USER_DELIMITER, 'g'), ''))}
          else if (q.startsWith(queryConfig.TAG_DELIMITER)) {acc.tags.push(q.replace(new RegExp(queryConfig.TAG_DELIMITER, 'g'), ''))}
          else if (urlValidator().test(q)) {acc.sites.push(q)}
          return acc;
      }, {users: [], tags: [], sites: []})
};
