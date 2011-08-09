Date.Field.Hour = function(hour) {
    var self = this;

    this.mills = function(value) {
        if (arguments.length === 0) {
            return self._val * Date.Field.MILLS_PER_HOUR;
        }

        value = Date.Util.validateInt(value);

        self._val = Date.Util.quotRem(Date.Util.quotRem(value, Date.Field.MILLS_PER_DAY).rem, Date.Field.MILLS_PER_HOUR).quot;

        return self;
    };

    this.value = function(hour) {
        if (arguments.length === 0) {
            return self._val;
        }

        self._val = Date.Field.Hour.validate(hour);

        return self;
    };

    if (arguments.length === 1) {
        this.value(hour);
    } else {
        this.mills(new Date().getTime());
    }
};

Date.Field.Hour.MIN_HOUR = 0;
Date.Field.Hour.MAX_HOUR = Date.Field.HOURS_PER_DAY - 1;

Date.Field.Hour.validate = function(hour) {
    hour = Date.Util.validateInt(hour);

    Date.Util.assertTrue(hour >= Date.Field.Hour.MIN_HOUR && hour <= Date.Field.Hour.MAX_HOUR,
            "Hours are expected to be in range [" + Date.Field.Hour.MIN_HOUR + ".." + Date.Field.Hour.MAX_HOUR + "] but was: " + hour);

    return hour;
};
