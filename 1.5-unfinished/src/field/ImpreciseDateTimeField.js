/**
 * Abstract datetime field class that defines its own DurationField, which
 * delegates back into this ImpreciseDateTimeField.
 * <p>
 * This DateTimeField is useful for defining DateTimeFields that are composed
 * of imprecise durations. If both duration fields are precise, then a
 * {@link PreciseDateTimeField} should be used instead.
 * <p>
 * When defining imprecise DateTimeFields where a matching DurationField is
 * already available, just extend BaseDateTimeField directly so as not to
 * create redundant DurationField instances.
 * <p>
 * ImpreciseDateTimeField is thread-safe and immutable, and its subclasses must
 * be as well.
 *
 * @author Brian S O'Neill
 * @see PreciseDateTimeField
 * @since 1.0
 * @param {DateTimeFieldType} type  the field type
 * @param {number} unitMillis the average duration unit milliseconds
 */
ImpreciseDateTimeField = function(type, unitMillis) {
    this._super.constructor(type);

    this._unitMillis = unitMillis;
    this._durationField = new LinkedDurationField(type.getDurationType());
};

inherits(ImpreciseDateTimeField, BaseDateTimeField);

    public abstract int get(long instant);

    public abstract long set(long instant, int value);

    public abstract long add(long instant, int value);

    public abstract long add(long instant, long value);

    /**
     * Computes the difference between two instants, as measured in the units
     * of this field. Any fractional units are dropped from the result. Calling
     * getDifference reverses the effect of calling add. In the following code:
     *
     * <pre>
     * long instant = ...
     * long v = ...
     * long age = getDifferenceAsLong(add(instant, v), instant);
     * </pre>
     *
     * The value 'age' is the same as the value 'v'.
     * <p>
     * The default implementation performs a guess-and-check algorithm using
     * getDurationField().getUnitMillis() and the add() method. Subclasses are
     * encouraged to provide a more efficient implementation.
     *
     * @param minuendInstant the milliseconds from 1970-01-01T00:00:00Z to
     * subtract from
     * @param subtrahendInstant the milliseconds from 1970-01-01T00:00:00Z to
     * subtract off the minuend
     * @return the difference in the units of this field
     */
    public long getDifference(long minuendInstant, long subtrahendInstant) {
        if (minuendInstant < subtrahendInstant) {
            return -getDifferenceAsLong(subtrahendInstant, minuendInstant);
        }

        long difference = (minuendInstant - subtrahendInstant) / iUnitMillis;
        if (add(subtrahendInstant, difference) < minuendInstant) {
            do {
                difference++;
            } while (add(subtrahendInstant, difference) <= minuendInstant);
            difference--;
        } else if (add(subtrahendInstant, difference) > minuendInstant) {
            do {
                difference--;
            } while (add(subtrahendInstant, difference) > minuendInstant);
        }
        return difference;
    }

    public final DurationField getDurationField() {
        return iDurationField;
    }

    public abstract DurationField getRangeDurationField();

    public abstract long roundFloor(long instant);

    protected final long getDurationUnitMillis() {
        return iUnitMillis;
    }

    private final class LinkedDurationField extends BaseDurationField {
        private static final long serialVersionUID = -203813474600094134L;

        LinkedDurationField(DurationFieldType type) {
            super(type);
        }

        public boolean isPrecise() {
            return false;
        }

        public long getUnitMillis() {
            return iUnitMillis;
        }

        public int getValue(long duration, long instant) {
            return ImpreciseDateTimeField.this
                .getDifference(instant + duration, instant);
        }

        public long getValueAsLong(long duration, long instant) {
            return ImpreciseDateTimeField.this
                .getDifferenceAsLong(instant + duration, instant);
        }

        public long getMillis(int value, long instant) {
            return ImpreciseDateTimeField.this.add(instant, value) - instant;
        }

        public long getMillis(long value, long instant) {
            return ImpreciseDateTimeField.this.add(instant, value) - instant;
        }

        public long add(long instant, int value) {
            return ImpreciseDateTimeField.this.add(instant, value);
        }

        public long add(long instant, long value) {
            return ImpreciseDateTimeField.this.add(instant, value);
        }

        public int getDifference(long minuendInstant, long subtrahendInstant) {
            return ImpreciseDateTimeField.this
                .getDifference(minuendInstant, subtrahendInstant);
        }

        public long getDifferenceAsLong(long minuendInstant, long subtrahendInstant) {
            return ImpreciseDateTimeField.this
                .getDifferenceAsLong(minuendInstant, subtrahendInstant);
        }
    }
