var counterIndex = -1;
var counter = [];

function fail(message) {
    throw new Error(message);
}

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

function trail(n) {
    if (n >= 1000) {
        return n;
    } else {
        return DateTime.trail(n, 3, "0");
    }
}

function mock(obj) {
    var mock = {};

    for (var i in obj) {
        mock[i] = (function(val, self) {
            return function() {
                if (arguments.length === 0) {
                    if (typeof (val) !== "function") {
                        return val;
                    } else {
                        return val.call(self);
                    }
                }

                if (typeof (val) === "function") {
                    val.apply(self, arguments);
                }

                return self;
            }
        })(obj[i], mock);
    }

    return mock;
}

function assertEquals(expected, actual) {
    if (expected != actual) {
        var message = "Expected (" + expected + ") but was (" + actual + ")";

        if (expected > DateTime.Field.Year.MILLIS_PER_NORMAL_YEAR) {
            message += ". -- " + new Date(expected).toUTCString() + "Z -> " + new Date(actual).toUTCString() + "Z";
        }

        fail(message);
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
    var copyFn = Date.prototype.getTime;

    try {
        Date.prototype.getTime = function() {
            return millis;
        };

        fn.call(this);
    } finally {
        Date.prototype.getTime = copyFn;
    }
}

function $(id) {
    return document.getElementById(id);
}

function startTimer() {
    counter[++counterIndex] = new Date().getTime();
}

function stopTimer() {
    if (counterIndex < 0) {
        throw new Error("Timer has not been started");
    }

    return new Date().getTime() - counter[counterIndex--];
}

function runSuite(name, test) {
    append("root", "<span id='" + name + "_text' class='text'></span> " + name + " (<span id='" + name+ "_success' class='success'></span>:<span id='" + name+ "_failure' class='failure'></span>)<ul id='" + name + "'></ul>");

    var textSpan = $(name + "_text");
    var successSpan = $(name + "_success");
    var failureSpan = $(name + "_failure");
    var suiteContainer = $(name);

    textSpan.innerHTML = "Running...";

    var suiteTime, time, cs, cf, message, className;

    suiteTime = cs = cf = 0;

    for (var i in test) {
        var f = test[i];

        if (typeof (f) === "function" && String(i).match(/^test.*$/)) {
            startTimer();

            try {
                f.call(this);

                message = "Success <span class='method'>" + i + "</span>", className = "success";

                successSpan.innerHTML = ++cs;
            } catch (e) {
                message = "Failure <span class='method'>" + i + "</span>: " + e.message, className = "failure";

                failureSpan.innerHTML = ++cf;
            } finally {
                time = stopTimer();

                message = "<span>" + trail(time) + "ms.</span> " + message;

                suiteTime += time;
            }

            setClass(append(name, message), className);
        }
    }

    textSpan.innerHTML = trail(suiteTime) + "ms.</span>";
    successSpan.innerHTML = "" + cs;
    failureSpan.innerHTML = "" + cf;

    setClass(suiteContainer.parentNode, cf === 0 ? "success" : "failure");

    return cf + cs;
}

function append(id, html) {
    var elem = document.createElement("li");

    $(id).appendChild(elem);

    elem.innerHTML = html;

    return elem;
}

function setClass(elem, className) {
    elem.setAttribute("class", className);
    elem.setAttribute("className", className);
}