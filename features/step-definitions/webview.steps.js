import TabBar from '../../tests/screenobjects/components/tab.bar';
import WebViewScreen from '../../tests/screenobjects/webview.screen';
// import SwipeScreen from '../../tests/screenobjects/swipe.screen';
import { CONTEXT_REF } from '../../tests/helpers/WebView';
const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');

//
// GIVEN
//
Given('I am on the webview tab', function () {
    TabBar.waitForTabBarShown(true);
    TabBar.openWebView();
    WebViewScreen.waitForWebsiteLoaded();
});

//
// WHEN
//
When('I interact with the webview page', function () {
    WebViewScreen.switchToContext(CONTEXT_REF.WEBVIEW);
    console.log('Webview: Click API button');
    $('=API').click();
    console.log('Webview: Click navigation toggle');
    const toggle = $('.navToggle');
    toggle.waitForDisplayed(3000);
    toggle.click();
    console.log('Webview: Click Webdriver Protocol button');
    const webdriverProtocol = $('=Webdriver Protocol');
    webdriverProtocol.waitForDisplayed(3000);
    webdriverProtocol.click();
});

//
// THEN
//
Then('the webview is displaying WEBDRIVER PROTOCOL', function () {
    const header = $('h1.postHeaderTitle');
    header.waitForDisplayed(3000);
    expect(header.getText()).equal('WEBDRIVER PROTOCOL');

    WebViewScreen.switchToContext(CONTEXT_REF.NATIVE);
});
