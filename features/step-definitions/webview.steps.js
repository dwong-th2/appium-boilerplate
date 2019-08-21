import TabBar from '../../tests/screenobjects/components/tab.bar';
import WebViewScreen from '../../tests/screenobjects/webview.screen';
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
When('I interact with the webview API page', function () {
    WebViewScreen.switchToContext(CONTEXT_REF.WEBVIEW);
    $('=API').click();

    const toggle = $('.navToggle');
    toggle.waitForDisplayed(3000);
    toggle.click();
    const webdriverProtocol = $('=Webdriver Protocol');
    webdriverProtocol.waitForDisplayed(3000);
    webdriverProtocol.click();
});

When('I interact with the native app', function () {
    WebViewScreen.switchToContext(CONTEXT_REF.NATIVE);
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
