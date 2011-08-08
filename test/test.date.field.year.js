Date.Field.Year.Test = {};

Date.Field.Year.Test.testCreation = function() {
    var year = new Date.Field.Year(1);

    assertEquals(1, year.value());
};

Date.Field.Year.Test.testCreation_Empty = function() {
    assertWithTime(946684800012, function () {
        var year = new Date.Field.Year();

        assertEquals(2000, year.value());
    });
};

Date.Field.Year.Test.testSetValue = function() {
    var year = new Date.Field.Year().value(10120);

    assertEquals(10120, year.value());
};

Date.Field.Year.Test.testGetMills_Epoch = function() {
    var year = new Date.Field.Year().mills(10120);

    assertEquals(0, year.mills());
};

Date.Field.Year.Test.testGetMills_Mills_946684800000 = function() {
    var year = new Date.Field.Year().mills(946684800001);

    assertEquals(946684800000, year.mills());
};

Date.Field.Year.Test.testGetMills_Year_2000 = function() {
    var year = new Date.Field.Year().value(2000);

    assertEquals(946684800000, year.mills());
};

Date.Field.Year.Test.testGetMills_Year_minus2000 = function() {
    var year = new Date.Field.Year().value(-2001);

    assertEquals(-125281123200000, year.mills());
};

Date.Field.Year.Test.testSetMills_1_Start = function() {
    var year = new Date.Field.Year().mills(-62135596800000);

    assertEquals(1, year.value());
};

Date.Field.Year.Test.testSetMills_1_Before = function() {
    var year = new Date.Field.Year().mills(-62135596800000 - 1);

    assertEquals(-1, year.value());
};

Date.Field.Year.Test.testSetMills_minus2000_Start = function() {
    var year = new Date.Field.Year().mills(-125249500800000);

    assertEquals(-2000, year.value());
};

Date.Field.Year.Test.testSetMills_minus2000_Before = function() {
    var year = new Date.Field.Year().mills(-125249500800000 - 1);

    assertEquals(-2001, year.value());
};

Date.Field.Year.Test.testSetMills_2000_Start = function() {
    var year = new Date.Field.Year().mills(946684800000);

    assertEquals(2000, year.value());
};

Date.Field.Year.Test.testSetMills_2000_Before = function() {
    var year = new Date.Field.Year().mills(946684800000 - 1);

    assertEquals(1999, year.value());
};

Date.Field.Year.Test.testSetMills_2001_Start = function() {
    var year = new Date.Field.Year().mills(978307200000);

    assertEquals(2001, year.value());
};

Date.Field.Year.Test.testSetMills_2001_Before = function() {
    var year = new Date.Field.Year().mills(978307200000 - 1);

    assertEquals(2000, year.value());
};

Date.Field.Year.Test.testSetMills_Epoch = function() {
    var year = new Date.Field.Year().mills(12312);

    assertEquals(1970, year.value());
};

Date.Field.Year.Test.testMaxYear_Constructor_OK = function() {
    var year = new Date.Field.Year(Date.Field.Year.MAX_YEAR);

    assertEquals(Date.Field.Year.MAX_YEAR, year.value());
};

Date.Field.Year.Test.testMaxYear_Constructor_Fail = function() {
    assertFail(function() {
        new Date.Field.Year(Date.Field.Year.MAX_YEAR + 1);
    });
};

Date.Field.Year.Test.testMinYear_Constructor_OK = function() {
    var year = new Date.Field.Year(Date.Field.Year.MIN_YEAR);

    assertEquals(Date.Field.Year.MIN_YEAR, year.value());
};

Date.Field.Year.Test.testMinYear_Constructor_Fail = function() {
    assertFail(function() {
        new Date.Field.Year(Date.Field.Year.MIN_YEAR - 1);
    });
};

Date.Field.Year.Test.testZeroYear_Constructor = function() {
    assertFail(function() {
        new Date.Field.Year(0);
    });
};

Date.Field.Year.Test.testZeroYear_Value = function() {
    assertFail(function() {
        new Date.Field.Year().value(0);
    });
};

Date.Field.Year.Test.testMaxYear_Value_OK = function() {
    new Date.Field.Year().value(Date.Field.Year.MAX_YEAR);
};

Date.Field.Year.Test.testMaxYear_Value_Fail = function() {
    assertFail(function() {
        new Date.Field.Year().value(Date.Field.Year.MAX_YEAR + 1);
    });
};

Date.Field.Year.Test.testMinYear_Value_OK = function() {
    new Date.Field.Year(Date.Field.Year.MIN_YEAR);
};

Date.Field.Year.Test.testMinYear_Value_Fail = function() {
    assertFail(function() {
        new Date.Field.Year().value(Date.Field.Year.MIN_YEAR - 1);
    });
};

Date.Field.Year.Test.testIsLeap_2000 = function() {
    assertEquals(true, new Date.Field.Year(2000).isLeap());
};

Date.Field.Year.Test.testIsLeap_1000 = function() {
    assertEquals(false, new Date.Field.Year(1000).isLeap());
};

Date.Field.Year.Test.testIsLeap_1970 = function() {
    assertEquals(false, new Date.Field.Year(1970).isLeap());
};

Date.Field.Year.Test.testIsLeap_444 = function() {
    assertEquals(true, new Date.Field.Year(444).isLeap());
};

Date.Field.Year.Test.testIsLeap_minus445 = function() {
    assertEquals(true, new Date.Field.Year(-445).isLeap());
};

Date.Field.Year.Test.testIsLeap_minus1001 = function() {
    assertEquals(false, new Date.Field.Year(-1001).isLeap());
};

Date.Field.Year.Test.testIsLeap_minus1001 = function() {
    assertEquals(true, new Date.Field.Year(-2001).isLeap());
};

Date.Field.Year.Test.testStaticIsLeap_2000 = function() {
    assertEquals(true, Date.Field.Year.isLeap(2000));
};

Date.Field.Year.Test.testStaticIsLeap_1000 = function() {
    assertEquals(false, Date.Field.Year.isLeap(1000));
};

Date.Field.Year.Test.testStaticIsLeap_1970 = function() {
    assertEquals(false, Date.Field.Year.isLeap(1970));
};

Date.Field.Year.Test.testStaticIsLeap_444 = function() {
    assertEquals(true, Date.Field.Year.isLeap(444));
};

Date.Field.Year.Test.testStaticIsLeap_minus445 = function() {
    assertEquals(true, Date.Field.Year.isLeap(-445));
};

Date.Field.Year.Test.testStaticIsLeap_minus1001 = function() {
    assertEquals(false, Date.Field.Year.isLeap(-1001));
};

Date.Field.Year.Test.testStaticIsLeap_minus1001 = function() {
    assertEquals(true, Date.Field.Year.isLeap(-2001));
};

Date.Field.Year.Test.testValidate_text = function() {
    assertFail(function() {
        Date.Field.Year.validate("a");
    });
};

Date.Field.Year.Test.testValidate_long = function() {
    assertFail(function() {
        Date.Field.Year.validate("11231237012730198239812398");
    });
};

Date.Field.Year.Test.testValidate_zero = function() {
    assertFail(function() {
        Date.Field.Year.validate(0);
    });
};

Date.Field.Year.Test.testValidate_hex = function() {
    assertFail(function() {
        Date.Field.Year.validate("0x0001001");
    });
};

Date.Field.Year.Test.testValidate_zeroTrail = function() {
    assertEquals(1001, Date.Field.Year.validate("00001001"));
};

Date.Field.Year.Test.testValidate_negative = function() {
    assertEquals(-1001, Date.Field.Year.validate("-1001"));
};