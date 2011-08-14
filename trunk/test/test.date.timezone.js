Date.TimeZone.Test = {};

Date.TimeZone.Test.RuleSet = [
    {
        applyYear: 0,
        cancelYear: 1970,
        offset: 2 * Date.Field.MILLS_PER_HOUR,
        dst: {
            offset: Date.Field.MILLS_PER_HOUR,
            start: {
                month: Date.Field.Month.MARCH,
                date: 22,
                hour: 2
            },
            stop: {
                month: Date.Field.Month.OCTOBER,
                date: 17,
                hour: 3
            }
        }
    },
    {
        offset: 2 * Date.Field.MILLS_PER_HOUR,
        dst: {
            offset: Date.Field.MILLS_PER_HOUR,
            start: {
                month: Date.Field.Month.MARCH,
                week: Date.Field.WeekOfMonth.LAST_WEEK,
                day: Date.Field.Day.SUNDAY,
                hour: 2
            },
            stop: {
                month: Date.Field.Month.OCTOBER,
                week: Date.Field.WeekOfMonth.LAST_WEEK,
                day: Date.Field.Day.SUNDAY,
                hour: 3
            }
        }
    }
];

Date.TimeZone.Test.testOffset_Static_Before_DST = function() {
    var timeZone = new Date.TimeZone("TST", "Test timezone", Date.TimeZone.Test.RuleSet);

    assertEquals(Date.Field.MILLS_PER_HOUR * 2, timeZone.offset(time(1960, 3, 22, 3, 0, 0, 0)));
};

Date.TimeZone.Test.testOffset_Static_Start_DST = function() {
    var timeZone = new Date.TimeZone("TST", "Test timezone", Date.TimeZone.Test.RuleSet);

    assertEquals(Date.Field.MILLS_PER_HOUR * 3, timeZone.offset(time(1960, 3, 22, 4, 0, 0, 0)));
};

Date.TimeZone.Test.testOffset_Static_End_DST = function() {
    var timeZone = new Date.TimeZone("TST", "Test timezone", Date.TimeZone.Test.RuleSet);

    assertEquals(Date.Field.MILLS_PER_HOUR * 3, timeZone.offset(time(1960, 10, 17, 5, 0, 0, 0)));
};

Date.TimeZone.Test.testOffset_Static_After_DST = function() {
    var timeZone = new Date.TimeZone("TST", "Test timezone", Date.TimeZone.Test.RuleSet);

    assertEquals(Date.Field.MILLS_PER_HOUR * 2, timeZone.offset(time(1960, 10, 17, 6, 0, 0, 0)));
};

Date.TimeZone.Test.testOffset_Dyno_2011_Before_DST = function() {
    var timeZone = new Date.TimeZone("TST", "Test timezone", Date.TimeZone.Test.RuleSet);

    assertEquals(Date.Field.MILLS_PER_HOUR * 2, timeZone.offset(time(2011, 3, 27, 3, 0, 0, 0)));
};

Date.TimeZone.Test.testOffset_Dyno_2011_At_DST = function() {
    var timeZone = new Date.TimeZone("TST", "Test timezone", Date.TimeZone.Test.RuleSet);

    assertEquals(Date.Field.MILLS_PER_HOUR * 3, timeZone.offset(time(2011, 3, 27, 4, 0, 0, 0)));
};
