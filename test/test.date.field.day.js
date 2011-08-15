DateTime.Field.Day.Test = {};

DateTime.Field.Day.Test.testCreation = function() {
    var day = new DateTime.Field.Day(DateTime.Field.Day.MONDAY);

    assertEquals(DateTime.Field.Day.MONDAY, day.value());
};

DateTime.Field.Day.Test.testCreation_Empty = function() {
    assertWithTime(2 * DateTime.Field.MILLS_PER_DAY + DateTime.Field.MILLS_PER_WEEK * 800 + 120937, function () {
        var day = new DateTime.Field.Day();

        assertEquals(DateTime.Field.Day.SATURDAY, day.value());
    });
};

DateTime.Field.Day.Test.testSetValue = function() {
    var day = new DateTime.Field.Day().value(1);

    assertEquals(1, day.value());
};

DateTime.Field.Day.Test.testGetMills_Epoch = function() {
    var day = new DateTime.Field.Day().mills(10120);

    assertEquals((DateTime.Field.Day.THURSDAY - 1) * DateTime.Field.MILLS_PER_DAY, day.mills());
};

DateTime.Field.Day.Test.testGetMills_Mills = function() {
    var day = new DateTime.Field.Day().mills(DateTime.Field.MILLS_PER_WEEK * 100 + 1234);

    assertEquals((DateTime.Field.Day.THURSDAY - 1) * DateTime.Field.MILLS_PER_DAY, day.mills());
};

DateTime.Field.Day.Test.testGetMills_Value = function() {
    var day = new DateTime.Field.Day().value(DateTime.Field.Day.SUNDAY);

    assertEquals((DateTime.Field.Day.SUNDAY - 1) * DateTime.Field.MILLS_PER_DAY, day.mills());
};

DateTime.Field.Day.Test.testValidate_text = function() {
    assertFail(function() {
        DateTime.Field.Day.validate("a");
    });
};

DateTime.Field.Day.Test.testValidate_long = function() {
    assertFail(function() {
        DateTime.Field.Day.validate("11231237012730198239812398");
    });
};

DateTime.Field.Day.Test.testValidate_hex = function() {
    assertFail(function() {
        DateTime.Field.Day.validate("0x1");
    });
};

DateTime.Field.Day.Test.testValidate_zeroTrail = function() {
    assertEquals(7, DateTime.Field.Day.validate("07"));
};

DateTime.Field.Day.Test.testValidate_negative = function() {
    assertFail(function() {
        DateTime.Field.Day.validate("-1");
    });
};
