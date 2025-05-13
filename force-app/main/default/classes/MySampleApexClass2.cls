public class MySampleApexClass2 {
   public static Double myValue;   // Class Member variable
   public static String myString;  // Class Member variable

   public MySampleApexClass2 () {
      myValue = 100; //initialized variable when class is called
   }

   public static Double getCalculatedValue () { // Method definition and body
      // do some calculation
      myValue = myValue+10;
      return myValue;
   }

   public static Double getCalculatedValueViaPrice (Decimal price) {
      // Method definition and body
      // do some calculation
      myValue = myValue+price; // Final Price would be 100+100=200.00
      return myValue;
   }
}