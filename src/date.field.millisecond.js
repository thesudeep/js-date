DateTime.Field.Millisecond = function(millisecond) {
    var self = this;

    this.mills = function(value) {
        if (arguments.length === 0) {
            return self._val;
        }

        value = DateTime.Util.validateInt(value);

        self._val = DateTime.Util.quotRem(value, DateTime.Field.MILLS_PER_SECOND).rem;

        return self;
    };

    this.value = function(millisecond) {
        if (arguments.length === 0) {
            return self._val;
        }

        self._val = DateTime.Field.Millisecond.validate(millisecond);

        return self;
    };

    if (arguments.length === 1) {
        this.value(millisecond);
    } else {
        this.mills(DateTime.currentTimeMillis());
    }
};

DateTime.Field.Millisecond.MIN_MILLS = 0;
DateTime.Field.Millisecond.MAX_MILLS = DateTime.Field.MILLS_PER_SECOND - 1;

DateTime.Field.Millisecond.validate = function(millisecond) {
    millisecond = DateTime.Util.validateInt(millisecond);

    DateTime.Util.assertTrue(millisecond >= DateTime.Field.Millisecond.MIN_MILLS && millisecond <= DateTime.Field.Millisecond.MAX_MILLS,
            "Seconds are expected to be in range [" + DateTime.Field.Millisecond.MIN_MILLS + ".." + DateTime.Field.Millisecond.MAX_MILLS + "] but was: " + millisecond);

    return millisecond;
};
