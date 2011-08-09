Date.Field.Minute = function(minute) {
    var self = this;

    this.mills = function(value) {
        if (arguments.length === 0) {
            return self._val * Date.Field.MILLS_PER_MINUTE;
        }

        value = Date.Util.validateInt(value);

        self._val = Date.Util.quotRem(Date.Util.quotRem(value, Date.Field.MILLS_PER_HOUR).rem, Date.Field.MILLS_PER_MINUTE).quot;

        return self;
    };

    this.value = function(minute) {
        if (arguments.length === 0) {
            return self._val;
        }

        self._val = Date.Field.Minute.validate(minute);

        return self;
    };

    if (arguments.length === 1) {
        this.value(minute);
    } else {
        this.mills(new Date().getTime());
    }
};

Date.Field.Minute.MIN_MINUTE = 0;
Date.Field.Minute.MAX_MINUTE = Date.Field.MINUTES_PER_HOUR - 1;

Date.Field.Minute.validate = function(minute) {
    minute = Date.Util.validateInt(minute);

    Date.Util.assertTrue(minute >= Date.Field.Minute.MIN_MINUTE && minute <= Date.Field.Minute.MAX_MINUTE,
            "Minutes are expected to be in range [" + Date.Field.Minute.MIN_MINUTE + ".." + Date.Field.Minute.MAX_MINUTE + "] but was: " + minute);

    return minute;
};
