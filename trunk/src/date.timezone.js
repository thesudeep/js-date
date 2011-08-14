Date.TimeZone = function (id, name, rules) {
    this.id = id;
    this.name = name;

    var year = new Date.Field.Year();

    function findRule() {
        for (var i in rules) {
            var rule = rules[i];

            if (rule && (rule.applyYear === undefined || rule.applyYear <= year.value()) && (rule.cancelYear === undefined || rule.cancelYear > year.value())) {
                return rule;
            }
        }

        return null;
    }

    function _get(DateField, ruleValue) {
        if (ruleValue) {
            switch (arguments.length) {
                case 2:
                    return new DateField(ruleValue);
                case 3:
                    return new DateField(ruleValue, arguments[2].value());
                case 4:
                    return new DateField(ruleValue, arguments[2].value(), arguments[3].value());
            }
        }

        return null;
    }

    function toTime(obj) {
        return obj ? obj.mills() : 0;
    }

    function calculateDST(rule) {
        if (!rule.dst || !rule.dst.start || !rule.dst.stop) {
            return null;
        }

        Date.Util.assertTrue(rule.dst.start.month, "Month is missing in DST start settings");
        Date.Util.assertTrue(rule.dst.stop.month, "Month is missing in DST stop settings");

        Date.Util.assertTrue(rule.dst.start.hour, "Hour is missing in DST start settings");
        Date.Util.assertTrue(rule.dst.stop.hour, "Hour is missing in DST stop settings");

        Date.Util.assertTrue(rule.dst.start.date || rule.dst.start.week && rule.dst.start.day, "Missing required DST start settings");
        Date.Util.assertTrue(rule.dst.stop.date || rule.dst.stop.week && rule.dst.stop.day, "Missing required DST stop settings");

        Date.Util.assertTrue(!rule.dst.start.date || !rule.dst.start.week && !rule.dst.start.day, "Ambiguous DST start settings");
        Date.Util.assertTrue(!rule.dst.stop.date || !rule.dst.stop.week && !rule.dst.stop.day, "Ambiguous DST stop settings");

        var startMonth = _get(Date.Field.Month, rule.dst.start.month, year);
        var stopMonth = _get(Date.Field.Month, rule.dst.stop.month, year);

        var startHour = _get(Date.Field.Hour, rule.dst.start.hour);
        var stopHour = _get(Date.Field.Hour, rule.dst.stop.hour);

        var startTime = toTime(year) + toTime(startMonth);
        var stopTime = toTime(year) + toTime(stopMonth);

        if (rule.dst.start.date) {
            startTime += toTime(_get(Date.Field.Date, rule.dst.start.date, startMonth, year));
        } else {
            var delta = toTime(_get(Date.Field.WeekOfMonth, rule.dst.start.week, startMonth, year)) +
                    toTime(_get(Date.Field.Day, rule.dst.start.day)) +
                    (Date.Field.Day.MIN_DAY - Date.Field.WeekOfMonth.FIRST_DAY) * Date.Field.MILLS_PER_DAY;

            if (delta > startMonth.duration()) {
                delta -= Date.Field.MILLS_PER_WEEK;
            }

            startTime += delta;
        }

        if (rule.dst.stop.date) {
            stopTime += toTime(_get(Date.Field.Date, rule.dst.stop.date, stopMonth, year));
        } else {
            stopTime += toTime(_get(Date.Field.WeekOfMonth, rule.dst.stop.week, stopMonth, year));
            stopTime += toTime(_get(Date.Field.Day, rule.dst.stop.day)) + (Date.Field.Day.MIN_DAY - Date.Field.WeekOfMonth.FIRST_DAY) * Date.Field.MILLS_PER_DAY;
        }

        return {
            start: startTime + toTime(startHour) + rule.offset,
            end: stopTime + toTime(stopHour) + rule.offset + rule.dst.offset
        }
    }

    this.offset = function(time) {
        year.mills(time);

        var rule = findRule();

        if (rule) {
            var dst = calculateDST(rule);

            var dstOffset = dst && dst.start <= time && dst.end > time ? rule.dst.offset : 0;

            return rule.offset + dstOffset;
        }

        return 0;
    };
};

Date.TimeZone.RuleSet = {};