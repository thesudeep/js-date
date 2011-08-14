Date.Field.Week.Test = {};

Date.Field.Week.Test.testCreation = function() {
    var week = new Date.Field.Week(1);

    assertEquals(1, week.value());
};

Date.Field.Week.Test.testCreation_Empty = function() {
    var week = new Date.Field.Week();

    assertEquals(0, week.value());
};

Date.Field.Week.Test.testSetValue = function() {
    var week = new Date.Field.Week().value(1);

    assertEquals(1, week.value());
};

Date.Field.Week.Test.testGetMills_Epoch = function() {
    var week = new Date.Field.Week().mills(10120);

    assertEquals(0, week.mills());
};

Date.Field.Week.Test.testGetMills_Mills = function() {
    var week = new Date.Field.Week().mills(Date.Field.MILLS_PER_WEEK * 100 + 1234);

    assertEquals(Date.Field.MILLS_PER_WEEK * 100, week.mills());
};

Date.Field.Week.Test.testGetMills_Value = function() {
    var week = new Date.Field.Week().value(100);

    assertEquals(Date.Field.MILLS_PER_WEEK * 100, week.mills());
};

Date.Field.Week.Test.testSetMills_Without_Start = function() {
    var week = new Date.Field.Week().mills(Date.Field.MILLS_PER_WEEK * 100 + 1234);

    assertEquals(100, week.value());
};

Date.Field.Week.Test.testSetMills_With_Start = function() {
    var week = new Date.Field.Week().mills(Date.Field.MILLS_PER_WEEK * 100 + 1234, 1235);

    assertEquals(99, week.value());
};

Date.Field.Week.Test.testValidate_text = function() {
    assertFail(function() {
        Date.Field.Week.validate("a");
    });
};

Date.Field.Week.Test.testValidate_long = function() {
    assertFail(function() {
        Date.Field.Week.validate("11231237012730198239812398");
    });
};

Date.Field.Week.Test.testValidate_hex = function() {
    assertFail(function() {
        Date.Field.Week.validate("0x1");
    });
};

Date.Field.Week.Test.testValidate_zeroTrail = function() {
    assertEquals(12, Date.Field.Week.validate("012"));
};

Date.Field.Week.Test.testValidate_negative = function() {
    assertEquals(-1, Date.Field.Week.validate("-1"));
};
