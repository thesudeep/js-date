DateTime.Field.Month.Test = {};

DateTime.Field.Month.Test.testCreation = function() {
    var month = new DateTime.Field.Month(1);

    assertEquals(1, month.value());
};

DateTime.Field.Month.Test.testCreation_Empty = function() {
    assertWithTime(1304208000123, function () {
        var month = new DateTime.Field.Month();

        assertEquals(DateTime.Field.Month.MAY, month.value());
    });
};

DateTime.Field.Month.Test.testDuration_Leap_Feb_by_constuctor = function() {
    var month = new DateTime.Field.Month(2, 2000);

    assertEquals(29 * DateTime.Field.MILLS_PER_DAY, month.duration());
};

DateTime.Field.Month.Test.testDuration_Norm_Feb_by_constuctor = function() {
    var month = new DateTime.Field.Month(2, 2001);

    assertEquals(28 * DateTime.Field.MILLS_PER_DAY, month.duration());
};

DateTime.Field.Month.Test.testSetValue_Leap_Feb_by_value = function() {
    var month = new DateTime.Field.Month().value(2, 2000);

    assertEquals(29 * DateTime.Field.MILLS_PER_DAY, month.duration());
};

DateTime.Field.Month.Test.testSetValue_Norm_Feb_by_value = function() {
    var month = new DateTime.Field.Month().value(2, 2001);

    assertEquals(28 * DateTime.Field.MILLS_PER_DAY, month.duration());
};


DateTime.Field.Month.Test.testSetValue = function() {
    var month = new DateTime.Field.Month().value(1);

    assertEquals(1, month.value());
};

DateTime.Field.Month.Test.testGetMills_Epoch = function() {
    var month = new DateTime.Field.Month().mills(10120);

    assertEquals(0, month.mills());
};

DateTime.Field.Month.Test.testGetMills_Mills_January = function() {
    var month = new DateTime.Field.Month().mills(946684800001);

    assertEquals(0, month.mills());
};

DateTime.Field.Month.Test.testGetMills_Mills_May = function() {
    var month = new DateTime.Field.Month().mills(1304208000123);

    assertEquals(10368000000, month.mills());
};

DateTime.Field.Month.Test.testGetMills_March = function() {
    var month = new DateTime.Field.Month().value(DateTime.Field.Month.MARCH);

    assertEquals(5097600000, month.mills());
};

DateTime.Field.Month.Test.testSetMills_plus1_March_Start = function() {
    var month = new DateTime.Field.Month().mills(-62130499200000);

    assertEquals(DateTime.Field.Month.MARCH, month.value());
};

DateTime.Field.Month.Test.testSetMills_plus1_March_Before = function() {
    var month = new DateTime.Field.Month().mills(-62130499200000 - 1);

    assertEquals(DateTime.Field.Month.FEBRUARY, month.value());
};

DateTime.Field.Month.Test.testSetMills_minus2000_March_Start = function() {
    var month = new DateTime.Field.Month().mills(-125275939200000);

    assertEquals(DateTime.Field.Month.MARCH, month.value());
};

DateTime.Field.Month.Test.testSetMills_minus2000_March_Before = function() {
    var month = new DateTime.Field.Month().mills(-125275939200000 - 1);

    assertEquals(DateTime.Field.Month.FEBRUARY, month.value());
};

DateTime.Field.Month.Test.testSetMills_Epoch = function() {
    var month = new DateTime.Field.Month().mills(12312);

    assertEquals(1, month.value());
};

DateTime.Field.Month.Test.testMaxMonth_Constructor_OK = function() {
    var month = new DateTime.Field.Month(DateTime.Field.Month.MAX_MONTH);

    assertEquals(DateTime.Field.Month.MAX_MONTH, month.value());
};

DateTime.Field.Month.Test.testMaxMonth_Constructor_Fail = function() {
    assertFail(function() {
        new DateTime.Field.Month(DateTime.Field.Month.MAX_MONTH + 1);
    });
};

DateTime.Field.Month.Test.testMinMonth_Constructor_OK = function() {
    var month = new DateTime.Field.Month(DateTime.Field.Month.MIN_MONTH);

    assertEquals(DateTime.Field.Month.MIN_MONTH, month.value());
};

DateTime.Field.Month.Test.testMinMonth_Constructor_Fail = function() {
    assertFail(function() {
        new DateTime.Field.Month(DateTime.Field.Month.MIN_MONTH - 1);
    });
};

DateTime.Field.Month.Test.testMaxMonth_Value_OK = function() {
    new DateTime.Field.Month().value(DateTime.Field.Month.MAX_MONTH);
};

DateTime.Field.Month.Test.testMaxMonth_Value_Fail = function() {
    assertFail(function() {
        new DateTime.Field.Month().value(DateTime.Field.Month.MAX_MONTH + 1);
    });
};

DateTime.Field.Month.Test.testMinMonth_Value_OK = function() {
    new DateTime.Field.Month(DateTime.Field.Month.MIN_MONTH);
};

DateTime.Field.Month.Test.testMinMonth_Value_Fail = function() {
    assertFail(function() {
        new DateTime.Field.Month().value(DateTime.Field.Month.MIN_MONTH - 1);
    });
};

DateTime.Field.Month.Test.testValidate_text = function() {
    assertFail(function() {
        DateTime.Field.Month.validate("a");
    });
};

DateTime.Field.Month.Test.testValidate_long = function() {
    assertFail(function() {
        DateTime.Field.Month.validate("11231237012730198239812398");
    });
};

DateTime.Field.Month.Test.testValidate_hex = function() {
    assertFail(function() {
        DateTime.Field.Month.validate("0x0001001");
    });
};

DateTime.Field.Month.Test.testValidate_zeroTrail = function() {
    assertEquals(12, DateTime.Field.Month.validate("012"));
};

DateTime.Field.Month.Test.testValidate_negative = function() {
    assertFail(function() {
        DateTime.Field.Month.validate("-1");
    });
};
