Date.Field.Second = function(second) {
    var self = this;

    this.mills = function(value) {
        if (arguments.length === 0) {
            return self._val * Date.Field.MILLS_PER_SECOND;
        }

        value = Date.Util.validateInt(value);

        self._val = Date.Util.quotRem(Date.Util.quotRem(value, Date.Field.MILLS_PER_MINUTE).rem, Date.Field.MILLS_PER_SECOND).quot;

        return self;
    };

    this.value = function(second) {
        if (arguments.length === 0) {
            return self._val;
        }

        self._val = Date.Field.Second.validate(second);

        return self;
    };

    if (arguments.length === 1) {
        this.value(second);
    } else {
        this.mills(new Date().getTime());
    }
};

Date.Field.Second.MIN_SECOND = 0;
Date.Field.Second.MAX_SECOND = Date.Field.SECONDS_PER_MINUTE - 1;

Date.Field.Second.validate = function(second) {
    second = Date.Util.validateInt(second);

    Date.Util.assertTrue(second >= Date.Field.Second.MIN_SECOND && second <= Date.Field.Second.MAX_SECOND,
            "Seconds are expected to be in range [" + Date.Field.Second.MIN_SECOND + ".." + Date.Field.Second.MAX_SECOND + "] but was: " + second);

    return second;
};
