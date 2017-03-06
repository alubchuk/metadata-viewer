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



const ipRegex = (function() {
    const v4 = '(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])(?:\\.(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])){3}';

    const v6seg = '[0-9a-fA-F]{1,4}';
    const v6 = `
    (?:${v6seg}:){1,4}:${v4}|                 # 2001:db8:3:4::192.0.2.33  64:ff9b::192.0.2.33
    ::(?:ffff(?::0{1,4}){0,1}:){0,1}${v4}|    # ::255.255.255.255  ::ffff:255.255.255.255  ::ffff:0:255.255.255.255
    fe80:(?::${v6seg}){0,4}%[0-9a-zA-Z]{1,}|  # fe80::7:8%eth0     fe80::7:8%1
    (?:${v6seg}:){7,7}${v6seg}|               # 1:2:3:4:5:6:7:8
    :(?:(?::${v6seg}){1,7}|:)|                # ::2:3:4:5:6:7:8    ::2:3:4:5:6:7:8  ::8
    ${v6seg}:(?:(?::${v6seg}){1,6})|          # 1::3:4:5:6:7:8     1::3:4:5:6:7:8   1::8
    (?:${v6seg}:){1,2}(?::${v6seg}){1,5}|     # 1::4:5:6:7:8       1:2::4:5:6:7:8   1:2::8
    (?:${v6seg}:){1,3}(?::${v6seg}){1,4}|     # 1::5:6:7:8         1:2:3::5:6:7:8   1:2:3::8
    (?:${v6seg}:){1,4}(?::${v6seg}){1,3}|     # 1::6:7:8           1:2:3:4::6:7:8   1:2:3:4::8
    (?:${v6seg}:){1,5}(?::${v6seg}){1,2}|     # 1::7:8             1:2:3:4:5::7:8   1:2:3:4:5::8
    (?:${v6seg}:){1,6}:${v6seg}|              # 1::8               1:2:3:4:5:6::8   1:2:3:4:5:6::8
    (?:${v6seg}:){1,7}:|                      # 1::                                 1:2:3:4:5:6:7::
    ::                                        # ::
    `.replace(/\s*#.*$/gm, '').replace(/\n/g, '').trim();

    const ip = (opts: Object) => opts && opts.exact ?
    	new RegExp(`(?:^${v4}$)|(?:^${v6}$)`) :
    	new RegExp(`(?:${v4})|(?:${v6})`, 'g');

    ip.v4 = opts => opts && opts.exact ? new RegExp(`^${v4}$`) : new RegExp(v4, 'g');
    ip.v6 = opts => opts && opts.exact ? new RegExp(`^${v6}$`) : new RegExp(v6, 'g');

    return ip;
})();

export const urlValidator = (opts: Object = {}) => {

	const protocol = '(?:(?:[a-z]+:)?//)';
	const auth = '(?:\\S+(?::\\S*)?@)?';
	const ip = ipRegex.v4().source;
	const host = '(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)';
	const domain = '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*';
	const tld = '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))\\.?';
	const port = '(?::\\d{2,5})?';
	const path = '(?:[/?#][^\\s"]*)?';
	const regex = `(?:${protocol}|www\\.)${auth}(?:localhost|${ip}|${host}${domain}${tld})${port}${path}`;

	return opts.exact ? new RegExp(`(?:^${regex}$)`, 'i') : new RegExp(regex, 'ig');
};
