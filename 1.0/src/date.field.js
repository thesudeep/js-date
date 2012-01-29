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
