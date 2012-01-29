(function () {
    var params = {
        englishName: "English",
        nativeName: "English",
        bcNames: ["BC", "BCE"],
        adNames: ["AD", "CE"],
        dayNames: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        shortDayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        shortMonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        amName: "AM",
        pmName: "PM"
    };

    Locale.EN = new BasicLocale("en", params);
})();
