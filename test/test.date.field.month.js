DateTime.Field.Month.Test = {};

DateTime.Field.Month.Test.testSetValue_Leap_Feb_by_value = function() {
    var month = DateTime.Field.Month.Test.createMonth(2000).value(DateTime.Field.Month.FEBRUARY);

    assertEquals(29 * DateTime.MILLIS_PER_DAY, month.duration());
};

DateTime.Field.Month.Test.testSetValue_Norm_Feb_by_value = function() {
    var month = DateTime.Field.Month.Test.createMonth(2001).value(DateTime.Field.Month.FEBRUARY);

    assertEquals(28 * DateTime.MILLIS_PER_DAY, month.duration());
};

DateTime.Field.Month.Test.testSetValue = function() {
    var month = DateTime.Field.Month.Test.createMonth(1970).value(DateTime.Field.Month.JANUARY);

    assertEquals(DateTime.Field.Month.JANUARY, month.value());
};

DateTime.Field.Month.Test.testSetValue_AdjustDate_Normal = function() {
    var calendar = DateTime.Field.Month.Test.mockCalendar(1970, 1, 31);

    var month = new DateTime.Field.Month(calendar).value(DateTime.Field.Month.FEBRUARY);

    assertEquals(DateTime.Field.Month.FEBRUARY, month.value());
    assertEquals(28, calendar._date);
};

DateTime.Field.Month.Test.testSetValue_AdjustDate_Leap = function() {
    var calendar = DateTime.Field.Month.Test.mockCalendar(2000, 1, 31);

    var month = new DateTime.Field.Month(calendar).value(DateTime.Field.Month.FEBRUARY);

    assertEquals(DateTime.Field.Month.FEBRUARY, month.value());
    assertEquals(29, calendar._date);
};

DateTime.Field.Month.Test.testGetMillis_Epoch = function() {
    var month = DateTime.Field.Month.Test.createMonth(1970).millis(10120);

    assertEquals(0, month.millis());
};

DateTime.Field.Month.Test.testGetMillis_Millis_January = function() {
    var month = DateTime.Field.Month.Test.createMonth(2011).millis(time(2011, DateTime.Field.Month.JANUARY, 1));

    assertEquals(0, month.millis());
};

DateTime.Field.Month.Test.testGetMillis_Millis_May = function() {
    var month = DateTime.Field.Month.Test.createMonth(2011).millis(time(2011, DateTime.Field.Month.AUGUST, 1));

    assertEquals(DateTime.Field.Month.MILLIS_BY_NORMAL_MONTHS[DateTime.Field.Month.AUGUST - 1], month.millis());
};

DateTime.Field.Month.Test.testGetMillis_Normal_March_Start = function() {
    var month = DateTime.Field.Month.Test.createMonth(1970).value(DateTime.Field.Month.MARCH);

    assertEquals(DateTime.Field.Month.MILLIS_BY_NORMAL_MONTHS[DateTime.Field.Month.MARCH - 1], month.millis());
};

DateTime.Field.Month.Test.testGetMillis_Normal_Feb = function() {
    var month = DateTime.Field.Month.Test.createMonth(1970).value(DateTime.Field.Month.FEBRUARY);

    assertEquals(DateTime.Field.Month.MILLIS_BY_NORMAL_MONTHS[DateTime.Field.Month.FEBRUARY - 1], month.millis());
};

DateTime.Field.Month.Test.testGetMillis_Leap_March_Start = function() {
    var month = DateTime.Field.Month.Test.createMonth(2000).value(DateTime.Field.Month.MARCH);

    assertEquals(DateTime.Field.Month.MILLIS_BY_LEAP_MONTHS[DateTime.Field.Month.MARCH - 1], month.millis());
};

DateTime.Field.Month.Test.testGetMillis_Leap_Feb = function() {
    var month = DateTime.Field.Month.Test.createMonth(2000).value(DateTime.Field.Month.FEBRUARY);

    assertEquals(DateTime.Field.Month.MILLIS_BY_LEAP_MONTHS[DateTime.Field.Month.FEBRUARY - 1], month.millis());
};

DateTime.Field.Month.Test.testSetMillis_plus1_March_Start = function() {
    var month = DateTime.Field.Month.Test.createMonth(1).millis(time(1, DateTime.Field.Month.MARCH, 1));

    assertEquals(DateTime.Field.Month.MARCH, month.value());
};

DateTime.Field.Month.Test.testSetMillis_plus1_March_Before = function() {
    var month = DateTime.Field.Month.Test.createMonth(1).millis(time(1, DateTime.Field.Month.MARCH, 1) - 1);

    assertEquals(DateTime.Field.Month.FEBRUARY, month.value());
};

DateTime.Field.Month.Test.testSetMillis_minus2001_March_Start = function() {
    var month = DateTime.Field.Month.Test.createMonth(-2001).millis(time(-2001, DateTime.Field.Month.MARCH, 1));

    assertEquals(DateTime.Field.Month.MARCH, month.value());
};

DateTime.Field.Month.Test.testSetMillis_minus2001_March_Before = function() {
    var month = DateTime.Field.Month.Test.createMonth(-2001).millis(time(-2001, DateTime.Field.Month.MARCH, 1) - 1);

    assertEquals(DateTime.Field.Month.FEBRUARY, month.value());
};

DateTime.Field.Month.Test.testSetMillis_Epoch = function() {
    var month = DateTime.Field.Month.Test.createMonth(1970).millis(12312);

    assertEquals(DateTime.Field.Month.JANUARY, month.value());
};

DateTime.Field.Month.Test.testMaxMonth_Value_OK = function() {
    var month = DateTime.Field.Month.Test.createMonth().value(DateTime.Field.Month.MAX_MONTH);

    assertEquals(DateTime.Field.Month.MAX_MONTH, month.value());
};

DateTime.Field.Month.Test.testMaxMonth_Value_Fail = function() {
    assertFail(function() {
        DateTime.Field.Month.Test.createMonth().value(DateTime.Field.Month.MAX_MONTH + 1);
    });
};

DateTime.Field.Month.Test.testMinMonth_Value_OK = function() {
    var month = DateTime.Field.Month.Test.createMonth(0, DateTime.Field.Month.MIN_MONTH);

    assertEquals(DateTime.Field.Month.MIN_MONTH, month.value());
};

DateTime.Field.Month.Test.testMinMonth_Value_Fail = function() {
    assertFail(function() {
        DateTime.Field.Month.Test.createMonth().value(DateTime.Field.Month.MIN_MONTH - 1);
    });
};

DateTime.Field.Month.Test.testValidate_text = function() {
    assertFail(function() {
        DateTime.Field.Month.validate("a");
    });
};

DateTime.Field.Month.Test.testValidate_long = function() {
    assertFail(function() {
        DateTime.Field.Month.validate("11231237012730198239812398");
    });
};

DateTime.Field.Month.Test.testValidate_hex = function() {
    assertFail(function() {
        DateTime.Field.Month.validate("0x0001001");
    });
};

DateTime.Field.Month.Test.testValidate_zeroTrail = function() {
    assertEquals(12, DateTime.Field.Month.validate("012"));
};

DateTime.Field.Month.Test.testValidate_negative = function() {
    assertFail(function() {
        DateTime.Field.Month.validate("-1");
    });
};

DateTime.Field.Month.Test.createMonth = function(year, month, date) {
    return new DateTime.Field.Month(DateTime.Field.Month.Test.mockCalendar(year, month, date));
};

DateTime.Field.Month.Test.mockCalendar = function(year, month, date) {
    year = DateTime.exists(year, 0);
    month = DateTime.exists(month, 1);

    var y = year < 0 ? year + 1 : year;

    var calendar = mock({
        time: time(year, month, 1),
        year: mock({
            millis: time(year, 1, 1),
            isLeap: ((y & 3) === 0 && (y % 100 !== 0 || y % 400 === 0))
        }),
        date: mock({
            value: date
        })
    });

    if (date !== undefined) {
        calendar._date = date;

        calendar.date().value = (function(cal) {
            return function(val) {
                if (val === undefined) {
                    return cal._date;
                }

                cal._date = val;

                return this;
            };
        })(calendar);
    }

    return calendar;
}