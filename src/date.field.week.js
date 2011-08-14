Date.Field.Week = function(week) {
    var self = this;

    this._val = 0;

    this.mills = function(value, start) {
        if (arguments.length === 0) {
            return self._val * Date.Field.MILLS_PER_WEEK;
        }

        value = Date.Util.validateInt(value);

        if (arguments.length === 1) {
            self._val = Date.Util.quotRem(value, Date.Field.MILLS_PER_WEEK).quot;
        } else {
            self._val = Date.Util.quotRem(value - start, Date.Field.MILLS_PER_WEEK).quot;
        }

        return self;
    };

    this.value = function(week) {
        if (arguments.length === 0) {
            return self._val;
        }

        self._val = Date.Field.Week.validate(week);

        return self;
    };

    if (arguments.length === 1) {
        this.value(week);
    }
};

Date.Field.Week.validate = function(week) {
    week = Date.Util.validateInt(week);

    return week;
};
