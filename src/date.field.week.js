DateTime.Field.Week = function(week) {
    var self = this;

    this._val = 0;

    this.mills = function(value, start) {
        if (arguments.length === 0) {
            return self._val * DateTime.Field.MILLS_PER_WEEK;
        }

        value = DateTime.Util.validateInt(value);

        if (arguments.length === 1) {
            self._val = DateTime.Util.quotRem(value, DateTime.Field.MILLS_PER_WEEK).quot;
        } else {
            self._val = DateTime.Util.quotRem(value - start, DateTime.Field.MILLS_PER_WEEK).quot;
        }

        return self;
    };

    this.value = function(week) {
        if (arguments.length === 0) {
            return self._val;
        }

        self._val = DateTime.Field.Week.validate(week);

        return self;
    };

    if (arguments.length === 1) {
        this.value(week);
    }
};

DateTime.Field.Week.validate = function(week) {
    week = DateTime.Util.validateInt(week);

    return week;
};
