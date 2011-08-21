DateTime.Calendar.Test = {};

DateTime.Calendar.Test.testCreation = function() {
    var calendar = new DateTime.Calendar(time(1970, 2, 3, 4, 5, 6, 231));

    assertEquals(1970, calendar.withYear());
    assertEquals(2, calendar.withMonth());
    assertEquals(3, calendar.withDayOfMonth());
    assertEquals(4, calendar.withHourOfDay());
    assertEquals(5, calendar.withMinuteOfHour());
    assertEquals(6, calendar.withSecondOfMinute());
    assertEquals(231, calendar.withMillisOfSecond());
};

DateTime.Calendar.Test.testCreation_Empty = function() {
    assertWithTime(10 * DateTime.MILLIS_PER_DAY + 1231, function () {
        var calendar = new DateTime.Calendar();

        assertEquals(1970, calendar.withYear());
        assertEquals(1, calendar.withMonth());
        assertEquals(11, calendar.withDayOfMonth());
        assertEquals(0, calendar.withHourOfDay());
        assertEquals(0, calendar.withMinuteOfHour());
        assertEquals(1, calendar.withSecondOfMinute());
        assertEquals(231, calendar.withMillisOfSecond());
    });
};

DateTime.Calendar.Test.testYear_Positive = function() {
    var calendar = new DateTime.Calendar(0).withYear(2000);

    assertEquals(2000, calendar.withYear());
};

DateTime.Calendar.Test.testYear_Negative = function() {
    var calendar = new DateTime.Calendar(0).withYear(-2000);

    assertEquals(-2000, calendar.withYear());
};

DateTime.Calendar.Test.testYear_Zero = function() {
    assertFail(function() {
        new DateTime.Calendar(0).withYear(0);
    });
};

DateTime.Calendar.Test.testMonth_Positive = function() {
    var calendar = new DateTime.Calendar(0).withMonth(14);

    assertEquals(1971, calendar.withYear());
    assertEquals(DateTime.Field.Month.FEBRUARY, calendar.withMonth());
};

DateTime.Calendar.Test.testMonth_PositiveSmall = function() {
    var calendar = new DateTime.Calendar(0).withMonth(DateTime.Field.Month.AUGUST);

    assertEquals(1970, calendar.withYear());
    assertEquals(DateTime.Field.Month.AUGUST, calendar.withMonth());
};

DateTime.Calendar.Test.testMonth_Negative = function() {
    var calendar = new DateTime.Calendar(0).withMonth(-1);

    assertEquals(1969, calendar.withYear());
    assertEquals(DateTime.Field.Month.NOVEMBER, calendar.withMonth());
};

DateTime.Calendar.Test.testMonth_Zero = function() {
    var calendar = new DateTime.Calendar(0).withMonth(0);

    assertEquals(1969, calendar.withYear());
    assertEquals(DateTime.Field.Month.DECEMBER, calendar.withMonth());
};

DateTime.Calendar.Test.testDate_Positive = function() {
    var calendar = new DateTime.Calendar(0).withDayOfMonth(31 + 28 + 1);

    assertEquals(1970, calendar.withYear());
    assertEquals(DateTime.Field.Month.MARCH, calendar.withMonth());
    assertEquals(1, calendar.withDayOfMonth());
};

DateTime.Calendar.Test.testDate_PositiveSmall = function() {
    var calendar = new DateTime.Calendar(0).withDayOfMonth(5);

    assertEquals(1970, calendar.withYear());
    assertEquals(DateTime.Field.Month.JANUARY, calendar.withMonth());
    assertEquals(5, calendar.withDayOfMonth());
};

DateTime.Calendar.Test.testDate_Negative = function() {
    var calendar = new DateTime.Calendar(0).withDayOfMonth(-1);

    assertEquals(1969, calendar.withYear());
    assertEquals(DateTime.Field.Month.DECEMBER, calendar.withMonth());
    assertEquals(30, calendar.withDayOfMonth());
};

DateTime.Calendar.Test.testDate_Zero = function() {
    var calendar = new DateTime.Calendar(0).withDayOfMonth(0);

    assertEquals(1969, calendar.withYear());
    assertEquals(DateTime.Field.Month.DECEMBER, calendar.withMonth());
    assertEquals(31, calendar.withDayOfMonth());
};

DateTime.Calendar.Test.testPlusDate_Positive = function() {
    var calendar = new DateTime.Calendar(time(2011, 2, 3, 4, 5, 6, 7)).plusDays(38);

    assertEquals(2011, calendar.withYear());
    assertEquals(DateTime.Field.Month.MARCH, calendar.withMonth());
    assertEquals(13, calendar.withDayOfMonth());
};

DateTime.Calendar.Test.testPlusDate_PositiveSmall = function() {
    var calendar = new DateTime.Calendar(time(2011, 2, 3, 4, 5, 6, 7)).plusDays(1);

    assertEquals(2011, calendar.withYear());
    assertEquals(DateTime.Field.Month.FEBRUARY, calendar.withMonth());
    assertEquals(4, calendar.withDayOfMonth());
};

DateTime.Calendar.Test.testPlusDate_Negative = function() {
    var calendar = new DateTime.Calendar(time(2011, 2, 3, 4, 5, 6, 7)).plusDays(-5);

    assertEquals(2011, calendar.withYear());
    assertEquals(DateTime.Field.Month.JANUARY, calendar.withMonth());
    assertEquals(29, calendar.withDayOfMonth());
};

DateTime.Calendar.Test.testPlusDate_Zero = function() {
    var calendar = new DateTime.Calendar(time(2011, 2, 3, 4, 5, 6, 7)).plusDays(0);

    assertEquals(2011, calendar.withYear());
    assertEquals(DateTime.Field.Month.FEBRUARY, calendar.withMonth());
    assertEquals(3, calendar.withDayOfMonth());
};

DateTime.Calendar.Test.testDay_Positive = function() {
    var calendar = new DateTime.Calendar(time(2011, 1, 1, 0, 0, 0, 0)).withDayOfWeek(DateTime.Field.DaysOfWeek.SUNDAY);

    assertEquals(2011, calendar.withYear());
    assertEquals(DateTime.Field.Month.JANUARY, calendar.withMonth());
    assertEquals(2, calendar.withDayOfMonth());
};

DateTime.Calendar.Test.testDay_Zero = function() {
    var calendar = new DateTime.Calendar(time(2011, 1, 1, 0, 0, 0, 0)).withDayOfWeek(DateTime.Field.DaysOfWeek.SATURDAY);

    assertEquals(2011, calendar.withYear());
    assertEquals(DateTime.Field.Month.JANUARY, calendar.withMonth());
    assertEquals(1, calendar.withDayOfMonth());
};

DateTime.Calendar.Test.testDay_Negative = function() {
    var calendar = new DateTime.Calendar(time(2011, 1, 1, 0, 0, 0, 0)).withDayOfWeek(DateTime.Field.DaysOfWeek.MONDAY);

    assertEquals(2010, calendar.withYear());
    assertEquals(DateTime.Field.Month.DECEMBER, calendar.withMonth());
    assertEquals(27, calendar.withDayOfMonth());
};

DateTime.Calendar.Test.testHour_Positive = function() {
    var calendar = new DateTime.Calendar(0).withHourOfDay(DateTime.HOURS_PER_DAY * (31 + 28 + 1) + 10);

    assertEquals(1970, calendar.withYear());
    assertEquals(DateTime.Field.Month.MARCH, calendar.withMonth());
    assertEquals(2, calendar.withDayOfMonth());
    assertEquals(10, calendar.withHourOfDay());
};

DateTime.Calendar.Test.testHour_Negative = function() {
    var calendar = new DateTime.Calendar(0).withHourOfDay(-1);

    assertEquals(1969, calendar.withYear());
    assertEquals(DateTime.Field.Month.DECEMBER, calendar.withMonth());
    assertEquals(31, calendar.withDayOfMonth());
    assertEquals(23, calendar.withHourOfDay());
};

DateTime.Calendar.Test.testHour_Zero = function() {
    var calendar = new DateTime.Calendar(0).withHourOfDay(0);

    assertEquals(1970, calendar.withYear());
    assertEquals(DateTime.Field.Month.JANUARY, calendar.withMonth());
    assertEquals(1, calendar.withDayOfMonth());
    assertEquals(0, calendar.withHourOfDay());
};

