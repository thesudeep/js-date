DateTime.Field.DaysOfWeek.Test = {};

DateTime.Field.DaysOfWeek.Test.testSetValue = function() {
    var day = DateTime.Field.DaysOfWeek.Test.createDay().value(DateTime.Field.DaysOfWeek.MONDAY);

    assertEquals(DateTime.Field.DaysOfWeek.MONDAY, day.value());
};

DateTime.Field.DaysOfWeek.Test.testGetMillis_Epoch_Mon = function() {
    var day = DateTime.Field.DaysOfWeek.Test.createDay(DateTime.Field.DaysOfWeek.MONDAY).millis(10120);

    assertEquals(3 * DateTime.MILLIS_PER_DAY, day.millis());
};

DateTime.Field.DaysOfWeek.Test.testGetMillis_Epoch_Sun = function() {
    var day = DateTime.Field.DaysOfWeek.Test.createDay(DateTime.Field.DaysOfWeek.SUNDAY).millis(10120);

    assertEquals(4 * DateTime.MILLIS_PER_DAY, day.millis());
};

DateTime.Field.DaysOfWeek.Test.testGetMillis_Epoch_Thu = function() {
    var day = DateTime.Field.DaysOfWeek.Test.createDay(DateTime.Field.DaysOfWeek.THURSDAY).millis(10120);

    assertEquals(0, day.millis());
};

DateTime.Field.DaysOfWeek.Test.testGetMillis_Millis = function() {
    var day = DateTime.Field.DaysOfWeek.Test.createDay().millis(time(2011, 8, 12));

    assertEquals((DateTime.Field.DaysOfWeek.FRIDAY - 1) * DateTime.MILLIS_PER_DAY, day.millis());
};

DateTime.Field.DaysOfWeek.Test.testGetMillis_Value = function() {
    var day = DateTime.Field.DaysOfWeek.Test.createDay().value(DateTime.Field.DaysOfWeek.SUNDAY);

    assertEquals((DateTime.Field.DaysOfWeek.SUNDAY - 1) * DateTime.MILLIS_PER_DAY, day.millis());
};

DateTime.Field.DaysOfWeek.Test.testValidate_text = function() {
    assertFail(function() {
        DateTime.Field.DaysOfWeek.validate("a");
    });
};

DateTime.Field.DaysOfWeek.Test.testValidate_long = function() {
    assertFail(function() {
        DateTime.Field.DaysOfWeek.validate("11231237012730198239812398");
    });
};

DateTime.Field.DaysOfWeek.Test.testValidate_hex = function() {
    assertFail(function() {
        DateTime.Field.DaysOfWeek.validate("0x1");
    });
};

DateTime.Field.DaysOfWeek.Test.testValidate_zeroTrail = function() {
    assertEquals(7, DateTime.Field.DaysOfWeek.validate("07"));
};

DateTime.Field.DaysOfWeek.Test.testValidate_negative = function() {
    assertFail(function() {
        DateTime.Field.DaysOfWeek.validate("-1");
    });
};

DateTime.Field.DaysOfWeek.Test.createDay = function(firstDay, _time) {
    firstDay = DateTime.exists(firstDay, DateTime.Field.DaysOfWeek.MONDAY);
    _time = DateTime.exists(_time, time(2000, 12, 2, 12, 3, 5));

    return new DateTime.Field.DaysOfWeek(mock({
        time: _time,
        withFirstWeekDay: firstDay
    }));
};
