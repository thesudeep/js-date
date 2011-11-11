/**
 * General utilities that don't fit elsewhere.
 * <p>
 * FieldUtils is thread-safe and immutable.
 *
 * @author Stephen Colebourne
 * @since 1.0
 */
FieldUtils = function() {
    abstractMethod();
};

    /**
     * Add two values throwing an exception if overflow occurs.
     *
     * @param val1  the first value
     * @param val2  the second value
     * @return the new total
     * @throws ArithmeticException if the value is too big or too small
     */
    /** long */
 FieldUtils.safeAdd = function(val1, val2) {
        var sum = val1 + val2;
        // If there is a sign change, but the two values have the same sign...
        if ((val1 ^ sum) < 0 && (val1 ^ val2) >= 0) {
            throw new ArithmeticException("The calculation caused an overflow: " + val1 + " + " + val2);
        }
        return sum;
    }

    /**
     * Subtracts two values throwing an exception if overflow occurs.
     *
     * @param val1  the first value, to be taken away from
     * @param val2  the second value, the amount to take away
     * @return the new total
     * @throws ArithmeticException if the value is too big or too small
     */
    /** long */
 FieldUtils.safeSubtract = function(val1, val2) {
        var diff = val1 - val2;
        // If there is a sign change, but the two values have different signs...
        if ((val1 ^ diff) < 0 && (val1 ^ val2) < 0) {
            throw new ArithmeticException("The calculation caused an overflow: " + val1 + " - " + val2);
        }
        return diff;
    }

    /**
     * Multiply two values throwing an exception if overflow occurs.
     *
     * @param val1  the first value
     * @param val2  the second value
     * @return the new total
     * @throws ArithmeticException if the value is too big or too small
     */
    /** long */
 FieldUtils.safeMultiply = function( val1,  val2) {
        if (val2 == 1) {
            return val1;
        }
        if (val2 == 0) {
            return 0;
        }

        var total = val1 * val2;

        if (total / val2 != val1) {
            throw new ArithmeticException("The calculation caused an overflow: " + val1 + " * " + val2);
        }

        return total;
    }

    /**
     * Verify that input values are within specified bounds.
     *
     * @param {String} fieldName
     * @param value  the value to check
     * @param lowerBound  the lower bound allowed for value
     * @param upperBound  the upper bound allowed for value
     * @throws IllegalFieldValueException if value is not in the specified bounds
     */
    /** void */
 FieldUtils.verifyValueBounds = function(fieldName, value, lowerBound, upperBound) {
     if ((value < lowerBound) || (value > upperBound)) {
            throw new IllegalFieldValueException(fieldName, value, lowerBound, upperBound);
        }
    }

    /**
     * Utility method that ensures the given value lies within the field's
     * legal value range.
     *
     * @param value  the value to fit into the wrapped value range
     * @param minValue the wrap range minimum value.
     * @param maxValue the wrap range maximum value.  This must be
     *  greater than minValue (checked by the method).
     * @return the wrapped value
     * @throws IllegalArgumentException if minValue is greater
     *  than or equal to maxValue
     */
    /** int */
 FieldUtils.getWrappedValue = function( value,  minValue,  maxValue) {
        if (minValue >= maxValue) {
            throw new IllegalArgumentException("MIN > MAX");
        }

        var wrapRange = maxValue - minValue + 1;
        value -= minValue;

        if (value >= 0) {
            return (value % wrapRange) + minValue;
        }

        var remByRange = (-value) % wrapRange;

        if (remByRange == 0) {
            return 0 + minValue;
        }
        return (wrapRange - remByRange) + minValue;
    }

    /**
     * Compares two objects as equals handling null.
     *
     * @param object1  the first object
     * @param object2  the second object
     * @return true if equal
     * @since 1.4
     */
    /** boolean */
 FieldUtils.equals = function(object1, object2) {
        if (object1 == object2) {
            return true;
        }
        if (object1 == null || object2 == null) {
            return false;
        }
        return object1.equals(object2);
    }
