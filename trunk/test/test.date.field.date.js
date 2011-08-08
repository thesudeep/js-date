Date.Field.Date.Test = {};

Date.Field.Date.Test.testCreation = function() {
    var date = new Date.Field.Date(1);

    assertEquals(1, date.value());
};

Date.Field.Date.Test.testCreation_Empty = function() {
    assertWithTime(10 * Date.Field.MILLS_PER_DAY + 1231, function () {
        var date = new Date.Field.Date();

        assertEquals(11, date.value());
    });
};

Date.Field.Date.Test.testSetValue = function() {
    var date = new Date.Field.Date().value(1);

    assertEquals(1, date.value());
};

Date.Field.Date.Test.testGetMills_Epoch = function() {
    var date = new Date.Field.Date().mills(10120);

    assertEquals(0, date.mills());
};

Date.Field.Date.Test.testGetMills_Mills_First = function() {
    var date = new Date.Field.Date().mills(946684800001);

    assertEquals(0, date.mills());
};

Date.Field.Date.Test.testGetMills_Mills_Second = function() {
    var date = new Date.Field.Date().mills(946771200010);

    assertEquals(Date.Field.MILLS_PER_DAY, date.mills());
};

Date.Field.Date.Test.testGetMills_Leap = function() {
    var date = new Date.Field.Date().value(29, 2, 2000);

    assertEquals(28 * Date.Field.MILLS_PER_DAY, date.mills());
};

Date.Field.Date.Test.testGetMills_NotLeap = function() {
    var date = new Date.Field.Date().value(28, 2, 2001);

    assertEquals(27 * Date.Field.MILLS_PER_DAY, date.mills());
};

Date.Field.Date.Test.testSetMills_plus1_March_Start = function() {
    var date = new Date.Field.Date().mills(-62130499200000);

    assertEquals(1, date.value());
};

Date.Field.Date.Test.testSetMills_plus1_March_Before = function() {
    var date = new Date.Field.Date().mills(-62130499200000 - 1);

    assertEquals(28, date.value());
};

Date.Field.Date.Test.testSetMills_minus2001_March_Start = function() {
    var date = new Date.Field.Date().mills(-125275939200000);

    assertEquals(1, date.value());
};

Date.Field.Date.Test.testSetMills_minus2001_March_Before = function() {
    var date = new Date.Field.Date().mills(-125275939200000 - 1);

    assertEquals(29, date.value());
};

Date.Field.Date.Test.testSetMills_Epoch = function() {
    var date = new Date.Field.Date().mills(12312);

    assertEquals(1, date.value());
};

Date.Field.Date.Test.testMaxDate_Constructor_OK = function() {
    var date = new Date.Field.Date(Date.Field.Date.MAX_DATE);

    assertEquals(Date.Field.Date.MAX_DATE, date.value());
};

Date.Field.Date.Test.testMaxDate_Constructor_Month_OK = function() {
    var date = new Date.Field.Date(28, 2);

    assertEquals(28, date.value());
};

Date.Field.Date.Test.testMaxDate_Constructor_Month_Year_OK = function() {
    var date = new Date.Field.Date(29, 2, 2000);

    assertEquals(29, date.value());
};

Date.Field.Date.Test.testMaxDate_Constructor_Fail = function() {
    assertFail(function() {
        new Date.Field.Date(Date.Field.Date.MAX_DATE + 1);
    });
};

Date.Field.Date.Test.testMaxDate_Constructor_Month_Fail = function() {
    assertFail(function() {
        new Date.Field.Date(31, 4);
    });
};

Date.Field.Date.Test.testMaxDate_Constructor_Month_Year_Fail = function() {
    assertFail(function() {
        new Date.Field.Date(29, 2, 2001);
    });
};

Date.Field.Date.Test.testMinDate_Constructor_OK = function() {
    var date = new Date.Field.Date(Date.Field.Date.MIN_DATE);

    assertEquals(Date.Field.Date.MIN_DATE, date.value());
};

Date.Field.Date.Test.testMinDate_Constructor_Fail = function() {
    assertFail(function() {
        new Date.Field.Date(Date.Field.Date.MIN_DATE - 1);
    });
};

Date.Field.Date.Test.testMaxDate_Value_OK = function() {
    var date = new Date.Field.Date().value(Date.Field.Date.MAX_DATE);

    assertEquals(Date.Field.Date.MAX_DATE, date.value());
};

Date.Field.Date.Test.testMaxDate_Value_Month_OK = function() {
    var date = new Date.Field.Date().value(28, 2);

    assertEquals(28, date.value());
};

Date.Field.Date.Test.testMaxDate_Value_Month_Year_OK = function() {
    var date = new Date.Field.Date().value(29, 2, 2000);

    assertEquals(29, date.value());
};

Date.Field.Date.Test.testMaxDate_Value_Fail = function() {
    assertFail(function() {
        new Date.Field.Date().value(Date.Field.Date.MAX_DATE + 1);
    });
};

Date.Field.Date.Test.testMaxDate_Value_Month_Fail = function() {
    assertFail(function() {
        new Date.Field.Date().value(31, 4);
    });
};

Date.Field.Date.Test.testMaxDate_Value_Month_Year_Fail = function() {
    assertFail(function() {
        new Date.Field.Date().value(29, 2, 2001);
    });
};

Date.Field.Date.Test.testMinDate_Value_OK = function() {
    new Date.Field.Date(Date.Field.Date.MIN_DATE);
};

Date.Field.Date.Test.testMinDate_Value_Fail = function() {
    assertFail(function() {
        new Date.Field.Date().value(Date.Field.Date.MIN_DATE - 1);
    });
};

Date.Field.Date.Test.testValidate_text = function() {
    assertFail(function() {
        Date.Field.Date.validate("a");
    });
};

Date.Field.Date.Test.testValidate_long = function() {
    assertFail(function() {
        Date.Field.Date.validate("11231237012730198239812398");
    });
};

Date.Field.Date.Test.testValidate_hex = function() {
    assertFail(function() {
        Date.Field.Date.validate("0x1");
    });
};

Date.Field.Date.Test.testValidate_zeroTrail = function() {
    assertEquals(12, Date.Field.Date.validate("012"));
};

Date.Field.Date.Test.testValidate_negative = function() {
    assertFail(function() {
        Date.Field.Date.validate("-1");
    });
};
