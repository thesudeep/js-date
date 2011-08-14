Date.Calendar.Test = {};

Date.Calendar.Test.testCreation = function() {
    var calendar = new Date.Calendar(time(1970, 2, 3, 4, 5, 6, 231));

    assertEquals(1970, calendar.year());
    assertEquals(2, calendar.month());
    assertEquals(3, calendar.date());
    assertEquals(4, calendar.hour());
    assertEquals(5, calendar.minute());
    assertEquals(6, calendar.second());
    assertEquals(231, calendar.mills());
};

Date.Calendar.Test.testCreation_Empty = function() {
    assertWithTime(10 * Date.Field.MILLS_PER_DAY + 1231, function () {
        var calendar = new Date.Calendar();

        assertEquals(1970, calendar.year());
        assertEquals(1, calendar.month());
        assertEquals(11, calendar.date());
        assertEquals(0, calendar.hour());
        assertEquals(0, calendar.minute());
        assertEquals(1, calendar.second());
        assertEquals(231, calendar.mills());
    });
};

Date.Calendar.Test.testYear_Positive = function() {
    var calendar = new Date.Calendar(0).year(2000);

    assertEquals(2000, calendar.year());
};

Date.Calendar.Test.testYear_Negative = function() {
    var calendar = new Date.Calendar(0).year(-2000);

    assertEquals(-2000, calendar.year());
};

Date.Calendar.Test.testYear_Zero = function() {
    assertFail(function() {
        new Date.Calendar(0).year(0);
    });
};

Date.Calendar.Test.testMonth_Positive = function() {
    var calendar = new Date.Calendar(0).month(14);

    assertEquals(1971, calendar.year());
    assertEquals(Date.Field.Month.MARCH, calendar.month());
};

Date.Calendar.Test.testMonth_Negative = function() {
    var calendar = new Date.Calendar(0).month(-1);

    assertEquals(1969, calendar.year());
    assertEquals(Date.Field.Month.DECEMBER, calendar.month());
};

Date.Calendar.Test.testMonth_Zero = function() {
    assertFail(function() {
        new Date.Calendar(0).month(0);
    });
};

Date.Calendar.Test.testDate_Positive = function() {
    var calendar = new Date.Calendar(0).date(31 + 28 + 1);

    assertEquals(1970, calendar.year());
    assertEquals(Date.Field.Month.MARCH, calendar.month());
    assertEquals(1, calendar.date());
};

Date.Calendar.Test.testDate_Negative = function() {
    var calendar = new Date.Calendar(0).date(-1);

    assertEquals(1969, calendar.year());
    assertEquals(Date.Field.Month.DECEMBER, calendar.month());
    assertEquals(31, calendar.date());
};

Date.Calendar.Test.testDate_Zero = function() {
    assertFail(function() {
        new Date.Calendar(0).date(0);
    });
};

Date.Calendar.Test.testDay_Positive = function() {
    var calendar = new Date.Calendar(time(2011, 1, 1, 0, 0, 0, 0)).day(Date.Field.Day.SUNDAY);

    assertEquals(2011, calendar.year());
    assertEquals(Date.Field.Month.JANUARY, calendar.month());
    assertEquals(2, calendar.date());
};

Date.Calendar.Test.testDay_Zero = function() {
    var calendar = new Date.Calendar(time(2011, 1, 1, 0, 0, 0, 0)).day(Date.Field.Day.SATURDAY);

    assertEquals(2011, calendar.year());
    assertEquals(Date.Field.Month.JANUARY, calendar.month());
    assertEquals(1, calendar.date());
};

Date.Calendar.Test.testDay_Negative = function() {
    var calendar = new Date.Calendar(time(2011, 1, 1, 0, 0, 0, 0)).day(Date.Field.Day.MONDAY);

    assertEquals(2010, calendar.year());
    assertEquals(Date.Field.Month.DECEMBER, calendar.month());
    assertEquals(27, calendar.date());
};

Date.Calendar.Test.testHour_Positive = function() {
    var calendar = new Date.Calendar(0).hour(Date.Field.HOURS_PER_DAY * (31 + 28 + 1) + 10);

    assertEquals(1970, calendar.year());
    assertEquals(Date.Field.Month.MARCH, calendar.month());
    assertEquals(2, calendar.date());
    assertEquals(10, calendar.hour());
};

Date.Calendar.Test.testHour_Negative = function() {
    var calendar = new Date.Calendar(0).hour(-1);

    assertEquals(1969, calendar.year());
    assertEquals(Date.Field.Month.DECEMBER, calendar.month());
    assertEquals(31, calendar.date());
    assertEquals(23, calendar.hour());
};

Date.Calendar.Test.testHour_Zero = function() {
    var calendar = new Date.Calendar(0).hour(0);

    assertEquals(1970, calendar.year());
    assertEquals(Date.Field.Month.JANUARY, calendar.month());
    assertEquals(1, calendar.date());
    assertEquals(0, calendar.hour());
};

