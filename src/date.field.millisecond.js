DateTime.Field.Millisecond = function(calendar) {
    var self = this;

    this._val = 0;

    this.millis = function(value) {
        if (arguments.length === 0) {
            return self._val;
        }

        value = DateTime.validateInt(value);

        if (self._val !== value) {
            self._val = DateTime.quotRem(value, DateTime.MILLS_PER_SECOND).rem;
        }

        return self;
    };

    this.value = function(millisecond) {
        if (arguments.length === 0) {
            return self._val;
        }

        self._val = DateTime.Field.Millisecond.validate(millisecond);

        return self;
    };
};

DateTime.Field.Millisecond.MIN_MILLS = 0;
DateTime.Field.Millisecond.MAX_MILLS = DateTime.MILLS_PER_SECOND - 1;

DateTime.Field.Millisecond.validate = function(millisecond) {
    millisecond = DateTime.validateInt(millisecond);

    DateTime.assertTrue(millisecond >= DateTime.Field.Millisecond.MIN_MILLS && millisecond <= DateTime.Field.Millisecond.MAX_MILLS,
            "Seconds are expected to be in range [" + DateTime.Field.Millisecond.MIN_MILLS + ".." + DateTime.Field.Millisecond.MAX_MILLS + "] but was: " + millisecond);

    return millisecond;
};
