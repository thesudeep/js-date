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