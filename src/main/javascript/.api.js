goog.require("jsd8");
goog.require("exportStatic");
goog.require("exportPrototype");

var publish = function(clazz) {
    var className = obtainClass(clazz);

    jsd8[className] = clazz;
};

publish(Instant);
publish(DateTime);
publish(Chronology);
publish(Period);
publish(SinglePeriod);
publish(PeriodType);

jsd8["version"] = {
    "api":2,
    "revision": ${project.build.revision},
    "full":"${project.version}.${project.build.revision}"
};