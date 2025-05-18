
public with sharing class EventDetailsController {
  @AuraEnabled
  public static List<EventSpeakers__c> getSpeakers(String eventId) {
    List<EventSpeakers__c> speakerList = [
      SELECT
        Id,
        Name,
        Speaker__c,
        Speaker__r.Name,
        Speaker__r.Phone__c,
        Speaker__r.Email__c,
        Speaker__r.Company__c,
        Speaker__r.Picture__c,
        Speaker__r.About_Me__c
      FROM EventSpeakers__c
      WHERE Event__c = :eventId
      WITH SECURITY_ENFORCED
    ];
    return speakerList;
  }

  @AuraEnabled
  public static Event__c getLocationDetails(String eventId) {
    Event__c eventRecord = [
      SELECT
        Id,
        Name__c,
        Location__c,
        Location__r.Name,
        Location__r.City__c,
        Location__r.Country__c,
        Location__r.Land_Mark__c,
        Location__r.Postal_Code__c,
        Location__r.State__c,
        Location__r.Street__c
      FROM Event__c
      WHERE Id = :eventId
      WITH SECURITY_ENFORCED
    ];
    return eventRecord;
  }

  @AuraEnabled
  public static List<Event_Attendee__c> getAttendees(String eventId) {
    List<Event_Attendee__c> eventAttendeeList = [
      SELECT
        Id,
        Name,
        Attendee__c,
        Attendee__r.Name,
        Attendee__r.Email__c,
        Attendee__r.Company_Name__c,
        Attendee__r.Location__c,
        Attendee__r.Location__r.Name
      FROM Event_Attendee__c
      WHERE Event__c = :eventId
      WITH SECURITY_ENFORCED
    ];
    return eventAttendeeList;
  }
}
