/**
 *
 * @param {String} language
 */
Locale = function(language) {
    /** @type {String} */
    this._language = language;
};

(function() {
    /** @type {Object} */
    var CACHE = {};
    var DEFAULT_LOCALE;
    var localeConstructor = Locale;

    /**
     * @param {String} language
     */
    Locale = function(language) {
        localeConstructor();

        assertTrue(isUndefined(CACHE[language]), "Such language already exists");

        CACHE[language] = this;
    };

    Locale.getDefault = function() {
        if (hasValue(DEFAULT_LOCALE)) {
            return DEFAULT_LOCALE;
        }

        var locale, lStr = navigator.language || navigator.userLanguage || navigator.systemLanguage || navigator.browserLanguage;

        if (!hasValue(lStr) || !hasValue(locale = CACHE[lStr])) {
            locale = Locale.EN;
        }

        DEFAULT_LOCALE = locale;

        return locale;
    };

    /**
     *
     * @param {String} language
     * @return {Locale}
     */
    Locale.forLang = function(language) {
        var locale = CACHE[language];

        if (hasValue(locale)) {
            return locale;
        }

        return Locale.getDefault();
    };

    /**
     *
     * @return {String}
     */
    Locale.prototype.getLanguage = function() {
        return this._language;
    };

    /**
     * @return {String[]}
     */
    Locale.prototype.getBcEras = function() {
        abstractMethod();
    };

    /**
     * @return {String[]}
     */
    Locale.prototype.getAdEras = function() {
        abstractMethod();
    };

    /**
     * @return {String[]}
     */
    Locale.prototype.getWeekdays = function() {
        abstractMethod();
    };

    /**
     * @return {String[]}
     */
    Locale.prototype.getShortWeekdays = function() {
        abstractMethod();
    };

    /**
     * @return {String[]}
     */
    Locale.prototype.getMonths = function() {
        abstractMethod();
    };

    /**
     * @return {String[]}
     */
    Locale.prototype.getShortMonths = function() {
        abstractMethod();
    };

    /**
     * @return {String[]}
     */
    Locale.prototype.getAmPmStrings = function() {
        abstractMethod();
    };
})();
