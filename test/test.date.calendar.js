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

DateTime.Calendar.Test.testWithYear_Positive = function() {
    var calendar = new DateTime.Calendar(0).withYear(2000);

    assertEquals(2000, calendar.withYear());
};

DateTime.Calendar.Test.testWithYear_Negative = function() {
    var calendar = new DateTime.Calendar(0).withYear(-2000);

    assertEquals(-2000, calendar.withYear());
};

DateTime.Calendar.Test.testWithYear_InvalidDay = function() {
    var calendar = new DateTime.Calendar(time(2000, 2, 29)).withYear(2001);

    assertEquals(2001, calendar.withYear());
    assertEquals(DateTime.Field.Month.FEBRUARY, calendar.withMonth());
    assertEquals(28, calendar.withDayOfMonth());
};

DateTime.Calendar.Test.testPlusYears_InvalidDay = function() {
    var calendar = new DateTime.Calendar(time(2000, 2, 29)).plusYears(1);

    assertEquals(2001, calendar.withYear());
    assertEquals(DateTime.Field.Month.FEBRUARY, calendar.withMonth());
    assertEquals(28, calendar.withDayOfMonth());
};

DateTime.Calendar.Test.testMinusYears_InvalidDay = function() {
    var calendar = new DateTime.Calendar(time(2000, 2, 29)).minusYears(1);

    assertEquals(1999, calendar.withYear());
    assertEquals(DateTime.Field.Month.FEBRUARY, calendar.withMonth());
    assertEquals(28, calendar.withDayOfMonth());
};

DateTime.Calendar.Test.testWithYear_Zero = function() {
    assertFail(function() {
        new DateTime.Calendar(0).withYear(0);
    });
};

DateTime.Calendar.Test.testWithMonth = function() {
    var calendar = new DateTime.Calendar(0).withMonth(DateTime.Field.Month.AUGUST);

    assertEquals(1970, calendar.withYear());
    assertEquals(DateTime.Field.Month.AUGUST, calendar.withMonth());
};

DateTime.Calendar.Test.testWithMonth_InvalidDay = function() {
    var calendar = new DateTime.Calendar(time(2001, 1, 31)).withMonth(DateTime.Field.Month.FEBRUARY);

    assertEquals(2001, calendar.withYear());
    assertEquals(DateTime.Field.Month.FEBRUARY, calendar.withMonth());
    assertEquals(28, calendar.withDayOfMonth());
};

DateTime.Calendar.Test.testWithMonth_BiggerThanMax = function() {
    assertFail(function() {
        new DateTime.Calendar(0).withMonth(14);
    });
};

DateTime.Calendar.Test.testWithMonth_LesserThanMin = function() {
    assertFail(function() {
        new DateTime.Calendar(0).withMonth(0);
    });
};

DateTime.Calendar.Test.testPlusMonths_14 = function() {
    var calendar = new DateTime.Calendar(0).plusMonths(14);

    assertEquals(1971, calendar.withYear());
    assertEquals(DateTime.Field.Month.MARCH, calendar.withMonth());
};

DateTime.Calendar.Test.testPlusMonths_1 = function() {
    var calendar = new DateTime.Calendar(0).plusMonths(1);

    assertEquals(1970, calendar.withYear());
    assertEquals(DateTime.Field.Month.FEBRUARY, calendar.withMonth());
};

DateTime.Calendar.Test.testPlusMonths_InvalidDay = function() {
    var calendar = new DateTime.Calendar(time(2001, 1, 31)).plusMonths(1);

    assertEquals(2001, calendar.withYear());
    assertEquals(DateTime.Field.Month.FEBRUARY, calendar.withMonth());
    assertEquals(28, calendar.withDayOfMonth());
};

DateTime.Calendar.Test.testPlusMonths_Zero = function() {
    var calendar = new DateTime.Calendar(0).plusMonths(0);

    assertEquals(1970, calendar.withYear());
    assertEquals(DateTime.Field.Month.JANUARY, calendar.withMonth());
};

DateTime.Calendar.Test.testMinusMonths_1 = function() {
    var calendar = new DateTime.Calendar(0).minusMonths(1);

    assertEquals(1969, calendar.withYear());
    assertEquals(DateTime.Field.Month.DECEMBER, calendar.withMonth());
};

DateTime.Calendar.Test.testMinusMonths_InvalidDay = function() {
    var calendar = new DateTime.Calendar(time(2001, 1, 31)).minusMonths(2);

    assertEquals(2000, calendar.withYear());
    assertEquals(DateTime.Field.Month.NOVEMBER, calendar.withMonth());
    assertEquals(30, calendar.withDayOfMonth());
};

DateTime.Calendar.Test.testMinusMonths_Zero = function() {
    var calendar = new DateTime.Calendar(0).minusMonths(0);

    assertEquals(1970, calendar.withYear());
    assertEquals(DateTime.Field.Month.JANUARY, calendar.withMonth());
};

DateTime.Calendar.Test.testWithDayOfMonth = function() {
    var calendar = new DateTime.Calendar(0).withDayOfMonth(31);

    assertEquals(1970, calendar.withYear());
    assertEquals(DateTime.Field.Month.JANUARY, calendar.withMonth());
    assertEquals(31, calendar.withDayOfMonth());
};

DateTime.Calendar.Test.testWithDayOfMonth_BiggerThanMax = function() {
    assertFail(function() {
        new DateTime.Calendar(0).withDayOfMonth(32);
    });
};

DateTime.Calendar.Test.testWithDayOfMonth_LesserThanThanMin = function() {
    assertFail(function() {
        new DateTime.Calendar(0).withDayOfMonth(0);
    });
};

DateTime.Calendar.Test.testWithDayOfWeek_Positive = function() {
    var calendar = new DateTime.Calendar(time(2011, 1, 1, 0, 0, 0, 0)).withDayOfWeek(DateTime.Field.DaysOfWeek.SUNDAY);

    assertEquals(2011, calendar.withYear());
    assertEquals(DateTime.Field.Month.JANUARY, calendar.withMonth());
    assertEquals(2, calendar.withDayOfMonth());
};

DateTime.Calendar.Test.testWithDayOfWeek_Zero = function() {
    var calendar = new DateTime.Calendar(time(2011, 1, 1, 0, 0, 0, 0)).withDayOfWeek(DateTime.Field.DaysOfWeek.SATURDAY);

    assertEquals(2011, calendar.withYear());
    assertEquals(DateTime.Field.Month.JANUARY, calendar.withMonth());
    assertEquals(1, calendar.withDayOfMonth());
};

DateTime.Calendar.Test.testWithDayOfWeek_Negative = function() {
    var calendar = new DateTime.Calendar(time(2011, 1, 1, 0, 0, 0, 0)).withDayOfWeek(DateTime.Field.DaysOfWeek.MONDAY);

    assertEquals(2010, calendar.withYear());
    assertEquals(DateTime.Field.Month.DECEMBER, calendar.withMonth());
    assertEquals(27, calendar.withDayOfMonth());
};

DateTime.Calendar.Test.testPlusDays_59 = function() {
    var calendar = new DateTime.Calendar(0).plusDays(31 + 28);

    assertEquals(1970, calendar.withYear());
    assertEquals(DateTime.Field.Month.MARCH, calendar.withMonth());
    assertEquals(1, calendar.withDayOfMonth());
};

DateTime.Calendar.Test.testPlusDays_Zero = function() {
    var calendar = new DateTime.Calendar(0).plusDays(0);

    assertEquals(1970, calendar.withYear());
    assertEquals(DateTime.Field.Month.JANUARY, calendar.withMonth());
    assertEquals(1, calendar.withDayOfMonth());
};

DateTime.Calendar.Test.testMinusDays_1 = function() {
    var calendar = new DateTime.Calendar(0).minusDays(1);

    assertEquals(1969, calendar.withYear());
    assertEquals(DateTime.Field.Month.DECEMBER, calendar.withMonth());
    assertEquals(31, calendar.withDayOfMonth());
};

DateTime.Calendar.Test.testMinusDays_Zero = function() {
    var calendar = new DateTime.Calendar(0).minusDays(0);

    assertEquals(1970, calendar.withYear());
    assertEquals(DateTime.Field.Month.JANUARY, calendar.withMonth());
    assertEquals(1, calendar.withDayOfMonth());
};

DateTime.Calendar.Test.testWithHourOfDay = function() {
    var calendar = new DateTime.Calendar(0).withHourOfDay(10);

    assertEquals(1970, calendar.withYear());
    assertEquals(DateTime.Field.Month.JANUARY, calendar.withMonth());
    assertEquals(1, calendar.withDayOfMonth());
    assertEquals(10, calendar.withHourOfDay());
};

DateTime.Calendar.Test.testWithHourOfDay_BiggerThanMax = function() {
    assertFail(function() {
        new DateTime.Calendar(0).withHourOfDay(25);
    });
};

DateTime.Calendar.Test.testWithHourOfDay_LesserThanMin = function() {
    assertFail(function() {
        new DateTime.Calendar(0).withHourOfDay(-1);
    });
};

DateTime.Calendar.Test.testPlusHours_60d10h = function() {
    var calendar = new DateTime.Calendar(0).plusHours(DateTime.HOURS_PER_DAY * (31 + 28 + 1) + 10);

    assertEquals(1970, calendar.withYear());
    assertEquals(DateTime.Field.Month.MARCH, calendar.withMonth());
    assertEquals(2, calendar.withDayOfMonth());
    assertEquals(10, calendar.withHourOfDay());
};

DateTime.Calendar.Test.testPlusHours_Zero = function() {
    var calendar = new DateTime.Calendar(0).plusHours(0);

    assertEquals(1970, calendar.withYear());
    assertEquals(DateTime.Field.Month.JANUARY, calendar.withMonth());
    assertEquals(1, calendar.withDayOfMonth());
    assertEquals(0, calendar.withHourOfDay());
};

DateTime.Calendar.Test.testMinusHours_1 = function() {
    var calendar = new DateTime.Calendar(0).minusHours(1);

    assertEquals(1969, calendar.withYear());
    assertEquals(DateTime.Field.Month.DECEMBER, calendar.withMonth());
    assertEquals(31, calendar.withDayOfMonth());
    assertEquals(23, calendar.withHourOfDay());
};

DateTime.Calendar.Test.testMinusHours_Zero = function() {
    var calendar = new DateTime.Calendar(0).minusHours(0);

    assertEquals(1970, calendar.withYear());
    assertEquals(DateTime.Field.Month.JANUARY, calendar.withMonth());
    assertEquals(1, calendar.withDayOfMonth());
    assertEquals(0, calendar.withHourOfDay());
};

