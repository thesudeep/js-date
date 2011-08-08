Date.Field.Hour.Test = {};

Date.Field.Hour.Test.testCreation = function() {
    var hour = new Date.Field.Hour(1);

    assertEquals(1, hour.value());
};

Date.Field.Hour.Test.testCreation_Empty = function() {
    assertWithTime(10 * Date.Field.MILLS_PER_HOUR + 1231, function () {
        var hour = new Date.Field.Hour();

        assertEquals(10, hour.value());
    });
};

Date.Field.Hour.Test.testSetValue = function() {
    var hour = new Date.Field.Hour().value(1);

    assertEquals(1, hour.value());
};

Date.Field.Hour.Test.testGetMills_Epoch = function() {
    var hour = new Date.Field.Hour().mills(10120);

    assertEquals(0, hour.mills());
};

Date.Field.Hour.Test.testGetMills_Mills_10h = function() {
    var hour = new Date.Field.Hour().mills(10 * Date.Field.MILLS_PER_HOUR + 1231);

    assertEquals(10 * Date.Field.MILLS_PER_HOUR, hour.mills());
};

Date.Field.Hour.Test.testGetMills_Mills_2h = function() {
    var hour = new Date.Field.Hour().mills(Date.Field.MILLS_PER_HOUR * 2);

    assertEquals(2 * Date.Field.MILLS_PER_HOUR, hour.mills());
};

Date.Field.Hour.Test.testSetMills_2h_Start = function() {
    var hour = new Date.Field.Hour().mills(Date.Field.MILLS_PER_HOUR * 2 + 1221);

    assertEquals(2, hour.value());
};

Date.Field.Hour.Test.testSetMills_2h_Before = function() {
    var hour = new Date.Field.Hour().mills(Date.Field.MILLS_PER_HOUR * 2 - 1);

    assertEquals(1, hour.value());
};

Date.Field.Hour.Test.testSetMills_negative = function() {
    var hour = new Date.Field.Hour().mills(-62130513600000);

    assertEquals(20, hour.value());
};

Date.Field.Hour.Test.testMaxHour_Constructor_OK = function() {
    var hour = new Date.Field.Hour(Date.Field.Hour.MAX_HOUR);

    assertEquals(Date.Field.Hour.MAX_HOUR, hour.value());
};

Date.Field.Hour.Test.testMaxHour_Constructor_Fail = function() {
    assertFail(function() {
        new Date.Field.Hour(Date.Field.Hour.MAX_HOUR + 1);
    });
};

Date.Field.Hour.Test.testMinHour_Constructor_OK = function() {
    var hour = new Date.Field.Hour(Date.Field.Hour.MIN_HOUR);

    assertEquals(Date.Field.Hour.MIN_HOUR, hour.value());
};

Date.Field.Hour.Test.testMinHour_Constructor_Fail = function() {
    assertFail(function() {
        new Date.Field.Hour(Date.Field.Hour.MIN_HOUR - 1);
    });
};

Date.Field.Hour.Test.testMaxHour_Value_OK = function() {
    var hour = new Date.Field.Hour().value(Date.Field.Hour.MAX_HOUR);

    assertEquals(Date.Field.Hour.MAX_HOUR, hour.value());
};

Date.Field.Hour.Test.testMaxHour_Value_Fail = function() {
    assertFail(function() {
        new Date.Field.Hour().value(Date.Field.Hour.MAX_HOUR + 1);
    });
};

Date.Field.Hour.Test.testMinHour_Value_OK = function() {
    new Date.Field.Hour(Date.Field.Hour.MIN_HOUR);
};

Date.Field.Hour.Test.testMinHour_Value_Fail = function() {
    assertFail(function() {
        new Date.Field.Hour().value(Date.Field.Hour.MIN_HOUR - 1);
    });
};

Date.Field.Hour.Test.testValidate_text = function() {
    assertFail(function() {
        Date.Field.Hour.validate("a");
    });
};

Date.Field.Hour.Test.testValidate_long = function() {
    assertFail(function() {
        Date.Field.Hour.validate("11231237012730198239812398");
    });
};

Date.Field.Hour.Test.testValidate_hex = function() {
    assertFail(function() {
        Date.Field.Hour.validate("0x1");
    });
};

Date.Field.Hour.Test.testValidate_zeroTrail = function() {
    assertEquals(12, Date.Field.Hour.validate("012"));
};

Date.Field.Hour.Test.testValidate_negative = function() {
    assertFail(function() {
        Date.Field.Hour.validate("-1");
    });
};
