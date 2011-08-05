Date.Field = {
    /** Constant (1) representing January, the first month (ISO) */
    JANUARY: 1,
    /** Constant (2) representing February, the second month (ISO) */
    FEBRUARY: 2,
    /** Constant (3) representing March, the third month (ISO) */
    MARCH: 3,
    /** Constant (4) representing April, the fourth month (ISO) */
    APRIL: 4,
    /** Constant (5) representing May, the fifth month (ISO) */
    MAY: 5,
    /** Constant (6) representing June, the sixth month (ISO) */
    JUNE: 6,
    /** Constant (7) representing July, the seventh month (ISO) */
    JULY: 7,
    /** Constant (8) representing August, the eighth month (ISO) */
    AUGUST: 8,
    /** Constant (9) representing September, the nineth month (ISO) */
    SEPTEMBER: 9,
    /** Constant (10) representing October, the tenth month (ISO) */
    OCTOBER: 10,
    /** Constant (11) representing November, the eleventh month (ISO) */
    NOVEMBER: 11,
    /** Constant (12) representing December, the twelfth month (ISO) */
    DECEMBER: 12,
    // These are ints not enumerations as they represent genuine int values
    /** Constant (1) representing Monday, the first day of the week (ISO) */
    MONDAY: 1,
    /** Constant (2) representing Tuesday, the second day of the week (ISO) */
    TUESDAY: 2,
    /** Constant (3) representing Wednesday, the third day of the week (ISO) */
    WEDNESDAY: 3,
    /** Constant (4) representing Thursday, the fourth day of the week (ISO) */
    THURSDAY: 4,
    /** Constant (5) representing Friday, the fifth day of the week (ISO) */
    FRIDAY: 5,
    /** Constant (6) representing Saturday, the sixth day of the week (ISO) */
    SATURDAY: 6,
    /** Constant (7) representing Sunday, the seventh day of the week (ISO) */
    SUNDAY: 7,
    /** Constant (0) representing AM, the morning (from Calendar) */
    AM: 0,
    /** Constant (1) representing PM, the afternoon (from Calendar) */
    PM: 1,
    /** Constant (0) representing BC, years before zero (from Calendar) */
    BC: 0,
    /** Alternative constant (0) representing BCE, Before Common Era (secular) */
    BCE: 0,
    /**
     * Constant (1) representing AD, years after zero (from Calendar).
     * <p>
     * All new chronologies with differrent Era values should try to assign
     * eras as follows. The era that was in force at 1970-01-01 (ISO) is assigned
     * the value 1. Earlier eras are assigned sequentially smaller numbers.
     * Later eras are assigned sequentially greater numbers.
     */
    AD: 1,
    /**
     * Alternative constant (1) representing CE, Common Era (secular).
     * <p>
     * All new chronologies with differrent Era values should try to assign
     * eras as follows. The era that was in force at 1970-01-01 (ISO) is assigned
     * the value 1. Earlier eras are assigned sequentially smaller numbers.
     * Later eras are assigned sequentially greater numbers.
     */
    CE: 1,
    /** Milliseconds in one second (1000) (ISO) */
    MILLS_PER_SECOND: 1000,
    /** Seconds in one minute (60) (ISO) */
    SECONDS_PER_MINUTE: 60,
    /** Milliseconds in one minute (ISO) */
    MILLS_PER_MINUTE: Date.Field.MILLS_PER_SECOND * Date.Field.SECONDS_PER_MINUTE,
    /** Minutes in one hour (ISO) */
    MINUTES_PER_HOUR: 60,
    /** Seconds in one hour (ISO) */
    SECONDS_PER_HOUR: Date.Field.SECONDS_PER_MINUTE * Date.Field.MINUTES_PER_HOUR,
    /** Milliseconds in one hour (ISO) */
    MILLS_PER_HOUR: Date.Field.MILLS_PER_MINUTE * Date.Field.MINUTES_PER_HOUR,
    /** Hours in a typical day (24) (ISO). Due to time zone offset changes, the number of hours per day can vary. */
    HOURS_PER_DAY: 24,
    /** Minutes in a typical day (ISO). Due to time zone offset changes, the number of minutes per day can vary. */
    MINUTES_PER_DAY: Date.Field.MINUTES_PER_HOUR * Date.Field.HOURS_PER_DAY,
    /** Seconds in a typical day (ISO). Due to time zone offset changes, the number of seconds per day can vary. */
    SECONDS_PER_DAY: Date.Field.SECONDS_PER_HOUR * Date.Field.HOURS_PER_DAY,
    /** Milliseconds in a typical day (ISO). Due to time zone offset changes, the number of milliseconds per day can vary. */
    MILLS_PER_DAY: Date.Field.MILLS_PER_HOUR * Date.Field.HOURS_PER_DAY,
    /** Days in one week (7) (ISO) */
    DAYS_PER_WEEK: 7,
    /** Hours in a typical week. Due to time zone offset changes, the number of hours per week can vary. */
    HOURS_PER_WEEK: Date.Field.HOURS_PER_DAY * Date.Field.DAYS_PER_WEEK,
    /** Minutes in a typical week (ISO). Due to time zone offset changes, the number of minutes per week can vary. */
    MINUTES_PER_WEEK: Date.Field.MINUTES_PER_DAY * Date.Field.DAYS_PER_WEEK,
    /** Seconds in a typical week (ISO). Due to time zone offset changes, the number of seconds per week can vary. */
    SECONDS_PER_WEEK: Date.Field.SECONDS_PER_DAY * Date.Field.DAYS_PER_WEEK,
    /** Milliseconds in a typical week (ISO). Due to time zone offset changes, the number of milliseconds per week can vary. */
    MILLS_PER_WEEK: Date.Field.MILLS_PER_DAY * Date.Field.DAYS_PER_WEEK,
    
    assertTrue: function(condition, message) {
        if (!condition) {
            throw new Error(message);
        }
    },
    validateInt: function(value) {
        var i = parseInt(value);

        Date.Field.assertTrue(!isNaN(i), "Expected integer but was: " + value);

        return i;
    }
};