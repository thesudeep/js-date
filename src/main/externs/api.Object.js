/**
 * Basic interfaces API
 * @externs
 */

/**
 * @interface
 */
var _Comparable = function () {
};

/**
 * Object equality method.
 *
 * @param {Object} obj passed object.
 * @return {boolean} <code>true</code> - in case given object equals to current,
 *                   <code>false</code> - otherwise
 * @public
 */
_Comparable.prototype.equals = function (obj) {
};

/**
 * Comparing given object to the current one.
 *
 * @param {!Object} obj usually object of the same class current.
 * @return {number} <code>1</code> - in case passed object is bigger,
 *                  <code>0</code> - if they are equal,
 *                  <code>-1</code> - otherwise.
 * @throws {Error} may throw an error if object is not of the same class, or comparison is impossible.
 * @public
 */
_Comparable.prototype.compareTo = function (obj) {
};

