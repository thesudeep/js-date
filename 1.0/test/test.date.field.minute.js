DateTime.Field.Minute.Test = {};

DateTime.Field.Minute.Test.testSetValue = function() {
    var minute = DateTime.Field.Minute.Test.createMinute().value(1);

    assertEquals(1, minute.value());
};

DateTime.Field.Minute.Test.testGetMillis_Epoch = function() {
    var minute = DateTime.Field.Minute.Test.createMinute().millis(10120);

    assertEquals(0, minute.millis());
};

DateTime.Field.Minute.Test.testGetMillis_Millis_10m = function() {
    var minute = DateTime.Field.Minute.Test.createMinute().millis(time(2000, 1, 1, 0, 10));

    assertEquals(10 * DateTime.MILLIS_PER_MINUTE, minute.millis());
};

DateTime.Field.Minute.Test.testGetMillis_Millis_2m = function() {
    var minute = DateTime.Field.Minute.Test.createMinute().millis(time(2000, 1, 1, 0, 2));

    assertEquals(2 * DateTime.MILLIS_PER_MINUTE, minute.millis());
};

DateTime.Field.Minute.Test.testSetMillis_2m_Start = function() {
    var minute = DateTime.Field.Minute.Test.createMinute().millis(time(2000, 1, 1, 0, 2));

    assertEquals(2, minute.value());
};

DateTime.Field.Minute.Test.testSetMillis_2m_Before = function() {
    var minute = DateTime.Field.Minute.Test.createMinute().millis(time(2000, 1, 1, 0, 2) - 1);

    assertEquals(1, minute.value());
};

DateTime.Field.Minute.Test.testSetMillis_negative = function() {
    var minute = DateTime.Field.Minute.Test.createMinute().millis(time(-2000, 1, 1, 0, 12));

    assertEquals(12, minute.value());
};

DateTime.Field.Minute.Test.testMaxMinute_Value_OK = function() {
    var minute = DateTime.Field.Minute.Test.createMinute().value(DateTime.Field.Minute.MAX_MINUTE);

    assertEquals(DateTime.Field.Minute.MAX_MINUTE, minute.value());
};

DateTime.Field.Minute.Test.testMaxMinute_Value_Fail = function() {
    assertFail(function() {
        DateTime.Field.Minute.Test.createMinute().value(DateTime.Field.Minute.MAX_MINUTE + 1);
    });
};

DateTime.Field.Minute.Test.testValidate_text = function() {
    assertFail(function() {
        DateTime.Field.Minute.validate("a");
    });
};

DateTime.Field.Minute.Test.testValidate_long = function() {
    assertFail(function() {
        DateTime.Field.Minute.validate("11231237012730198239812398");
    });
};

DateTime.Field.Minute.Test.testValidate_hex = function() {
    assertFail(function() {
        DateTime.Field.Minute.validate("0x1");
    });
};

DateTime.Field.Minute.Test.testValidate_zeroTrail = function() {
    assertEquals(12, DateTime.Field.Minute.validate("012"));
};

DateTime.Field.Minute.Test.testValidate_negative = function() {
    assertFail(function() {
        DateTime.Field.Minute.validate("-1");
    });
};

DateTime.Field.Minute.Test.createMinute = function(minute) {
    minute = DateTime.exists(minute, 0);

    return new DateTime.Field.Minute(mock({time: time(2000, 1, 1, 0, minute)}));
};
