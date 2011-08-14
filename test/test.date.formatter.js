Date.Formatter.Test = {};

Date.Formatter.Test.testCreation = function() {
//    new Date.Formatter("GGGG yyyy MMMM wwww WWWW DDDD dddd FFFF EEEE aaaa HHHH kkkk KKKK hhhh mmmm ssss SSSS zzzz ZZZZ");
    new Date.Formatter("GGGG yyyy MMMM wwww WWWW dddd FFFF EEEE HHHH kkkk mmmm ssss SSSS zzzz ZZZZ");
};

Date.Formatter.Test.test_G = function() {
    var formatter = new Date.Formatter("G");

    assertEquals("AD", formatter.format(time(1970, 2, 3, 4, 5, 6, 231)));
};

Date.Formatter.Test.test_yyyy = function() {
    var formatter = new Date.Formatter("yyyy");

    assertEquals("1970", formatter.format(time(1970, 2, 3, 4, 5, 6, 231)));
};

Date.Formatter.Test.test_M = function() {
    var formatter = new Date.Formatter("M");

    assertEquals("2", formatter.format(time(1970, 2, 3, 4, 5, 6, 231)));
};

Date.Formatter.Test.test_MM = function() {
    var formatter = new Date.Formatter("MM");

    assertEquals("02", formatter.format(time(1970, 2, 3, 4, 5, 6, 231)));
};

Date.Formatter.Test.test_w = function() {
    var formatter = new Date.Formatter("w");

    assertEquals("4", formatter.format(time(1970, 2, 3, 4, 5, 6, 231)));
};

Date.Formatter.Test.test_ww = function() {
    var formatter = new Date.Formatter("ww");

    assertEquals("04", formatter.format(time(1970, 2, 3, 4, 5, 6, 231)));
};

Date.Formatter.Test.test_W = function() {
    var formatter = new Date.Formatter("w");

    assertEquals("1", formatter.format(time(1970, 2, 3, 4, 5, 6, 231)));
};

Date.Formatter.Test.test_WW = function() {
    var formatter = new Date.Formatter("ww");

    assertEquals("01", formatter.format(time(1970, 2, 3, 4, 5, 6, 231)));
};

Date.Formatter.Test.test_d = function() {
    var formatter = new Date.Formatter("d");

    assertEquals("3", formatter.format(time(1970, 2, 3, 4, 5, 6, 231)));
};

Date.Formatter.Test.test_dd = function() {
    var formatter = new Date.Formatter("dd");

    assertEquals("03", formatter.format(time(1970, 2, 3, 4, 5, 6, 231)));
};
