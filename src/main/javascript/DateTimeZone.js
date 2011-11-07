/**
 * DateTimeZone represents a time zone.
 * <p>
 * A time zone is a system of rules to convert time from one geographic
 * location to another. For example, Paris, France is one hour ahead of
 * London, England. Thus when it is 10:00 in London, it is 11:00 in Paris.
 * <p>
 * All time zone rules are expressed, for historical reasons, relative to
 * Greenwich, London. Local time in Greenwich is referred to as Greenwich Mean
 * Time (GMT).  This is similar, but not precisely identical, to Universal
 * Coordinated Time, or UTC. This library only uses the term UTC.
 * <p>
 * Using this system, America/Los_Angeles is expressed as UTC-08:00, or UTC-07:00
 * in the summer. The offset -08:00 indicates that America/Los_Angeles time is
 * obtained from UTC by adding -08:00, that is, by subtracting 8 hours.
 * <p>
 * The offset differs in the summer because of daylight saving time, or DST.
 * The following definitions of time are generally used:
 * <ul>
 * <li>UTC - The reference time.
 * <li>Standard Time - The local time without a daylight saving time offset.
 * For example, in Paris, standard time is UTC+01:00.
 * <li>Daylight Saving Time - The local time with a daylight saving time
 * offset. This offset is typically one hour, but not always. It is typically
 * used in most countries away from the equator.  In Paris, daylight saving
 * time is UTC+02:00.
 * <li>Wall Time - This is what a local clock on the wall reads. This will be
 * either Standard Time or Daylight Saving Time depending on the time of year
 * and whether the location uses Daylight Saving Time.
 * </ul>
 * <p>
 * Unlike the Java TimeZone class, DateTimeZone is immutable. It also only
 * supports long format time zone ids. Thus EST and ECT are not accepted.
 * However, the factory that accepts a TimeZone will attempt to convert from
 * the old short id to a suitable long id.
 * <p>
 * DateTimeZone is thread-safe and immutable, and all subclasses must be as
 * well.
 *
 * @author Brian S O'Neill
 * @author Stephen Colebourne
 * @since 1.0
 */
DateTimeZone = function(id) {
    assertHasValue(id, "Time zone id must not be null");
    /** @type {String} */
    this._id = id;
};

(function () {
//public static final DateTimeZone UTC = new FixedDateTimeZone("UTC", "UTC", 0, 0);

    /** The time zone for Universal Coordinated Time */
    DateTimeZone.UTC = new DateTimeZone("UTC");

    /**
     * Gets the default time zone.
     * <p>
     * The default time zone is derived from the system property {@code user.timezone}.
     * If that is {@code null} or is not a valid identifier, then the value of the
     * JDK {@code TimeZone} default is converted. If that fails, {@code UTC} is used.
     * <p>
     * NOTE: If the {@code java.util.TimeZone} default is updated <i>after</i> calling this
     * method, then the change will not be picked up here.
     *
     * @return {DateTimeZone} the default datetime zone object
     */
    DateTimeZone.getDefault = function() {
        //TODO
    };

    /**
     * Sets the default time zone.
     * <p>
     * NOTE: Calling this method does <i>not</i> set the {@code java.util.TimeZone} default.
     *
     * @param {DateTimeZone} zone  the default datetime zone object, must not be null
     * @throws IllegalArgumentException if the zone is null
     * @throws SecurityException if the application has insufficient security rights
     */
    DateTimeZone.setDefault = function(zone) {
        //TODO
    };

//-----------------------------------------------------------------------
    /**
     * Gets a time zone instance for the specified time zone id.
     * <p>
     * The time zone id may be one of those returned by getAvailableIDs.
     * Short ids, as accepted by {@link java.util.TimeZone}, are not accepted.
     * All IDs must be specified in the long format.
     * The exception is UTC, which is an acceptable id.
     * <p>
     * Alternatively a locale independent, fixed offset, datetime zone can
     * be specified. The form <code>[+-]hh:mm</code> can be used.
     *
     * @param {String} id  the ID of the datetime zone, null means default
     * @return {DateTimeZone} the DateTimeZone object for the ID
     * @throws IllegalArgumentException if the ID is not recognised
     */
    DateTimeZone.forID = function(id) {
        if (id == null) {
            return getDefault();
        }

        if (id == "UTC") {
            return DateTimeZone.UTC;
        }

        //TODO
    };

    /**
     * Gets a time zone instance for the specified offset to UTC in milliseconds.
     *
     * @param {number} millisOffset  the offset in millis from UTC
     * @return {DateTimeZone} the DateTimeZone object for the offset
     */
    DateTimeZone.forOffsetMillis = function(offset) {
        var id = printOffset(offset);

        if (offset == 0) {
            return DateTimeZone.UTC;
        }
        //TODO
    };

    /**
     * Gets all the available IDs supported.
     *
     * @return {String[]} an unmodifiable Set of String IDs
     */
    DateTimeZone.getAvailableIDs = function() {
        //TODO
    };


    /**
     * Gets a time zone instance for the specified offset to UTC in hours.
     * This method assumes standard length hours.
     * <p>
     * This factory is a convenient way of constructing zones with a fixed offset.
     *
     * @param {number} hoursOffset  the offset in hours from UTC
     * @return {DateTimeZone} the DateTimeZone object for the offset
     * @throws IllegalArgumentException if the offset is too large or too small
     */
    DateTimeZone.forOffsetHours = function(hoursOffset) {
        return DateTimeZone.forOffsetHoursMinutes(hoursOffset, 0);
    };

    /**
     * Gets a time zone instance for the specified offset to UTC in hours and minutes.
     * This method assumes 60 minutes in an hour, and standard length minutes.
     * <p>
     * This factory is a convenient way of constructing zones with a fixed offset.
     * The minutes value is always positive and in the range 0 to 59.
     * If constructed with the values (-2, 30), the resulting zone is '-02:30'.
     *
     * @param {number} hoursOffset  the offset in hours from UTC
     * @param {number} minutesOffset  the offset in minutes from UTC, must be between 0 and 59 inclusive
     * @return {DateTimeZone} the DateTimeZone object for the offset
     * @throws IllegalArgumentException if the offset or minute is too large or too small
     */
    DateTimeZone.forOffsetHoursMinutes = function(hoursOffset, minutesOffset) {
        if (hoursOffset == 0 && minutesOffset == 0) {
            return DateTimeZone.UTC;
        }

        assertTrue(minutesOffset >= 0 && minutesOffset < 60, "Minutes out of range: " + minutesOffset);

        var offset = 0;

        var hoursInMinutes = FieldUtils.safeMultiply(hoursOffset, 60);

        if (hoursInMinutes < 0) {
            minutesOffset = FieldUtils.safeAdd(hoursInMinutes, -minutesOffset);
        } else {
            minutesOffset = FieldUtils.safeAdd(hoursInMinutes, minutesOffset);
        }

        offset = FieldUtils.safeMultiply(minutesOffset, Chronology.MILLIS_PER_MINUTE);

        return DateTimeZone.forOffsetMillis(offset);
    };
// ----------------------------------------------------
    /**
     * Gets the ID of this datetime zone.
     *
     * @return {String} the ID of this datetime zone
     */
    DateTimeZone.prototype.getID = function() {
        return this._id;
    };

    /**
     * Returns a non-localized name that is unique to this time zone. It can be
     * combined with id to form a unique key for fetching localized names.
     *
     * @param {number} instant  milliseconds from 1970-01-01T00:00:00Z to get the name for
     * @return {String} name key or null if id should be used for names
     */
    DateTimeZone.prototype.getNameKey = function(instant) {
        abstractMethod();
    };

    /**
     * Gets the short name of this datetime zone suitable for display using
     * the specified locale.
     * <p>
     * If the name is not available for the locale, then this method returns a
     * string in the format <code>[+-]hh:mm</code>.
     *
     * @param {number} instant  milliseconds from 1970-01-01T00:00:00Z to get the name for
     * @param {Locale=} locale  the locale to get the name for
     * @return {String} the human-readable short name in the specified locale
     */
    DateTimeZone.prototype.getShortName = function(instant, locale) {
        if (locale == null) {
            locale = Locale.getDefault();
        }
        var nameKey = this.getNameKey(instant);

        if (nameKey == null) {
            return this._id;
        }

        /* TODO
         var name = cNameProvider.getShortName(locale, this._id, nameKey);

         if (name != null) {
         return name;
         }
         return printOffset(this.getOffset(instant));
         */
    };

    /**
     * Gets the long name of this datetime zone suitable for display using
     * the specified locale.
     * <p>
     * If the name is not available for the locale, then this method returns a
     * string in the format <code>[+-]hh:mm</code>.
     *
     * @param {number} instant  milliseconds from 1970-01-01T00:00:00Z to get the name for
     * @param {Locale=} locale  the locale to get the name for
     * @return {String} the human-readable long name in the specified locale
     */
    DateTimeZone.prototype.getName = function(instant, locale) {
        if (locale == null) {
            locale = Locale.getDefault();
        }

        var nameKey = this.getNameKey(instant);

        if (nameKey == null) {
            return this._id;
        }

        /* TODO
         var name = cNameProvider.getName(locale, this._id, nameKey);

         if (name != null) {
         return name;
         }

         return printOffset(this.getOffset(instant));
         */
    };

    /**
     * Gets the millisecond offset to add to UTC to get local time.
     *
     * @param {ReadableInstant|number} instant  milliseconds from 1970-01-01T00:00:00Z to get the offset for
     * @return {number} the millisecond offset to add to UTC to get local time
     */
    DateTimeZone.prototype.getOffset = function(instant) {
        abstractMethod();
    };

    /**
     * Gets the standard millisecond offset to add to UTC to get local time,
     * when standard time is in effect.
     *
     * @param {number} instant  milliseconds from 1970-01-01T00:00:00Z to get the offset for
     * @return {number} the millisecond offset to add to UTC to get local time
     */
    DateTimeZone.prototype.getStandardOffset = function(instant) {
        abstractMethod();
    };

    /**
     * Checks whether, at a particular instant, the offset is standard or not.
     * <p>
     * This method can be used to determine whether Summer Time (DST) applies.
     * As a general rule, if the offset at the specified instant is standard,
     * then either Winter time applies, or there is no Summer Time. If the
     * instant is not standard, then Summer Time applies.
     * <p>
     * The implementation of the method is simply whether {@link #getOffset(long)}
     * equals {@link #getStandardOffset(long)} at the specified instant.
     *
     * @param {number} instant  milliseconds from 1970-01-01T00:00:00Z to get the offset for
     * @return {boolean} true if the offset at the given instant is the standard offset
     * @since 1.5
     */
    DateTimeZone.prototype.isStandardOffset = function(instant) {
        return this.getOffset(instant) == this.getStandardOffset(instant);
    };

    /**
     * Gets the millisecond offset to subtract from local time to get UTC time.
     * This offset can be used to undo adding the offset obtained by getOffset.
     *
     * <pre>
     * millisLocal == millisUTC   + getOffset(millisUTC)
     * millisUTC   == millisLocal - getOffsetFromLocal(millisLocal)
     * </pre>
     *
     * NOTE: After calculating millisLocal, some error may be introduced. At
     * offset transitions (due to DST or other historical changes), ranges of
     * local times may map to different UTC times.
     * <p>
     * This method will return an offset suitable for calculating an instant
     * after any DST gap. For example, consider a zone with a cutover
     * from 01:00 to 01:59:<br />
     * Input: 00:00  Output: 00:00<br />
     * Input: 00:30  Output: 00:30<br />
     * Input: 01:00  Output: 02:00<br />
     * Input: 01:30  Output: 02:30<br />
     * Input: 02:00  Output: 02:00<br />
     * Input: 02:30  Output: 02:30<br />
     * <p>
     * During a DST overlap (where the local time is ambiguous) this method will return
     * the earlier instant. The combination of these two rules is to always favour
     * daylight (summer) time over standard (winter) time.
     * <p>
     * NOTE: Prior to v2.0, the DST overlap behaviour was not defined and varied by hemisphere.
     * Prior to v1.5, the DST gap behaviour was also not defined.
     *
     * @param {number} instantLocal  the millisecond instant, relative to this time zone, to get the offset for
     * @return {number} the millisecond offset to subtract from local time to get UTC time
     */
    DateTimeZone.prototype.getOffsetFromLocal = function(instantLocal) {
        // get the offset at instantLocal (first estimate)
        var offsetLocal = this.getOffset(instantLocal);
        // adjust instantLocal using the estimate and recalc the offset
        var instantAdjusted = instantLocal - offsetLocal;
        var offsetAdjusted = this.getOffset(instantAdjusted);
        // if the offsets differ, we must be near a DST boundary
        if (offsetLocal != offsetAdjusted) {
            // we need to ensure that time is always after the DST gap
            // this happens naturally for positive offsets, but not for negative
            if ((offsetLocal - offsetAdjusted) < 0) {
                // if we just return offsetAdjusted then the time is pushed
                // back before the transition, whereas it should be
                // on or after the transition
                var nextLocal = this.nextTransition(instantAdjusted);
                var nextAdjusted = this.nextTransition(instantLocal - offsetAdjusted);

                if (nextLocal != nextAdjusted) {
                    return offsetLocal;
                }
            }
        } else if (offsetLocal > 0) {
            var prev = this.previousTransition(instantAdjusted);
            if (prev < instantAdjusted) {
                var offsetPrev = this.getOffset(prev);
                var diff = offsetPrev - offsetLocal;
                if (instantAdjusted - prev <= diff) {
                    return offsetPrev;
                }
            }
        }
        return offsetAdjusted;
    };

    /**
     * Converts a standard UTC instant to a local instant with the same
     * local time. This conversion is used before performing a calculation
     * so that the calculation can be done using a simple local zone.
     *
     * @param {number} instantUTC  the UTC instant to convert to local
     * @return {number} the local instant with the same local time
     * @throws {Error} if the result overflows a long
     * @since 1.5
     */
    DateTimeZone.prototype.convertUTCToLocal = function(instantUTC) {
        var offset = this.getOffset(instantUTC);
        var instantLocal = instantUTC + offset;

        // If there is a sign change, but the two values have the same sign...
        if ((instantUTC ^ instantLocal) < 0 && (instantUTC ^ offset) >= 0) {
            throw new Error("Adding time zone offset caused overflow");
        }

        return instantLocal;
    };

    /**
     * Converts a local instant to a standard UTC instant with the same
     * local time attempting to use the same offset as the original.
     * <p>
     * This conversion is used after performing a calculation
     * where the calculation was done using a simple local zone.
     * Whenever possible, the same offset as the original offset will be used.
     * This is most significant during a daylight savings overlap.
     *
     * @param {number} instantLocal  the local instant to convert to UTC
     * @param {boolean} strict  whether the conversion should reject non-existent local times
     * @param {number} originalInstantUTC  the original instant that the calculation is based on
     * @return {number} the UTC instant with the same local time,
     * @throws ArithmeticException if the result overflows a long
     * @throws IllegalArgumentException if the zone has no equivalent local time
     * @since 2.0
     */
    DateTimeZone.prototype.convertLocalToUTC = function(instantLocal, strict, originalInstantUTC) {
        if (hasValue(originalInstantUTC)) {
            var offsetOriginal = this.getOffset(originalInstantUTC);
            var instantUTC = instantLocal - offsetOriginal;
            var offsetLocalFromOriginal = this.getOffset(instantUTC);

            if (offsetLocalFromOriginal == offsetOriginal) {
                return instantUTC;
            }
        }
        // get the offset at instantLocal (first estimate)
        var offsetLocal = this.getOffset(instantLocal);
        // adjust instantLocal using the estimate and recalc the offset
        var offset = this.getOffset(instantLocal - offsetLocal);
        // if the offsets differ, we must be near a DST boundary
        if (offsetLocal != offset) {
            // if strict then always check if in DST gap
            // otherwise only check if zone in Western hemisphere (as the
            // value of offset is already correct for Eastern hemisphere)
            if (strict || offsetLocal < 0) {
                // determine if we are in the DST gap
                var nextLocal = this.nextTransition(instantLocal - offsetLocal);
                if (nextLocal == (instantLocal - offsetLocal)) {
                    nextLocal = Long.MAX_VALUE;
                }
                var nextAdjusted = this.nextTransition(instantLocal - offset);
                if (nextAdjusted == (instantLocal - offset)) {
                    nextAdjusted = Long.MAX_VALUE;
                }
                if (nextLocal != nextAdjusted) {
                    // yes we are in the DST gap
                    if (strict) {
                        // DST gap is not acceptable
                        throw new Error("Illegal instant due to time zone offset transition: " +
                                DateTimeFormat.forPattern("yyyy-MM-dd'T'HH:mm:ss.SSS").print(new Instant(instantLocal)) +
                                " (" + this.getID() + ")");
                    } else {
                        // DST gap is acceptable, but for the Western hemisphere
                        // the offset is wrong and will result in local times
                        // before the cutover so use the offsetLocal instead
                        offset = offsetLocal;
                    }
                }
            }
        }
        // check for overflow
        instantUTC = instantLocal - offset;
        // If there is a sign change, but the two values have different signs...
        if ((instantLocal ^ instantUTC) < 0 && (instantLocal ^ offset) < 0) {
            throw new Error("Subtracting time zone offset caused overflow");
        }
        return instantUTC;
    };

    /**
     * Gets the millisecond instant in another zone keeping the same local time.
     * <p>
     * The conversion is performed by converting the specified UTC millis to local
     * millis in this zone, then converting back to UTC millis in the new zone.
     *
     * @param {DateTimeZone} newZone  the new zone, null means default
     * @param {number} oldInstant  the UTC millisecond instant to convert
     * @return {number} the UTC millisecond instant with the same local time in the new zone
     */
    DateTimeZone.prototype.getMillisKeepLocal = function(newZone, oldInstant) {
        if (newZone == null) {
            newZone = DateTimeZone.getDefault();
        }
        if (newZone == this) {
            return oldInstant;
        }
        var instantLocal = this.convertUTCToLocal(oldInstant);
        return newZone.convertLocalToUTC(instantLocal, false, oldInstant);
    };

    /**
     * Adjusts the offset to be the earlier or later one during an overlap.
     *
     * @param {number} instant  the instant to adjust
     * @param {boolean} earlierOrLater  false for earlier, true for later
     * @return {number} the adjusted instant millis
     */
    DateTimeZone.prototype.adjustOffset = function(instant, earlierOrLater) {
        var before = this.convertUTCToLocal(instant - 3 * Chronology.MILLIS_PER_HOUR);
        var after = this.convertUTCToLocal(instant + 3 * Chronology.MILLIS_PER_HOUR);

        if (before == after) {
            return instant;
        }

        var local = this.convertUTCToLocal(instant);

        return this.convertLocalToUTC(local, false, earlierOrLater ? after : before);
    };

    /**
     * Returns true if this time zone has no transitions.
     *
     * @return {boolean} true if no transitions
     */
    DateTimeZone.prototype.isFixed = function() {
        abstractMethod();
    };

    /**
     * Advances the given instant to where the time zone offset or name changes.
     * If the instant returned is exactly the same as passed in, then
     * no changes occur after the given instant.
     *
     * @param {number} instant  milliseconds from 1970-01-01T00:00:00Z
     * @return {number} milliseconds from 1970-01-01T00:00:00Z
     */
    DateTimeZone.prototype.nextTransition = function(instant) {
        abstractMethod();
    };

    /**
     * Retreats the given instant to where the time zone offset or name changes.
     * If the instant returned is exactly the same as passed in, then
     * no changes occur before the given instant.
     *
     * @param {number} instant  milliseconds from 1970-01-01T00:00:00Z
     * @return {number} milliseconds from 1970-01-01T00:00:00Z
     */
    DateTimeZone.prototype.previousTransition = function(instant) {
        abstractMethod()
    };

    /**
     * Compare this datetime zone with another.
     *
     * @param {DateTimeZone} tz the object to compare with
     * @return true if equal, based on the ID and all internal rules
     */
    DateTimeZone.prototype.equals = function(tz) {
        abstractMethod();
    };

    /**
     * Gets the datetime zone as a string, which is simply its ID.
     * @return the id of the zone
     */
    /** String */
    DateTimeZone.prototype.toString = function() {
        return this.getID();
    };
})();
