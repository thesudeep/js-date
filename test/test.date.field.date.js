DateTime.Field.Date.Test = {};

DateTime.Field.Date.Test.testCreation = function() {
    var date = new DateTime.Field.Date(1);

    assertEquals(1, date.value());
};

DateTime.Field.Date.Test.testCreation_Empty = function() {
    assertWithTime(10 * DateTime.MILLS_PER_DAY + 1231, function () {
        var date = new DateTime.Field.Date();

        assertEquals(11, date.value());
    });
};

DateTime.Field.Date.Test.testSetValue = function() {
    var date = new DateTime.Field.Date().value(1);

    assertEquals(1, date.value());
};

DateTime.Field.Date.Test.testGetMills_Epoch = function() {
    var date = new DateTime.Field.Date().millis(10120);

    assertEquals(0, date.millis());
};

DateTime.Field.Date.Test.testGetMills_Mills_First = function() {
    var date = new DateTime.Field.Date().millis(946684800001);

    assertEquals(0, date.millis());
};

DateTime.Field.Date.Test.testGetMills_Mills_Second = function() {
    var date = new DateTime.Field.Date().millis(946771200010);

    assertEquals(DateTime.MILLS_PER_DAY, date.millis());
};

DateTime.Field.Date.Test.testGetMills_Leap = function() {
    var date = new DateTime.Field.Date().value(29, 2, 2000);

    assertEquals(28 * DateTime.MILLS_PER_DAY, date.millis());
};

DateTime.Field.Date.Test.testGetMills_NotLeap = function() {
    var date = new DateTime.Field.Date().value(28, 2, 2001);

    assertEquals(27 * DateTime.MILLS_PER_DAY, date.millis());
};

DateTime.Field.Date.Test.testSetMills_plus1_March_Start = function() {
    var date = new DateTime.Field.Date().millis(-62130499200000);

    assertEquals(1, date.value());
};

DateTime.Field.Date.Test.testSetMills_plus1_March_Before = function() {
    var date = new DateTime.Field.Date().millis(-62130499200000 - 1);

    assertEquals(28, date.value());
};

DateTime.Field.Date.Test.testSetMills_minus2001_March_Start = function() {
    var date = new DateTime.Field.Date().millis(-125275939200000);

    assertEquals(1, date.value());
};

DateTime.Field.Date.Test.testSetMills_minus2001_March_Before = function() {
    var date = new DateTime.Field.Date().millis(-125275939200000 - 1);

    assertEquals(29, date.value());
};

DateTime.Field.Date.Test.testSetMills_Epoch = function() {
    var date = new DateTime.Field.Date().millis(12312);

    assertEquals(1, date.value());
};

DateTime.Field.Date.Test.testMaxDate_Constructor_OK = function() {
    var date = new DateTime.Field.Date(DateTime.Field.Date.MAX_DATE);

    assertEquals(DateTime.Field.Date.MAX_DATE, date.value());
};

DateTime.Field.Date.Test.testMaxDate_Constructor_Month_OK = function() {
    var date = new DateTime.Field.Date(28, 2);

    assertEquals(28, date.value());
};

DateTime.Field.Date.Test.testMaxDate_Constructor_Month_Year_OK = function() {
    var date = new DateTime.Field.Date(29, 2, 2000);

    assertEquals(29, date.value());
};

DateTime.Field.Date.Test.testMaxDate_Constructor_Fail = function() {
    assertFail(function() {
        new DateTime.Field.Date(DateTime.Field.Date.MAX_DATE + 1);
    });
};

DateTime.Field.Date.Test.testMaxDate_Constructor_Month_Fail = function() {
    assertFail(function() {
        new DateTime.Field.Date(31, 4);
    });
};

DateTime.Field.Date.Test.testMaxDate_Constructor_Month_Year_Fail = function() {
    assertFail(function() {
        new DateTime.Field.Date(29, 2, 2001);
    });
};

DateTime.Field.Date.Test.testMinDate_Constructor_OK = function() {
    var date = new DateTime.Field.Date(DateTime.Field.Date.MIN_DATE);

    assertEquals(DateTime.Field.Date.MIN_DATE, date.value());
};

DateTime.Field.Date.Test.testMinDate_Constructor_Fail = function() {
    assertFail(function() {
        new DateTime.Field.Date(DateTime.Field.Date.MIN_DATE - 1);
    });
};

DateTime.Field.Date.Test.testMaxDate_Value_OK = function() {
    var date = new DateTime.Field.Date().value(DateTime.Field.Date.MAX_DATE);

    assertEquals(DateTime.Field.Date.MAX_DATE, date.value());
};

DateTime.Field.Date.Test.testMaxDate_Value_Month_OK = function() {
    var date = new DateTime.Field.Date().value(28, 2);

    assertEquals(28, date.value());
};

DateTime.Field.Date.Test.testMaxDate_Value_Month_Year_OK = function() {
    var date = new DateTime.Field.Date().value(29, 2, 2000);

    assertEquals(29, date.value());
};

DateTime.Field.Date.Test.testMaxDate_Value_Fail = function() {
    assertFail(function() {
        new DateTime.Field.Date().value(DateTime.Field.Date.MAX_DATE + 1);
    });
};

DateTime.Field.Date.Test.testMaxDate_Value_Month_Fail = function() {
    assertFail(function() {
        new DateTime.Field.Date().value(31, 4);
    });
};

DateTime.Field.Date.Test.testMaxDate_Value_Month_Year_Fail = function() {
    assertFail(function() {
        new DateTime.Field.Date().value(29, 2, 2001);
    });
};

DateTime.Field.Date.Test.testMinDate_Value_OK = function() {
    new DateTime.Field.Date(DateTime.Field.Date.MIN_DATE);
};

DateTime.Field.Date.Test.testMinDate_Value_Fail = function() {
    assertFail(function() {
        new DateTime.Field.Date().value(DateTime.Field.Date.MIN_DATE - 1);
    });
};

DateTime.Field.Date.Test.testValidate_text = function() {
    assertFail(function() {
        DateTime.Field.Date.validate("a");
    });
};

DateTime.Field.Date.Test.testValidate_long = function() {
    assertFail(function() {
        DateTime.Field.Date.validate("11231237012730198239812398");
    });
};

DateTime.Field.Date.Test.testValidate_hex = function() {
    assertFail(function() {
        DateTime.Field.Date.validate("0x1");
    });
};

DateTime.Field.Date.Test.testValidate_zeroTrail = function() {
    assertEquals(12, DateTime.Field.Date.validate("012"));
};

DateTime.Field.Date.Test.testValidate_negative = function() {
    assertFail(function() {
        DateTime.Field.Date.validate("-1");
    });
};
