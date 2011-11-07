/**
 * Controls a period implementation by specifying which duration fields are to be used.
 * <p>
 * The following implementations are provided:
 * <ul>
 * <li>Standard - years, months, weeks, days, hours, minutes, seconds, millis
 * <li>YearMonthDayTime - years, months, days, hours, minutes, seconds, millis
 * <li>YearMonthDay - years, months, days
 * <li>YearWeekDayTime - years, weeks, days, hours, minutes, seconds, millis
 * <li>YearWeekDay - years, weeks, days
 * <li>YearDayTime - years, days, hours, minutes, seconds, millis
 * <li>YearDay - years, days, hours
 * <li>DayTime - days, hours, minutes, seconds, millis
 * <li>Time - hours, minutes, seconds, millis
 * <li>plus one for each single type
 * </ul>
 *
 * <p>
 * PeriodType is thread-safe and immutable, and all subclasses must be as well.
 *
 * @author Brian S O'Neill
 * @author Stephen Colebourne
 * @since 1.0
 */
PeriodType = function(name, durationFieldTypes, indices) {
    this._name = name;
    this._ft = durationFieldTypes;
    this._indicis = indices;
};

/**
 * Gets the name of the period type.
 *
 * @return {String} the name
 */
PeriodType.prototype.getName = function() {
    return this._name;
};

/**
 * Gets the number of fields in the period type.
 *
 * @return {number} the number of fields
 */
PeriodType.prototype.size = function() {
    return this._ft.length;
};

/**
 * Gets the field type by index.
 *
 * @param {number} index  the index to retrieve
 * @return {DurationFieldType} the field type
 */
PeriodType.prototype.getFieldType = function(index) {
    return this._ft[index];
};

/**
 * Checks whether the field specified is supported by this period.
 *
 * @param {DurationFieldType} type  the type to check, may be null which returns false
 * @return {boolean} true if the field is supported
 */
PeriodType.prototype.isSupported = function(type) {
    return this.indexOf(type) >= 0;
};

/**
 * Gets the index of the field in this period.
 *
 * @param {DurationFieldType} type  the type to check, may be null which returns -1
 * @return {number} the index of -1 if not supported
 */
PeriodType.prototype.indexOf = function(type) {
    for (var i = 0, isize = this.size(); i < isize; i++) {
        if (this._ft[i] === type) {
            return i;
        }
    }

    return -1;
};

/**
 * Gets a debugging to string.
 *
 * @return {String} a string
 */
PeriodType.prototype.toString = function() {
    return "PeriodType[" + this.getName() + "]";
};

//-----------------------------------------------------------------------
/**
 * Gets the indexed field part of the period.
 *
 * @param {ReadablePeriod} period  the period to query
 * @param {number} index  the index to use
 * @return the value of the field, zero if unsupported
 */
PeriodType.prototype.getIndexedField = function(period, index) {
    var realIndex = this._ft[index];

    return realIndex == -1 ? 0 : period.getValue(realIndex);
};

/**
 * Sets the indexed field part of the period.
 *
 * @param {ReadablePeriod} period  the period to query
 * @param {number} index  the index to use
 * @param {number[]} values  the array to populate
 * @param {number} newValue  the value to set
 * @return {boolean} true if the array is updated
 * @throws {Error} if not supported
 */
PeriodType.prototype.setIndexedField = function(period, index, values, newValue) {
    var realIndex = this._ft[index];

    if (realIndex == -1) {
        throw new Error("Field is not supported");
    }

    values[realIndex] = newValue;

    return true;
};

/**
 * Adds to the indexed field part of the period.
 *
 * @param {ReadablePeriod} period  the period to query
 * @param {number} index  the index to use
 * @param {number[]} values  the array to populate
 * @param {number} valueToAdd  the value to add
 * @return {boolean} true if the array is updated
 * @throws {Error} if not supported
 */
PeriodType.prototype.addIndexedField = function(period, index, values, valueToAdd) {
    if (valueToAdd == 0) {
        return false;
    }
    var realIndex = this._ft[index];

    if (realIndex == -1) {
        throw new Error("Field is not supported");
    }

    values[realIndex] = FieldUtils.safeAdd(values[realIndex], valueToAdd);

    return true;
};

/**
 * Returns a version of this PeriodType instance that does not support years.
 *
 * @return {PeriodType} a new period type that supports the original set of fields except years
 */
PeriodType.prototype.withYearsRemoved = function() {
    return this._withFieldRemoved(0, "NoYears");
};

/**
 * Returns a version of this PeriodType instance that does not support months.
 *
 * @return {PeriodType} a new period type that supports the original set of fields except months
 */
PeriodType.prototype.withMonthsRemoved = function() {
    return this._withFieldRemoved(1, "NoMonths");
};

/**
 * Returns a version of this PeriodType instance that does not support weeks.
 *
 * @return {PeriodType} a new period type that supports the original set of fields except weeks
 */
PeriodType.prototype.withWeeksRemoved = function() {
    return this._withFieldRemoved(2, "NoWeeks");
};

/**
 * Returns a version of this PeriodType instance that does not support days.
 *
 * @return {PeriodType} a new period type that supports the original set of fields except days
 */
PeriodType.prototype.withDaysRemoved = function() {
    return this._withFieldRemoved(3, "NoDays");
};

/**
 * Returns a version of this PeriodType instance that does not support hours.
 *
 * @return {PeriodType} a new period type that supports the original set of fields except hours
 */
PeriodType.prototype.withHoursRemoved = function() {
    return this._withFieldRemoved(4, "NoHours");
};

/**
 * Returns a version of this PeriodType instance that does not support minutes.
 *
 * @return {PeriodType} a new period type that supports the original set of fields except minutes
 */
PeriodType.prototype.withMinutesRemoved = function() {
    return this._withFieldRemoved(5, "NoMinutes");
};

/**
 * Returns a version of this PeriodType instance that does not support seconds.
 *
 * @return {PeriodType} a new period type that supports the original set of fields except seconds
 */
PeriodType.prototype.withSecondsRemoved = function() {
    return this._withFieldRemoved(6, "NoSeconds");
};

/**
 * Returns a version of this PeriodType instance that does not support milliseconds.
 *
 * @return {PeriodType} a new period type that supports the original set of fields except milliseconds
 */
PeriodType.prototype.withMillisRemoved = function() {
    return this._withFieldRemoved(7, "NoMillis");
};

/**
 * Removes the field specified by indices index.
 *
 * @param {number} indicesIndex  the index to remove
 * @param {String} name  the name addition
 * @return {PeriodType} the new type
 */
PeriodType.prototype._withFieldRemoved = function(indicesIndex, name) {
    var i, fieldIndex = this._ft[indicesIndex];

    if (fieldIndex == -1) {
        return this;
    }

    var types = [];
    var indices = [];

    for (i = 0; i < this._ft.length; i++) {
        if (i < fieldIndex) {
            types[i] = this._ft[i];
        } else if (i > fieldIndex) {
            types[i - 1] = this._ft[i];
        }
    }

    for (i = 0; i < indices.length; i++) {
        var id = this._indicis[i];

        if (i < indicesIndex) {
            indices[i] = id;
        } else if (i > indicesIndex && id !== -1) {
            indices[i] = id - 1;
        } else {
            indices[i] = -1;
        }
    }

    return new PeriodType(this.getName() + name, types, indices);
};

//-----------------------------------------------------------------------
/**
 * Compares this type to another object.
 * To be equal, the object must be a PeriodType with the same set of fields.
 *
 * @param {PeriodType} obj  the object to compare to
 * @return {boolean} true if equal
 */
PeriodType.prototype.equals = function(obj) {
    if (this == obj) {
        return true;
    }

    if (!(obj instanceof PeriodType)) {
        return false;
    }

    return this._ft == obj._ft;
};

PeriodType._cache = {};

PeriodType._YEAR_INDEX = 0;
PeriodType._MONTH_INDEX = 1;
PeriodType._WEEK_INDEX = 2;
PeriodType._DAY_INDEX = 3;
PeriodType._HOUR_INDEX = 4;
PeriodType._MINUTE_INDEX = 5;
PeriodType._SECOND_INDEX = 6;
PeriodType._MILLI_INDEX = 7;

/**
 * Gets a type that defines all standard fields.
 * <ul>
 * <li>years
 * <li>months
 * <li>weeks
 * <li>days
 * <li>hours
 * <li>minutes
 * <li>seconds
 * <li>milliseconds
 * </ul>
 *
 * @return {PeriodType} the period type
 */
PeriodType.standard = function() {
    var type = PeriodType._cache.standard;

    if (isUndefined(type)) {
        var a = DurationFieldType;

        type = new PeriodType(
                "Standard",
                [a.years(), a.months(), a.weeks(), a.days(), a.hours(), a.minutes(), a.seconds(), a.millis()],
                [0, 1, 2, 3, 4, 5, 6, 7]
        );

        PeriodType._cache.standard = type;
    }

    return type;
};

/**
 * Gets a type that defines all standard fields except weeks.
 * <ul>
 * <li>years
 * <li>months
 * <li>days
 * <li>hours
 * <li>minutes
 * <li>seconds
 * <li>milliseconds
 * </ul>
 *
 * @return {PeriodType} the period type
 */
PeriodType.yearMonthDayTime = function() {
    var type = PeriodType._cache.ymdTime;

    if (isUndefined(type)) {
        var a = DurationFieldType;

        type = new PeriodType(
                "YearMonthDayTime",
                [a.years(), a.months(), a.days(), a.hours(), a.minutes(), a.seconds(), a.millis()],
                [0, 1, -1, 2, 3, 4, 5, 6]
        );

        PeriodType._cache.ymdTime = type;
    }

    return type;
};

/**
 * Gets a type that defines the year, month and day fields.
 * <ul>
 * <li>years
 * <li>months
 * <li>days
 * </ul>
 *
 * @return {PeriodType} the period type
 * @since 1.1
 */
PeriodType.yearMonthDay = function() {
    var type = PeriodType._cache.ymd;

    if (type == null) {
        type = new PeriodType(
                "YearMonthDay",
                [DurationFieldType.years(), DurationFieldType.months(), DurationFieldType.days()],
                [0, 1, -1, 2, -1, -1, -1, -1]
        );

        PeriodType._cache.ymd = type;
    }
    return type;
};

/**
 * Gets a type that defines all standard fields except months.
 * <ul>
 * <li>years
 * <li>weeks
 * <li>days
 * <li>hours
 * <li>minutes
 * <li>seconds
 * <li>milliseconds
 * </ul>
 *
 * @return {PeriodType} the period type
 */
PeriodType.yearWeekDayTime = function() {
    var type = PeriodType._cache.ywdTime;

    if (type == null) {
        var a = DurationFieldType;

        type = new PeriodType(
                "YearWeekDayTime",
                [a.years(), a.weeks(), a.days(), a.hours(), a.minutes(), a.seconds(), a.millis()],
                [0, -1, 1, 2, 3, 4, 5, 6]
        );

        PeriodType._cache.ywdTime = type;
    }
    return type;
};

/**
 * Gets a type that defines year, week and day fields.
 * <ul>
 * <li>years
 * <li>weeks
 * <li>days
 * </ul>
 *
 * @return {PeriodType} the period type
 * @since 1.1
 */
PeriodType.yearWeekDay = function() {
    var type = PeriodType._cache.ywd;

    if (type == null) {
        type = new PeriodType(
                "YearWeekDay",
                [DurationFieldType.years(), DurationFieldType.weeks(), DurationFieldType.days()],
                [0, -1, 1, 2, -1, -1, -1, -1]
        );

        PeriodType._cache.ywd = type;
    }
    return type;
};

/**
 * Gets a type that defines all standard fields except months and weeks.
 * <ul>
 * <li>years
 * <li>days
 * <li>hours
 * <li>minutes
 * <li>seconds
 * <li>milliseconds
 * </ul>
 *
 * @return {PeriodType} the period type
 */
PeriodType.yearDayTime = function() {
    var type = PeriodType._cache.ydTime;
    if (type == null) {
        var a = DurationFieldType;

        type = new PeriodType(
                "YearDayTime",
                [a.years(), a.days(), a.hours(), a.minutes(), a.seconds(), a.millis()],
                [0, -1, -1, 1, 2, 3, 4, 5]
        );
        PeriodType._cache.ydTime = type;
    }
    return type;
};

/**
 * Gets a type that defines the year and day fields.
 * <ul>
 * <li>years
 * <li>days
 * </ul>
 *
 * @return {PeriodType} the period type
 * @since 1.1
 */
PeriodType.yearDay = function() {
    var type = PeriodType._cache.yd;
    if (type == null) {
        type = new PeriodType(
                "YearDay",
                [DurationFieldType.years(), DurationFieldType.days()],
                [0, -1, -1, 1, -1, -1, -1, -1]
        );
        PeriodType._cache.yd = type;
    }
    return type;
};

/**
 * Gets a type that defines all standard fields from days downwards.
 * <ul>
 * <li>days
 * <li>hours
 * <li>minutes
 * <li>seconds
 * <li>milliseconds
 * </ul>
 *
 * @return {PeriodType} the period type
 */
PeriodType.dayTime = function() {
    var type = PeriodType._cache.dTime;

    if (type == null) {
        var a = DurationFieldType;

        type = new PeriodType(
                "DayTime",
                [a.days(), a.hours(), a.minutes(), a.seconds(), a.millis()],
                [-1, -1, -1, 0, 1, 2, 3, 4]
        );
        PeriodType._cache.dTime = type;
    }

    return type;
};

/**
 * Gets a type that defines all standard time fields.
 * <ul>
 * <li>hours
 * <li>minutes
 * <li>seconds
 * <li>milliseconds
 * </ul>
 *
 * @return {PeriodType} the period type
 */
PeriodType.time = function() {
    var type = PeriodType._cache.time;

    if (type == null) {
        var a = DurationFieldType;

        type = new PeriodType(
                "Time",
                [a.hours(), a.minutes(), a.seconds(), a.millis()],
                [-1, -1, -1, -1, 0, 1, 2, 3]
        );
        PeriodType._cache.time = type;
    }
    return type;
};

/**
 * Gets a type that defines just the years field.
 *
 * @return {PeriodType} the period type
 */
PeriodType.years = function() {
    var type = PeriodType._cache.years;

    if (type == null) {
        type = new PeriodType(
                "Years",
                [DurationFieldType.years()],
                [0, -1, -1, -1, -1, -1, -1, -1]
        );

        PeriodType._cache.years = type;
    }

    return type;
};

/**
 * Gets a type that defines just the months field.
 *
 * @return {PeriodType} the period type
 */
PeriodType.months = function() {
    var type = PeriodType._cache.months;

    if (type == null) {
        type = new PeriodType(
                "Months",
                [DurationFieldType.months()],
                [-1, 0, -1, -1, -1, -1, -1, -1]
        );

        PeriodType._cache.months = type;
    }

    return type;
};

/**
 * Gets a type that defines just the weeks field.
 *
 * @return {PeriodType} the period type
 */
PeriodType.weeks = function() {
    var type = PeriodType._cache.weeks;

    if (type == null) {
        type = new PeriodType(
                "Weeks",
                [DurationFieldType.weeks()],
                [-1, -1, 0, -1, -1, -1, -1, -1]
        );

        PeriodType._cache.weeks = type;
    }

    return type;
};

/**
 * Gets a type that defines just the days field.
 *
 * @return {PeriodType} the period type
 */
PeriodType.days = function() {
    var type = PeriodType._cache.days;

    if (type == null) {
        type = new PeriodType(
                "Days",
                [DurationFieldType.days()],
                [-1, -1, -1, 0, -1, -1, -1, -1]
        );

        PeriodType._cache.days = type;
    }

    return type;
};

/**
 * Gets a type that defines just the hours field.
 *
 * @return {PeriodType} the period type
 */
PeriodType.hours = function() {
    var type = PeriodType._cache.hours;

    if (type == null) {
        type = new PeriodType(
                "Hours",
                [DurationFieldType.hours()],
                [-1, -1, -1, -1, 0, -1, -1, -1]
        );

        PeriodType._cache.hours = type;
    }

    return type;
};

/**
 * Gets a type that defines just the minutes field.
 *
 * @return {PeriodType} the period type
 */
PeriodType.minutes = function() {
    var type = PeriodType._cache.minutes;

    if (type == null) {
        type = new PeriodType(
                "Minutes",
                [DurationFieldType.minutes()],
                [-1, -1, -1, -1, -1, 0, -1, -1]
        );

        PeriodType._cache.minutes = type;
    }

    return type;
};

/**
 * Gets a type that defines just the seconds field.
 *
 * @return {PeriodType} the period type
 */
PeriodType.seconds = function() {
    var type = PeriodType._cache.seconds;

    if (type == null) {
        type = new PeriodType(
                "Seconds",
                [DurationFieldType.seconds()],
                [-1, -1, -1, -1, -1, -1, 0, -1]
        );

        PeriodType._cache.seconds = type;
    }

    return type;
};

/**
 * Gets a type that defines just the millis field.
 *
 * @return {PeriodType} the period type
 */
PeriodType.millis = function() {
    var type = PeriodType._cache.millis;
    if (type == null) {
        type = new PeriodType(
                "Millis",
                [DurationFieldType.millis()],
                [-1, -1, -1, -1, -1, -1, -1, 0]
        );

        PeriodType._cache.millis = type;
    }

    return type;
};

