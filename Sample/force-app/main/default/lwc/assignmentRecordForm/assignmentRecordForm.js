import { LightningElement,wire,api } from 'lwc';
import getRecords from '@salesforce/apex/Assignment.getAccountRecords';
import { NavigationMixin } from 'lightning/navigation';
export default class AssignmentRecordForm extends NavigationMixin (LightningElement) {



    columnsList = [

    { label: 'Name', fieldName: 'Name', type: 'text' },
    { label: 'Phone', fieldName: 'Phone', type: 'text' },
    { label: 'Rating', fieldName: 'Rating', type: 'text' },

    ];
    
    @wire(getRecords) accountList;

    //Collect Record Id of selected record

    @api storerecordId;
    handleRowSelection(event) {

        this.selectedRowIds = event.detail.selectedRows.map(row => row.Id);

    }




    handleShowSelectedId() {

        if (this.selectedRowIds.length > 0) {

            const selectedRecordId = this.selectedRowIds[0];

            alert('Selected Record Id: ' + selectedRecordId);

            event.preventDefault();

        let componentDef = {

            componentDef: "c:ReferenceRecordFormForAssignment",

            attributes: {

                label: 'Navigated From Another LWC component',

                 recordId: selectedRecordId,

            },

            

        };

        let encodedComponentDef = btoa(JSON.stringify(componentDef));

        this[NavigationMixin.Navigate]({

            type: 'standard__webPage',

            attributes: {

                url: '/one/one.app#' + encodedComponentDef

            }

        });

        } else {

            alert('No record selected.');

        }

    }

}