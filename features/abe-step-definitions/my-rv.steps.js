/* eslint-disable no-unused-expressions */
import MyRVScreen from '../../tests/screenobjects/abe-my-rv.screen';

const { When, Then } = require('cucumber');
const { expect } = require('chai');

// GIVEN //

// WHEN //
When('I click {string} on the My RV screen', function (maintenanceItem) {
    switch (maintenanceItem) {
    case 'My maintenance':
        MyRVScreen.clickMyMaintenance();
        break;
    case 'Mechanic\'s maintenance':
        MyRVScreen.clickMechanicsMaintenance();
        break;
    case 'Completed maintenance':
        MyRVScreen.clickCompletedMaintenance();
        break;
    case 'All maintenance items':
        MyRVScreen.clickAllMaintenance();
        break;
    default:
    }
});

// THEN //
Then('I am taken to the My RV screen', function () {
    expect(MyRVScreen.waitForIsShown(), 'Are we on the My RV screen?').to.be.true;
});
