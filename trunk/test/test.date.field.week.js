DateTime.Field.Week.Test = {};

DateTime.Field.Week.Test.testCreation = function() {
    var week = new DateTime.Field.Week(1);

    assertEquals(1, week.value());
};

DateTime.Field.Week.Test.testCreation_Empty = function() {
    var week = new DateTime.Field.Week();

    assertEquals(0, week.value());
};

DateTime.Field.Week.Test.testSetValue = function() {
    var week = new DateTime.Field.Week().value(1);

    assertEquals(1, week.value());
};

DateTime.Field.Week.Test.testGetMills_Epoch = function() {
    var week = new DateTime.Field.Week().millis(10120);

    assertEquals(0, week.millis());
};

DateTime.Field.Week.Test.testGetMills_Mills = function() {
    var week = new DateTime.Field.Week().millis(DateTime.MILLS_PER_WEEK * 100 + 1234);

    assertEquals(DateTime.MILLS_PER_WEEK * 100, week.millis());
};

DateTime.Field.Week.Test.testGetMills_Value = function() {
    var week = new DateTime.Field.Week().value(100);

    assertEquals(DateTime.MILLS_PER_WEEK * 100, week.millis());
};

DateTime.Field.Week.Test.testSetMills_Without_Start = function() {
    var week = new DateTime.Field.Week().millis(DateTime.MILLS_PER_WEEK * 100 + 1234);

    assertEquals(100, week.value());
};

DateTime.Field.Week.Test.testSetMills_With_Start = function() {
    var week = new DateTime.Field.Week().millis(DateTime.MILLS_PER_WEEK * 100 + 1234, 1235);

    assertEquals(99, week.value());
};

DateTime.Field.Week.Test.testValidate_text = function() {
    assertFail(function() {
        DateTime.Field.Week.validate("a");
    });
};

DateTime.Field.Week.Test.testValidate_long = function() {
    assertFail(function() {
        DateTime.Field.Week.validate("11231237012730198239812398");
    });
};

DateTime.Field.Week.Test.testValidate_hex = function() {
    assertFail(function() {
        DateTime.Field.Week.validate("0x1");
    });
};

DateTime.Field.Week.Test.testValidate_zeroTrail = function() {
    assertEquals(12, DateTime.Field.Week.validate("012"));
};

DateTime.Field.Week.Test.testValidate_negative = function() {
    assertEquals(-1, DateTime.Field.Week.validate("-1"));
};
