const MIN_SYMBOLS_REQUIRED = 3;
const USER_DELIMITER = '@';
const TAG_DELIMITER = '#';
const WORDS_DELIMITER = /\s|,\s|,/;

export default {
    queryConfig: {
        MIN_SYMBOLS_REQUIRED,
        USER_DELIMITER,
        TAG_DELIMITER,
        WORDS_DELIMITER
    }
};
