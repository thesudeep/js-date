function fail(message) {
    throw new Error(message);
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

function assertWithTime(mills, fn) {
    var copyFn = Date.prototype.getTime;

    try {
        Date.prototype.getTime = function() {
            return mills;
        }

        fn.call(this);
    } finally {
        Date.prototype.getTime = copyFn;
    }
}