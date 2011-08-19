DateTime.Field.Year.Test = {};

DateTime.Field.Year.Test.testCreation = function() {
    var year = new DateTime.Field.Year(mock({time: time(2011, 1, 2)}));

    assertEquals(2011, year.value());
};

DateTime.Field.Year.Test.testCreation_Empty = function() {
    assertFail(function() {
        new DateTime.Field.Year();
    });
};

DateTime.Field.Year.Test.testSetValue = function() {
    var year = DateTime.Field.Year.Test.createYear().value(10120);

    assertEquals(10120, year.value());
};

DateTime.Field.Year.Test.testGetMills_Epoch = function() {
    var year = DateTime.Field.Year.Test.createYear().millis(10120);

    assertEquals(0, year.millis());
};

DateTime.Field.Year.Test.testGetMills_Mills_2000 = function() {
    var year = DateTime.Field.Year.Test.createYear().millis(time(2000, 3, 2));

    assertEquals(time(2000, 1, 1), year.millis());
};

DateTime.Field.Year.Test.testGetMills_Year_2000 = function() {
    var year = DateTime.Field.Year.Test.createYear().value(2000);

    assertEquals(time(2000, 1, 1), year.millis());
};

DateTime.Field.Year.Test.testGetMills_Year_minus2001 = function() {
    var year = DateTime.Field.Year.Test.createYear().value(-2001);

    assertEquals(time(-2001, 1, 1), year.millis());
};

DateTime.Field.Year.Test.testSetMills_1_Start = function() {
    var year = DateTime.Field.Year.Test.createYear().millis(time(1, 1, 1));

    assertEquals(1, year.value());
};

DateTime.Field.Year.Test.testSetMills_1_Before = function() {
    var year = DateTime.Field.Year.Test.createYear().millis(time(1, 1, 1) - 1);

    assertEquals(-1, year.value());
};

DateTime.Field.Year.Test.testSetMills_minus2000_Start = function() {
    var year = DateTime.Field.Year.Test.createYear().millis(time(-2000, 1, 1));

    assertEquals(-2000, year.value());
};

DateTime.Field.Year.Test.testSetMills_minus2000_Before = function() {
    var year = DateTime.Field.Year.Test.createYear().millis(time(-2000, 1, 1) - 1);

    assertEquals(-2001, year.value());
};

DateTime.Field.Year.Test.testSetMills_2000_Start = function() {
    var year = DateTime.Field.Year.Test.createYear().millis(time(2000, 1, 1));

    assertEquals(2000, year.value());
};

DateTime.Field.Year.Test.testSetMills_2000_Before = function() {
    var year = DateTime.Field.Year.Test.createYear().millis(time(2000, 1, 1) - 1);

    assertEquals(1999, year.value());
};

DateTime.Field.Year.Test.testSetMills_2001_Start = function() {
    var year = DateTime.Field.Year.Test.createYear().millis(time(2001, 1, 1));

    assertEquals(2001, year.value());
};

DateTime.Field.Year.Test.testSetMills_2001_Before = function() {
    var year = DateTime.Field.Year.Test.createYear().millis(time(2001, 1, 1) - 1);

    assertEquals(2000, year.value());
};

DateTime.Field.Year.Test.testSetMills_Epoch_Positive = function() {
    var year = DateTime.Field.Year.Test.createYear().millis(12312);

    assertEquals(1970, year.value());
};

DateTime.Field.Year.Test.testSetMills_Epoch_Negative = function() {
    var year = DateTime.Field.Year.Test.createYear().millis(-12312);

    assertEquals(1969, year.value());
};

DateTime.Field.Year.Test.testMaxYear_Constructor_OK = function() {
    var year = DateTime.Field.Year.Test.createYear(time(DateTime.Field.Year.MAX_YEAR, 12, 31));

    assertEquals(DateTime.Field.Year.MAX_YEAR, year.value());
};

DateTime.Field.Year.Test.testMaxYear_Constructor_Fail = function() {
    assertFail(function() {
        DateTime.Field.Year.Test.createYear(time(DateTime.Field.Year.MAX_YEAR + 1, 12, 31));
    });
};

DateTime.Field.Year.Test.testMinYear_Constructor_OK = function() {
    var year = DateTime.Field.Year.Test.createYear(time(DateTime.Field.Year.MIN_YEAR, 1, 1));

    assertEquals(DateTime.Field.Year.MIN_YEAR, year.value());
};

DateTime.Field.Year.Test.testMinYear_Constructor_Fail = function() {
    assertFail(function() {
        DateTime.Field.Year.Test.createYear(time(DateTime.Field.Year.MIN_YEAR - 1, 1, 1));
    });
};

DateTime.Field.Year.Test.testZeroYear_Constructor = function() {
    var year = DateTime.Field.Year.Test.createYear(time(0, 1, 1));

    assertEquals(-1, year.value());
};

DateTime.Field.Year.Test.testZeroYear_Value = function() {
    assertFail(function() {
        DateTime.Field.Year.Test.createYear().value(0);
    });
};

DateTime.Field.Year.Test.testMaxYear_Value_OK = function() {
    var year = DateTime.Field.Year.Test.createYear().value(DateTime.Field.Year.MAX_YEAR);

    assertEquals(DateTime.Field.Year.MAX_YEAR, year.value());

};

DateTime.Field.Year.Test.testMaxYear_Value_Fail = function() {
    assertFail(function() {
        DateTime.Field.Year.Test.createYear().value(DateTime.Field.Year.MAX_YEAR + 1);
    });
};

DateTime.Field.Year.Test.testMinYear_Value_OK = function() {
    var year = DateTime.Field.Year.Test.createYear().value(DateTime.Field.Year.MIN_YEAR);

    assertEquals(DateTime.Field.Year.MIN_YEAR, year.value());
};

DateTime.Field.Year.Test.testMinYear_Value_Fail = function() {
    assertFail(function() {
        DateTime.Field.Year.Test.createYear().value(DateTime.Field.Year.MIN_YEAR - 1);
    });
};

DateTime.Field.Year.Test.testIsLeap_2000 = function() {
    assertEquals(true, DateTime.Field.Year.Test.createYear().value(2000).isLeap());
};

DateTime.Field.Year.Test.testIsLeap_1000 = function() {
    assertEquals(false, DateTime.Field.Year.Test.createYear().value(1000).isLeap());
};

DateTime.Field.Year.Test.testIsLeap_1970 = function() {
    assertEquals(false, DateTime.Field.Year.Test.createYear().value(1970).isLeap());
};

DateTime.Field.Year.Test.testIsLeap_444 = function() {
    assertEquals(true, DateTime.Field.Year.Test.createYear().value(444).isLeap());
};

DateTime.Field.Year.Test.testIsLeap_minus445 = function() {
    assertEquals(true, DateTime.Field.Year.Test.createYear().value(-445).isLeap());
};

DateTime.Field.Year.Test.testIsLeap_minus1001 = function() {
    assertEquals(false, DateTime.Field.Year.Test.createYear().value(-1001).isLeap());
};

DateTime.Field.Year.Test.testIsLeap_minus1001 = function() {
    assertEquals(true, DateTime.Field.Year.Test.createYear().value(-2001).isLeap());
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

DateTime.Field.Year.Test.createYear = function(time) {
    return new DateTime.Field.Year(mock({time: DateTime.exists(time, 0)}));
};
