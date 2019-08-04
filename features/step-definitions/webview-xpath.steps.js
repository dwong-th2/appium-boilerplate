import TabBar from '../../tests/screenobjects/components/tab.bar';
import WebViewScreen from '../../tests/screenobjects/webview.screen';
import { timeDifference } from '../../tests/helpers/utils';
const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');

//
// GIVEN
//
Given('I have reset the browser', function () {
    browser.reset();
    TabBar.waitForTabBarShown();
});

//
// WHEN
//

//
// THEN
//
Then('I should be on webview', function () {
    WebViewScreen.waitForWebViewIsDisplayedByXpath();
    WebViewScreen.waitForWebViewContextLoaded();
});
