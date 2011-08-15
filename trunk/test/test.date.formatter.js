DateTime.Formatter.Test = {};

DateTime.Formatter.Test.testCreation = function() {
//    new DateTime.Formatter("GGGG yyyy MMMM wwww WWWW DDDD dddd FFFF EEEE aaaa HHHH kkkk KKKK hhhh mmmm ssss SSSS zzzz ZZZZ");
    new DateTime.Formatter("GGGG yyyy MMMM wwww WWWW dddd FFFF EEEE HHHH kkkk mmmm ssss SSSS zzzz ZZZZ");
};

DateTime.Formatter.Test.test_G = function() {
    var formatter = new DateTime.Formatter("G");

    assertEquals("AD", formatter.format(time(1970, 2, 3, 4, 5, 6, 231)));
};

DateTime.Formatter.Test.test_yyyy = function() {
    var formatter = new DateTime.Formatter("yyyy");

    assertEquals("1970", formatter.format(time(1970, 2, 3, 4, 5, 6, 231)));
};

DateTime.Formatter.Test.test_M = function() {
    var formatter = new DateTime.Formatter("M");

    assertEquals("2", formatter.format(time(1970, 2, 3, 4, 5, 6, 231)));
};

DateTime.Formatter.Test.test_MM = function() {
    var formatter = new DateTime.Formatter("MM");

    assertEquals("02", formatter.format(time(1970, 2, 3, 4, 5, 6, 231)));
};

DateTime.Formatter.Test.test_w = function() {
    var formatter = new DateTime.Formatter("w");

    assertEquals("4", formatter.format(time(1970, 2, 3, 4, 5, 6, 231)));
};

DateTime.Formatter.Test.test_ww = function() {
    var formatter = new DateTime.Formatter("ww");

    assertEquals("04", formatter.format(time(1970, 2, 3, 4, 5, 6, 231)));
};

DateTime.Formatter.Test.test_W = function() {
    var formatter = new DateTime.Formatter("W");

    assertEquals("2", formatter.format(time(1970, 2, 3, 4, 5, 6, 231)));
};

DateTime.Formatter.Test.test_WW = function() {
    var formatter = new DateTime.Formatter("WW");

    assertEquals("02", formatter.format(time(1970, 2, 3, 4, 5, 6, 231)));
};

DateTime.Formatter.Test.test_d = function() {
    var formatter = new DateTime.Formatter("d");

    assertEquals("3", formatter.format(time(1970, 2, 3, 4, 5, 6, 231)));
};

DateTime.Formatter.Test.test_dd = function() {
    var formatter = new DateTime.Formatter("dd");

    assertEquals("03", formatter.format(time(1970, 2, 3, 4, 5, 6, 231)));
};
