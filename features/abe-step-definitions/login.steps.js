import NativeAlert from '../../tests/helpers/NativeAlert';
import { platform } from 'os';
const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');

//
// GIVEN
//
Given('I submit my Togo ID', function () {
    console.log('Login with existing Togo ID');
    const elem = $('~how-to-link');
    elem.click();
});

//
// WHEN
//
When('I supply the automation user credentials', function () {
    if (platform === 'android') {
        // This function has only been tested on Android and may not work on iOS
        // const views = WebViewScreen.getCurrentContexts();
        // console.log('Vǐews: ' + views);
        console.log('waiting 10 seconds for login webpage');
        browser.pause(10000);
        // console.log('Current activity: ' + driver.getCurrentActivity());
        // let srcText = driver.getPageSource();
        // console.log(srcText);
        // User
        console.log('entering email id');
        const togoID = $('//*[@class="android.widget.EditText"][1]');
        togoID.setValue('dwong+staging@th2.com');
        // Password
        console.log('entering password');
        const password = $('//*[@class="android.widget.EditText"][2]');
        password.setValue('123test123');
        // Submit
        console.log('clicking SUBMIT');
        const submit = $('//*[@class="android.widget.Button"]');
        submit.click();
    } else {
        const signIn = $('~Sign in');
        const iAgreeButton = $('~I agree');
        if (iAgreeButton.isExisting() === true) {
            console.log(iAgreeButton.isExisting());
            iAgreeButton.click();
        } else {
            signIn.waitForExist(20000);
        }

        console.log('entering email id');
        const userName = $('//*[@name="Sign in to your Togo ID"]/XCUIElementTypeTextField');
        userName.setValue('michael.wong+23@th2.com');
        // Password
        console.log('entering password');
        const pass = $('//*[@name="Sign in to your Togo ID"]/XCUIElementTypeSecureTextField');
        pass.setValue('123test123');
        // Submit
        console.log('clicking SUBMIT');
        signIn.click();
    }
});

When('I logout from the app', function () {
    if (platform === 'android') {
        // Goto the hamburger menu
        console.log('Clicking on hamburger menu');
        $('~test_hamburger').click();

        // Click on the Account link
        console.log('Clicking on Account link');
        $('~drawer_item_Account').click();

        // Click on the Sign out Button
        console.log('Clicking on Sign out link');
        $('~sign_out').click();

        // Dismiss the modal
        console.log('Clicking on SIGN OUT to dismiss modal');
        // For the following to work I think we need to modify NativeAlert.waitForIsShown()
        // NativeAlert.waitForIsShown(true);
        // For the following to work I think we need to modify NativeAlert.text()
        // console.log('Modal text: ' + NativeAlert.text());
        NativeAlert.pressButton('Sign Out');
    } else {
        // Goto the hamburger menu
        console.log('Clicking on hamburger menu');
        $('(//*[@name="test_hamburger"])[6]').click();

        // Click on the Account link
        console.log('Clicking on Account link');
        $('//*[@name="drawer_item_Account"]').click();

        // Click on the Sign out Button
        console.log('Clicking on Sign out link');
        $('//*[@name="sign_out"]').click();

        // Dismiss the modal
        console.log('Clicking on SIGN OUT to dismiss modal');
        NativeAlert.pressButton('Sign out');
    }
});

//
// THEN
//
Then('I am taken to the dashboard', function () {
    if (platform === 'android') {
        console.log('Assert for dashboard elements');
        // Wait for the hamburger menu
        $('~test_hamburger').waitForExist(20000);
    } else {
        console.log('Assert for dashboard elements');
        // Wait for the hamburger menu
        $('(//*[@name="test_hamburger"])[6]').waitForExist(20000);
    }
});

Then(/^my default vehicle is "(.*)"$/, function (vehicleType) {
    if (platform === 'android') {
        browser.pause(3000);
        const myDefaultVehicle = $('~Image Caption Title').getText();
        expect(myDefaultVehicle).to.equal(vehicleType);
    } else {
        browser.pause(3000);
        const defaultVehicle = $('~Image Caption Title').getText();
        expect(defaultVehicle).to.equal(vehicleType);
    }
});

Then('I am returned to the Welcome page', function () {
    // Wait for Welcome and assert
    $('~login-button').waitForExist(20000);
});
