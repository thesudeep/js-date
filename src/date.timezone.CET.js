DateTime.TimeZone.RuleSet.CET = [
    {
        offset: DateTime.MILLIS_PER_HOUR,
        weekStart: DateTime.Field.DaysOfWeek.MONDAY,
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

DateTime.TimeZone.CET = new DateTime.TimeZone("CET", "Central Europe Time", DateTime.TimeZone.RuleSet.CET);
