DateTime.Field.Second = function(second) {
    var self = this;

    this.millis = function(value) {
        if (arguments.length === 0) {
            return self._val * DateTime.MILLS_PER_SECOND;
        }

        value = DateTime.validateInt(value);

        self._val = DateTime.quotRem(DateTime.quotRem(value, DateTime.MILLS_PER_MINUTE).rem, DateTime.MILLS_PER_SECOND).quot;

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
        this.millis(DateTime.currentTimeMillis());
    }
};

DateTime.Field.Second.MIN_SECOND = 0;
DateTime.Field.Second.MAX_SECOND = DateTime.SECONDS_PER_MINUTE - 1;

DateTime.Field.Second.validate = function(second) {
    second = DateTime.validateInt(second);

    DateTime.assertTrue(second >= DateTime.Field.Second.MIN_SECOND && second <= DateTime.Field.Second.MAX_SECOND,
            "Seconds are expected to be in range [" + DateTime.Field.Second.MIN_SECOND + ".." + DateTime.Field.Second.MAX_SECOND + "] but was: " + second);

    return second;
};
