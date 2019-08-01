import TabBar from '../../tests/screenobjects/components/tab.bar';
import WebViewScreen from '../../tests/screenobjects/webview.screen';
import LoginScreen from '../../tests/screenobjects/login.screen';
import FormsScreen from '../../tests/screenobjects/forms.screen';
import SwipeScreen from '../../tests/screenobjects/swipe.screen';
import HomeScreen from '../../tests/screenobjects/home.screen';
const { Given, When, Then } = require('cucumber');
// const { expect } = require('chai');

//
// GIVEN
//
Given('I am on the home screen', function () {
    TabBar.waitForTabBarShown(true);
});

//
// WHEN
//
When(/^I click on the "(Forms|Home|Login|Swipe|Web|)" tab$/, function (tabItem) {
    switch (tabItem) {
    case 'Forms':
        TabBar.openForms();
        break;
    case 'Home':
        TabBar.openHome();
        break;
    case 'Login':
        TabBar.openLogin();
        break;
    case 'Swipe':
        TabBar.openSwipe();
        break;
    case 'Web':
        TabBar.openWebView();
        break;
    default:
        throw new Error('Invalid tab selector: ' + tabItem);
    };
});

//
// THEN
//
Then('I shall be navigated to the Forms screen', function () {
    FormsScreen.waitForIsShown(true);
});

Then('I shall be navigated to the Home screen', function () {
    HomeScreen.waitForIsShown(true);
});

Then('I shall be navigated to the Login screen', function () {
    LoginScreen.waitForIsShown(true);
});

Then('I shall be navigated to the Swipe screen', function () {
    SwipeScreen.waitForIsShown(true);
});

Then('I shall be navigated to the Web screen', function () {
    WebViewScreen.waitForWebsiteLoaded();
});
