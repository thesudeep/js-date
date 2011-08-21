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
        var year, month, hour, date, day, weekOfMonth,
                instant = 0,
                me = this;

        function calculate(obj) {
            month.value(obj.month);
            hour.value(obj.hour);

            var delta;

            if (obj.date !== undefined) {
                delta = date.value(obj.date).millis();
            } else {
                delta = weekOfMonth.value(obj.week).millis() + day.value(obj.day).millis();

                if (delta > month.duration()) {
                    delta -= DateTime.MILLS_PER_WEEK;
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

        this.year = function() {
            return year;
        };

        this.month = function() {
            return month;
        };

        this.firstDay = function() {
            if (!me.rule || me.rule.weekStart === undefined) {
                return DateTime.Field.Day.MIN_DAY;
            }

            return me.rule.weekStart;
        };

        this.startDst = function() {
            DateTime.assertTrue(me.rule.dst.start.month, "Month is missing in DST start settings");
            DateTime.assertTrue(me.rule.dst.start.hour, "Hour is missing in DST start settings");
            DateTime.assertTrue(me.rule.dst.start.date || me.rule.dst.start.week && me.rule.dst.start.day, "Missing required DST start settings");
            DateTime.assertTrue(!me.rule.dst.start.date || !me.rule.dst.start.week && !me.rule.dst.start.day, "Ambiguous DST start settings");

            return calculate(me.rule.dst.start) - me.rule.offset;
        };

        this.stopDst = function() {
            DateTime.assertTrue(me.rule.dst.stop.month, "Month is missing in DST stop settings");
            DateTime.assertTrue(me.rule.dst.stop.hour, "Hour is missing in DST stop settings");
            DateTime.assertTrue(me.rule.dst.stop.date || me.rule.dst.stop.week && me.rule.dst.stop.day, "Missing required DST stop settings");
            DateTime.assertTrue(!me.rule.dst.stop.date || !me.rule.dst.stop.week && !me.rule.dst.stop.day, "Ambiguous DST stop settings");

            return calculate(me.rule.dst.stop) - me.rule.offset - me.rule.dst.offset;
        };


        this.rule = findRule(DateTime.Field.Year.EPOCH);

        year = new DateTime.Field.Year(this);
        month = new DateTime.Field.Month(this);
        hour = new DateTime.Field.Hour(this);

        date = new DateTime.Field.Date(this);
        day = new DateTime.Field.Day(this);
        weekOfMonth = new DateTime.Field.WeekOfMonth(this);
    }

    this.firstDay = function(time) {
        return self._calendar.time(time).firstDay();
    };

    this.offset = function(time) {
        self._calendar.time(time);

        if (self._calendar.rule) {
            var rule = self._calendar.rule;

            if (!rule.dst || !rule.dst.start || !rule.dst.stop) {
                return rule.offset;
            }

            if (yearValue !== self._calendar.year().value() || dst === null) {
                yearValue = self._calendar.year().value();

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
        weekStart: DateTime.Field.Day.MONDAY
    }]
};

DateTime.TimeZone.UTC = new DateTime.TimeZone("UTC", "Coordinated Universal Time", DateTime.TimeZone.RuleSet.UTC);
DateTime.TimeZone.DEFAULT = DateTime.TimeZone.UTC;
