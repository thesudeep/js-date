DateTime.Field.Millisecond.Test = {};

DateTime.Field.Millisecond.Test.testCreation = function() {
    var millisecond = new DateTime.Field.Millisecond(mock({time: 123097143}));

    assertEquals(143, millisecond.value());
};

DateTime.Field.Millisecond.Test.testCreation_Empty = function() {
    assertFail(function () {
        new DateTime.Field.Millisecond();
    });
};

DateTime.Field.Millisecond.Test.testSetValue = function() {
    var millisecond = DateTime.Field.Millisecond.Test.createMillis().value(1);

    assertEquals(1, millisecond.value());
};

DateTime.Field.Millisecond.Test.testGetMills_Epoch = function() {
    var millisecond = DateTime.Field.Millisecond.Test.createMillis().millis(10120);

    assertEquals(120, millisecond.millis());
};

DateTime.Field.Millisecond.Test.testSetMills_0ms_Start = function() {
    var millisecond = DateTime.Field.Millisecond.Test.createMillis().millis(0);

    assertEquals(0, millisecond.value());
};

DateTime.Field.Millisecond.Test.testSetMills_0ms_Before = function() {
    var millisecond = DateTime.Field.Millisecond.Test.createMillis().millis(-1);

    assertEquals(999, millisecond.value());
};

DateTime.Field.Millisecond.Test.testSetMills_negative = function() {
    var millisecond = DateTime.Field.Millisecond.Test.createMillis().millis(-62130512882031);

    assertEquals(969, millisecond.value());
};

DateTime.Field.Millisecond.Test.testMaxMills_Constructor_OK = function() {
    var millisecond = DateTime.Field.Millisecond.Test.createMillis(DateTime.Field.Millisecond.MAX_MILLS);

    assertEquals(DateTime.Field.Millisecond.MAX_MILLS, millisecond.value());
};

DateTime.Field.Millisecond.Test.testMinMills_Constructor_OK = function() {
    var millisecond = DateTime.Field.Millisecond.Test.createMillis(DateTime.Field.Millisecond.MIN_MILLS);

    assertEquals(DateTime.Field.Millisecond.MIN_MILLS, millisecond.value());
};

DateTime.Field.Millisecond.Test.testMaxMills_Value_OK = function() {
    var millisecond = DateTime.Field.Millisecond.Test.createMillis().value(DateTime.Field.Millisecond.MAX_MILLS);

    assertEquals(DateTime.Field.Millisecond.MAX_MILLS, millisecond.value());
};

DateTime.Field.Millisecond.Test.testMaxMills_Value_Fail = function() {
    assertFail(function() {
        DateTime.Field.Millisecond.Test.createMillis().value(DateTime.Field.Millisecond.MAX_MILLS + 1);
    });
};

DateTime.Field.Millisecond.Test.testMinMills_Value_OK = function() {
    DateTime.Field.Millisecond.Test.createMillis(DateTime.Field.Millisecond.MIN_MILLS);
};

DateTime.Field.Millisecond.Test.testMinMills_Value_Fail = function() {
    assertFail(function() {
        DateTime.Field.Millisecond.Test.createMillis().value(DateTime.Field.Millisecond.MIN_MILLS - 1);
    });
};

DateTime.Field.Millisecond.Test.testValidate_text = function() {
    assertFail(function() {
        DateTime.Field.Millisecond.validate("a");
    });
};

DateTime.Field.Millisecond.Test.testValidate_long = function() {
    assertFail(function() {
        DateTime.Field.Millisecond.validate("11231237012730198239812398");
    });
};

DateTime.Field.Millisecond.Test.testValidate_hex = function() {
    assertFail(function() {
        DateTime.Field.Millisecond.validate("0x1");
    });
};

DateTime.Field.Millisecond.Test.testValidate_zeroTrail = function() {
    assertEquals(112, DateTime.Field.Millisecond.validate("0112"));
};

DateTime.Field.Millisecond.Test.testValidate_negative = function() {
    assertFail(function() {
        DateTime.Field.Millisecond.validate("-1");
    });
};

DateTime.Field.Millisecond.Test.createMillis = function(millis) {
    millis = DateTime.exists(millis, 0);

    return new DateTime.Field.Millisecond(mock({time: millis}));
};
