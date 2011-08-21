DateTime.TimeZone = function (id, name, rules) {
    var self = this;

    var dst = null;
    var yearValue = null;

    function findRule(year) {
        for (var i in rules) {
            var rule = rules[i];

            if (rule && (rule.applyYear === undefined || rule.applyYear <= year) && (rule.cancelYear === undefined || rule.cancelYear > year)) {
                return rule;
            }
        }

        return null;
    }

    function TimeZoneCalendar() {
        var year, month, hour, daysOfMonth, day, weekOfMonth,
                instant = 0,
                me = this;

        function calculate(obj) {
            month.value(obj.month);
            hour.value(obj.hour);

            var delta;

            if (obj.daysOfMonth !== undefined) {
                delta = daysOfMonth.value(obj.daysOfMonth).millis();
            } else {
                delta = weekOfMonth.value(obj.week).millis() + day.value(obj.daysOfWeek).millis();

                if (delta > month.duration()) {
                    delta -= DateTime.MILLIS_PER_WEEK;
                }
            }

            return delta + year.millis() + month.millis() + hour.millis();
        }

        this.time = function(value) {
            if (arguments.length === 0) {
                return instant;
            }

            if (instant !== value) {
                instant = value;

                month.millis(instant);
                hour.millis(instant);

                me.rule = findRule(year.value());
            }

            return me;
        };

        this.withYear = function() {
            return year;
        };

        this.withMonth = function() {
            return month;
        };

        this.withDayOfMonth = function() {
            return daysOfMonth;
        };

        this.withFirstWeekDay = function() {
            if (!me.rule || me.rule.weekStart === undefined) {
                return DateTime.Field.DaysOfWeek.MIN_DAY;
            }

            return me.rule.weekStart;
        };

        this.startDst = function() {
            DateTime.assertTrue(me.rule.dst.start.month, "Month is missing in DST start settings");
            DateTime.assertTrue(me.rule.dst.start.hour, "Hour is missing in DST start settings");
            DateTime.assertTrue(me.rule.dst.start.daysOfMonth || me.rule.dst.start.week && me.rule.dst.start.daysOfWeek, "Missing required DST start settings");
            DateTime.assertTrue(!me.rule.dst.start.daysOfMonth || !me.rule.dst.start.week && !me.rule.dst.start.daysOfWeek, "Ambiguous DST start settings");

            return calculate(me.rule.dst.start) - me.rule.offset;
        };

        this.stopDst = function() {
            DateTime.assertTrue(me.rule.dst.stop.month, "Month is missing in DST stop settings");
            DateTime.assertTrue(me.rule.dst.stop.hour, "Hour is missing in DST stop settings");
            DateTime.assertTrue(me.rule.dst.stop.daysOfMonth || me.rule.dst.stop.week && me.rule.dst.stop.daysOfWeek, "Missing required DST stop settings");
            DateTime.assertTrue(!me.rule.dst.stop.daysOfMonth || !me.rule.dst.stop.week && !me.rule.dst.stop.daysOfWeek, "Ambiguous DST stop settings");

            return calculate(me.rule.dst.stop) - me.rule.offset - me.rule.dst.offset;
        };


        this.rule = findRule(DateTime.Field.Year.EPOCH);

        year = new DateTime.Field.Year(this);
        month = new DateTime.Field.Month(this);
        hour = new DateTime.Field.Hour(this);

        daysOfMonth = new DateTime.Field.DaysOfMonth(this);
        day = new DateTime.Field.DaysOfWeek(this);
        weekOfMonth = new DateTime.Field.WeekOfMonth(this);
    }

    this.firstDay = function(time) {
        return self._calendar.time(time).withFirstWeekDay();
    };

    this.dstShift = function(time) {
        var cal = self._calendar.time(time);

        if (cal.rule && cal.rule.dst && cal.rule.dst.start && cal.rule.dst.stop && cal.rule.dst.offset) {
            return cal.rule.dst.offset;
        }

        return 0;
    };

    this.offset = function(time) {
        var cal = self._calendar.time(time);

        if (cal.rule) {
            var rule = cal.rule;

            if (self.dstShift(time) === 0) {
                return rule.offset;
            }

            if (yearValue !== cal.withYear().value() || dst === null) {
                yearValue = cal.withYear().value();

                dst = {
                    start: self._calendar.startDst(),
                    end: self._calendar.stopDst()
                };
            }

            var dstOffset = dst.start <= time && dst.end > time ? rule.dst.offset : 0;

            return rule.offset + dstOffset;
        }

        throw new Error("Cannot find appropriate rule for the time zone " + self.id);
    };

    this.id = id;
    this.name = name;
    this._calendar = new TimeZoneCalendar();
};

DateTime.TimeZone.RuleSet = {
    UTC: [{
        offset: 0,
        weekStart: DateTime.Field.DaysOfWeek.MONDAY
    }]
};

DateTime.TimeZone.UTC = new DateTime.TimeZone("UTC", "Coordinated Universal Time", DateTime.TimeZone.RuleSet.UTC);
DateTime.TimeZone.DEFAULT = DateTime.TimeZone.UTC;
