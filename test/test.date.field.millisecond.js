Date.Field.Millisecond.Test = {};

Date.Field.Millisecond.Test.testCreation = function() {
    var millisecond = new Date.Field.Millisecond(1);

    assertEquals(1, millisecond.value());
};

Date.Field.Millisecond.Test.testCreation_Empty = function() {
    assertWithTime(12310, function () {
        var millisecond = new Date.Field.Millisecond();

        assertEquals(310, millisecond.value());
    });
};

Date.Field.Millisecond.Test.testSetValue = function() {
    var millisecond = new Date.Field.Millisecond().value(1);

    assertEquals(1, millisecond.value());
};

Date.Field.Millisecond.Test.testGetMills_Epoch = function() {
    var millisecond = new Date.Field.Millisecond().mills(10120);

    assertEquals(120, millisecond.mills());
};

Date.Field.Millisecond.Test.testSetMills_0ms_Start = function() {
    var millisecond = new Date.Field.Millisecond().mills(0);

    assertEquals(0, millisecond.value());
};

Date.Field.Millisecond.Test.testSetMills_0ms_Before = function() {
    var millisecond = new Date.Field.Millisecond().mills(-1);

    assertEquals(999, millisecond.value());
};

Date.Field.Millisecond.Test.testSetMills_negative = function() {
    var millisecond = new Date.Field.Millisecond().mills(-62130512882031);

    assertEquals(969, millisecond.value());
};

Date.Field.Millisecond.Test.testMaxHour_Constructor_OK = function() {
    var millisecond = new Date.Field.Millisecond(Date.Field.Millisecond.MAX_MILLS);

    assertEquals(Date.Field.Millisecond.MAX_MILLS, millisecond.value());
};

Date.Field.Millisecond.Test.testMaxHour_Constructor_Fail = function() {
    assertFail(function() {
        new Date.Field.Millisecond(Date.Field.Millisecond.MAX_MILLS + 1);
    });
};

Date.Field.Millisecond.Test.testMinHour_Constructor_OK = function() {
    var millisecond = new Date.Field.Millisecond(Date.Field.Millisecond.MIN_MILLS);

    assertEquals(Date.Field.Millisecond.MIN_MILLS, millisecond.value());
};

Date.Field.Millisecond.Test.testMinHour_Constructor_Fail = function() {
    assertFail(function() {
        new Date.Field.Millisecond(Date.Field.Millisecond.MIN_MILLS - 1);
    });
};

Date.Field.Millisecond.Test.testMaxHour_Value_OK = function() {
    var millisecond = new Date.Field.Millisecond().value(Date.Field.Millisecond.MAX_MILLS);

    assertEquals(Date.Field.Millisecond.MAX_MILLS, millisecond.value());
};

Date.Field.Millisecond.Test.testMaxHour_Value_Fail = function() {
    assertFail(function() {
        new Date.Field.Millisecond().value(Date.Field.Millisecond.MAX_MILLS + 1);
    });
};

Date.Field.Millisecond.Test.testMinHour_Value_OK = function() {
    new Date.Field.Millisecond(Date.Field.Millisecond.MIN_MILLS);
};

Date.Field.Millisecond.Test.testMinHour_Value_Fail = function() {
    assertFail(function() {
        new Date.Field.Millisecond().value(Date.Field.Millisecond.MIN_MILLS - 1);
    });
};

Date.Field.Millisecond.Test.testValidate_text = function() {
    assertFail(function() {
        Date.Field.Millisecond.validate("a");
    });
};

Date.Field.Millisecond.Test.testValidate_long = function() {
    assertFail(function() {
        Date.Field.Millisecond.validate("11231237012730198239812398");
    });
};

Date.Field.Millisecond.Test.testValidate_hex = function() {
    assertFail(function() {
        Date.Field.Millisecond.validate("0x1");
    });
};

Date.Field.Millisecond.Test.testValidate_zeroTrail = function() {
    assertEquals(112, Date.Field.Millisecond.validate("0112"));
};

Date.Field.Millisecond.Test.testValidate_negative = function() {
    assertFail(function() {
        Date.Field.Millisecond.validate("-1");
    });
};
