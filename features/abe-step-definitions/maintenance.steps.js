import DashboardScreen from '../../tests/screenobjects/abe-dashboard.screen';
import SideMenu from '../../tests/screenobjects/abe-menu';
import MaintenanceScreen from '../../tests/screenobjects/abe-maintenance.screen';

const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');

//
// GIVEN
//
Given('I am on the dashboard', { wrapperOptions: { retry: 2 } }, async function () {
    DashboardScreen.waitForDashboardElement();
});

//
// WHEN
//
When('I open the maintenance screen from the hamburger menu', function () {
    SideMenu.openMaintenance();
});

//
// THEN
//
Then('I am taken to the maintenance screen', function () {
    expect(MaintenanceScreen.checkIfInMaintenanceScreen()).to.equal('Maintenance');
});
