/**
 * Utility class used by a few of the GJDateTimeFields.
 *
 * @author Brian S O'Neill
 * @since 1.0
 * @param {Locale}
        */
GJLocaleSymbols = function(locale) {
    /**
     * @param {number[]} integers
     * @param {...}
     * @return {Object}
     */
    function addSymbols(integers) {
        var obj = {};
        var len = arguments.length;

        for (var j = 1; j < len; j++) {
            var symbols = arguments[j];

            for (var i = symbols.length; --i >= 0;) {
                var symbol = symbols[i];

                hasValue(symbol) && (obj[symbol] = integers[i]);
            }
        }

        return obj;
    }

    /**
     * @param {number} start
     * @param {number} end
     * @param {number[]} integers
     * @param {Object=} obj
     */
    function addNumerals(start, end, integers, obj) {
        obj = hasValue(obj) ? obj : {};

        for (var i = start; i <= end; i++) {
            obj[String(i)] = integers[i];
        }

        return obj;
    }

    /**
     * @param {String[]} a
     * @return {number}
     */
    function maxLength(a) {
        var s, max = 0;

        for (var i = a.length; --i >= 0;) {
            hasValue(s = a[i]) && s.length > max && (max = s.length);
        }

        return max;
    }

    var integers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    /** @type {Locale} */
    this._locale = locale;

    /** @type {String[]}*/
    this._eras = [locale.getBcEras()[0], locale.getAdEras()[0]];
    /** @type {String[]}*/
    this._daysOfWeek = locale.getWeekdays();
    /** @type {String[]}*/
    this._shortDaysOfWeek = locale.getShortWeekdays();
    /** @type {String[]}*/
    this._months = locale.getMonths();
    /** @type {String[]}*/
    this._shortMonths = locale.getShortMonths();
    /** @type {String[]}*/
    this._halfday = locale.getAmPmStrings();

    /** @type {Object} */
    this._parseEras = addSymbols(integers, locale.getBcEras(), locale.getAdEras());
    /** @type {Object} */
    this._parseDaysOfWeek = addSymbols(integers, this._daysOfWeek, this._shortDaysOfWeek);
    /** @type {Object} */
    this._parseMonths = addSymbols(integers, this._months, this._shortMonths);

    /** @type {number} */
    this._maxEraLength = maxLength(this._eras);
    /** @type {number} */
    this._maxDayOfWeekLength = maxLength(this._daysOfWeek);
    /** @type {number} */
    this._maxShortDayOfWeekLength = maxLength(this._shortDaysOfWeek);
    /** @type {number} */
    this._maxMonthLength = maxLength(this._months);
    /** @type {number} */
    this._maxShortMonthLength = maxLength(this._shortMonths);
    /** @type {number} */
    this._maxHalfdayLength = maxLength(this._halfday);

    addNumerals(1, 7, integers, this._parseDaysOfWeek);
    addNumerals(1, 12, integers, this._parseMonths);
};

(function() {
    /** @type {Object} */
    var CACHE = {};

    /**
     *
     * @param {Locale} locale
     * @return {GJLocaleSymbols}
     */
    GJLocaleSymbols.forLocale = function(locale) {
        var lang = locale.getLanguage();

        var symbols = CACHE[lang];

        if (!hasValue(symbols)) {
            symbols = new GJLocaleSymbols(locale);

            CACHE[lang] = symbols;
        }

        return symbols;
    };

    /**
     * @param {number} value
     * @return {String}
     */
    GJLocaleSymbols.prototype.eraValueToText = function(value) {
        return this._eras[value];
    };

    /**
     * @param {String} text
     * @return {number}
     */
    GJLocaleSymbols.prototype.eraTextToValue = function(text) {
        var era = this._parseEras.get(text);

        if (era != null) {
            return era;
        }

        throw new IllegalFieldValueException(DateTimeFieldType.era(), text);
    };

    /**
     * @return {number}
     */
    GJLocaleSymbols.prototype.getEraMaxTextLength = function() {
        return this._maxEraLength;
    };

    /**
     * @param {number} value
     * @return {String}
     */
    GJLocaleSymbols.prototype.monthOfYearValueToText = function(value) {
        return this._months[value];
    };

    /**
     * @param {number} value
     * @return {String}
     */
    GJLocaleSymbols.prototype.monthOfYearValueToShortText = function(value) {
        return this._shortMonths[value];
    };

    /**
     * @param {String} text
     * @return {number}
     */
    GJLocaleSymbols.prototype.monthOfYearTextToValue = function(text) {
        var month = this._parseMonths.get(text);

        if (month != null) {
            return month;
        }

        throw new IllegalFieldValueException(DateTimeFieldType.monthOfYear(), text);
    };

    /**
     * @return {number}
     */
    GJLocaleSymbols.prototype.getMonthMaxTextLength = function() {
        return this._maxMonthLength;
    };

    /**
     * @return {number}
     */
    GJLocaleSymbols.prototype.getMonthMaxShortTextLength = function() {
        return this._maxShortMonthLength;
    };

    /**
     * @param {number} value
     * @return {String}
     */
    GJLocaleSymbols.prototype.dayOfWeekValueToText = function(value) {
        return this._daysOfWeek[value];
    };

    /**
     * @param {number} value
     * @return {String}
     */
    GJLocaleSymbols.prototype.dayOfWeekValueToShortText = function(value) {
        return this._shortDaysOfWeek[value];
    };

    /**
     * @param {String} text
     * @return {number}
     */
    GJLocaleSymbols.prototype.dayOfWeekTextToValue = function(text) {
        var day = this._parseDaysOfWeek.get(text);

        if (day != null) {
            return day;
        }

        throw new IllegalFieldValueException(DateTimeFieldType.dayOfWeek(), text);
    };

    /**
     * @return {number}
     */
    GJLocaleSymbols.prototype.getDayOfWeekMaxTextLength = function() {
        return this._maxDayOfWeekLength;
    };

    /**
     * @return {number}
     */
    GJLocaleSymbols.prototype.getDayOfWeekMaxShortTextLength = function() {
        return this._maxShortDayOfWeekLength;
    };

    /**
     * @param {number} value
     * @return {String}
     */
    GJLocaleSymbols.prototype.halfdayValueToText = function(value) {
        return this._halfday[value];
    };

    /**
     * @return {number}
     */
    GJLocaleSymbols.prototype.halfdayTextToValue = function(text) {
        var halfday = this._halfday;

        for (var i = halfday.length; --i >= 0;) {
            if (halfday[i].toLowerCase() == text.toLowerCase()) {
                return i;
            }
        }

        throw new IllegalFieldValueException(DateTimeFieldType.halfdayOfDay(), text);
    };

    /**
     * @return {number}
     */
    GJLocaleSymbols.prototype.getHalfdayMaxTextLength = function() {
        return this._maxHalfdayLength;
    };
})();
