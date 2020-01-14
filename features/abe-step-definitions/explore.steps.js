/* eslint-disable no-unused-expressions */
import ExploreScreen from '../../tests/screenobjects/abe-explore.screen';

const { When, Then } = require('cucumber');
const { expect } = require('chai');

// GIVEN //

// WHEN //

// THEN //
Then('I am taken to the Explore screen', function () {
    ExploreScreen.allowLocationServices();
    //expect(ExploreScreen.waitForIsShown(), 'Are we on the explore screen?').to.equal(true);
});
