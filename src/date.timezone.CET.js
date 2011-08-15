DateTime.TimeZone.RuleSet.CET = [
    {
        offset: DateTime.Field.MILLS_PER_HOUR,
        weekStart: DateTime.Field.Day.MONDAY,
        dst: {
            offset: DateTime.Field.MILLS_PER_HOUR,
            start: {
                month: DateTime.Field.Month.MARCH,
                week: DateTime.Field.WeekOfMonth.LAST_WEEK,
                day: DateTime.Field.Day.SUNDAY,
                hour: 2
            },
            stop: {
                month: DateTime.Field.Month.OCTOBER,
                week: DateTime.Field.WeekOfMonth.LAST_WEEK,
                day: DateTime.Field.Day.SUNDAY,
                hour: 3
            }
        }
    }
];

DateTime.TimeZone.CET = new DateTime.TimeZone("CET", "Central Europe Time", DateTime.TimeZone.RuleSet.CET);
