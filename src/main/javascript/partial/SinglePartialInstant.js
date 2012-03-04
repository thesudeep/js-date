//goog.provide("SinglePartialInstant");
//
//goog.require("PeriodType");
//goog.require("PartialInstant");
//goog.require("Chronology");
//
///**
// * JSDoc here
// *
// * @author Victor Polischuk
// * @class Class description
//
// * @param {!FieldType} type
// * @param {number} value
// * @constructor
// * @private
// * @extends {PartialInstant}
// */
//var SinglePartialInstant = function (type, value) {
//    SinglePartialInstant.superClass_.constructor.call(this);
//
//    /**
//     * @type {!FieldType}
//     */
//    this._type = type;
//    /**
//     * @type {number}
//     */
//    this._value = value;
//};
//
//goog.inherits(SinglePartialInstant, PartialInstant);
//
//
///**
// *
// * @return {!Array.<Object.<PeriodType, number>>}
// * @public
// * @override
// */
//SinglePartialInstant.prototype.list = function () {
//    /**
//     * @type {!PeriodType}
//     * @private
//     */
//    var key = this._type;
//
//    /**
//     * @type {number}
//     * @private
//     */
//    var value = this._value;
//
//    return [{key: value}];
//};
//
///**
// * @param {PeriodType=} type
// * @return {number}
// * @public
// * @override
// */
//SinglePartialInstant.prototype.get = function (type) {
//    type && type !== this._type && Errors.throwUnsupportedPeriodType();
//
//    return this._value;
//};
//
///**
// *
// * @param {number} instant
// * @param {Chronology=} chronology
// * @return {number}
// * @public
// * @override
// */
//SinglePartialInstant.prototype.toMillis = function (instant, chronology) {
//    /**
//     * @type {!Chronology}
//     */
//    var chrono = chronology || Chronology.getDefault();
//
//    return chrono.computePeriod(instant, this._type, this._value);
//};
//
///**
// *
// * @param {number} value
// * @return {!Period}
// * @throws {Error} in case period value is negative
// * @public
// */
//PeriodType.prototype.toPeriod = function(value) {
//    value < 0 && Errors.throwNegaivePeriodValue();
//
//    switch (value) {
//        case 0: return this.zero();
//        case 1: return this.one();
//        case 2: return this.two();
//        case 3: return this.three();
//        case 4: return this.four();
//        case 5: return this.five();
//        case 6: return this.six();
//        case 7: return this.seven();
//        case 8: return this.eight();
//        case 9: return this.nine();
//        case 10: return this.ten();
//        case 11: return this.eleven();
//        case 12: return this.twelve();
//        default: return new SinglePeriod(this, value);
//    }
//};
//
///**
// * @return {!Period}
// * @const
// * @public
// */
//PeriodType.prototype.one = singlePeriodTypeFactory(1);
//
///**
// * @return {!Period}
// * @const
// * @public
// */
//PeriodType.prototype.two = singlePeriodTypeFactory(2);
//
///**
// * @return {!Period}
// * @const
// * @public
// */
//PeriodType.prototype.three = singlePeriodTypeFactory(3);
//
///**
// * @return {!Period}
// * @const
// * @public
// */
//PeriodType.prototype.four = singlePeriodTypeFactory(4);
//
///**
// * @return {!Period}
// * @const
// * @public
// */
//PeriodType.prototype.five = singlePeriodTypeFactory(5);
//
///**
// * @return {!Period}
// * @const
// * @public
// */
//PeriodType.prototype.six = singlePeriodTypeFactory(6);
//
///**
// * @return {!Period}
// * @const
// * @public
// */
//PeriodType.prototype.seven = singlePeriodTypeFactory(7);
//
///**
// * @return {!Period}
// * @const
// * @public
// */
//PeriodType.prototype.eight = singlePeriodTypeFactory(8);
//
///**
// * @return {!Period}
// * @const
// * @static
// * @public
// */
//PeriodType.prototype.nine = singlePeriodTypeFactory(9);
//
///**
// * @return {!Period}
// * @const
// * @public
// */
//PeriodType.prototype.ten = singlePeriodTypeFactory(10);
//
///**
// * @return {!Period}
// * @const
// * @static
// * @public
// */
//PeriodType.prototype.eleven = singlePeriodTypeFactory(11);
//
///**
// * @return {!Period}
// * @const
// * @public
// */
//PeriodType.prototype.twelve = singlePeriodTypeFactory(12);
//
///**
// *
// * @param {number} value
// * @return {function(this:PeriodType):!Period}
// * @private
// */
//function singlePeriodTypeFactory(value) {
//    return function () {
//        var key = String(value);
//
//        return this[key] || (this[key] = new SinglePeriod(this, value));
//    };
//}