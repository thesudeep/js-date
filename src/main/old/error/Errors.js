IllegalFieldValueException = function(type, value, lowerBound, upperBound) {
    this._super("Illegal field (" + type + ") value: " + value + " should be in [" + lowerBound + ".." + upperBound + "]")
};

AbstractMethodException = function() {
    this._super("Unimplemented method exception.")
};

inherits(IllegalFieldValueException, Error);
