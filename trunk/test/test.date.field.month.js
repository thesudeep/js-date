Date.Field.Month.Test = {};

Date.Field.Month.Test.testCreation = function() {
    var month = new Date.Field.Month(1);

    assertEquals(1, month.value());
};

Date.Field.Month.Test.testCreation_Empty = function() {
    assertWithTime(1304208000123, function () {
        var month = new Date.Field.Month();

        assertEquals(Date.Field.Month.MAY, month.value());
    });
};

Date.Field.Month.Test.testDuration_Leap_Feb_by_constuctor = function() {
    var month = new Date.Field.Month(2, 2000);

    assertEquals(29 * Date.Field.MILLS_PER_DAY, month.duration());
};

Date.Field.Month.Test.testDuration_Norm_Feb_by_constuctor = function() {
    var month = new Date.Field.Month(2, 2001);

    assertEquals(28 * Date.Field.MILLS_PER_DAY, month.duration());
};

Date.Field.Month.Test.testSetValue_Leap_Feb_by_value = function() {
    var month = new Date.Field.Month().value(2, 2000);

    assertEquals(29 * Date.Field.MILLS_PER_DAY, month.duration());
};

Date.Field.Month.Test.testSetValue_Norm_Feb_by_value = function() {
    var month = new Date.Field.Month().value(2, 2001);

    assertEquals(28 * Date.Field.MILLS_PER_DAY, month.duration());
};


Date.Field.Month.Test.testSetValue = function() {
    var month = new Date.Field.Month().value(1);

    assertEquals(1, month.value());
};

Date.Field.Month.Test.testGetMills_Epoch = function() {
    var month = new Date.Field.Month().mills(10120);

    assertEquals(0, month.mills());
};

Date.Field.Month.Test.testGetMills_Mills_January = function() {
    var month = new Date.Field.Month().mills(946684800001);

    assertEquals(0, month.mills());
};

Date.Field.Month.Test.testGetMills_Mills_May = function() {
    var month = new Date.Field.Month().mills(1304208000123);

    assertEquals(10368000000, month.mills());
};

Date.Field.Month.Test.testGetMills_March = function() {
    var month = new Date.Field.Month().value(Date.Field.Month.MARCH);

    assertEquals(5097600000, month.mills());
};

Date.Field.Month.Test.testSetMills_plus1_March_Start = function() {
    var month = new Date.Field.Month().mills(-62130499200000);

    assertEquals(Date.Field.Month.MARCH, month.value());
};

Date.Field.Month.Test.testSetMills_plus1_March_Before = function() {
    var month = new Date.Field.Month().mills(-62130499200000 - 1);

    assertEquals(Date.Field.Month.FEBRUARY, month.value());
};

Date.Field.Month.Test.testSetMills_minus2000_March_Start = function() {
    var month = new Date.Field.Month().mills(-125275939200000);

    assertEquals(Date.Field.Month.MARCH, month.value());
};

Date.Field.Month.Test.testSetMills_minus2000_March_Before = function() {
    var month = new Date.Field.Month().mills(-125275939200000 - 1);

    assertEquals(Date.Field.Month.FEBRUARY, month.value());
};

Date.Field.Month.Test.testSetMills_Epoch = function() {
    var month = new Date.Field.Month().mills(12312);

    assertEquals(1, month.value());
};

Date.Field.Month.Test.testMaxMonth_Constructor_OK = function() {
    var month = new Date.Field.Month(Date.Field.Month.MAX_MONTH);

    assertEquals(Date.Field.Month.MAX_MONTH, month.value());
};

Date.Field.Month.Test.testMaxMonth_Constructor_Fail = function() {
    assertFail(function() {
        new Date.Field.Month(Date.Field.Month.MAX_MONTH + 1);
    });
};

Date.Field.Month.Test.testMinMonth_Constructor_OK = function() {
    var month = new Date.Field.Month(Date.Field.Month.MIN_MONTH);

    assertEquals(Date.Field.Month.MIN_MONTH, month.value());
};

Date.Field.Month.Test.testMinMonth_Constructor_Fail = function() {
    assertFail(function() {
        new Date.Field.Month(Date.Field.Month.MIN_MONTH - 1);
    });
};

Date.Field.Month.Test.testMaxMonth_Value_OK = function() {
    new Date.Field.Month().value(Date.Field.Month.MAX_MONTH);
};

Date.Field.Month.Test.testMaxMonth_Value_Fail = function() {
    assertFail(function() {
        new Date.Field.Month().value(Date.Field.Month.MAX_MONTH + 1);
    });
};

Date.Field.Month.Test.testMinMonth_Value_OK = function() {
    new Date.Field.Month(Date.Field.Month.MIN_MONTH);
};

Date.Field.Month.Test.testMinMonth_Value_Fail = function() {
    assertFail(function() {
        new Date.Field.Month().value(Date.Field.Month.MIN_MONTH - 1);
    });
};

Date.Field.Month.Test.testValidate_text = function() {
    assertFail(function() {
        Date.Field.Month.validate("a");
    });
};

Date.Field.Month.Test.testValidate_long = function() {
    assertFail(function() {
        Date.Field.Month.validate("11231237012730198239812398");
    });
};

Date.Field.Month.Test.testValidate_hex = function() {
    assertFail(function() {
        Date.Field.Month.validate("0x0001001");
    });
};

Date.Field.Month.Test.testValidate_zeroTrail = function() {
    assertEquals(12, Date.Field.Month.validate("012"));
};

Date.Field.Month.Test.testValidate_negative = function() {
    assertFail(function() {
        Date.Field.Month.validate("-1");
    });
};
