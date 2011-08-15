DateTime.Field.Minute = function(minute) {
    var self = this;

    this.mills = function(value) {
        if (arguments.length === 0) {
            return self._val * DateTime.Field.MILLS_PER_MINUTE;
        }

        value = DateTime.Util.validateInt(value);

        self._val = DateTime.Util.quotRem(DateTime.Util.quotRem(value, DateTime.Field.MILLS_PER_HOUR).rem, DateTime.Field.MILLS_PER_MINUTE).quot;

        return self;
    };

    this.value = function(minute) {
        if (arguments.length === 0) {
            return self._val;
        }

        self._val = DateTime.Field.Minute.validate(minute);

        return self;
    };

    if (arguments.length === 1) {
        this.value(minute);
    } else {
        this.mills(DateTime.currentTimeMillis());
    }
};

DateTime.Field.Minute.MIN_MINUTE = 0;
DateTime.Field.Minute.MAX_MINUTE = DateTime.Field.MINUTES_PER_HOUR - 1;

DateTime.Field.Minute.validate = function(minute) {
    minute = DateTime.Util.validateInt(minute);

    DateTime.Util.assertTrue(minute >= DateTime.Field.Minute.MIN_MINUTE && minute <= DateTime.Field.Minute.MAX_MINUTE,
            "Minutes are expected to be in range [" + DateTime.Field.Minute.MIN_MINUTE + ".." + DateTime.Field.Minute.MAX_MINUTE + "] but was: " + minute);

    return minute;
};
