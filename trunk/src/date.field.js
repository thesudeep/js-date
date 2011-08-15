DateTime.Field = {};
// These are ints not enumerations as they represent genuine int values
/** Constant (0) representing AM, the morning (from Calendar) */
DateTime.Field.AM = 0;
/** Constant (1) representing PM, the afternoon (from Calendar) */
DateTime.Field.PM = 1;
/** Constant (0) representing BC, years before zero (from Calendar) */
DateTime.Field.BC = 0;
/** Alternative constant (0) representing BCE, Before Common Era (secular) */
DateTime.Field.BCE = 0;
/**
 * Constant (1) representing AD, years after zero (from Calendar).
 * <p>
 * All new chronologies with differrent Era values should try to assign
 * eras as follows. The era that was in force at 1970-01-01 (ISO) is assigned
 * the value 1. Earlier eras are assigned sequentially smaller numbers.
 * Later eras are assigned sequentially greater numbers.
 */
DateTime.Field.AD = 1;
/**
 * Alternative constant (1) representing CE, Common Era (secular).
 * <p>
 * All new chronologies with differrent Era values should try to assign
 * eras as follows. The era that was in force at 1970-01-01 (ISO) is assigned
 * the value 1. Earlier eras are assigned sequentially smaller numbers.
 * Later eras are assigned sequentially greater numbers.
 */
DateTime.Field.CE = 1;
/** Milliseconds in one second (1000) (ISO) */
DateTime.Field.MILLS_PER_SECOND = 1000;
/** Seconds in one minute (60) (ISO) */
DateTime.Field.SECONDS_PER_MINUTE = 60;
/** Milliseconds in one minute (ISO) */
DateTime.Field.MILLS_PER_MINUTE = DateTime.Field.MILLS_PER_SECOND * DateTime.Field.SECONDS_PER_MINUTE;
/** Minutes in one hour (ISO) */
DateTime.Field.MINUTES_PER_HOUR = 60;
/** Seconds in one hour (ISO) */
DateTime.Field.SECONDS_PER_HOUR = DateTime.Field.SECONDS_PER_MINUTE * DateTime.Field.MINUTES_PER_HOUR;
/** Milliseconds in one hour (ISO) */
DateTime.Field.MILLS_PER_HOUR = DateTime.Field.MILLS_PER_MINUTE * DateTime.Field.MINUTES_PER_HOUR;
/** Hours in a typical day (24) (ISO). Due to time zone offset changes, the number of hours per day can vary. */
DateTime.Field.HOURS_PER_DAY = 24;
/** Minutes in a typical day (ISO). Due to time zone offset changes, the number of minutes per day can vary. */
DateTime.Field.MINUTES_PER_DAY = DateTime.Field.MINUTES_PER_HOUR * DateTime.Field.HOURS_PER_DAY;
/** Seconds in a typical day (ISO). Due to time zone offset changes, the number of seconds per day can vary. */
DateTime.Field.SECONDS_PER_DAY = DateTime.Field.SECONDS_PER_HOUR * DateTime.Field.HOURS_PER_DAY;
/** Milliseconds in a typical day (ISO). Due to time zone offset changes, the number of milliseconds per day can vary. */
DateTime.Field.MILLS_PER_DAY = DateTime.Field.MILLS_PER_HOUR * DateTime.Field.HOURS_PER_DAY;
/** Days in one week (7) (ISO) */
DateTime.Field.DAYS_PER_WEEK = 7;
/** Hours in a typical week. Due to time zone offset changes, the number of hours per week can vary. */
DateTime.Field.HOURS_PER_WEEK = DateTime.Field.HOURS_PER_DAY * DateTime.Field.DAYS_PER_WEEK;
/** Minutes in a typical week (ISO). Due to time zone offset changes, the number of minutes per week can vary. */
DateTime.Field.MINUTES_PER_WEEK = DateTime.Field.MINUTES_PER_DAY * DateTime.Field.DAYS_PER_WEEK;
/** Seconds in a typical week (ISO). Due to time zone offset changes, the number of seconds per week can vary. */
DateTime.Field.SECONDS_PER_WEEK = DateTime.Field.SECONDS_PER_DAY * DateTime.Field.DAYS_PER_WEEK;
/** Milliseconds in a typical week (ISO). Due to time zone offset changes, the number of milliseconds per week can vary. */
DateTime.Field.MILLS_PER_WEEK = DateTime.Field.MILLS_PER_DAY * DateTime.Field.DAYS_PER_WEEK;
