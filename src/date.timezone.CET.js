Date.TimeZone.RuleSet.CET = [
    {
        offset: Date.Field.MILLS_PER_HOUR,
        dst: {
            offset: Date.Field.MILLS_PER_HOUR,
            start: {
                month: Date.Field.Month.MARCH,
                date: 31,
                day: Date.Field.Day.SUNDAY,
                hour: 2
            },
            stop: {
                month: Date.Field.Month.OCTOBER,
                date: 31,
                day: Date.Field.Day.SUNDAY,
                hour: 3
            }
        }
    }
];

Date.TimeZone.CET = new Date.TimeZone("CET", "Central Europe Time", Date.TimeZone.RuleSet.CET);
