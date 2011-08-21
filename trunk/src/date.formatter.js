DateTime.Formatter = (function() {
    var Symbol = function(count, character) {
        this.format = function() {
            return DateTime.trail("", count, character);
        }
    };

    var Era = function(count) {
        this.format = function(calendar) {
            return calendar.withYear() < 0 ? "BC" : "AD";
        }
    };

    var Year = function(count) {
        this.format = function(calendar) {
            return DateTime.trail(Math.abs(calendar.withYear()), count < 4 ? 2 : count);
        }
    };

    var Month = function(count) {
        var fn;

        switch (count) {
            case 1 :
                fn = function(m) { return m };
                break;
            case 2 :
                fn = function(m) { return DateTime.trail(m, 2) };
                break;
            case 3 :
                fn = function(m) { return "Short-" + m };
                break;
            default:
                fn = function(m) { return "Long-" + m };
        }

        this.format = function(calendar) {
            return fn.call(this, calendar.withMonth());
        }
    };

    var WeekOfYear = function(count) {
        this.format = function(calendar) {
            return DateTime.trail(calendar.withWeekOfYear(), count);
        }
    };

    var WeekOfMonth = function(count) {
        this.format = function(calendar) {
            return DateTime.trail(calendar.withWeekOfMonth(), count);
        }
    };

    var DateOfMonth = function(count) {
        this.format = function(calendar) {
            return DateTime.trail(calendar.withDayOfMonth(), count);
        }
    };

    var DayNumeric = function(count) {
        this.format = function(calendar) {
            return DateTime.trail(calendar.withDayOfWeek(), count);
        }
    };

    var DayText = function(count) {
        this.format = function(calendar) {
            return (count < 4 ? "Short-" : "Long-") + calendar.withDayOfWeek();
        }
    };

    var HourOfDay = function(count) {
        this.format = function(calendar) {
            return DateTime.trail(calendar.withHourOfDay(), count);
        }
    };

    var HourOfDayPlus = function(count) {
        this.format = function(calendar) {
            return DateTime.trail(calendar.withHourOfDay() + 1, count);
        }
    };

    var MinuteOfHour = function(count) {
        this.format = function(calendar) {
            return DateTime.trail(calendar.withMinuteOfHour(), count);
        }
    };

    var SecondOfMinute = function(count) {
        this.format = function(calendar) {
            return DateTime.trail(calendar.withSecondOfMinute(), count);
        }
    };

    var MillisOfSecond = function(count) {
        this.format = function(calendar) {
            return DateTime.trail(calendar.millis(), count);
        }
    };

    var TimeZoneText = function(count) {
        this.format = function(calendar) {
            return count < 4 ? calendar.withZone().id : calendar.withZone().name;
        }
    };

    var TimeZoneOffset = function(count) {
        this.format = function(calendar) {
            var offset = DateTime.quotRem(DateTime.quotRem(calendar.withZone().offset(calendar.time()), DateTime.MILLIS_PER_MINUTE).quot, DateTime.MINUTES_PER_HOUR);

            return (offset.quot < 0 ? "-" : "+") + DateTime.trail(offset.quot, 2) + DateTime.trail(offset.rem, 2);
        }
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
    };
})();