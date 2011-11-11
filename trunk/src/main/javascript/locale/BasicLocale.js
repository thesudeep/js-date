/**
 *
 * @param {String} language
 * @param {Object} params
 */
BasicLocale = function(language, params) {
    this._super.constructor(language);

    /** @type {String} */
    this._englishName = params.englishName;
    /** @type {String} */
    this._nativeName = params.nativeName;
    /** @type {String[]} */
    this._bcNames = params.bcNames;
    /** @type {String[]} */
    this._adNames = params.adNames;
    /** @type {String[]} */
    this._dayNames = [null].concat(params.dayNames);
    /** @type {String[]} */
    this._shortDayNames = [null].concat(params.shortDayNames);
    /** @type {String[]} */
    this._monthNames = [null].concat(params.monthNames);
    /** @type {String[]} */
    this._shortMonthNames = [null].concat(params.shortMonthNames);
    /** @type {String} */
    this._amName = params.amName;
    /** @type {String} */
    this._pmName = params.pmName;
};

/**
 *
 * @return {String}
 */
BasicLocale.prototype.getEnglishName = function() {
    return this._englishName;
};

/**
 *
 * @return {String}
 */
BasicLocale.prototype.getNativeName = function() {
    return this._nativeName;
};

/**
 * @return {String[]}
 */
BasicLocale.prototype.getBcEras = function() {
    return this._bcNames;
};

/**
 * @return {String[]}
 */
BasicLocale.prototype.getAdEras = function() {
    return this._adNames;
};

/**
 * @return {String[]}
 */
BasicLocale.prototype.getWeekdays = function() {
    return this._dayNames;
};

/**
 * @return {String[]}
 */
BasicLocale.prototype.getShortWeekdays = function() {
    return this._shortDayNames;
};

/**
 * @return {String[]}
 */
BasicLocale.prototype.getMonths = function() {
    return this._monthNames;
};

/**
 * @return {String[]}
 */
BasicLocale.prototype.getShortMonths = function() {
    return this._shortMonthNames;
};

/**
 * @return {String[]}
 */
BasicLocale.prototype.getAmPmStrings = function() {
    return [this._amName, this._pmName];
};

inherits(BasicLocale, Locale);