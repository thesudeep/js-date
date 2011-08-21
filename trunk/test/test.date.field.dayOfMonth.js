DateTime.Field.DaysOfMonth.Test = {};

DateTime.Field.DaysOfMonth.Test.testSetValue = function() {
    var daysOfMonth = DateTime.Field.DaysOfMonth.Test.createDate(1970).value(1);

    assertEquals(1, daysOfMonth.value());
};

DateTime.Field.DaysOfMonth.Test.testGetMillis_Epoch = function() {
    var daysOfMonth = DateTime.Field.DaysOfMonth.Test.createDate(1970).millis(10120);

    assertEquals(0, daysOfMonth.millis());
};

DateTime.Field.DaysOfMonth.Test.testGetMillis_Millis_First = function() {
    var daysOfMonth = DateTime.Field.DaysOfMonth.Test.createDate(2000, 11).millis(time(2000, 11, 1));

    assertEquals(0, daysOfMonth.millis());
};

DateTime.Field.DaysOfMonth.Test.testGetMillis_Millis_Second = function() {
    var daysOfMonth = DateTime.Field.DaysOfMonth.Test.createDate(2000, 2).millis(time(2000, 2, 2));

    assertEquals(DateTime.MILLIS_PER_DAY, daysOfMonth.millis());
};

DateTime.Field.DaysOfMonth.Test.testGetMillis_Leap = function() {
    var daysOfMonth = DateTime.Field.DaysOfMonth.Test.createDate(2000, 2).value(29);

    assertEquals(28 * DateTime.MILLIS_PER_DAY, daysOfMonth.millis());
};

DateTime.Field.DaysOfMonth.Test.testGetMillis_NotLeap = function() {
    var daysOfMonth = DateTime.Field.DaysOfMonth.Test.createDate(2001, 2).value(28);

    assertEquals(27 * DateTime.MILLIS_PER_DAY, daysOfMonth.millis());
};

DateTime.Field.DaysOfMonth.Test.testSetMillis_plus1_March_Start = function() {
    var daysOfMonth = DateTime.Field.DaysOfMonth.Test.createDate(1, 3).millis(time(1, 3, 1));

    assertEquals(1, daysOfMonth.value());
};

DateTime.Field.DaysOfMonth.Test.testSetMillis_plus1_March_Before = function() {
    var daysOfMonth = DateTime.Field.DaysOfMonth.Test.createDate(1, 2).millis(time(1, 3, 1) - 1);

    assertEquals(28, daysOfMonth.value());
};

DateTime.Field.DaysOfMonth.Test.testSetMillis_minus2001_March_Start = function() {
    var daysOfMonth = DateTime.Field.DaysOfMonth.Test.createDate(-2001, 3).millis(time(-2001, 3, 1));

    assertEquals(1, daysOfMonth.value());
};

DateTime.Field.DaysOfMonth.Test.testSetMillis_minus2001_March_Before = function() {
    var daysOfMonth = DateTime.Field.DaysOfMonth.Test.createDate(-2001, 2).millis(time(-2001, 3, 1) - 1);

    assertEquals(29, daysOfMonth.value());
};

DateTime.Field.DaysOfMonth.Test.testSetMillis_Epoch = function() {
    var daysOfMonth = DateTime.Field.DaysOfMonth.Test.createDate(1970, 1).millis(12312);

    assertEquals(1, daysOfMonth.value());
};

DateTime.Field.DaysOfMonth.Test.testMaxDate_Value_Leap_OK = function() {
    var daysOfMonth = DateTime.Field.DaysOfMonth.Test.createDate(2000, 2).value(29);

    assertEquals(29, daysOfMonth.value());
};

DateTime.Field.DaysOfMonth.Test.testMaxDate_Value_Leap_Fail = function() {
    assertFail(function() {
        DateTime.Field.DaysOfMonth.Test.createDate(2000, 2).value(30);
    });
};

DateTime.Field.DaysOfMonth.Test.testMaxDate_Value_Normal_OK = function() {
    var daysOfMonth = DateTime.Field.DaysOfMonth.Test.createDate(2001, 2).value(28);

    assertEquals(28, daysOfMonth.value());
};

DateTime.Field.DaysOfMonth.Test.testMaxDate_Value_Normal_Fail = function() {
    assertFail(function() {
        DateTime.Field.DaysOfMonth.Test.createDate(2001, 2).value(29);
    });
};

DateTime.Field.DaysOfMonth.Test.testMaxDate_Value_31_OK = function() {
    var daysOfMonth = DateTime.Field.DaysOfMonth.Test.createDate(2001, 12).value(DateTime.Field.DaysOfMonth.MAX_DATE);

    assertEquals(DateTime.Field.DaysOfMonth.MAX_DATE, daysOfMonth.value());
};

DateTime.Field.DaysOfMonth.Test.testMaxDate_Value_31_Fail = function() {
    assertFail(function() {
        DateTime.Field.DaysOfMonth.Test.createDate(2001, 12).value(DateTime.Field.DaysOfMonth.MAX_DATE + 1);
    });
};

DateTime.Field.DaysOfMonth.Test.testMaxDate_Value_30_Fail = function() {
    assertFail(function() {
        DateTime.Field.DaysOfMonth.Test.createDate(2001, 11).value(DateTime.Field.DaysOfMonth.MAX_DATE);
    });
};

DateTime.Field.DaysOfMonth.Test.testMinDate_Value_OK = function() {
    DateTime.Field.DaysOfMonth.Test.createDate(2000, 1).value(DateTime.Field.DaysOfMonth.MIN_DATE);
};

DateTime.Field.DaysOfMonth.Test.testMinDate_Value_Fail = function() {
    assertFail(function() {
        DateTime.Field.DaysOfMonth.Test.createDate(2000, 1).value(DateTime.Field.DaysOfMonth.MIN_DATE - 1);
    });
};

DateTime.Field.DaysOfMonth.Test.testValidate_text = function() {
    assertFail(function() {
        DateTime.Field.DaysOfMonth.validate("a");
    });
};

DateTime.Field.DaysOfMonth.Test.testValidate_long = function() {
    assertFail(function() {
        DateTime.Field.DaysOfMonth.validate("11231237012730198239812398");
    });
};

DateTime.Field.DaysOfMonth.Test.testValidate_hex = function() {
    assertFail(function() {
        DateTime.Field.DaysOfMonth.validate("0x1");
    });
};

DateTime.Field.DaysOfMonth.Test.testValidate_zeroTrail = function() {
    assertEquals(12, DateTime.Field.DaysOfMonth.validate("012"));
};

DateTime.Field.DaysOfMonth.Test.testValidate_negative = function() {
    assertFail(function() {
        DateTime.Field.DaysOfMonth.validate("-1");
    });
};

DateTime.Field.DaysOfMonth.Test.createDate = function(year, month, daysOfMonth) {
    return new DateTime.Field.DaysOfMonth(DateTime.Field.DaysOfMonth.Test.mockCalendar(year, month, daysOfMonth));
};

DateTime.Field.DaysOfMonth.Test.mockCalendar = function(year, month, daysOfMonth) {
    year = DateTime.exists(year, 0);
    month = DateTime.exists(month, 1);
    daysOfMonth = DateTime.exists(daysOfMonth, 1);

    return mock({
        getYear: mock({
            millis: time(year, 1, 1)
        }),
        getMonth: mock({
            millis: time(year, month, 1) - time(year, 1, 1),
            duration: time(year, month + 1, 1) - time(year, month, 1)
        }),
        time: time(year, month, daysOfMonth)
    });
};