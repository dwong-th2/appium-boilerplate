/* eslint-disable no-unused-expressions */
import MyMaintenanceScreen from '../../tests/screenobjects/abe-my-maintenance.screen';
import MechanicMaintenanceScreen from '../../tests/screenobjects/abe-mechanic-maintenance.screen';
import CompletedMaintenanceScreen from '../../tests/screenobjects/abe-completed-maintenance.screen';
import AllMaintenanceScreen from '../../tests/screenobjects/abe-all-maintenance.screen';

const { When, Then } = require('cucumber');
const { expect } = require('chai');

//
// GIVEN
//

//
// WHEN
//
When('I click the back button on the My maintenance screen', function () {
    MyMaintenanceScreen.clickBackButton();
});
When('I click the back button on the Mechanics maintenance screen', function () {
    MechanicMaintenanceScreen.clickBackButton();
});
When('I click the back button on the Completed maintenance screen', function () {
    CompletedMaintenanceScreen.clickBackButton();
});
When('I click the back button on the All maintenance items screen', function () {
    AllMaintenanceScreen.clickBackButton();
});

//
// THEN
//

Then('I am taken to the {string} maintenance screen', function (maintenanceItem) {
    switch (maintenanceItem) {
    case 'My':
        expect(MyMaintenanceScreen.waitForIsShown(), 'Are we on the My maintenance screen?').to.equal(true);
        break;
    case 'Mechanic\'s':
        expect(MechanicMaintenanceScreen.waitForIsShown(), 'Are we on the Mechanic\'s maintenance screen?').to.equal(true);
        break;
    case 'Completed':
        expect(CompletedMaintenanceScreen.waitForIsShown(), 'Are we on the Completed maintenance screen?').to.equal(true);
        break;
    case 'All':
        expect(AllMaintenanceScreen.waitForIsShown(), 'Are we on the All maintenance items screen?').to.equal(true);
        break;
    default:
    }
});
