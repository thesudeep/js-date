DateTime.Field.Minute.Test = {};

DateTime.Field.Minute.Test.testCreation = function() {
    var minute = new DateTime.Field.Minute(1);

    assertEquals(1, minute.value());
};

DateTime.Field.Minute.Test.testCreation_Empty = function() {
    assertWithTime(10 * DateTime.MILLS_PER_MINUTE + 1231, function () {
        var minute = new DateTime.Field.Minute();

        assertEquals(10, minute.value());
    });
};

DateTime.Field.Minute.Test.testSetValue = function() {
    var minute = new DateTime.Field.Minute().value(1);

    assertEquals(1, minute.value());
};

DateTime.Field.Minute.Test.testGetMills_Epoch = function() {
    var minute = new DateTime.Field.Minute().millis(10120);

    assertEquals(0, minute.millis());
};

DateTime.Field.Minute.Test.testGetMills_Mills_10m = function() {
    var minute = new DateTime.Field.Minute().millis(10 * DateTime.MILLS_PER_MINUTE + 1231);

    assertEquals(10 * DateTime.MILLS_PER_MINUTE, minute.millis());
};

DateTime.Field.Minute.Test.testGetMills_Mills_2m = function() {
    var minute = new DateTime.Field.Minute().millis(DateTime.MILLS_PER_MINUTE * 2 + 1221);

    assertEquals(2 * DateTime.MILLS_PER_MINUTE, minute.millis());
};

DateTime.Field.Minute.Test.testSetMills_2m_Start = function() {
    var minute = new DateTime.Field.Minute().millis(DateTime.MILLS_PER_MINUTE * 2);

    assertEquals(2, minute.value());
};

DateTime.Field.Minute.Test.testSetMills_2m_Before = function() {
    var minute = new DateTime.Field.Minute().millis(DateTime.MILLS_PER_MINUTE * 2 - 1);

    assertEquals(1, minute.value());
};

DateTime.Field.Minute.Test.testSetMills_negative = function() {
    var minute = new DateTime.Field.Minute().millis(-62130512880000);

    assertEquals(12, minute.value());
};

DateTime.Field.Minute.Test.testMaxHour_Constructor_OK = function() {
    var minute = new DateTime.Field.Minute(DateTime.Field.Minute.MAX_MINUTE);

    assertEquals(DateTime.Field.Minute.MAX_MINUTE, minute.value());
};

DateTime.Field.Minute.Test.testMaxHour_Constructor_Fail = function() {
    assertFail(function() {
        new DateTime.Field.Minute(DateTime.Field.Minute.MAX_MINUTE + 1);
    });
};

DateTime.Field.Minute.Test.testMinHour_Constructor_OK = function() {
    var minute = new DateTime.Field.Minute(DateTime.Field.Minute.MIN_MINUTE);

    assertEquals(DateTime.Field.Minute.MIN_MINUTE, minute.value());
};

DateTime.Field.Minute.Test.testMinHour_Constructor_Fail = function() {
    assertFail(function() {
        new DateTime.Field.Minute(DateTime.Field.Minute.MIN_MINUTE - 1);
    });
};

DateTime.Field.Minute.Test.testMaxHour_Value_OK = function() {
    var minute = new DateTime.Field.Minute().value(DateTime.Field.Minute.MAX_MINUTE);

    assertEquals(DateTime.Field.Minute.MAX_MINUTE, minute.value());
};

DateTime.Field.Minute.Test.testMaxHour_Value_Fail = function() {
    assertFail(function() {
        new DateTime.Field.Minute().value(DateTime.Field.Minute.MAX_MINUTE + 1);
    });
};

DateTime.Field.Minute.Test.testMinHour_Value_OK = function() {
    new DateTime.Field.Minute(DateTime.Field.Minute.MIN_MINUTE);
};

DateTime.Field.Minute.Test.testMinHour_Value_Fail = function() {
    assertFail(function() {
        new DateTime.Field.Minute().value(DateTime.Field.Minute.MIN_MINUTE - 1);
    });
};

DateTime.Field.Minute.Test.testValidate_text = function() {
    assertFail(function() {
        DateTime.Field.Minute.validate("a");
    });
};

DateTime.Field.Minute.Test.testValidate_long = function() {
    assertFail(function() {
        DateTime.Field.Minute.validate("11231237012730198239812398");
    });
};

DateTime.Field.Minute.Test.testValidate_hex = function() {
    assertFail(function() {
        DateTime.Field.Minute.validate("0x1");
    });
};

DateTime.Field.Minute.Test.testValidate_zeroTrail = function() {
    assertEquals(12, DateTime.Field.Minute.validate("012"));
};

DateTime.Field.Minute.Test.testValidate_negative = function() {
    assertFail(function() {
        DateTime.Field.Minute.validate("-1");
    });
};
