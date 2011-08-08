Date.Field.Second.Test = {};

Date.Field.Second.Test.testCreation = function() {
    var second = new Date.Field.Second(1);

    assertEquals(1, second.value());
};

Date.Field.Second.Test.testCreation_Empty = function() {
    assertWithTime(12310, function () {
        var second = new Date.Field.Second();

        assertEquals(12, second.value());
    });
};

Date.Field.Second.Test.testSetValue = function() {
    var second = new Date.Field.Second().value(1);

    assertEquals(1, second.value());
};

Date.Field.Second.Test.testGetMills_Epoch = function() {
    var second = new Date.Field.Second().mills(10120);

    assertEquals(10000, second.mills());
};

Date.Field.Second.Test.testSetMills_2s_Start = function() {
    var second = new Date.Field.Second().mills(2000);

    assertEquals(2, second.value());
};

Date.Field.Second.Test.testSetMills_2s_Before = function() {
    var second = new Date.Field.Second().mills(2000 - 1);

    assertEquals(1, second.value());
};

Date.Field.Second.Test.testSetMills_negative = function() {
    var second = new Date.Field.Second().mills(-62130512882000);

    assertEquals(58, second.value());
};

Date.Field.Second.Test.testMaxHour_Constructor_OK = function() {
    var second = new Date.Field.Second(Date.Field.Second.MAX_SECOND);

    assertEquals(Date.Field.Second.MAX_SECOND, second.value());
};

Date.Field.Second.Test.testMaxHour_Constructor_Fail = function() {
    assertFail(function() {
        new Date.Field.Second(Date.Field.Second.MAX_SECOND + 1);
    });
};

Date.Field.Second.Test.testMinHour_Constructor_OK = function() {
    var second = new Date.Field.Second(Date.Field.Second.MIN_SECOND);

    assertEquals(Date.Field.Second.MIN_SECOND, second.value());
};

Date.Field.Second.Test.testMinHour_Constructor_Fail = function() {
    assertFail(function() {
        new Date.Field.Second(Date.Field.Second.MIN_MINUTE - 1);
    });
};

Date.Field.Second.Test.testMaxHour_Value_OK = function() {
    var second = new Date.Field.Second().value(Date.Field.Second.MAX_SECOND);

    assertEquals(Date.Field.Second.MAX_SECOND, second.value());
};

Date.Field.Second.Test.testMaxHour_Value_Fail = function() {
    assertFail(function() {
        new Date.Field.Second().value(Date.Field.Second.MAX_SECOND + 1);
    });
};

Date.Field.Second.Test.testMinHour_Value_OK = function() {
    new Date.Field.Second(Date.Field.Second.MIN_SECOND);
};

Date.Field.Second.Test.testMinHour_Value_Fail = function() {
    assertFail(function() {
        new Date.Field.Second().value(Date.Field.Second.MIN_SECOND - 1);
    });
};

Date.Field.Second.Test.testValidate_text = function() {
    assertFail(function() {
        Date.Field.Second.validate("a");
    });
};

Date.Field.Second.Test.testValidate_long = function() {
    assertFail(function() {
        Date.Field.Second.validate("11231237012730198239812398");
    });
};

Date.Field.Second.Test.testValidate_hex = function() {
    assertFail(function() {
        Date.Field.Second.validate("0x1");
    });
};

Date.Field.Second.Test.testValidate_zeroTrail = function() {
    assertEquals(12, Date.Field.Second.validate("012"));
};

Date.Field.Second.Test.testValidate_negative = function() {
    assertFail(function() {
        Date.Field.Second.validate("-1");
    });
};
