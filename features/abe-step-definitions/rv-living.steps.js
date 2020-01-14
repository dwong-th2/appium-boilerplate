/* eslint-disable no-unused-expressions */
import RVLiving from '../../tests/screenobjects/abe-rv-living.screen';

const { When, Then } = require('cucumber');
const { expect } = require('chai');

// GIVEN //

// WHEN //

// THEN //
Then('I am taken to the RV Living screen', function () {
    expect(RVLiving.waitForIsShown(), 'Are we on the RV Living screen?').to.be.true;
});
