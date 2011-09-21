DateTime.Formatter.Test = {};

DateTime.Formatter.Test.testCreation = function() {
//    new DateTime.Formatter("GGGG yyyy MMMM wwww WWWW DDDD dddd FFFF EEEE aaaa HHHH kkkk KKKK hhhh mmmm ssss SSSS zzzz ZZZZ");
    new DateTime.Formatter("GGGG yyyy MMMM wwww WWWW dddd FFFF EEEE HHHH kkkk mmmm ssss SSSS zzzz ZZZZ");
};

DateTime.Formatter.Test.testFormat_G = function() {
    var formatter = new DateTime.Formatter("G");

    assertEquals("AD", formatter.format(time(1970, 2, 3, 4, 5, 6, 231)));
};

DateTime.Formatter.Test.testFormat_yyyy = function() {
    var formatter = new DateTime.Formatter("yyyy");

    assertEquals("1970", formatter.format(time(1970, 2, 3, 4, 5, 6, 231)));
};

DateTime.Formatter.Test.testFormat_M = function() {
    var formatter = new DateTime.Formatter("M");

    assertEquals("2", formatter.format(time(1970, 2, 3, 4, 5, 6, 231)));
};

DateTime.Formatter.Test.testFormat_MM = function() {
    var formatter = new DateTime.Formatter("MM");

    assertEquals("02", formatter.format(time(1970, 2, 3, 4, 5, 6, 231)));
};

DateTime.Formatter.Test.testFormat_w = function() {
    var formatter = new DateTime.Formatter("w");

    assertEquals("6", formatter.format(time(1970, 2, 3, 4, 5, 6, 231)));
};

DateTime.Formatter.Test.testFormat_ww = function() {
    var formatter = new DateTime.Formatter("ww");

    assertEquals("06", formatter.format(time(1970, 2, 3, 4, 5, 6, 231)));
};

DateTime.Formatter.Test.testFormat_W = function() {
    var formatter = new DateTime.Formatter("W");

    assertEquals("2", formatter.format(time(1970, 2, 3, 4, 5, 6, 231)));
};

DateTime.Formatter.Test.testFormat_WW = function() {
    var formatter = new DateTime.Formatter("WW");

    assertEquals("02", formatter.format(time(1970, 2, 3, 4, 5, 6, 231)));
};

DateTime.Formatter.Test.testFormat_d = function() {
    var formatter = new DateTime.Formatter("d");

    assertEquals("3", formatter.format(time(1970, 2, 3, 4, 5, 6, 231)));
};

DateTime.Formatter.Test.testFormat_dd = function() {
    var formatter = new DateTime.Formatter("dd");

    assertEquals("03", formatter.format(time(1970, 2, 3, 4, 5, 6, 231)));
};

DateTime.Formatter.Test.testParse_fullDate = function() {
    var formatter = new DateTime.Formatter("yyyy-MM-dd");

    assertEquals(time(2012, 11, 12), formatter.parse("2012-11-12").time());
};

DateTime.Formatter.Test.testParse_shortDate = function() {
    var formatter = new DateTime.Formatter("yy-MM-dd");

    assertEquals(time(1999, 11, 12), formatter.parse("99-11-12").time());
};

DateTime.Formatter.Test.testParse_shortDate19 = function() {
    var formatter = new DateTime.Formatter("yy-MM-dd");

    assertEquals(time(1932, 11, 12), formatter.parse("32-11-12").time());
};

DateTime.Formatter.Test.testParse_shortDate20 = function() {
    var formatter = new DateTime.Formatter("yy-MM-dd");

    assertEquals(time(2031, 11, 12), formatter.parse("31-11-12").time());
};

DateTime.Formatter.Test.testParse_withoutSeparators = function() {
    var formatter = new DateTime.Formatter("yyyyMMdd");

    assertEquals(time(2012, 11, 12), formatter.parse("20121112").time());
};

DateTime.Formatter.Test.testParse_fullDateTime = function() {
    var formatter = new DateTime.Formatter("yyyy-MM-dd HH:mm");

    assertEquals(time(2012, 11, 12, 1, 59), formatter.parse("2012-11-12 01:59").time());
};
