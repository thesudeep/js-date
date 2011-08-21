DateTime.Field.Date.Test = {};

DateTime.Field.Date.Test.testSetValue = function() {
    var date = DateTime.Field.Date.Test.createDate(1970).value(1);

    assertEquals(1, date.value());
};

DateTime.Field.Date.Test.testGetMills_Epoch = function() {
    var date = DateTime.Field.Date.Test.createDate(1970).millis(10120);

    assertEquals(0, date.millis());
};

DateTime.Field.Date.Test.testGetMills_Mills_First = function() {
    var date = DateTime.Field.Date.Test.createDate(2000, 11).millis(time(2000, 11, 1));

    assertEquals(0, date.millis());
};

DateTime.Field.Date.Test.testGetMills_Mills_Second = function() {
    var date = DateTime.Field.Date.Test.createDate(2000, 2).millis(time(2000, 2, 2));

    assertEquals(DateTime.MILLS_PER_DAY, date.millis());
};

DateTime.Field.Date.Test.testGetMills_Leap = function() {
    var date = DateTime.Field.Date.Test.createDate(2000, 2).value(29);

    assertEquals(28 * DateTime.MILLS_PER_DAY, date.millis());
};

DateTime.Field.Date.Test.testGetMills_NotLeap = function() {
    var date = DateTime.Field.Date.Test.createDate(2001, 2).value(28);

    assertEquals(27 * DateTime.MILLS_PER_DAY, date.millis());
};

DateTime.Field.Date.Test.testSetMills_plus1_March_Start = function() {
    var date = DateTime.Field.Date.Test.createDate(1, 3).millis(time(1, 3, 1));

    assertEquals(1, date.value());
};

DateTime.Field.Date.Test.testSetMills_plus1_March_Before = function() {
    var date = DateTime.Field.Date.Test.createDate(1, 2).millis(time(1, 3, 1) - 1);

    assertEquals(28, date.value());
};

DateTime.Field.Date.Test.testSetMills_minus2001_March_Start = function() {
    var date = DateTime.Field.Date.Test.createDate(-2001, 3).millis(time(-2001, 3, 1));

    assertEquals(1, date.value());
};

DateTime.Field.Date.Test.testSetMills_minus2001_March_Before = function() {
    var date = DateTime.Field.Date.Test.createDate(-2001, 2).millis(time(-2001, 3, 1) - 1);

    assertEquals(29, date.value());
};

DateTime.Field.Date.Test.testSetMills_Epoch = function() {
    var date = DateTime.Field.Date.Test.createDate(1970, 1).millis(12312);

    assertEquals(1, date.value());
};

DateTime.Field.Date.Test.testMaxDate_Value_Leap_OK = function() {
    var date = DateTime.Field.Date.Test.createDate(2000, 2).value(29);

    assertEquals(29, date.value());
};

DateTime.Field.Date.Test.testMaxDate_Value_Leap_Fail = function() {
    assertFail(function() {
        DateTime.Field.Date.Test.createDate(2000, 2).value(30);
    });
};

DateTime.Field.Date.Test.testMaxDate_Value_Normal_OK = function() {
    var date = DateTime.Field.Date.Test.createDate(2001, 2).value(28);

    assertEquals(28, date.value());
};

DateTime.Field.Date.Test.testMaxDate_Value_Normal_Fail = function() {
    assertFail(function() {
        DateTime.Field.Date.Test.createDate(2001, 2).value(29);
    });
};

DateTime.Field.Date.Test.testMaxDate_Value_31_OK = function() {
    var date = DateTime.Field.Date.Test.createDate(2001, 12).value(DateTime.Field.Date.MAX_DATE);

    assertEquals(DateTime.Field.Date.MAX_DATE, date.value());
};

DateTime.Field.Date.Test.testMaxDate_Value_31_Fail = function() {
    assertFail(function() {
        DateTime.Field.Date.Test.createDate(2001, 12).value(DateTime.Field.Date.MAX_DATE + 1);
    });
};

DateTime.Field.Date.Test.testMaxDate_Value_30_Fail = function() {
    assertFail(function() {
        DateTime.Field.Date.Test.createDate(2001, 11).value(DateTime.Field.Date.MAX_DATE);
    });
};

DateTime.Field.Date.Test.testMinDate_Value_OK = function() {
    DateTime.Field.Date.Test.createDate(2000, 1).value(DateTime.Field.Date.MIN_DATE);
};

DateTime.Field.Date.Test.testMinDate_Value_Fail = function() {
    assertFail(function() {
        DateTime.Field.Date.Test.createDate(2000, 1).value(DateTime.Field.Date.MIN_DATE - 1);
    });
};

DateTime.Field.Date.Test.testValidate_text = function() {
    assertFail(function() {
        DateTime.Field.Date.validate("a");
    });
};

DateTime.Field.Date.Test.testValidate_long = function() {
    assertFail(function() {
        DateTime.Field.Date.validate("11231237012730198239812398");
    });
};

DateTime.Field.Date.Test.testValidate_hex = function() {
    assertFail(function() {
        DateTime.Field.Date.validate("0x1");
    });
};

DateTime.Field.Date.Test.testValidate_zeroTrail = function() {
    assertEquals(12, DateTime.Field.Date.validate("012"));
};

DateTime.Field.Date.Test.testValidate_negative = function() {
    assertFail(function() {
        DateTime.Field.Date.validate("-1");
    });
};

DateTime.Field.Date.Test.createDate = function(year, month, date) {
    return new DateTime.Field.Date(DateTime.Field.Date.Test.mockCalendar(year, month, date));
};

DateTime.Field.Date.Test.mockCalendar = function(year, month, date) {
    year = DateTime.exists(year, 0);
    month = DateTime.exists(month, 1);
    date = DateTime.exists(date, 1);

    return mock({
        year: mock({
            millis: time(year, 1, 1)
        }),
        month: mock({
            millis: time(year, month, 1) - time(year, 1, 1),
            duration: time(year, month + 1, 1) - time(year, month, 1)
        }),
        time: time(year, month, date)
    });
};