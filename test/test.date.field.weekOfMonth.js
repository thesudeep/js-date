DateTime.Field.WeekOfMonth.Test = {};

DateTime.Field.WeekOfMonth.Test.testSetValue = function() {
    var week = DateTime.Field.WeekOfMonth.Test.createWoM().value(DateTime.Field.WeekOfMonth.FIRST_WEEK);

    assertEquals(DateTime.Field.WeekOfMonth.FIRST_WEEK, week.value());
};

DateTime.Field.WeekOfMonth.Test.testGetMillis_Mon_Second = function() {
    var week = DateTime.Field.WeekOfMonth.Test.createWoM().millis(time(2000, 1, 3));

    assertEquals(2 * DateTime.MILLIS_PER_DAY, week.millis());
};

DateTime.Field.WeekOfMonth.Test.testGetMillis_Sun_Second = function() {
    var week = DateTime.Field.WeekOfMonth.Test.createWoM(DateTime.Field.Day.SUNDAY).millis(time(2000, 1, 2));

    assertEquals(DateTime.MILLIS_PER_DAY, week.millis());
};

DateTime.Field.WeekOfMonth.Test.testGetMillis_Thu_Second = function() {
    var week = DateTime.Field.WeekOfMonth.Test.createWoM(DateTime.Field.Day.THURSDAY).millis(time(2000, 1, 6));

    assertEquals(5 * DateTime.MILLIS_PER_DAY, week.millis());
};

DateTime.Field.WeekOfMonth.Test.testGetMillis_Mon_Six = function() {
    var week = DateTime.Field.WeekOfMonth.Test.createWoM().millis(time(2000, 1, 31));

    assertEquals(2 * DateTime.MILLIS_PER_DAY + 4 * DateTime.MILLIS_PER_WEEK, week.millis());
};

DateTime.Field.WeekOfMonth.Test.testGetMillis_value_Mon_6_Weeks = function() {
    var week = DateTime.Field.WeekOfMonth.Test.createWoM(DateTime.Field.Day.MONDAY, 2012, 4, 1).value(6);

    assertEquals(2 * DateTime.MILLIS_PER_DAY + 4 * DateTime.MILLIS_PER_WEEK, week.millis());
};

DateTime.Field.WeekOfMonth.Test.testGetMillis_value_Mon_6_Weeks = function() {
    assertFail(function() {
        DateTime.Field.WeekOfMonth.Test.createWoM(DateTime.Field.Day.MONDAY, 2000, 4, 1).value(6);
    });
};

DateTime.Field.WeekOfMonth.Test.testGetMillis_value_Sun_6_Weeks = function() {
    var week = DateTime.Field.WeekOfMonth.Test.createWoM(DateTime.Field.Day.SUNDAY, 2000, 4, 1).value(6);

    assertEquals(2 * DateTime.MILLIS_PER_DAY + 4 * DateTime.MILLIS_PER_WEEK, week.millis());
};

DateTime.Field.WeekOfMonth.Test.testGetMillis_value_Sun_6_Weeks = function() {
    assertFail(function() {
        DateTime.Field.WeekOfMonth.Test.createWoM(DateTime.Field.Day.SUNDAY, 2012, 4, 1).value(6);
    });
};

DateTime.Field.WeekOfMonth.Test.testGetMillis_value_Mon_Last_Weeks = function() {
    var week = DateTime.Field.WeekOfMonth.Test.createWoM(DateTime.Field.Day.MONDAY, 2000, 1, 1).value(DateTime.Field.WeekOfMonth.LAST_WEEK);

    assertEquals(2 * DateTime.MILLIS_PER_DAY + 4 * DateTime.MILLIS_PER_WEEK, week.millis());
};

DateTime.Field.WeekOfMonth.Test.testGetValue_value_Last_Weeks = function() {
    var week = DateTime.Field.WeekOfMonth.Test.createWoM(DateTime.Field.Day.MONDAY, 2000, 2, 1).value(DateTime.Field.WeekOfMonth.LAST_WEEK);

    assertEquals(DateTime.Field.WeekOfMonth.FIFTH_WEEK, week.value());
};

DateTime.Field.WeekOfMonth.Test.testValidate_text = function() {
    assertFail(function() {
        DateTime.Field.WeekOfMonth.Test.createWoM().value("a");
    });
};

DateTime.Field.WeekOfMonth.Test.testValidate_long = function() {
    assertFail(function() {
        DateTime.Field.WeekOfMonth.Test.createWoM().value("11231237012730198239812398");
    });
};

DateTime.Field.WeekOfMonth.Test.testValidate_hex = function() {
    assertFail(function() {
        DateTime.Field.WeekOfMonth.Test.createWoM().value("0x1");
    });
};

DateTime.Field.WeekOfMonth.Test.testValidate_zeroTrail = function() {
    assertEquals(2, DateTime.Field.WeekOfMonth.Test.createWoM().value("02").value());
};

DateTime.Field.WeekOfMonth.Test.testValidate_negative = function() {
    assertFail(function() {
        DateTime.Field.WeekOfMonth.Test.createWoM().value("-1");
    });
};

DateTime.Field.WeekOfMonth.Test.createWoM = function(firstDay, year, month, date) {
    return new DateTime.Field.WeekOfMonth(DateTime.Field.WeekOfMonth.Test.mockCalendar(firstDay, year, month, date));
};

DateTime.Field.WeekOfMonth.Test.mockCalendar = function(firstDay, year, month, date) {
    firstDay = DateTime.exists(firstDay, DateTime.Field.Day.MONDAY);
    year = DateTime.exists(year, 2000);
    month = DateTime.exists(month, 1);
    date = DateTime.exists(date, 1);

    return mock({
        time: time(year, month, date),
        year: mock({
            isLeap: ((year & 3) === 0 && (year % 100 !== 0 || year % 400 === 0)),
            millis: time(year, 1, 1)
        }),
        month: mock({
            isLeap: ((year & 3) === 0 && (year % 100 !== 0 || year % 400 === 0)),
            millis: time(year, month, 1) - time(year, 1, 1),
            duration: time(year, month + 1, 1) - time(year, month, 1)
        }),
        firstDay: firstDay
    });
};

