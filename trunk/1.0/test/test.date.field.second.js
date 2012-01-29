DateTime.Field.Second.Test = {};

DateTime.Field.Second.Test.testSetValue = function() {
    var second = DateTime.Field.Second.Test.createSecond().value(1);

    assertEquals(1, second.value());
};

DateTime.Field.Second.Test.testGetMillis_Epoch = function() {
    var second = DateTime.Field.Second.Test.createSecond().millis(10120);

    assertEquals(10000, second.millis());
};

DateTime.Field.Second.Test.testSetMillis_2s_Start = function() {
    var second = DateTime.Field.Second.Test.createSecond().millis(2000);

    assertEquals(2, second.value());
};

DateTime.Field.Second.Test.testSetMillis_2s_Before = function() {
    var second = DateTime.Field.Second.Test.createSecond().millis(2000 - 1);

    assertEquals(1, second.value());
};

DateTime.Field.Second.Test.testSetMillis_negative = function() {
    var second = DateTime.Field.Second.Test.createSecond().millis(time(2000, 1, 1, 0, 0, 58));

    assertEquals(58, second.value());
};

DateTime.Field.Second.Test.testMaxSecond_Value_OK = function() {
    var second = DateTime.Field.Second.Test.createSecond().value(DateTime.Field.Second.MAX_SECOND);

    assertEquals(DateTime.Field.Second.MAX_SECOND, second.value());
};

DateTime.Field.Second.Test.testMaxSecond_Value_Fail = function() {
    assertFail(function() {
        DateTime.Field.Second.Test.createSecond().value(DateTime.Field.Second.MAX_SECOND + 1);
    });
};

DateTime.Field.Second.Test.testMinSecond_Value_OK = function() {
    var second = DateTime.Field.Second.Test.createSecond().value(DateTime.Field.Second.MIN_SECOND);

    assertEquals(DateTime.Field.Second.MIN_SECOND, second.value());
};

DateTime.Field.Second.Test.testMinSecond_Value_Fail = function() {
    assertFail(function() {
        DateTime.Field.Second.Test.createSecond().value(DateTime.Field.Second.MIN_SECOND - 1);
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

DateTime.Field.Second.Test.createSecond = function(second) {
    second = DateTime.exists(second, 0);

    return new DateTime.Field.Second(mock({time: time(2000, 1, 1, 0, 0, second)}));
};
