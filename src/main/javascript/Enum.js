/**
 * Cache for already registered {@link Enum}s. Object has type: <code>{Class: {String: Enum}}</code>.
 * It means that cache key is a class/function of an {@link Enum} type, cache value is a map (object) with a
 * <code>name</code> as a key and <code>true</code> as a value.
 *
 * @constant
 * @private
 */
var ENUM_CACHE = {};

/**
 * Lazy cache for already requested {@link Enum}'s values. Object has type: <code>{Class: Enum[]}</code>.
 * It means that cache key is a class/function of an {@link Enum} type, cache value is a list of registered enumerations of
 * such type
 *
 * @constant
 * @private
 */
var ENUM_VALUES_CACHE = {};

/**
 * Put given {@link Enum} in {@link ENUM_CACHE}, or throws an exception if such enumeration is already there.
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
 * Creates an enumeration instance with several base methods, cache and predicted behavior. It must not be two
 * instances of the same class with the same name in case of enumerations.
 * The class introduce sorting order as <code>ordinal</code> and comparator based on the <code>ordinal</code>.
 * Ordinal must be unique through enumeration of the same class, but it does not check automatically,
 * implementations must take care of it.
 *
 * @author Victor Polischuk
 * @class Basic class for all enumeration implementations.
 *
 * @param {Number} ordinal index in queue of enumerations, can be seen as a priority or weight, but, basically,
 * used only in sorting purpose.
 * @param {String} name unique name of the enumeration instance.
 * @throws {Error} in case name is not unique and such enumeration is already existing.
 * @constructor
 * @public
 */
function Enum(ordinal, name) {
    /**
     * Enumeration class.
     * @type {Function}
     * @private
     */
    this._clazz = getClass();
    /**
     * Index in queue of enumerations, can be seen as a priority or weight, but, basically, used only in sorting purpose.
     * @type {Number}
     * @private
     */
    this._ordinal = ordinal;
    /**
     * Unique name of the enumeration instance.
     * @type {String}
     * @private
     */
    this._name = name;

    cacheEnum(this);
}

/**
 * Basic and universal comparator for any enum, in case it keeps "ordinal" convention and comparing by ordinal is enough.
 *
 * @param {Enum} left left comparable
 * @param {Enum} right right comparable
 * @return {Number} <code>1</code> - in case passed enumeration has bigger ordinal,
 *                  <code>0</code> - if they are equal,
 *                  <code>-1</code> - otherwise.
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
 * Returns all enumerations of the given class.
 *
 * @param {Function} clazz enumeration class.
 * @return {Enum[]} list of the registered enumerations.
 * @throws {Error} in case given class does not associated to {@link Enum}
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

    return [].concat(list);
};

/**
 * Return registered instance of the enumeration by its name.
 *
 * @param {Function} clazz enumeration class.
 * @param {String} name unique name of the enumeration instance.
 * @return {Enum} registered enumeration or <code>null</code> if such name does not exist.
 * @throws {Error} in case given class does not associated to {@link Enum}
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
 * Enumeration unique name.
 *
 * @return {String} unique name
 * @public
 */
Enum.prototype.name = function () {
    return this._name;
};

/**
 * Returns text representation of the enumeration. By default, equals to {@link #name()).
 *
 * @return {String} text representation of the enumeration.
 * @public
 */
Enum.prototype.toString = function () {
    return this.name();
};

/**
 * Strictly compares passed instance on equality to current.
 *
 * @param {Enum} that enumeration.
 * @return {Boolean} <code>true</code> - in case given enumeration is the same as current,
 *                   <code>false</code> - otherwise
 * @public
 */
Enum.prototype.equals = function (that) {
    return this === that;
};

/**
 * Comparing given enumeration to the current one.
 *
 * @param {Enum} that enumeration of the same class.
 * @return {Number} <code>1</code> - in case passed enumeration has bigger ordinal,
 *                  <code>0</code> - if they are equal,
 *                  <code>-1</code> - otherwise.
 * @throws {Error} if enumeration are not the same class, or given parameter is not an enumeration at all.
 * @public
 * @see Enum.COMPARATOR
 */
Enum.prototype.compareTo = function (that) {
    return Enum.COMPARATOR(this, that);
};
