DateTime.Formatter = (function() {
    function trail(value, count, symbol) {
        symbol = DateTime.exists(symbol, "0");

        var text = "";

        for (var i = 0; i < count; i++) {
            text += symbol;
        }

        text += value;

        return text.substr(text.length - count)
    }

    var Symbol = function(count, character) {
        this.format = function() {
            return trail("", count, character);
        }
    };

    var Era = function(count) {
        this.format = function(calendar) {
            return calendar.year() < 0 ? "BC" : "AD";
        }
    };

    var Year = function(count) {
        this.format = function(calendar) {
            return trail(Math.abs(calendar.year()), count < 4 ? 2 : count);
        }
    };

    var Month = function(count) {
        var fn;

        switch (count) {
            case 1 :
                fn = function(m) { return m };
                break;
            case 2 :
                fn = function(m) { return trail(m, 2) };
                break;
            case 3 :
                fn = function(m) { return "Short-" + m };
                break;
            default:
                fn = function(m) { return "Long-" + m };
        }

        this.format = function(calendar) {
            return fn.call(this, calendar.month());
        }
    };

    var WeekOfYear = function(count) {
        this.format = function(calendar) {
            return trail(calendar.weekOfYear(), count);
        }
    };

    var WeekOfMonth = function(count) {
        this.format = function(calendar) {
            return trail(calendar.weekOfMonth(), count);
        }
    };

    var DateOfMonth = function(count) {
        this.format = function(calendar) {
            return trail(calendar.date(), count);
        }
    };

    var DayNumeric = function(count) {
        this.format = function(calendar) {
            return trail(calendar.day(), count);
        }
    };

    var DayText = function(count) {
        this.format = function(calendar) {
            return (count < 4 ? "Short-" : "Long-") + calendar.day();
        }
    };

    var HourOfDay = function(count) {
        this.format = function(calendar) {
            return trail(calendar.hour(), count);
        }
    };

    var HourOfDayPlus = function(count) {
        this.format = function(calendar) {
            return trail(calendar.hour() + 1, count);
        }
    };

    var MinuteOfHour = function(count) {
        this.format = function(calendar) {
            return trail(calendar.minute(), count);
        }
    };

    var SecondOfMinute = function(count) {
        this.format = function(calendar) {
            return trail(calendar.second(), count);
        }
    };

    var MillsOfSecond = function(count) {
        this.format = function(calendar) {
            return trail(calendar.mills(), count);
        }
    };

    var TimeZoneText = function(count) {
        this.format = function(calendar) {
            return count < 4 ? calendar.timeZone().id : calendar.timeZone().name;
        }
    };

    var TimeZoneOffset = function(count) {
        this.format = function(calendar) {
            var offset = DateTime.quotRem(DateTime.quotRem(calendar.timeZone().offset(calendar.time()), DateTime.Field.MILLS_PER_MINUTE).quot, DateTime.Field.MINUTES_PER_HOUR);

            return (offset.quot < 0 ? "-" : "+") + trail(offset.quot, 2) + trail(offset.rem, 2);
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
            S: MillsOfSecond, // Millisecond Number 978
            z: TimeZoneText, // Time zone General time zone Pacific Standard Time; PST; GMT-08:00
            Z: TimeZoneOffset // Time zone RFC 822 time zone -0800
        };

        var
                a = [],
                ch = 0,
                count = 0;

        for (var i = 0; i <= pattern.length; i++) {
            if (ch === pattern[i] && i != pattern.length) {
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
                ch = pattern[i];
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