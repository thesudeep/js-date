/**
 * A year field suitable for many calendars.
 *
 * @author Guy Allard
 * @author Stephen Colebourne
 * @author Brian S O'Neill
 * @since 1.1, refactored from GJYearDateTimeField
 */
BasicYearDateTimeField = function () {

};

inherits(BasicYearDateTimeField, ImpreciseDateTimeField);
    /** Serialization version. */
    private static final long serialVersionUID = -98628754872287L;

    /** The underlying basic chronology. */
    protected final BasicChronology iChronology;

    /**
     * Restricted constructor.
     *
     * @param chronology  the chronology this field belogs to
     */
    BasicYearDateTimeField(BasicChronology chronology) {
        super(DateTimeFieldType.year(), chronology.getAverageMillisPerYear());
        iChronology = chronology;
    }

    public boolean isLenient() {
        return false;
    }

    public int get(long instant) {
        return iChronology.getYear(instant);
    }

    public long add(long instant, int years) {
        if (years == 0) {
            return instant;
        }
        int thisYear = get(instant);
        int newYear = FieldUtils.safeAdd(thisYear, years);
        return set(instant, newYear);
    }

    public long add(long instant, long years) {
        return add(instant, FieldUtils.safeToInt(years));
    }

    public long addWrapField(long instant, int years) {
        if (years == 0) {
            return instant;
        }
        // Return newly calculated millis value
        int thisYear = iChronology.getYear(instant);
        int wrappedYear = FieldUtils.getWrappedValue
            (thisYear, years, iChronology.getMinYear(), iChronology.getMaxYear());
        return set(instant, wrappedYear);
    }

    public long set(long instant, int year) {
        FieldUtils.verifyValueBounds
            (this, year, iChronology.getMinYear(), iChronology.getMaxYear());
        return iChronology.setYear(instant, year);
    }

    public long getDifferenceAsLong(long minuendInstant, long subtrahendInstant) {
        if (minuendInstant < subtrahendInstant) {
            return -iChronology.getYearDifference(subtrahendInstant, minuendInstant);
        }
        return iChronology.getYearDifference(minuendInstant, subtrahendInstant);
    }

    public DurationField getRangeDurationField() {
        return null;
    }

    public boolean isLeap(long instant) {
        return iChronology.isLeapYear(get(instant));
    }

    public int getLeapAmount(long instant) {
        if (iChronology.isLeapYear(get(instant))) {
            return 1;
        } else {
            return 0;
        }
    }

    public DurationField getLeapDurationField() {
        return iChronology.days();
    }

    public int getMinimumValue() {
        return iChronology.getMinYear();
    }

    public int getMaximumValue() {
        return iChronology.getMaxYear();
    }

    public long roundFloor(long instant) {
        return iChronology.getYearMillis(get(instant));
    }

    public long roundCeiling(long instant) {
        int year = get(instant);
        long yearStartMillis = iChronology.getYearMillis(year);
        if (instant != yearStartMillis) {
            // Bump up to start of next year.
            instant = iChronology.getYearMillis(year + 1);
        }
        return instant;
    }

    public long remainder(long instant) {
        return instant - roundFloor(instant);
    }

    /**
     * Serialization singleton
     */
    private Object readResolve() {
        return iChronology.year();
    }
