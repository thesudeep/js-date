goog.provide("Enum");

goog.require("Errors");

/**
 * Cache for already registered {@link Enum}s. Object has type: <code>{Class: {String: Enum}}</code>.
 * It means that cache key is a class/function of an {@link Enum} type, cache value is a map (object) with a
 * <code>name</code> as a key and <code>true</code> as a value.
 *
 * @type {!Object.<string, Object.<string, !Enum>>}
 * @const
 * @private
 */
var ENUM_CACHE = {};

/**
 * Lazy cache for already requested {@link Enum}'s values. Object has type: <code>{Class: Enum[]}</code>.
 * It means that cache key is a class/function of an {@link Enum} type, cache value is a list of registered enumerations of
 * such type
 *
 * @type {!Object.<string, Array.<Enum>>}
 * @const
 * @private
 */
var ENUM_VALUES_CACHE = {};

/**
 * Put given {@link Enum} in {@link ENUM_CACHE}, or throws an exception if such enumeration is already there.
 *
 * @param {!Enum} e
 * @throws {Error}
 * @private
 */
function cacheEnum(e) {
    var clazz = e._clazz;
    var name = e._name;

    var current = getOrCreateObject(ENUM_CACHE, clazz);

    current[name] && Errors.throwEnumAlreadyExists();

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
 * @param {string} clazz enumeration class name.
 * @param {number} ordinal index in queue of enumerations, can be seen as a priority or weight, but, basically,
 * used only in sorting purpose.
 * @param {string} name unique name of the enumeration instance.
 * @throws {Error} in case name is not unique and such enumeration is already existing.
 * @constructor
 * @implements {_Enum}
 * @public
 */
var Enum = function(clazz, ordinal, name) {
    /**
     * Enumeration class name.
     * @type {string}
     * @private
     */
    this._clazz = clazz;
    /**
     * Index in queue of enumerations, can be seen as a priority or weight, but, basically, used only in sorting purpose.
     * @type {number}
     * @private
     */
    this._ordinal = ordinal;
    /**
     * Unique name of the enumeration instance.
     * @type {string}
     * @private
     */
    this._name = name;

    cacheEnum(this);
};

/**
 * Basic and universal comparator for any enum, in case it keeps "ordinal" convention and comparing by ordinal is enough.
 *
 * @type {!function(!Enum,!Enum):number}
 * @const
 * @public
 */
Enum.COMPARATOR = function(left, right) {
    left && right || Errors.throwNullPointer();
    (left._clazz !== right._clazz) && Errors.throwClassCast();

    return comparator(left._ordinal, right._ordinal);
};

/**
 * Returns all enumerations of the given class.
 *
 * @param {string} className enumeration class.
 * @return {!Array.<Enum>} list of the registered enumerations.
 * @throws {Error} in case given class does not associated to {@link Enum}
 * @static
 * @public
 */
Enum.values = function(className) {
    var cache = ENUM_CACHE[className] || Errors.throwInvalidEnum();

    /**
     * @type {!Array.<Enum>}
     * @private
     */
    var list = ENUM_VALUES_CACHE[className] || (ENUM_VALUES_CACHE[className] = []);

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
 * @param {string} name unique name of the enumeration instance.
 * @param {string} className enumeration class.
 * @return {Enum} registered enumeration or <code>null</code> if such name does not exist.
 * @throws {Error} in case given class does not associated to {@link Enum}
 * @static
 * @public
 */
Enum.valueOf = function(name, className) {
    var cache = ENUM_CACHE[className];

    isUndefined(cache) && Errors.throwInvalidEnum();

    return cache[name] || null;
};

///**
// * Enumeration class name. Should be unique among all enumerations.
// *
// * @return {string} unique class name
// * @public
// */
//Enum.prototype.getClass = function() {
//    return this._clazz;
//};

/**
 * Enumeration unique name. Should be unique inside current enumeration class.
 *
 * @return {string} unique name
 * @public
 * @override
 */
Enum.prototype.name = function () {
    return this._name;
};

/**
 * Enumeration ordinal. Should be unique inside current enumeration class.
 *
 * @return {number} ordinal
 * @public
 * @override
 */
Enum.prototype.ordinal = function () {
    return this._ordinal;
};

/**
 * Strictly compares passed instance on equality to current.
 *
 * @param {Object} that enumeration.
 * @return {boolean} <code>true</code> - in case given enumeration is the same as current,
 *                   <code>false</code> - otherwise
 * @public
 * @override
 */
Enum.prototype.equals = function (that) {
    return this === that;
};

/**
 * Comparing given enumeration to the current one.
 *
 * @param {!Enum} that enumeration of the same class.
 * @return {number} <code>1</code> - in case passed enumeration has bigger ordinal,
 *                  <code>0</code> - if they are equal,
 *                  <code>-1</code> - otherwise.
 * @throws {Error} if enumeration are not the same class, or given parameter is not an enumeration at all.
 * @public
 * @override
 */
Enum.prototype.compareTo = function (that) {
    return Enum.COMPARATOR(this, that);
};

/**
 * Returns text representation of the enumeration. By default, equals to {@link #name()).
 *
 * @return {string} text representation of the enumeration.
 * @public
 */
Enum.prototype.toString = function () {
    return this._clazz + "." + this.name();
};
