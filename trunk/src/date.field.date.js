DateTime.Field.Date = function(date, month, year) {
    var self = this;

    this.mills = function(value, month, year) {
        if (arguments.length === 0) {
            return self._val * DateTime.Field.MILLS_PER_DAY;
        }

        value = DateTime.Util.validateInt(value);

        if (arguments === 3) {
            self._month.value(month, year);
        } else {
            self._month.mills(value);
        }

        self._val = Math.floor((value - self._month.mills() - self._month._year.mills()) / DateTime.Field.MILLS_PER_DAY);

        return self;
    };

    this.value = function(date, month, year) {
        switch (arguments.length) {
            case 0 :
                return self._val + 1;
            case 3 :
                self._month.value(month, year);
                break;
            case 2 :
                self._month.value(month);
                break;

        }

        self._val = DateTime.Field.Date.validate(date, self._month.value(), self._month._year.value()) - 1;

        return self;
    };

    switch (arguments.length) {
        case 3 :
            this._month = new DateTime.Field.Month(month, year);
            this.value(date, this._month.value());
            break;
        case 2 :
            this._month = new DateTime.Field.Month(month);
            this.value(date, this._month.value());
            break;
        case 1 :
            this._month = new DateTime.Field.Month();
            this.value(date);
            break;
        case 0 :
            this._month = new DateTime.Field.Month();
            this.mills(DateTime.currentTimeMillis());
            break;
    }
};

DateTime.Field.Date.MIN_DATE = 1;
DateTime.Field.Date.MAX_DATE = 31;

DateTime.Field.Date.validate = function(date, month, year) {
    var max = DateTime.Field.Date.MAX_DATE;

    switch (arguments.length) {
        case 3 :
            max = Math.floor(new DateTime.Field.Month(month, year).duration() / DateTime.Field.MILLS_PER_DAY);
            break;
        case 2 :
            max = Math.floor(new DateTime.Field.Month(month).duration() / DateTime.Field.MILLS_PER_DAY);
            break;
    }

    date = DateTime.Util.validateInt(date);

    DateTime.Util.assertTrue(date >= DateTime.Field.Date.MIN_DATE && date <= max,
            "Date is expected to be in range [" + DateTime.Field.Date.MIN_DATE + ".." + max + "] but was: " + date);

    return date;
};
