DateTime.Field.Millisecond.Test = {};

DateTime.Field.Millisecond.Test.testCreation = function() {
    var millisecond = new DateTime.Field.Millisecond(1);

    assertEquals(1, millisecond.value());
};

DateTime.Field.Millisecond.Test.testCreation_Empty = function() {
    assertWithTime(12310, function () {
        var millisecond = new DateTime.Field.Millisecond();

        assertEquals(310, millisecond.value());
    });
};

DateTime.Field.Millisecond.Test.testSetValue = function() {
    var millisecond = new DateTime.Field.Millisecond().value(1);

    assertEquals(1, millisecond.value());
};

DateTime.Field.Millisecond.Test.testGetMills_Epoch = function() {
    var millisecond = new DateTime.Field.Millisecond().millis(10120);

    assertEquals(120, millisecond.millis());
};

DateTime.Field.Millisecond.Test.testSetMills_0ms_Start = function() {
    var millisecond = new DateTime.Field.Millisecond().millis(0);

    assertEquals(0, millisecond.value());
};

DateTime.Field.Millisecond.Test.testSetMills_0ms_Before = function() {
    var millisecond = new DateTime.Field.Millisecond().millis(-1);

    assertEquals(999, millisecond.value());
};

DateTime.Field.Millisecond.Test.testSetMills_negative = function() {
    var millisecond = new DateTime.Field.Millisecond().millis(-62130512882031);

    assertEquals(969, millisecond.value());
};

DateTime.Field.Millisecond.Test.testMaxHour_Constructor_OK = function() {
    var millisecond = new DateTime.Field.Millisecond(DateTime.Field.Millisecond.MAX_MILLS);

    assertEquals(DateTime.Field.Millisecond.MAX_MILLS, millisecond.value());
};

DateTime.Field.Millisecond.Test.testMaxHour_Constructor_Fail = function() {
    assertFail(function() {
        new DateTime.Field.Millisecond(DateTime.Field.Millisecond.MAX_MILLS + 1);
    });
};

DateTime.Field.Millisecond.Test.testMinHour_Constructor_OK = function() {
    var millisecond = new DateTime.Field.Millisecond(DateTime.Field.Millisecond.MIN_MILLS);

    assertEquals(DateTime.Field.Millisecond.MIN_MILLS, millisecond.value());
};

DateTime.Field.Millisecond.Test.testMinHour_Constructor_Fail = function() {
    assertFail(function() {
        new DateTime.Field.Millisecond(DateTime.Field.Millisecond.MIN_MILLS - 1);
    });
};

DateTime.Field.Millisecond.Test.testMaxHour_Value_OK = function() {
    var millisecond = new DateTime.Field.Millisecond().value(DateTime.Field.Millisecond.MAX_MILLS);

    assertEquals(DateTime.Field.Millisecond.MAX_MILLS, millisecond.value());
};

DateTime.Field.Millisecond.Test.testMaxHour_Value_Fail = function() {
    assertFail(function() {
        new DateTime.Field.Millisecond().value(DateTime.Field.Millisecond.MAX_MILLS + 1);
    });
};

DateTime.Field.Millisecond.Test.testMinHour_Value_OK = function() {
    new DateTime.Field.Millisecond(DateTime.Field.Millisecond.MIN_MILLS);
};

DateTime.Field.Millisecond.Test.testMinHour_Value_Fail = function() {
    assertFail(function() {
        new DateTime.Field.Millisecond().value(DateTime.Field.Millisecond.MIN_MILLS - 1);
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
