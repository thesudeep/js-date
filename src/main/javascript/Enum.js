/**
 * @constant
 * @private
 */
var ENUM_CACHE = {};

/**
 * @constant
 * @private
 */
var ENUM_VALUES_CACHE = {};

/**
 *
 * @param {Enum} e
 * @throws {Error}
 * @private
 */
function cacheEnum(e) {
    var clazz = e._clazz;
    var name = e._name;

    var current = getOrCreateCacheRecord(ENUM_CACHE, clazz);

    isDefined(current[name]) && throwEnumCreationError();

    current[name] = e;
}

/**
 * JSDoc here
 *
 * @author Victor Polischuk
 * @class Class description
 *
 * @param {Function} clazz
 * @param {Number} ordinal
 * @param {String} name
 * @throws {Error}
 * @constructor
 * @public
 */
function Enum(ordinal, name) {
    /**
     * @type {Function}
     * @private
     */
    this._clazz = getClass();
    /**
     * @type {Number}
     * @private
     */
    this._ordinal = ordinal;
    /**
     * @type {String}
     * @private
     */
    this._name = name;

    cacheEnum(this);
}

/**
 *
 * @param {Enum} left
 * @param {Enum} right
 * @return {Number}
 * @constant
 * @static
 * @public
 */
Enum.COMPARATOR = function(left, right) {
    (isNotExist(left) || isNotExist(right)) && throwNullPointerError();
    (left._clazz !== right._clazz) && throwClassCastError();

    return comparator(left._ordinal, right._ordinal);
};

/**
 *
 * @param {Function} clazz
 * @return {Enum[]}
 * @constant
 * @static
 * @public
 */
Enum.values = function(clazz) {
    var cache = ENUM_CACHE[clazz];

    isUndefined(cache) && throwEnumInvalidError();

    /**
     * @type {Enum[]}
     * @private
     */
    var list = ENUM_VALUES_CACHE[clazz] || (ENUM_VALUES_CACHE[clazz] = []);

    if (list.length === 0) {
        for (var key in cache) {
            list[list.length] = cache[key];
        }

        list.sort(Enum.COMPARATOR);
    }

    return list;
};

/**
 * @param {Function} clazz
 * @param {String} name
 * @return {Enum}
 * @constant
 * @static
 * @public
 */
Enum.valueOf = function(clazz, name) {
    var cache = ENUM_CACHE[clazz];

    isUndefined(cache) && throwEnumInvalidError();

    return cache[name] || null;
};

/**
 *
 * @return {String}
 * @public
 */
Enum.prototype.name = function () {
    return this._name;
};

/**
 *
 * @return {String}
 * @public
 */
Enum.prototype.toString = function () {
    return this.name();
};

/**
 *
 * @param {Enum} that
 * @return {Boolean}
 * @public
 */
Enum.prototype.equals = function (that) {
    return this === that;
};

/**
 *
 * @param {Enum} that
 * @return {Number}
 * @throws {Error}
 * @public
 */
Enum.prototype.compareTo = function (that) {
    return Enum.COMPARATOR(this, that);
};
