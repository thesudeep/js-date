Date.Field.Day.Test = {};

Date.Field.Day.Test.testCreation = function() {
    var day = new Date.Field.Day(Date.Field.Day.MONDAY);

    assertEquals(Date.Field.Day.MONDAY, day.value());
};

Date.Field.Day.Test.testCreation_Empty = function() {
    assertWithTime(2 * Date.Field.MILLS_PER_DAY + Date.Field.MILLS_PER_WEEK * 800 + 120937, function () {
        var day = new Date.Field.Day();

        assertEquals(Date.Field.Day.SATURDAY, day.value());
    });
};

Date.Field.Day.Test.testSetValue = function() {
    var day = new Date.Field.Day().value(1);

    assertEquals(1, day.value());
};

Date.Field.Day.Test.testGetMills_Epoch = function() {
    var day = new Date.Field.Day().mills(10120);

    assertEquals((Date.Field.Day.THURSDAY - 1) * Date.Field.MILLS_PER_DAY, day.mills());
};

Date.Field.Day.Test.testGetMills_Mills = function() {
    var day = new Date.Field.Day().mills(Date.Field.MILLS_PER_WEEK * 100 + 1234);

    assertEquals((Date.Field.Day.THURSDAY - 1) * Date.Field.MILLS_PER_DAY, day.mills());
};

Date.Field.Day.Test.testGetMills_Value = function() {
    var day = new Date.Field.Day().value(Date.Field.Day.SUNDAY);

    assertEquals((Date.Field.Day.SUNDAY - 1) * Date.Field.MILLS_PER_DAY, day.mills());
};

Date.Field.Day.Test.testValidate_text = function() {
    assertFail(function() {
        Date.Field.Day.validate("a");
    });
};

Date.Field.Day.Test.testValidate_long = function() {
    assertFail(function() {
        Date.Field.Day.validate("11231237012730198239812398");
    });
};

Date.Field.Day.Test.testValidate_hex = function() {
    assertFail(function() {
        Date.Field.Day.validate("0x1");
    });
};

Date.Field.Day.Test.testValidate_zeroTrail = function() {
    assertEquals(7, Date.Field.Day.validate("07"));
};

Date.Field.Day.Test.testValidate_negative = function() {
    assertFail(function() {
        Date.Field.Day.validate("-1");
    });
};
