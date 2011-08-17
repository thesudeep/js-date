DateTime.Field.WeekOfMonth.Test = {};

DateTime.Field.WeekOfMonth.Test.testCreation = function() {
    var week = new DateTime.Field.WeekOfMonth(DateTime.Field.WeekOfMonth.FIRST_WEEK);

    assertEquals(DateTime.Field.WeekOfMonth.FIRST_WEEK, week.value());
};

DateTime.Field.WeekOfMonth.Test.testCreation_Empty = function() {
    assertWithTime(time(2011, 8, 30), function () {
        var week = new DateTime.Field.WeekOfMonth();

        assertEquals(DateTime.Field.WeekOfMonth.FIFTH_WEEK, week.value());
    });
};

DateTime.Field.WeekOfMonth.Test.testSetValue = function() {
    var week = new DateTime.Field.WeekOfMonth().value(DateTime.Field.WeekOfMonth.FIRST_WEEK);

    assertEquals(DateTime.Field.WeekOfMonth.FIRST_WEEK, week.value());
};

DateTime.Field.WeekOfMonth.Test.testGetMills_Epoch = function() {
    var week = new DateTime.Field.WeekOfMonth().millis(time(2011, 8, 30));

    assertEquals(DateTime.MILLS_PER_WEEK * 4, week.millis());
};

DateTime.Field.WeekOfMonth.Test.testGetMills_Mills = function() {
    var week = new DateTime.Field.WeekOfMonth().millis(time(2011, 9, 5));

    assertEquals(DateTime.MILLS_PER_DAY * 4, week.millis());
};

DateTime.Field.WeekOfMonth.Test.testGetMills_Value = function() {
    var week = new DateTime.Field.WeekOfMonth(1, 10, 2011).value(6);

    assertEquals(DateTime.MILLS_PER_DAY * 30, week.millis());
};

DateTime.Field.WeekOfMonth.Test.testGetMills_Last_6 = function() {
    var week = new DateTime.Field.WeekOfMonth(1, 10, 2011).value(DateTime.Field.WeekOfMonth.LAST_WEEK);

    assertEquals(DateTime.MILLS_PER_DAY * 30, week.millis());
};

DateTime.Field.WeekOfMonth.Test.testGetMills_Last_5 = function() {
    var week = new DateTime.Field.WeekOfMonth(1, 8, 2011).value(DateTime.Field.WeekOfMonth.LAST_WEEK);

    assertEquals(DateTime.MILLS_PER_WEEK * 4, week.millis());
};

DateTime.Field.WeekOfMonth.Test.testGetMills_Last_4 = function() {
    var week = new DateTime.Field.WeekOfMonth(1, 2, 2010).value(DateTime.Field.WeekOfMonth.LAST_WEEK);

    assertEquals(DateTime.MILLS_PER_WEEK * 3, week.millis());
};

DateTime.Field.WeekOfMonth.Test.testValidate_text = function() {
    assertFail(function() {
        DateTime.Field.WeekOfMonth.validate("a");
    });
};

DateTime.Field.WeekOfMonth.Test.testValidate_long = function() {
    assertFail(function() {
        DateTime.Field.WeekOfMonth.validate("11231237012730198239812398");
    });
};

DateTime.Field.WeekOfMonth.Test.testValidate_hex = function() {
    assertFail(function() {
        DateTime.Field.WeekOfMonth.validate("0x1");
    });
};

DateTime.Field.WeekOfMonth.Test.testValidate_zeroTrail = function() {
    assertEquals(2, DateTime.Field.WeekOfMonth.validate("02"));
};

DateTime.Field.WeekOfMonth.Test.testValidate_negative = function() {
    assertFail(function() {
        assertEquals(-1, DateTime.Field.WeekOfMonth.validate("-1"));
    });
};
