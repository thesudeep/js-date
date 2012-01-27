import org.joda.time.DateTimeZone;

import java.util.TimeZone;

/**
 * JavaDoc here
 *
 * @author Victor Polischuk
 * @since 14.08.11 13:33
 */
public class Main {
    static DateTimeZone CET = DateTimeZone.forTimeZone(TimeZone.getTimeZone("CET"));

/*
    public static void main(String[] args) throws IOException {
        HttpClient httpclient = new DefaultHttpClient();

        HttpGet request = new HttpGet("http://google.com/");

        HttpResponse response = httpclient.execute(request);

        System.out.println(response.getStatusLine());
        IOUtils.copy(response.getEntity().getContent(), System.out);
    }
*/

/*
    public static void main(String[] args) {

        DateTime time = new DateTime(2012, 2, 29, 3, 0, 0, 0, CET);

        System.out.println(DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss Z").print(time.withYear(2011).withZone(DateTimeZone.UTC)));
        System.out.println(DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss Z").print(time.withYear(2011).withZone(CET)));
        System.out.println("-------------");
        System.out.println(time.getMillis());
    }
*/
/*
    public static void main(String[] args) {
        TimeZone.setDefault(TimeZone.getTimeZone("CET"));

        Calendar calendar = new GregorianCalendar();

        calendar.set(2011, 9, 30, 2, 0, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        calendar.getTime();
        calendar.setTimeZone(TimeZone.getTimeZone("UTC"));

        System.out.println(
                calendar.get(Calendar.YEAR) + "-" +
                calendar.get(Calendar.MONTH) + "-" +
                calendar.get(Calendar.DATE) + " " +
                calendar.get(Calendar.HOUR_OF_DAY) + ":" +
                calendar.get(Calendar.MINUTE) + ":" +
                calendar.get(Calendar.SECOND) + "." +
                calendar.get(Calendar.MILLISECOND) + "+" +
                ((calendar.get(Calendar.ZONE_OFFSET) + calendar.get(Calendar.DST_OFFSET)) / (60 * 60 * 1000)) + "h"
        );
    }
*/
}
