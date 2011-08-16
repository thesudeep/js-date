DateTime.Field.Hour = function(hour) {
    var self = this;

    this.mills = function(value) {
        if (arguments.length === 0) {
            return self._val * DateTime.Field.MILLS_PER_HOUR;
        }

        value = DateTime.validateInt(value);

        self._val = DateTime.quotRem(DateTime.quotRem(value, DateTime.Field.MILLS_PER_DAY).rem, DateTime.Field.MILLS_PER_HOUR).quot;

        return self;
    };

    this.value = function(hour) {
        if (arguments.length === 0) {
            return self._val;
        }

        self._val = DateTime.Field.Hour.validate(hour);

        return self;
    };

    if (arguments.length === 1) {
        this.value(hour);
    } else {
        this.mills(DateTime.currentTimeMillis());
    }
};

DateTime.Field.Hour.MIN_HOUR = 0;
DateTime.Field.Hour.MAX_HOUR = DateTime.Field.HOURS_PER_DAY - 1;

DateTime.Field.Hour.validate = function(hour) {
    hour = DateTime.validateInt(hour);

    DateTime.assertTrue(hour >= DateTime.Field.Hour.MIN_HOUR && hour <= DateTime.Field.Hour.MAX_HOUR,
            "Hours are expected to be in range [" + DateTime.Field.Hour.MIN_HOUR + ".." + DateTime.Field.Hour.MAX_HOUR + "] but was: " + hour);

    return hour;
};
