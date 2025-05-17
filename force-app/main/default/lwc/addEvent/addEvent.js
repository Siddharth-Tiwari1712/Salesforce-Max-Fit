/**
 * @File Name          : addEvent.js
 * @Description        : 
 * @Author             : A Singh
 * @Group              : 
 * @Last Modified By   : A Singh
 * @Last Modified On   : 6/7/2020, 7:27:25 PM
 * @Modification Log   : 
 * Ver       Date            Author      		    Modification
 * 1.0    6/7/2020   A Singh     Initial Version
**/
import { LightningElement, track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import EVT_OBJECT from '@salesforce/schema/Event__c';
import Name_F from '@salesforce/schema/Event__c.Name__c';
import Event_Organizer__c from '@salesforce/schema/Event__c.Event_Organizer__c';
import Start_DateTime__c from '@salesforce/schema/Event__c.Start_DateTime__c';
import End_Date_Time__c from '@salesforce/schema/Event__c.End_Date_Time__c';
import Max_Seats__c from '@salesforce/schema/Event__c.Max_Seats__c';
import Location__c from '@salesforce/schema/Event__c.Location__c';
import Event_Detail__c from '@salesforce/schema/Event__c.Event_Detail__c';

import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AddEvent extends NavigationMixin(LightningElement) {

    //to make object reactive take field names from object manager
    // evenRecord is used to store the event record to be stored in the database
    // this relates to backend and we link this in html in value attribute.
    @track eventRecord = {
        Name: '',
        Event_Organizer__c: '',
        Start_DateTime__c: null,
        End_Date_Time__c: null,
        Max_Seats__c: null,
        Location__c: '',
        Event_Detail__c: ''
    }

    @track errors;

    handleChange(event) {
        let value = event.target.value;
        let name = event.target.name;
        this.eventRecord[name] = value;
        // MaxFIT Campaign
        // Name
        // this.eventRecord[Name] = 'MaxFIT Campaign'
    }
    /*
        Event__c newEvent = new event__c();
        newEvent.Name = '';
        newEvent.Location__c = '098203u84';
    */

    handleLookup(event) {
        let selectedRecId = event.detail.selectedRecordId;
        let parentField = event.detail.parentfield;
        this.eventRecord[parentField] = selectedRecId;
        // selectedRecId = aiwue7836734834
        // Location__c
        // this.eventRecord[Location__c] = selectedRecId;
    }

    handleClick() {
        const fields = {};
        fields[Name_F.fieldApiName] = this.eventRecord.Name;
        fields[Event_Organizer__c.fieldApiName] = this.eventRecord.Event_Organizer__c;
        fields[Start_DateTime__c.fieldApiName] = this.eventRecord.Start_DateTime__c;
        fields[End_Date_Time__c.fieldApiName] = this.eventRecord.End_Date_Time__c;
        fields[Max_Seats__c.fieldApiName] = this.eventRecord.Max_Seats__c;
        fields[Location__c.fieldApiName] = this.eventRecord.Location__c;
        fields[Event_Detail__c.fieldApiName] = this.eventRecord.Event_Detail__c;

        const eventRecord = { apiName: EVT_OBJECT.objectApiName, fields };
// Parameter	Description
// type	Always 'standard__recordPage' for record-level navigation
// recordId	The specific record ID (e.g., '001...', 'a0B...')
// objectApiName	The object name (e.g., 'Account', 'Event__c') — optional but good to include
// actionName	What you want to do: 'view', 'edit', or 'clone'
        createRecord(eventRecord)
            .then((eventRec) => {
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Record Saved',
                    message: 'Event Draft is Ready',
                    variant: 'success'
                }));
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        actionName: "view",
                        recordId: eventRec.id
                    }
                });
            }).catch((err) => {
                this.errors = JSON.stringify(err);
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Error Occured',
                    message: this.errors,
                    variant: 'error'
                }));
            });
    }

    handleCancel() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                actionName: "home",
                objectApiName: "Event__c"
            }
        });
    }
}

// The UI Record API in Lightning Web Components (LWC) allows you to create, read, 
// update, and delete records using simple JavaScript — no Apex required.

// ✅ Key Features:
// Works with Lightning Data Service (LDS)

// Handles field-level security automatically

// No Apex calls — performs CRUD operations natively

// Great for use in record pages and quick actions

// 🔹 Common UI Record API Functions:
// Function	Purpose
// getRecord	Read a record
// getFieldValue	Extract field value from record
// createRecord	Create a new record
// updateRecord	Update existing record
// deleteRecord	Delete a record