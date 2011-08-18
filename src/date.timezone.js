DateTime.TimeZone = function (id, name, rules) {
    var self = this;

    this.id = id;
    this.name = name;

    var year = new DateTime.Field.Year();

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
        return obj ? obj.millis() : 0;
    }

    function calcDelta(obj, month, weekStart) {
        var delta;

        if (obj.date) {
            delta = toTime(_get(DateTime.Field.Date, obj.date, month, weekStart));
        } else {
            delta = toTime(_get(DateTime.Field.WeekOfMonth, obj.week, month, year)) +
                    toTime(_get(DateTime.Field.Day, obj.day, weekStart));

            if (delta > month.duration()) {
                delta -= DateTime.MILLS_PER_WEEK;
            }
        }

        return delta;
    }

    function calculateDST(rule) {
        if (!rule.dst || !rule.dst.start || !rule.dst.stop) {
            return null;
        }

        var weekStart = new (function () {
            this.value = function() {
                return DateTime.exists(rule.weekStart, DateTime.Field.Day.MIN_DAY);
            }
        });

        DateTime.assertTrue(rule.dst.start.month, "Month is missing in DST start settings");
        DateTime.assertTrue(rule.dst.stop.month, "Month is missing in DST stop settings");

        DateTime.assertTrue(rule.dst.start.hour, "Hour is missing in DST start settings");
        DateTime.assertTrue(rule.dst.stop.hour, "Hour is missing in DST stop settings");

        DateTime.assertTrue(rule.dst.start.date || rule.dst.start.week && rule.dst.start.day, "Missing required DST start settings");
        DateTime.assertTrue(rule.dst.stop.date || rule.dst.stop.week && rule.dst.stop.day, "Missing required DST stop settings");

        DateTime.assertTrue(!rule.dst.start.date || !rule.dst.start.week && !rule.dst.start.day, "Ambiguous DST start settings");
        DateTime.assertTrue(!rule.dst.stop.date || !rule.dst.stop.week && !rule.dst.stop.day, "Ambiguous DST stop settings");

        var startMonth = _get(DateTime.Field.Month, rule.dst.start.month, year);
        var stopMonth = _get(DateTime.Field.Month, rule.dst.stop.month, year);

        var startHour = _get(DateTime.Field.Hour, rule.dst.start.hour);
        var stopHour = _get(DateTime.Field.Hour, rule.dst.stop.hour);

        var startTime = toTime(year) + toTime(startMonth) + calcDelta(rule.dst.start, startMonth, weekStart);
        var stopTime = toTime(year) + toTime(stopMonth) + calcDelta(rule.dst.stop, stopMonth, weekStart);

        return {
            start: startTime + toTime(startHour) - rule.offset,
            end: stopTime + toTime(stopHour) - rule.offset - rule.dst.offset
        }
    }

    this.firstDay = function(time) {
        year.millis(time);

        var rule = findRule();

        if (rule && DateTime.exists(rule.weekStart)) {
            return rule.weekStart;
        }

        return Date.Field.Day.MONDAY;
    };

    this.offset = function(time) {
        year.millis(time);

        var rule = findRule();

        if (rule) {
            var dst = calculateDST(rule);

            var dstOffset = dst && dst.start <= time && dst.end > time ? rule.dst.offset : 0;

            return rule.offset + dstOffset;
        }

        throw new Error("Cannot find appropriate rule for the time zone " + self.id);
    };
};

DateTime.TimeZone.RuleSet = {
    UTC: [{
        offset: 0,
        weekStart: DateTime.Field.Day.MONDAY
    }]
};

DateTime.TimeZone.UTC = new DateTime.TimeZone("UTC", "Coordinated Universal Time", DateTime.TimeZone.RuleSet.UTC);
DateTime.TimeZone.DEFAULT = DateTime.TimeZone.UTC;
