DateTime.Field.WeekOfYear.Test = {};

DateTime.Field.WeekOfYear.Test.testCreation = function() {
    var week = new DateTime.Field.WeekOfYear(1);

    assertEquals(1, week.value());
};

DateTime.Field.WeekOfYear.Test.testCreation_Empty = function() {
    var week = new DateTime.Field.WeekOfYear();

    assertEquals(0, week.value());
};

DateTime.Field.WeekOfYear.Test.testSetValue = function() {
    var week = new DateTime.Field.WeekOfYear().value(1);

    assertEquals(1, week.value());
};

DateTime.Field.WeekOfYear.Test.testGetMills_Epoch = function() {
    var week = new DateTime.Field.WeekOfYear().millis(10120);

    assertEquals(0, week.millis());
};

DateTime.Field.WeekOfYear.Test.testGetMills_Mills = function() {
    var week = new DateTime.Field.WeekOfYear().millis(DateTime.MILLS_PER_WEEK * 100 + 1234);

    assertEquals(DateTime.MILLS_PER_WEEK * 100, week.millis());
};

DateTime.Field.WeekOfYear.Test.testGetMills_Value = function() {
    var week = new DateTime.Field.WeekOfYear().value(100);

    assertEquals(DateTime.MILLS_PER_WEEK * 100, week.millis());
};

DateTime.Field.WeekOfYear.Test.testSetMills_Without_Start = function() {
    var week = new DateTime.Field.WeekOfYear().millis(DateTime.MILLS_PER_WEEK * 100 + 1234);

    assertEquals(100, week.value());
};

DateTime.Field.WeekOfYear.Test.testSetMills_With_Start = function() {
    var week = new DateTime.Field.WeekOfYear().millis(DateTime.MILLS_PER_WEEK * 100 + 1234, 1235);

    assertEquals(99, week.value());
};

DateTime.Field.WeekOfYear.Test.testValidate_text = function() {
    assertFail(function() {
        DateTime.Field.WeekOfYear.validate("a");
    });
};

DateTime.Field.WeekOfYear.Test.testValidate_long = function() {
    assertFail(function() {
        DateTime.Field.WeekOfYear.validate("11231237012730198239812398");
    });
};

DateTime.Field.WeekOfYear.Test.testValidate_hex = function() {
    assertFail(function() {
        DateTime.Field.WeekOfYear.validate("0x1");
    });
};

DateTime.Field.WeekOfYear.Test.testValidate_zeroTrail = function() {
    assertEquals(12, DateTime.Field.WeekOfYear.validate("012"));
};

DateTime.Field.WeekOfYear.Test.testValidate_negative = function() {
    assertEquals(-1, DateTime.Field.WeekOfYear.validate("-1"));
};
