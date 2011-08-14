Date.Field.WeekOfMonth.Test = {};

Date.Field.WeekOfMonth.Test.testCreation = function() {
    var week = new Date.Field.WeekOfMonth(Date.Field.WeekOfMonth.FIRST_WEEK);

    assertEquals(Date.Field.WeekOfMonth.FIRST_WEEK, week.value());
};

Date.Field.WeekOfMonth.Test.testCreation_Empty = function() {
    assertWithTime(time(2011, 8, 30), function () {
        var week = new Date.Field.WeekOfMonth();

        assertEquals(Date.Field.WeekOfMonth.FIFTH_WEEK, week.value());
    });
};

Date.Field.WeekOfMonth.Test.testSetValue = function() {
    var week = new Date.Field.WeekOfMonth().value(Date.Field.WeekOfMonth.FIRST_WEEK);

    assertEquals(Date.Field.WeekOfMonth.FIRST_WEEK, week.value());
};

Date.Field.WeekOfMonth.Test.testGetMills_Epoch = function() {
    var week = new Date.Field.WeekOfMonth().mills(time(2011, 8, 30));

    assertEquals(Date.Field.MILLS_PER_WEEK * 4, week.mills());
};

Date.Field.WeekOfMonth.Test.testGetMills_Mills = function() {
    var week = new Date.Field.WeekOfMonth().mills(time(2011, 9, 5));

    assertEquals(Date.Field.MILLS_PER_DAY * 4, week.mills());
};

Date.Field.WeekOfMonth.Test.testGetMills_Value = function() {
    var week = new Date.Field.WeekOfMonth(1, 10, 2011).value(6);

    assertEquals(Date.Field.MILLS_PER_DAY * 30, week.mills());
};

Date.Field.WeekOfMonth.Test.testGetMills_Last_6 = function() {
    var week = new Date.Field.WeekOfMonth(1, 10, 2011).value(Date.Field.WeekOfMonth.LAST_WEEK);

    assertEquals(Date.Field.MILLS_PER_DAY * 30, week.mills());
};

Date.Field.WeekOfMonth.Test.testGetMills_Last_5 = function() {
    var week = new Date.Field.WeekOfMonth(1, 8, 2011).value(Date.Field.WeekOfMonth.LAST_WEEK);

    assertEquals(Date.Field.MILLS_PER_WEEK * 4, week.mills());
};

Date.Field.WeekOfMonth.Test.testGetMills_Last_4 = function() {
    var week = new Date.Field.WeekOfMonth(1, 2, 2010).value(Date.Field.WeekOfMonth.LAST_WEEK);

    assertEquals(Date.Field.MILLS_PER_WEEK * 3, week.mills());
};

Date.Field.WeekOfMonth.Test.testValidate_text = function() {
    assertFail(function() {
        Date.Field.WeekOfMonth.validate("a");
    });
};

Date.Field.WeekOfMonth.Test.testValidate_long = function() {
    assertFail(function() {
        Date.Field.WeekOfMonth.validate("11231237012730198239812398");
    });
};

Date.Field.WeekOfMonth.Test.testValidate_hex = function() {
    assertFail(function() {
        Date.Field.WeekOfMonth.validate("0x1");
    });
};

Date.Field.WeekOfMonth.Test.testValidate_zeroTrail = function() {
    assertEquals(2, Date.Field.WeekOfMonth.validate("02"));
};

Date.Field.WeekOfMonth.Test.testValidate_negative = function() {
    assertFail(function() {
        assertEquals(-1, Date.Field.WeekOfMonth.validate("-1"));
    });
};
