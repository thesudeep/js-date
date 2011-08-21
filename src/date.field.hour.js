DateTime.Field.Hour = function(calendar) {
    var self = this;

    this._val = 0;
    this._ms = 0;

    this.duration = function() {
        return DateTime.MILLIS_PER_HOUR;
    };

    this.millis = function(value) {
        if (arguments.length === 0) {
            return self._ms;
        }

        value = DateTime.validateInt(value);

        self._val = DateTime.quotRem(DateTime.quotRem(value, DateTime.MILLIS_PER_DAY).rem, DateTime.MILLIS_PER_HOUR).quot;
        self._ms = self._val * DateTime.MILLIS_PER_HOUR;

        return self;
    };

    this.value = function(hour) {
        if (arguments.length === 0) {
            return self._val;
        }

        if (self._val !== hour) {
            self._val = DateTime.Field.Hour.validate(hour);
            self._ms = self._val * DateTime.MILLIS_PER_HOUR;
        }

        return self;
    };
};

DateTime.Field.Hour.MIN_HOUR = 0;
DateTime.Field.Hour.MAX_HOUR = DateTime.HOURS_PER_DAY - 1;

DateTime.Field.Hour.validate = function(hour) {
    hour = DateTime.validateInt(hour);

    DateTime.assertTrue(hour >= DateTime.Field.Hour.MIN_HOUR && hour <= DateTime.Field.Hour.MAX_HOUR,
            "Hours are expected to be in range [" + DateTime.Field.Hour.MIN_HOUR + ".." + DateTime.Field.Hour.MAX_HOUR + "] but was: " + hour);

    return hour;
};
