DateTime.Field.Second = function(calendar) {
    var self = this;

    self._val = 0;
    self._ms = 0;

    this.duration = function() {
        return DateTime.MILLIS_PER_SECOND;
    };

    this.millis = function(value) {
        if (arguments.length === 0) {
            return self._ms;
        }

        value = DateTime.validateInt(value);

        self._val = DateTime.quotRem(DateTime.quotRem(value, DateTime.MILLIS_PER_MINUTE).rem, DateTime.MILLIS_PER_SECOND).quot;
        self._ms = self._val * DateTime.MILLIS_PER_SECOND;

        return self;
    };

    this.value = function(second) {
        if (arguments.length === 0) {
            return self._val;
        }

        if (self._val !== second) {
            self._val = DateTime.Field.Second.validate(second);
            self._ms = self._val * DateTime.MILLIS_PER_SECOND;
        }

        return self;
    };
};

DateTime.Field.Second.MIN_SECOND = 0;
DateTime.Field.Second.MAX_SECOND = DateTime.SECONDS_PER_MINUTE - 1;

DateTime.Field.Second.validate = function(second) {
    second = DateTime.validateInt(second);

    DateTime.assertTrue(second >= DateTime.Field.Second.MIN_SECOND && second <= DateTime.Field.Second.MAX_SECOND,
            "Seconds are expected to be in range [" + DateTime.Field.Second.MIN_SECOND + ".." + DateTime.Field.Second.MAX_SECOND + "] but was: " + second);

    return second;
};
