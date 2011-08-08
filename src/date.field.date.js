Date.Field.Date = function(date, month, year) {
    var self = this;

    this.mills = function(value, month, year) {
        if (arguments.length === 0) {
            return self._val * Date.Field.MILLS_PER_DAY;
        }

        value = Date.Field.validateInt(value);

        if (arguments === 3) {
            self._month.value(month, year);
        } else {
            self._month.mills(value);
        }

        self._val = Math.floor((value - self._month.mills() - self._month._year.mills()) / Date.Field.MILLS_PER_DAY);

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

        self._val = Date.Field.Date.validate(date, self._month.value(), self._month._year.value()) - 1;

        return self;
    };

    switch (arguments.length) {
        case 3 :
            this._month = new Date.Field.Month(month, year);
            this.value(date, this._month.value());
            break;
        case 2 :
            this._month = new Date.Field.Month(month);
            this.value(date, this._month.value());
            break;
        case 1 :
            this._month = new Date.Field.Month();
            this.value(date);
            break;
        case 0 :
            this._month = new Date.Field.Month();
            this.mills(new Date().getTime());
            break;
    }
};

Date.Field.Date.MIN_DATE = 1;
Date.Field.Date.MAX_DATE = 31;

Date.Field.Date.validate = function(date, month, year) {
    var max = Date.Field.Date.MAX_DATE;

    switch (arguments.length) {
        case 3 :
            max = Math.floor(new Date.Field.Month(month, year).duration() / Date.Field.MILLS_PER_DAY);
            break;
        case 2 :
            max = Math.floor(new Date.Field.Month(month).duration() / Date.Field.MILLS_PER_DAY);
            break;
    }

    date = Date.Field.validateInt(date);

    Date.Field.assertTrue(date >= Date.Field.Date.MIN_DATE && date <= max,
            "Date is expected to be in range [" + Date.Field.Date.MIN_DATE + ".." + max + "] but was: " + date);

    return date;
};
