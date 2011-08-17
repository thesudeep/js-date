DateTime.Field.Second.Test = {};

DateTime.Field.Second.Test.testCreation = function() {
    var second = new DateTime.Field.Second(1);

    assertEquals(1, second.value());
};

DateTime.Field.Second.Test.testCreation_Empty = function() {
    assertWithTime(12310, function () {
        var second = new DateTime.Field.Second();

        assertEquals(12, second.value());
    });
};

DateTime.Field.Second.Test.testSetValue = function() {
    var second = new DateTime.Field.Second().value(1);

    assertEquals(1, second.value());
};

DateTime.Field.Second.Test.testGetMills_Epoch = function() {
    var second = new DateTime.Field.Second().millis(10120);

    assertEquals(10000, second.millis());
};

DateTime.Field.Second.Test.testSetMills_2s_Start = function() {
    var second = new DateTime.Field.Second().millis(2000);

    assertEquals(2, second.value());
};

DateTime.Field.Second.Test.testSetMills_2s_Before = function() {
    var second = new DateTime.Field.Second().millis(2000 - 1);

    assertEquals(1, second.value());
};

DateTime.Field.Second.Test.testSetMills_negative = function() {
    var second = new DateTime.Field.Second().millis(-62130512882000);

    assertEquals(58, second.value());
};

DateTime.Field.Second.Test.testMaxHour_Constructor_OK = function() {
    var second = new DateTime.Field.Second(DateTime.Field.Second.MAX_SECOND);

    assertEquals(DateTime.Field.Second.MAX_SECOND, second.value());
};

DateTime.Field.Second.Test.testMaxHour_Constructor_Fail = function() {
    assertFail(function() {
        new DateTime.Field.Second(DateTime.Field.Second.MAX_SECOND + 1);
    });
};

DateTime.Field.Second.Test.testMinHour_Constructor_OK = function() {
    var second = new DateTime.Field.Second(DateTime.Field.Second.MIN_SECOND);

    assertEquals(DateTime.Field.Second.MIN_SECOND, second.value());
};

DateTime.Field.Second.Test.testMinHour_Constructor_Fail = function() {
    assertFail(function() {
        new DateTime.Field.Second(DateTime.Field.Second.MIN_MINUTE - 1);
    });
};

DateTime.Field.Second.Test.testMaxHour_Value_OK = function() {
    var second = new DateTime.Field.Second().value(DateTime.Field.Second.MAX_SECOND);

    assertEquals(DateTime.Field.Second.MAX_SECOND, second.value());
};

DateTime.Field.Second.Test.testMaxHour_Value_Fail = function() {
    assertFail(function() {
        new DateTime.Field.Second().value(DateTime.Field.Second.MAX_SECOND + 1);
    });
};

DateTime.Field.Second.Test.testMinHour_Value_OK = function() {
    new DateTime.Field.Second(DateTime.Field.Second.MIN_SECOND);
};

DateTime.Field.Second.Test.testMinHour_Value_Fail = function() {
    assertFail(function() {
        new DateTime.Field.Second().value(DateTime.Field.Second.MIN_SECOND - 1);
    });
};

DateTime.Field.Second.Test.testValidate_text = function() {
    assertFail(function() {
        DateTime.Field.Second.validate("a");
    });
};

DateTime.Field.Second.Test.testValidate_long = function() {
    assertFail(function() {
        DateTime.Field.Second.validate("11231237012730198239812398");
    });
};

DateTime.Field.Second.Test.testValidate_hex = function() {
    assertFail(function() {
        DateTime.Field.Second.validate("0x1");
    });
};

DateTime.Field.Second.Test.testValidate_zeroTrail = function() {
    assertEquals(12, DateTime.Field.Second.validate("012"));
};

DateTime.Field.Second.Test.testValidate_negative = function() {
    assertFail(function() {
        DateTime.Field.Second.validate("-1");
    });
};
