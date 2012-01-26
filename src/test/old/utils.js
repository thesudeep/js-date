function time(year, month, daysOfMonth, hour, min, sec, ms) {
    var d = new Date(0);

    arguments.length >= 1 && d.setUTCFullYear(year < 0 ? year + 1 : year);
    arguments.length >= 2 && d.setUTCMonth(month - 1);
    arguments.length >= 3 && d.setUTCDate(daysOfMonth);
    arguments.length >= 4 && d.setUTCHours(hour);
    arguments.length >= 5 && d.setUTCMinutes(min);
    arguments.length >= 6 && d.setUTCSeconds(sec);
    arguments.length >= 7 && d.setUTCMilliseconds(ms);

    return d.getTime();
}