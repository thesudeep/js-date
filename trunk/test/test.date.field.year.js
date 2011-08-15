DateTime.Field.Year.Test = {};

DateTime.Field.Year.Test.testCreation = function() {
    var year = new DateTime.Field.Year(1);

    assertEquals(1, year.value());
};

DateTime.Field.Year.Test.testCreation_Empty = function() {
    assertWithTime(time(2000, 1, 1), function () {
        var year = new DateTime.Field.Year();

        assertEquals(2000, year.value());
    });
};

DateTime.Field.Year.Test.testSetValue = function() {
    var year = new DateTime.Field.Year().value(10120);

    assertEquals(10120, year.value());
};

DateTime.Field.Year.Test.testGetMills_Epoch = function() {
    var year = new DateTime.Field.Year().mills(10120);

    assertEquals(0, year.mills());
};

DateTime.Field.Year.Test.testGetMills_Mills_946684800000 = function() {
    var year = new DateTime.Field.Year().mills(946684800001);

    assertEquals(946684800000, year.mills());
};

DateTime.Field.Year.Test.testGetMills_Year_2000 = function() {
    var year = new DateTime.Field.Year().value(2000);

    assertEquals(946684800000, year.mills());
};

DateTime.Field.Year.Test.testGetMills_Year_minus2000 = function() {
    var year = new DateTime.Field.Year().value(-2001);

    assertEquals(-125281123200000, year.mills());
};

DateTime.Field.Year.Test.testSetMills_1_Start = function() {
    var year = new DateTime.Field.Year().mills(-62135596800000);

    assertEquals(1, year.value());
};

DateTime.Field.Year.Test.testSetMills_1_Before = function() {
    var year = new DateTime.Field.Year().mills(-62135596800000 - 1);

    assertEquals(-1, year.value());
};

DateTime.Field.Year.Test.testSetMills_minus2000_Start = function() {
    var year = new DateTime.Field.Year().mills(-125249500800000);

    assertEquals(-2000, year.value());
};

DateTime.Field.Year.Test.testSetMills_minus2000_Before = function() {
    var year = new DateTime.Field.Year().mills(-125249500800000 - 1);

    assertEquals(-2001, year.value());
};

DateTime.Field.Year.Test.testSetMills_2000_Start = function() {
    var year = new DateTime.Field.Year().mills(946684800000);

    assertEquals(2000, year.value());
};

DateTime.Field.Year.Test.testSetMills_2000_Before = function() {
    var year = new DateTime.Field.Year().mills(946684800000 - 1);

    assertEquals(1999, year.value());
};

DateTime.Field.Year.Test.testSetMills_2001_Start = function() {
    var year = new DateTime.Field.Year().mills(978307200000);

    assertEquals(2001, year.value());
};

DateTime.Field.Year.Test.testSetMills_2001_Before = function() {
    var year = new DateTime.Field.Year().mills(978307200000 - 1);

    assertEquals(2000, year.value());
};

DateTime.Field.Year.Test.testSetMills_Epoch = function() {
    var year = new DateTime.Field.Year().mills(12312);

    assertEquals(1970, year.value());
};

DateTime.Field.Year.Test.testMaxYear_Constructor_OK = function() {
    var year = new DateTime.Field.Year(DateTime.Field.Year.MAX_YEAR);

    assertEquals(DateTime.Field.Year.MAX_YEAR, year.value());
};

DateTime.Field.Year.Test.testMaxYear_Constructor_Fail = function() {
    assertFail(function() {
        new DateTime.Field.Year(DateTime.Field.Year.MAX_YEAR + 1);
    });
};

DateTime.Field.Year.Test.testMinYear_Constructor_OK = function() {
    var year = new DateTime.Field.Year(DateTime.Field.Year.MIN_YEAR);

    assertEquals(DateTime.Field.Year.MIN_YEAR, year.value());
};

DateTime.Field.Year.Test.testMinYear_Constructor_Fail = function() {
    assertFail(function() {
        new DateTime.Field.Year(DateTime.Field.Year.MIN_YEAR - 1);
    });
};

DateTime.Field.Year.Test.testZeroYear_Constructor = function() {
    assertFail(function() {
        new DateTime.Field.Year(0);
    });
};

DateTime.Field.Year.Test.testZeroYear_Value = function() {
    assertFail(function() {
        new DateTime.Field.Year().value(0);
    });
};

DateTime.Field.Year.Test.testMaxYear_Value_OK = function() {
    new DateTime.Field.Year().value(DateTime.Field.Year.MAX_YEAR);
};

DateTime.Field.Year.Test.testMaxYear_Value_Fail = function() {
    assertFail(function() {
        new DateTime.Field.Year().value(DateTime.Field.Year.MAX_YEAR + 1);
    });
};

DateTime.Field.Year.Test.testMinYear_Value_OK = function() {
    new DateTime.Field.Year(DateTime.Field.Year.MIN_YEAR);
};

DateTime.Field.Year.Test.testMinYear_Value_Fail = function() {
    assertFail(function() {
        new DateTime.Field.Year().value(DateTime.Field.Year.MIN_YEAR - 1);
    });
};

DateTime.Field.Year.Test.testIsLeap_2000 = function() {
    assertEquals(true, new DateTime.Field.Year(2000).isLeap());
};

DateTime.Field.Year.Test.testIsLeap_1000 = function() {
    assertEquals(false, new DateTime.Field.Year(1000).isLeap());
};

DateTime.Field.Year.Test.testIsLeap_1970 = function() {
    assertEquals(false, new DateTime.Field.Year(1970).isLeap());
};

DateTime.Field.Year.Test.testIsLeap_444 = function() {
    assertEquals(true, new DateTime.Field.Year(444).isLeap());
};

DateTime.Field.Year.Test.testIsLeap_minus445 = function() {
    assertEquals(true, new DateTime.Field.Year(-445).isLeap());
};

DateTime.Field.Year.Test.testIsLeap_minus1001 = function() {
    assertEquals(false, new DateTime.Field.Year(-1001).isLeap());
};

DateTime.Field.Year.Test.testIsLeap_minus1001 = function() {
    assertEquals(true, new DateTime.Field.Year(-2001).isLeap());
};

DateTime.Field.Year.Test.testStaticIsLeap_2000 = function() {
    assertEquals(true, DateTime.Field.Year.isLeap(2000));
};

DateTime.Field.Year.Test.testStaticIsLeap_1000 = function() {
    assertEquals(false, DateTime.Field.Year.isLeap(1000));
};

DateTime.Field.Year.Test.testStaticIsLeap_1970 = function() {
    assertEquals(false, DateTime.Field.Year.isLeap(1970));
};

DateTime.Field.Year.Test.testStaticIsLeap_444 = function() {
    assertEquals(true, DateTime.Field.Year.isLeap(444));
};

DateTime.Field.Year.Test.testStaticIsLeap_minus445 = function() {
    assertEquals(true, DateTime.Field.Year.isLeap(-445));
};

DateTime.Field.Year.Test.testStaticIsLeap_minus1001 = function() {
    assertEquals(false, DateTime.Field.Year.isLeap(-1001));
};

DateTime.Field.Year.Test.testStaticIsLeap_minus1001 = function() {
    assertEquals(true, DateTime.Field.Year.isLeap(-2001));
};

DateTime.Field.Year.Test.testValidate_text = function() {
    assertFail(function() {
        DateTime.Field.Year.validate("a");
    });
};

DateTime.Field.Year.Test.testValidate_long = function() {
    assertFail(function() {
        DateTime.Field.Year.validate("11231237012730198239812398");
    });
};

DateTime.Field.Year.Test.testValidate_zero = function() {
    assertFail(function() {
        DateTime.Field.Year.validate(0);
    });
};

DateTime.Field.Year.Test.testValidate_hex = function() {
    assertFail(function() {
        DateTime.Field.Year.validate("0x0001001");
    });
};

DateTime.Field.Year.Test.testValidate_zeroTrail = function() {
    assertEquals(1001, DateTime.Field.Year.validate("00001001"));
};

DateTime.Field.Year.Test.testValidate_negative = function() {
    assertEquals(-1001, DateTime.Field.Year.validate("-1001"));
};