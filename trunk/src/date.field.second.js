DateTime.Field.Second = function(second) {
    var self = this;

    this.mills = function(value) {
        if (arguments.length === 0) {
            return self._val * DateTime.Field.MILLS_PER_SECOND;
        }

        value = DateTime.Util.validateInt(value);

        self._val = DateTime.Util.quotRem(DateTime.Util.quotRem(value, DateTime.Field.MILLS_PER_MINUTE).rem, DateTime.Field.MILLS_PER_SECOND).quot;

        return self;
    };

    this.value = function(second) {
        if (arguments.length === 0) {
            return self._val;
        }

        self._val = DateTime.Field.Second.validate(second);

        return self;
    };

    if (arguments.length === 1) {
        this.value(second);
    } else {
        this.mills(DateTime.currentTimeMillis());
    }
};

DateTime.Field.Second.MIN_SECOND = 0;
DateTime.Field.Second.MAX_SECOND = DateTime.Field.SECONDS_PER_MINUTE - 1;

DateTime.Field.Second.validate = function(second) {
    second = DateTime.Util.validateInt(second);

    DateTime.Util.assertTrue(second >= DateTime.Field.Second.MIN_SECOND && second <= DateTime.Field.Second.MAX_SECOND,
            "Seconds are expected to be in range [" + DateTime.Field.Second.MIN_SECOND + ".." + DateTime.Field.Second.MAX_SECOND + "] but was: " + second);

    return second;
};
