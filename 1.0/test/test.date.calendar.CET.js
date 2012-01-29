DateTime.Calendar.Test.CET = {};

DateTime.Calendar.Test.CET.testCreation_BeforeDST = function() {
    var calendar = new DateTime.Calendar(time(2011, 3, 27, 0, 59, 59, 999), DateTime.TimeZone.CET);

    assertEquals(2011, calendar.withYear());
    assertEquals(3, calendar.withMonth());
    assertEquals(27, calendar.withDayOfMonth());
    assertEquals(1, calendar.withHourOfDay());
    assertEquals(59, calendar.withMinuteOfHour());
    assertEquals(59, calendar.withSecondOfMinute());
    assertEquals(999, calendar.withMillisOfSecond());
};

DateTime.Calendar.Test.CET.testCreation_StartDST = function() {
    var calendar = new DateTime.Calendar(time(2011, 3, 27, 1, 0, 0, 0), DateTime.TimeZone.CET);

    assertEquals(2011, calendar.withYear());
    assertEquals(3, calendar.withMonth());
    assertEquals(27, calendar.withDayOfMonth());
    assertEquals(3, calendar.withHourOfDay());
    assertEquals(0, calendar.withMinuteOfHour());
    assertEquals(0, calendar.withSecondOfMinute());
    assertEquals(0, calendar.withMillisOfSecond());
};

DateTime.Calendar.Test.CET.testCreation_StopDST = function() {
    var calendar = new DateTime.Calendar(time(2011, 10, 30, 0, 59, 59, 999), DateTime.TimeZone.CET);

    assertEquals(2011, calendar.withYear());
    assertEquals(10, calendar.withMonth());
    assertEquals(30, calendar.withDayOfMonth());
    assertEquals(2, calendar.withHourOfDay());
    assertEquals(59, calendar.withMinuteOfHour());
    assertEquals(59, calendar.withSecondOfMinute());
    assertEquals(999, calendar.withMillisOfSecond());
};

DateTime.Calendar.Test.CET.testCreation_AfterDST = function() {
    var calendar = new DateTime.Calendar(time(2011, 10, 30, 1, 0, 0, 0), DateTime.TimeZone.CET);

    assertEquals(2011, calendar.withYear());
    assertEquals(10, calendar.withMonth());
    assertEquals(30, calendar.withDayOfMonth());
    assertEquals(2, calendar.withHourOfDay());
    assertEquals(0, calendar.withMinuteOfHour());
    assertEquals(0, calendar.withSecondOfMinute());
    assertEquals(0, calendar.withMillisOfSecond());
};

DateTime.Calendar.Test.CET.testCreation_WithReset = function() {
    var calendar = new DateTime.Calendar(0, DateTime.TimeZone.CET).reset();

    assertEquals(time(1969, 12, 31, 23), calendar.time());
};

DateTime.Calendar.Test.CET.testGetTime_Date = function() {
    var calendar = new DateTime.Calendar(0, DateTime.TimeZone.CET).withYear(2011).withMonth(8).withDayOfMonth(1);

    assertEquals(time(2011, 7, 31, 23), calendar.time());
};

DateTime.Calendar.Test.CET.testGetTime_DateReset = function() {
    var calendar = new DateTime.Calendar(0, DateTime.TimeZone.CET).reset().withYear(2011).withMonth(8).withDayOfMonth(1);

    assertEquals(time(2011, 7, 31, 22), calendar.time());
};

DateTime.Calendar.Test.CET.testGetTime_BeforeDST = function() {
    var calendar = new DateTime.Calendar(0, DateTime.TimeZone.CET).withYear(2011).withMonth(3).withDayOfMonth(27).withHourOfDay(1).withMinuteOfHour(59).withSecondOfMinute(59).withMillisOfSecond(999);

    assertEquals(time(2011, 3, 27, 0, 59, 59, 999), calendar.time());
};

DateTime.Calendar.Test.CET.testGetTime_NotExistent = function() {
    assertFail(function() {
        new DateTime.Calendar(0, DateTime.TimeZone.CET).withYear(2011).withMonth(3).withDayOfMonth(27).withHourOfDay(2).withMinuteOfHour(0).withSecondOfMinute(0).withMillisOfSecond(0);
    });
};

DateTime.Calendar.Test.CET.testGetTime_StartDST = function() {
    var calendar = new DateTime.Calendar(0, DateTime.TimeZone.CET).withYear(2011).withMonth(3).withDayOfMonth(27).withHourOfDay(3).withMinuteOfHour(0).withSecondOfMinute(0).withMillisOfSecond(0);

    assertEquals(time(2011, 3, 27, 1, 0, 0, 0), calendar.time());
};

DateTime.Calendar.Test.CET.testGetTime_StopDST = function() {
    var calendar = new DateTime.Calendar(0, DateTime.TimeZone.CET).withYear(2011).withMonth(10).withDayOfMonth(30).withHourOfDay(2).withMinuteOfHour(59).withSecondOfMinute(59).withMillisOfSecond(999);

    assertEquals(time(2011, 10, 30, 0, 59, 59, 999), calendar.time());
};

DateTime.Calendar.Test.CET.testGetTime_AfterDST = function() {
    var calendar = new DateTime.Calendar(0, DateTime.TimeZone.CET).withYear(2011).withMonth(10).withDayOfMonth(30).withHourOfDay(3).withMinuteOfHour(0).withSecondOfMinute(0).withMillisOfSecond(0);

    assertEquals(time(2011, 10, 30, 2, 0, 0, 0), calendar.time());
};

DateTime.Calendar.Test.CET.testSetDate_BeforeDST = function() {
    var calendar = new DateTime.Calendar(0, DateTime.TimeZone.CET).withYear(2011).withMonth(3).withDayOfMonth(27).withHourOfDay(0).withMinuteOfHour(0).withSecondOfMinute(0).withMillisOfSecond(0);

    assertEquals(time(2011, 3, 26, 23), calendar.time());
};

DateTime.Calendar.Test.CET.testSetDate_InDST = function() {
    var calendar = new DateTime.Calendar(0, DateTime.TimeZone.CET).withYear(2011).withMonth(6).withDayOfMonth(27).withHourOfDay(0).withMinuteOfHour(0).withSecondOfMinute(0).withMillisOfSecond(0);

    assertEquals(time(2011, 6, 26, 22), calendar.time());
};

DateTime.Calendar.Test.CET.testSetDate_AfterDST = function() {
    var calendar = new DateTime.Calendar(0, DateTime.TimeZone.CET).withYear(2011).withMonth(10).withDayOfMonth(31).withHourOfDay(0).withMinuteOfHour(0).withSecondOfMinute(0).withMillisOfSecond(0);

    assertEquals(time(2011, 10, 30, 23), calendar.time());
};

DateTime.Calendar.Test.CET.testSetDate_DiffStartDST = function() {
    var calendarBefore = new DateTime.Calendar(0, DateTime.TimeZone.CET).withYear(2011).withMonth(3).withDayOfMonth(27).withHourOfDay(0).withMinuteOfHour(0).withSecondOfMinute(0).withMillisOfSecond(0);
    var calendarAfter = new DateTime.Calendar(0, DateTime.TimeZone.CET).withYear(2011).withMonth(3).withDayOfMonth(28).withHourOfDay(0).withMinuteOfHour(0).withSecondOfMinute(0).withMillisOfSecond(0);

    assertEquals(DateTime.MILLIS_PER_DAY - DateTime.MILLIS_PER_HOUR, calendarAfter.time() - calendarBefore.time());
};

DateTime.Calendar.Test.CET.testSetDate_DiffStopDST = function() {
    var calendarBefore = new DateTime.Calendar(0, DateTime.TimeZone.CET).withYear(2011).withMonth(10).withDayOfMonth(30).withHourOfDay(0).withMinuteOfHour(0).withSecondOfMinute(0).withMillisOfSecond(0);
    var calendarAfter = new DateTime.Calendar(0, DateTime.TimeZone.CET).withYear(2011).withMonth(10).withDayOfMonth(31).withHourOfDay(0).withMinuteOfHour(0).withSecondOfMinute(0).withMillisOfSecond(0);

    assertEquals(DateTime.MILLIS_PER_DAY + DateTime.MILLIS_PER_HOUR, calendarAfter.time() - calendarBefore.time());
};

DateTime.Calendar.Test.CET.testDelta_BeforeDST = function() {
    var calendar = new DateTime.Calendar(time(2011, 3, 27, 0, 59, 59, 999), DateTime.TimeZone.CET);

    assertEquals(3, calendar.plusMillis(1).withHourOfDay());
};

DateTime.Calendar.Test.CET.testDelta_LessNotExistent = function() {
    assertFail(function() {
        new DateTime.Calendar(time(2011, 3, 27, 0, 59, 59, 999), DateTime.TimeZone.CET).withHourOfDay(2);
    });
};

DateTime.Calendar.Test.CET.testDelta_MoreNotExistent = function() {
    assertFail(function() {
        new DateTime.Calendar(time(2011, 3, 27, 1, 0, 0, 0), DateTime.TimeZone.CET).withHourOfDay(2);
    });
};

DateTime.Calendar.Test.CET.testDelta_StartDST = function() {
    var calendar = new DateTime.Calendar(time(2011, 3, 27, 1, 0, 0, 0), DateTime.TimeZone.CET);

    assertEquals(1, calendar.minusMillis(1).withHourOfDay());
    assertEquals(3, calendar.plusMillis(1).withHourOfDay());
};

DateTime.Calendar.Test.CET.testDelta_StopDST = function() {
    var calendar = new DateTime.Calendar(time(2011, 10, 30, 0, 59, 59, 999), DateTime.TimeZone.CET);

    assertEquals(2, calendar.plusMillis(1).withHourOfDay());
    assertEquals(2, calendar.minusMillis(1).withHourOfDay());
};

DateTime.Calendar.Test.CET.testDelta_AfterDST = function() {
    var calendar = new DateTime.Calendar(time(2011, 10, 30, 2, 0, 0, 0), DateTime.TimeZone.CET);

    assertEquals(2, calendar.minusMillis(1).withHourOfDay());
    assertEquals(3, calendar.plusMillis(1).withHourOfDay());
};

DateTime.Calendar.Test.CET.testPlusDay_AfterDST = function() {
    var calendar = new DateTime.Calendar(time(2011, 10, 29, 22, 0, 0, 0), DateTime.TimeZone.CET);

    assertEquals(time(2011, 10, 30, 23, 0, 0, 0), calendar.plusDays(1).time());
};