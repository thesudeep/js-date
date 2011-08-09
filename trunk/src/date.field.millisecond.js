Date.Field.Millisecond = function(millisecond) {
    var self = this;

    this.mills = function(value) {
        if (arguments.length === 0) {
            return self._val;
        }

        value = Date.Util.validateInt(value);

        self._val = Date.Util.quotRem(value, Date.Field.MILLS_PER_SECOND).rem;

        return self;
    };

    this.value = function(millisecond) {
        if (arguments.length === 0) {
            return self._val;
        }

        self._val = Date.Field.Millisecond.validate(millisecond);

        return self;
    };

    if (arguments.length === 1) {
        this.value(millisecond);
    } else {
        this.mills(new Date().getTime());
    }
};

Date.Field.Millisecond.MIN_MILLS = 0;
Date.Field.Millisecond.MAX_MILLS = Date.Field.MILLS_PER_SECOND - 1;

Date.Field.Millisecond.validate = function(millisecond) {
    millisecond = Date.Util.validateInt(millisecond);

    Date.Util.assertTrue(millisecond >= Date.Field.Millisecond.MIN_MILLS && millisecond <= Date.Field.Millisecond.MAX_MILLS,
            "Seconds are expected to be in range [" + Date.Field.Millisecond.MIN_MILLS + ".." + Date.Field.Millisecond.MAX_MILLS + "] but was: " + millisecond);

    return millisecond;
};
