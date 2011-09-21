DateTime.Formatter = (function() {
    var Symbol = function(count, character) {
        this.format = function() {
            return DateTime.trail("", count, character);
        };

        this.parse = function(j, value, calendar) {
            return j + count;
        };
    };

    var Era = function(count) {
        this.format = function(calendar) {
            return calendar.withYear() < 0 ? "BC" : "AD";
        };

        this.parse = function(j, value, calendar) {
            var val = value.substr(j, 2);

            j += 2; //TODO<vpolischuk>: add era support in the calendar

            switch (val) {
                case "BC":
                    calendar.withYear(-Math.abs(calendar.withYear()));
                    break;
                case "AD":
                    calendar.withYear(Math.abs(calendar.withYear()));
                    break;
            }

            return j;
        };
    };

    var Year = function(count) {
        this.format = function(calendar) {
            return DateTime.trail(Math.abs(calendar.withYear()), count < 4 ? 2 : count);
        };

        this.parse = function(j, value, calendar) {
            var val = DateTime.validateInt(value.substr(j, count));

            if (count === 2) {
                val += val < 32 ? 2000 : 1900;
            }

            calendar.withYear(val);

            return j + count;
        };
    };

    var Month = function(count) {
        var fnFormat;
        var fnParse;

        switch (count) {
            case 1 :
                fnFormat = function(m) { return String(m); };
                fnParse = function(value) { return DateTime.validateInt(value)};
                break;
            case 2 :
                fnFormat = function(m) { return DateTime.trail(m, 2) };
                fnParse = function(value) { return DateTime.validateInt(value)};
                break;
            case 3 :
                fnFormat = function(m) { return "Short-" + m };//TODO<vpolischu>: I18n settings required
                fnParse = function(value) { return DateTime.validateInt(value)};
                break;
            default:
                fnFormat = function(m) { return "Long-" + m };//TODO<vpolischu>: I18n settings required
                fnParse = function(value) { return DateTime.validateInt(value)};
        }

        this.format = function(calendar) {
            return fnFormat.call(this, calendar.withMonth());
        };

        this.parse = function(j, value, calendar) {
            var val = value.substr(j, count); //TODO<vpolischu>: I18n settings required.

            calendar.withMonth(fnParse.call(this, val));

            return j + count;
        };
    };

    var WeekOfYear = function(count) {
        this.format = function(calendar) {
            return DateTime.trail(calendar.withWeekOfYear(), count);
        };

        this.parse = function(j, value, calendar) {
            var val = DateTime.validateInt(value.substr(j, count));

            calendar.withWeekOfYear(val);

            return j + count;
        };
    };

    var WeekOfMonth = function(count) {
        this.format = function(calendar) {
            return DateTime.trail(calendar.withWeekOfMonth(), count);
        };

        this.parse = function(j, value, calendar) {
            var val = DateTime.validateInt(value.substr(j, count));

            calendar.withWeekOfMonth(val);

            return j + count;
        };
    };

    var DateOfMonth = function(count) {
        this.format = function(calendar) {
            return DateTime.trail(calendar.withDayOfMonth(), count);
        };

        this.parse = function(j, value, calendar) {
            var val = DateTime.validateInt(value.substr(j, count));

            calendar.withDayOfMonth(val);

            return j + count;
        };
    };

    var DayNumeric = function(count) {
        this.format = function(calendar) {
            return DateTime.trail(calendar.withDayOfWeek(), count);
        };

        this.parse = function(j, value, calendar) {
            var val = DateTime.validateInt(value.substr(j, count));

            calendar.withDayOfWeek(val);

            return j + count;
        };
    };

    var DayText = function(count) {
        this.format = function(calendar) {
            return (count < 4 ? "Short-" : "Long-") + calendar.withDayOfWeek();
        };

        this.parse = function(j, value, calendar) { //TODO<vpolischu>: I18n settings required.
            var val = DateTime.validateInt(value.substr(j, count));

            calendar.withDayOfWeek(val);

            return j + count;
        };
    };

    var HourOfDay = function(count) {
        this.format = function(calendar) {
            return DateTime.trail(calendar.withHourOfDay(), count);
        };

        this.parse = function(j, value, calendar) {
            var val = DateTime.validateInt(value.substr(j, count));

            calendar.withHourOfDay(val);

            return j + count;
        };
    };

    var HourOfDayPlus = function(count) {
        this.format = function(calendar) {
            return DateTime.trail(calendar.withHourOfDay() + 1, count);
        };

        this.parse = function(j, value, calendar) {
            var val = DateTime.validateInt(value.substr(j, count));

            calendar.withHourOfDay(val);

            return j + count;
        };
    };

    var MinuteOfHour = function(count) {
        this.format = function(calendar) {
            return DateTime.trail(calendar.withMinuteOfHour(), count);
        };

        this.parse = function(j, value, calendar) {
            var val = DateTime.validateInt(value.substr(j, count));

            calendar.withMinuteOfHour(val);

            return j + count;
        };
    };

    var SecondOfMinute = function(count) {
        this.format = function(calendar) {
            return DateTime.trail(calendar.withSecondOfMinute(), count);
        };

        this.parse = function(j, value, calendar) {
            var val = DateTime.validateInt(value.substr(j, count));

            calendar.withSecondOfMinute(val);

            return j + count;
        };
    };

    var MillisOfSecond = function(count) {
        this.format = function(calendar) {
            return DateTime.trail(calendar.millis(), count);
        };

        this.parse = function(j, value, calendar) {
            var val = DateTime.validateInt(value.substr(j, count));

            calendar.withMillisOfSecond(val);

            return j + count;
        };
    };

    var TimeZoneText = function(count) {
        this.format = function(calendar) {
            return count < 4 ? calendar.withZone().id : calendar.withZone().name;
        };

        this.parse = function(j, value, calendar) {
            throw new Error("not implemented yet"); //TODO<vpolischuk>: implement it
        };
    };

    var TimeZoneOffset = function() {
        this.format = function(calendar) {
            var offset = DateTime.quotRem(DateTime.quotRem(calendar.withZone().offset(calendar.time()), DateTime.MILLIS_PER_MINUTE).quot, DateTime.MINUTES_PER_HOUR);

            return (offset.quot < 0 ? "-" : "+") + DateTime.trail(offset.quot, 2) + DateTime.trail(offset.rem, 2);
        };

        this.parse = function(j, value, calendar) {
            throw new Error("not implemented yet"); //TODO<vpolischuk>: implement it
        };
    };

    return function(pattern) {
        var format = {
            G: Era, // Era designator Text AD
            y: Year, // Year Year 1996; 96
            M: Month, // Month in year Month July; Jul; 07
            w: WeekOfYear, // Week in year Number 27
            W: WeekOfMonth, // Week in month Number 2
            D: function() {throw new Error("not implemented yet")},// Day in year Number 189
            d: DateOfMonth, // Day in month Number 10
            F: DayNumeric, // Day of week in month Number 2
            E: DayText, // Day in week Text Tuesday; Tue
            a: function() {throw new Error("not implemented yet")},// Am/pm marker Text PM
            H: HourOfDay, // Hour in day (0-23) Number 0
            k: HourOfDayPlus, // Hour in day (1-24) Number 24
            K: function() {throw new Error("not implemented yet")},// Hour in am/pm (0-11) Number 0
            h: function() {throw new Error("not implemented yet")},// Hour in am/pm (1-12) Number 12
            m: MinuteOfHour, // Minute in hour Number 30
            s: SecondOfMinute, // Second in minute Number 55
            S: MillisOfSecond, // Millisecond Number 978
            z: TimeZoneText, // Time zone General time zone Pacific Standard Time; PST; GMT-08:00
            Z: TimeZoneOffset // Time zone RFC 822 time zone -0800
        };

        var ch,
                a = [],
                count = 0;

        for (var i = 0; i <= pattern.length; i++) {
            if (ch === pattern.charAt(i) && i !== pattern.length) {
                count++;
            } else {
                if (count > 0) {
                    var method = format[ch];

                    if (method) {
                        a[a.length] = new method(count);
                    } else {
                        a[a.length] = new Symbol(count, ch);
                    }
                }

                count = 1;
                ch = pattern.charAt(i);
            }
        }

        this.format = function(time) {
            var text = "", calendar = time;

            if (!(time instanceof DateTime.Calendar)) {
                calendar = new DateTime.Calendar(time);
            }

            for (var i in a) {
                text += a[i].format(calendar);
            }

            return text;
        };

        this.parse = function(value) {
            var j = 0;
            var calendar = new DateTime.Calendar(0, DateTime.TimeZone.DEFAULT);

            for (var i in a) {
                j = a[i].parse(j, value, calendar);
            }

            return calendar;
        };
    };
})();