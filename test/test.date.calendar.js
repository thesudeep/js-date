DateTime.Calendar.Test = {};

DateTime.Calendar.Test.testCreation = function() {
    var calendar = new DateTime.Calendar(time(1970, 2, 3, 4, 5, 6, 231));

    assertEquals(1970, calendar.year());
    assertEquals(2, calendar.month());
    assertEquals(3, calendar.date());
    assertEquals(4, calendar.hour());
    assertEquals(5, calendar.minute());
    assertEquals(6, calendar.second());
    assertEquals(231, calendar.mills());
};

DateTime.Calendar.Test.testCreation_Empty = function() {
    assertWithTime(10 * DateTime.Field.MILLS_PER_DAY + 1231, function () {
        var calendar = new DateTime.Calendar();

        assertEquals(1970, calendar.year());
        assertEquals(1, calendar.month());
        assertEquals(11, calendar.date());
        assertEquals(0, calendar.hour());
        assertEquals(0, calendar.minute());
        assertEquals(1, calendar.second());
        assertEquals(231, calendar.mills());
    });
};

DateTime.Calendar.Test.testYear_Positive = function() {
    var calendar = new DateTime.Calendar(0).year(2000);

    assertEquals(2000, calendar.year());
};

DateTime.Calendar.Test.testYear_Negative = function() {
    var calendar = new DateTime.Calendar(0).year(-2000);

    assertEquals(-2000, calendar.year());
};

DateTime.Calendar.Test.testYear_Zero = function() {
    assertFail(function() {
        new DateTime.Calendar(0).year(0);
    });
};

DateTime.Calendar.Test.testMonth_Positive = function() {
    var calendar = new DateTime.Calendar(0).month(14);

    assertEquals(1971, calendar.year());
    assertEquals(DateTime.Field.Month.MARCH, calendar.month());
};

DateTime.Calendar.Test.testMonth_Negative = function() {
    var calendar = new DateTime.Calendar(0).month(-1);

    assertEquals(1969, calendar.year());
    assertEquals(DateTime.Field.Month.DECEMBER, calendar.month());
};

DateTime.Calendar.Test.testMonth_Zero = function() {
    assertFail(function() {
        new DateTime.Calendar(0).month(0);
    });
};

DateTime.Calendar.Test.testDate_Positive = function() {
    var calendar = new DateTime.Calendar(0).date(31 + 28 + 1);

    assertEquals(1970, calendar.year());
    assertEquals(DateTime.Field.Month.MARCH, calendar.month());
    assertEquals(1, calendar.date());
};

DateTime.Calendar.Test.testDate_Negative = function() {
    var calendar = new DateTime.Calendar(0).date(-1);

    assertEquals(1969, calendar.year());
    assertEquals(DateTime.Field.Month.DECEMBER, calendar.month());
    assertEquals(31, calendar.date());
};

DateTime.Calendar.Test.testDate_Zero = function() {
    assertFail(function() {
        new DateTime.Calendar(0).date(0);
    });
};

DateTime.Calendar.Test.testDay_Positive = function() {
    var calendar = new DateTime.Calendar(time(2011, 1, 1, 0, 0, 0, 0)).day(DateTime.Field.Day.SUNDAY);

    assertEquals(2011, calendar.year());
    assertEquals(DateTime.Field.Month.JANUARY, calendar.month());
    assertEquals(2, calendar.date());
};

DateTime.Calendar.Test.testDay_Zero = function() {
    var calendar = new DateTime.Calendar(time(2011, 1, 1, 0, 0, 0, 0)).day(DateTime.Field.Day.SATURDAY);

    assertEquals(2011, calendar.year());
    assertEquals(DateTime.Field.Month.JANUARY, calendar.month());
    assertEquals(1, calendar.date());
};

DateTime.Calendar.Test.testDay_Negative = function() {
    var calendar = new DateTime.Calendar(time(2011, 1, 1, 0, 0, 0, 0)).day(DateTime.Field.Day.MONDAY);

    assertEquals(2010, calendar.year());
    assertEquals(DateTime.Field.Month.DECEMBER, calendar.month());
    assertEquals(27, calendar.date());
};

DateTime.Calendar.Test.testHour_Positive = function() {
    var calendar = new DateTime.Calendar(0).hour(DateTime.Field.HOURS_PER_DAY * (31 + 28 + 1) + 10);

    assertEquals(1970, calendar.year());
    assertEquals(DateTime.Field.Month.MARCH, calendar.month());
    assertEquals(2, calendar.date());
    assertEquals(10, calendar.hour());
};

DateTime.Calendar.Test.testHour_Negative = function() {
    var calendar = new DateTime.Calendar(0).hour(-1);

    assertEquals(1969, calendar.year());
    assertEquals(DateTime.Field.Month.DECEMBER, calendar.month());
    assertEquals(31, calendar.date());
    assertEquals(23, calendar.hour());
};

DateTime.Calendar.Test.testHour_Zero = function() {
    var calendar = new DateTime.Calendar(0).hour(0);

    assertEquals(1970, calendar.year());
    assertEquals(DateTime.Field.Month.JANUARY, calendar.month());
    assertEquals(1, calendar.date());
    assertEquals(0, calendar.hour());
};

