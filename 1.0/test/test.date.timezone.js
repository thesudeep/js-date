DateTime.TimeZone.Test = {};

DateTime.TimeZone.Test.RuleSet = [
    {
        applyYear: 0,
        cancelYear: 1970,
        offset: 2 * DateTime.MILLIS_PER_HOUR,
        dst: {
            offset: DateTime.MILLIS_PER_HOUR,
            start: {
                month: DateTime.Field.Month.MARCH,
                daysOfMonth: 22,
                hour: 2
            },
            stop: {
                month: DateTime.Field.Month.OCTOBER,
                daysOfMonth: 17,
                hour: 3
            }
        }
    },
    {
        offset: DateTime.MILLIS_PER_HOUR,
        dst: {
            offset: DateTime.MILLIS_PER_HOUR,
            start: {
                month: DateTime.Field.Month.MARCH,
                week: DateTime.Field.WeekOfMonth.LAST_WEEK,
                daysOfWeek: DateTime.Field.DaysOfWeek.SUNDAY,
                hour: 2
            },
            stop: {
                month: DateTime.Field.Month.OCTOBER,
                week: DateTime.Field.WeekOfMonth.LAST_WEEK,
                daysOfWeek: DateTime.Field.DaysOfWeek.SUNDAY,
                hour: 3
            }
        }
    }
];

DateTime.TimeZone.Test.testOffset_Static_Before_DST = function() {
    var timeZone = new DateTime.TimeZone("TST", "Test timezone", DateTime.TimeZone.Test.RuleSet);

    assertEquals(DateTime.MILLIS_PER_HOUR * 2, timeZone.offset(time(1960, 3, 21, 23, 0, 0, 0)));
};

DateTime.TimeZone.Test.testOffset_Static_Start_DST = function() {
    var timeZone = new DateTime.TimeZone("TST", "Test timezone", DateTime.TimeZone.Test.RuleSet);

    assertEquals(DateTime.MILLIS_PER_HOUR * 3, timeZone.offset(time(1960, 3, 22, 0, 0, 0, 0)));
};

DateTime.TimeZone.Test.testOffset_Static_End_DST = function() {
    var timeZone = new DateTime.TimeZone("TST", "Test timezone", DateTime.TimeZone.Test.RuleSet);

    assertEquals(DateTime.MILLIS_PER_HOUR * 3, timeZone.offset(time(1960, 10, 16, 23, 0, 0, 0)));
};

DateTime.TimeZone.Test.testOffset_Static_After_DST = function() {
    var timeZone = new DateTime.TimeZone("TST", "Test timezone", DateTime.TimeZone.Test.RuleSet);

    assertEquals(DateTime.MILLIS_PER_HOUR * 2, timeZone.offset(time(1960, 10, 17, 0, 0, 0, 0)));
};

DateTime.TimeZone.Test.testOffset_Dyno_2011_Before_DST = function() {
    var timeZone = new DateTime.TimeZone("TST", "Test timezone", DateTime.TimeZone.Test.RuleSet);

    assertEquals(DateTime.MILLIS_PER_HOUR, timeZone.offset(time(2011, 3, 27, 0, 0, 0, 0)));
};

DateTime.TimeZone.Test.testOffset_Dyno_2011_Start_DST = function() {
    var timeZone = new DateTime.TimeZone("TST", "Test timezone", DateTime.TimeZone.Test.RuleSet);

    assertEquals(DateTime.MILLIS_PER_HOUR * 2, timeZone.offset(time(2011, 3, 27, 1, 0, 0, 0)));
};

DateTime.TimeZone.Test.testOffset_Dyno_2011_End_DST = function() {
    var timeZone = new DateTime.TimeZone("TST", "Test timezone", DateTime.TimeZone.Test.RuleSet);

    assertEquals(DateTime.MILLIS_PER_HOUR * 2, timeZone.offset(time(2011, 10, 30, 0, 0, 0, 0)));
};

DateTime.TimeZone.Test.testOffset_Dyno_2011_After_DST = function() {
    var timeZone = new DateTime.TimeZone("TST", "Test timezone", DateTime.TimeZone.Test.RuleSet);

    assertEquals(DateTime.MILLIS_PER_HOUR, timeZone.offset(time(2011, 10, 30, 1, 0, 0, 0)));
};
