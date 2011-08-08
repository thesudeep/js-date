Date.Field.Minute.Test = {};

Date.Field.Minute.Test.testCreation = function() {
    var minute = new Date.Field.Minute(1);

    assertEquals(1, minute.value());
};

Date.Field.Minute.Test.testCreation_Empty = function() {
    assertWithTime(10 * Date.Field.MILLS_PER_MINUTE + 1231, function () {
        var minute = new Date.Field.Minute();

        assertEquals(10, minute.value());
    });
};

Date.Field.Minute.Test.testSetValue = function() {
    var minute = new Date.Field.Minute().value(1);

    assertEquals(1, minute.value());
};

Date.Field.Minute.Test.testGetMills_Epoch = function() {
    var minute = new Date.Field.Minute().mills(10120);

    assertEquals(0, minute.mills());
};

Date.Field.Minute.Test.testGetMills_Mills_10m = function() {
    var minute = new Date.Field.Minute().mills(10 * Date.Field.MILLS_PER_MINUTE + 1231);

    assertEquals(10 * Date.Field.MILLS_PER_MINUTE, minute.mills());
};

Date.Field.Minute.Test.testGetMills_Mills_2m = function() {
    var minute = new Date.Field.Minute().mills(Date.Field.MILLS_PER_MINUTE * 2 + 1221);

    assertEquals(2 * Date.Field.MILLS_PER_MINUTE, minute.mills());
};

Date.Field.Minute.Test.testSetMills_2m_Start = function() {
    var minute = new Date.Field.Minute().mills(Date.Field.MILLS_PER_MINUTE * 2 + 1221);

    assertEquals(2, minute.value());
};

Date.Field.Minute.Test.testSetMills_2m_Before = function() {
    var minute = new Date.Field.Minute().mills(Date.Field.MILLS_PER_MINUTE * 2 - 1);

    assertEquals(1, minute.value());
};

Date.Field.Minute.Test.testSetMills_negative = function() {
    var minute = new Date.Field.Minute().mills(-62130512880000);

    assertEquals(12, minute.value());
};

Date.Field.Minute.Test.testMaxHour_Constructor_OK = function() {
    var minute = new Date.Field.Minute(Date.Field.Minute.MAX_MINUTE);

    assertEquals(Date.Field.Minute.MAX_MINUTE, minute.value());
};

Date.Field.Minute.Test.testMaxHour_Constructor_Fail = function() {
    assertFail(function() {
        new Date.Field.Minute(Date.Field.Minute.MAX_MINUTE + 1);
    });
};

Date.Field.Minute.Test.testMinHour_Constructor_OK = function() {
    var minute = new Date.Field.Minute(Date.Field.Minute.MIN_MINUTE);

    assertEquals(Date.Field.Minute.MIN_MINUTE, minute.value());
};

Date.Field.Minute.Test.testMinHour_Constructor_Fail = function() {
    assertFail(function() {
        new Date.Field.Minute(Date.Field.Minute.MIN_MINUTE - 1);
    });
};

Date.Field.Minute.Test.testMaxHour_Value_OK = function() {
    var minute = new Date.Field.Minute().value(Date.Field.Minute.MAX_MINUTE);

    assertEquals(Date.Field.Minute.MAX_MINUTE, minute.value());
};

Date.Field.Minute.Test.testMaxHour_Value_Fail = function() {
    assertFail(function() {
        new Date.Field.Minute().value(Date.Field.Minute.MAX_MINUTE + 1);
    });
};

Date.Field.Minute.Test.testMinHour_Value_OK = function() {
    new Date.Field.Minute(Date.Field.Minute.MIN_MINUTE);
};

Date.Field.Minute.Test.testMinHour_Value_Fail = function() {
    assertFail(function() {
        new Date.Field.Minute().value(Date.Field.Minute.MIN_MINUTE - 1);
    });
};

Date.Field.Minute.Test.testValidate_text = function() {
    assertFail(function() {
        Date.Field.Minute.validate("a");
    });
};

Date.Field.Minute.Test.testValidate_long = function() {
    assertFail(function() {
        Date.Field.Minute.validate("11231237012730198239812398");
    });
};

Date.Field.Minute.Test.testValidate_hex = function() {
    assertFail(function() {
        Date.Field.Minute.validate("0x1");
    });
};

Date.Field.Minute.Test.testValidate_zeroTrail = function() {
    assertEquals(12, Date.Field.Minute.validate("012"));
};

Date.Field.Minute.Test.testValidate_negative = function() {
    assertFail(function() {
        Date.Field.Minute.validate("-1");
    });
};
