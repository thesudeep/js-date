DateTime.Field.Hour.Test = {};

DateTime.Field.Hour.Test.testSetValue = function() {
    var hour = DateTime.Field.Hour.Test.createHour().value(1);

    assertEquals(1, hour.value());
};

DateTime.Field.Hour.Test.testGetMills_Epoch = function() {
    var hour = DateTime.Field.Hour.Test.createHour().millis(10120);

    assertEquals(0, hour.millis());
};

DateTime.Field.Hour.Test.testGetMills_Mills_10h = function() {
    var hour = DateTime.Field.Hour.Test.createHour().millis(time(1, 1, 1, 10));

    assertEquals(10 * DateTime.MILLS_PER_HOUR, hour.millis());
};

DateTime.Field.Hour.Test.testGetMills_Mills_2h = function() {
    var hour = DateTime.Field.Hour.Test.createHour().millis(time(1, 1, 1, 2));

    assertEquals(2 * DateTime.MILLS_PER_HOUR, hour.millis());
};

DateTime.Field.Hour.Test.testSetMills_2h_Start = function() {
    var hour = DateTime.Field.Hour.Test.createHour().millis(time(1, 1, 1, 2));

    assertEquals(2, hour.value());
};

DateTime.Field.Hour.Test.testSetMills_2h_Before = function() {
    var hour = DateTime.Field.Hour.Test.createHour().millis(time(1, 1, 1, 2) - 1);

    assertEquals(1, hour.value());
};

DateTime.Field.Hour.Test.testSetMills_negative = function() {
    var hour = DateTime.Field.Hour.Test.createHour().millis(time(-2001, 1, 1, 20));

    assertEquals(20, hour.value());
};

DateTime.Field.Hour.Test.testMaxHour_Value_OK = function() {
    var hour = DateTime.Field.Hour.Test.createHour().value(DateTime.Field.Hour.MAX_HOUR);

    assertEquals(DateTime.Field.Hour.MAX_HOUR, hour.value());
};

DateTime.Field.Hour.Test.testMaxHour_Value_Fail = function() {
    assertFail(function() {
        DateTime.Field.Hour.Test.createHour().value(DateTime.Field.Hour.MAX_HOUR + 1);
    });
};

DateTime.Field.Hour.Test.testMinHour_Value_OK = function() {
    DateTime.Field.Hour.Test.createHour(DateTime.Field.Hour.MIN_HOUR);
};

DateTime.Field.Hour.Test.testMinHour_Value_Fail = function() {
    assertFail(function() {
        DateTime.Field.Hour.Test.createHour().value(DateTime.Field.Hour.MIN_HOUR - 1);
    });
};

DateTime.Field.Hour.Test.testValidate_text = function() {
    assertFail(function() {
        DateTime.Field.Hour.validate("a");
    });
};

DateTime.Field.Hour.Test.testValidate_long = function() {
    assertFail(function() {
        DateTime.Field.Hour.validate("11231237012730198239812398");
    });
};

DateTime.Field.Hour.Test.testValidate_hex = function() {
    assertFail(function() {
        DateTime.Field.Hour.validate("0x1");
    });
};

DateTime.Field.Hour.Test.testValidate_zeroTrail = function() {
    assertEquals(12, DateTime.Field.Hour.validate("012"));
};

DateTime.Field.Hour.Test.testValidate_negative = function() {
    assertFail(function() {
        DateTime.Field.Hour.validate("-1");
    });
};

DateTime.Field.Hour.Test.createHour = function(hour) {
    hour = DateTime.exists(hour, 0);

    return new DateTime.Field.Hour(mock({time: time(2000, 1, 1, hour)}));
};