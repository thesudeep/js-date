function fail(message) {
    throw new Error(message);
}

function time(year, month, date, hour, min, sec, ms) {
    var d = new Date();

    arguments.length >= 1 && d.setUTCFullYear(year);
    arguments.length >= 2 && d.setUTCMonth(month - 1);
    arguments.length >= 3 && d.setUTCDate(date);
    arguments.length >= 4 && d.setUTCHours(hour);
    arguments.length >= 5 && d.setUTCMinutes(min);
    arguments.length >= 6 && d.setUTCSeconds(sec);
    arguments.length >= 7 && d.setUTCMilliseconds(ms);

    return d.getTime();
}

function assertEquals(expected, actual) {
    if (expected != actual) {
        fail("Expected (" + expected + ") but was (" + actual + ")");
    }
}

function assertFail(fn) {
    var failed = false;

    try {
        fn.call(this);
    } catch (e) {
        failed = true;
    }

    if (!failed) {
        fail("Expected exception missing");
    }
}

function assertWithTime(millis, fn) {
    var copyFn = DateTime.currentTimeMillis;

    try {
        DateTime.currentTimeMillis = function() {
            return millis;
        };

        fn.call(this);
    } finally {
        DateTime.currentTimeMillis = copyFn;
    }
}