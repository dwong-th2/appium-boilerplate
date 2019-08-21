import SwipeScreen from '../../tests/screenobjects/swipe.screen';
const { When, Then } = require('cucumber');
const { expect } = require('chai');

//
// GIVEN
//

//
// WHEN
//
When(/^I swipe gesture "(left|right)"$/, function (swipeDirection) {
    switch (swipeDirection) {
    case 'left':
        SwipeScreen.carousel.swipeLeft();
        break;
    case 'right':
        SwipeScreen.carousel.swipeRight();
        break;
    default:
        throw new Error('I expected swipe direction (left|right)');
    }
});

When('I swipe left {int} times', function (count) {
    for (let index = 0; index < count; index++) {
        SwipeScreen.carousel.swipeLeft();
    }
});

When('I swipe right {int} times', function (count) {
    for (let index = 0; index < count; index++) {
        SwipeScreen.carousel.swipeRight();
    }
});

//
// THEN
//
Then(/^I will be on the "(.*)" first card$/, function (cardTitle) {
    let matchString = cardTitle.toLowerCase();
    expect(SwipeScreen.carousel.getNthCardText('first').includes(matchString));
});

Then(/^I will be on the "(.*)" card$/, function (cardTitle) {
    let matchString = cardTitle.toLowerCase();
    expect(SwipeScreen.carousel.getNthCardText('active').includes(matchString));
});
