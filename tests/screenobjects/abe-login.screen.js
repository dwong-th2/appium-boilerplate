import AppScreen from './app.screen';

const SELECTORS = {
    // EMAIL_TEXTFIELD: browser.isAndroid ? '//android.view.View[1]/android.widget.EditText' : '//XCUIElementTypeTextField[1]',
    // PASSWORD_TEXTFIELD: browser.isAndroid ? '//android.view.View[2]/android.widget.EditText' : '//XCUIElementTypeSecureTextField[1]',
    EMAIL_TEXTFIELD:
    browser.isAndroid ? '//android.widget.EditText[@resource-id="Email"]'
        : '//XCUIElementTypeOther[@name="Togo Identity Server"]/XCUIElementTypeOther[2]/XCUIElementTypeOther[1]/XCUIElementTypeTextField',
    PASSWORD_TEXTFIELD:
    browser.isAndroid ? '//android.widget.EditText[@resource-id="Password"]'
        : '//XCUIElementTypeOther[@name="Togo Identity Server"]/XCUIElementTypeOther[2]/XCUIElementTypeOther[2]/XCUIElementTypeSecureTextField',
    SIGN_IN_BUTTON:
    browser.isAndroid ? '//android.widget.Button[@content-desc="Sign in" or @text="Sign in"]'
        : '//XCUIElementTypeButton[@name="Sign in"]',
    CANCEL_BUTTON:
    browser.isAndroid ? '//android.widget.Button[@content-desc="Cancel"]'
        : '//XCUIElementTypeButton[@name="Cancel"]',
    FORGOT_PASSWORD_BUTTON:
    browser.isAndroid ? '//android.view.View[@content-desc="Forgot password"]'
        : '//XCUIElementTypeLink[@name="Forgot password"]',
    COOKIES_AGREE_BUTTON:
    browser.isAndroid ? '//android.widget.Button[@content-desc="I agree"]'
        : '~I agree',
    ALLOW_ACCESS_BUTTON:
    browser.isAndroid ? '//android.widget.Button[@content-desc="Allow access" or @text="Allow access"]'
        : '~Allow access'
};

class LoginScreen extends AppScreen {
    constructor () {
        super(SELECTORS.EMAIL_TEXTFIELD);
    }

    // =======
    // getters
    // =======
    get email () {
        return $(SELECTORS.EMAIL_TEXTFIELD);
    }
    get password () {
        return $(SELECTORS.PASSWORD_TEXTFIELD);
    }
    get signinButton () {
        return $(SELECTORS.SIGN_IN_BUTTON);
    }
    get cancelButton () {
        return $(SELECTORS.CANCEL_BUTTON);
    }
    get forgotPasswordButton () {
        return $(SELECTORS.FORGOT_PASSWORD_BUTTON);
    }
    get agreeButton () {
        return $(SELECTORS.COOKIES_AGREE_BUTTON);
    }
    get allowButton () {
        return $(SELECTORS.ALLOW_ACCESS_BUTTON);
    }

    // =======
    // methods
    // =======
    signin (email, password) {
    // Check for cookies button
        if (this.agreeButton.isExisting()) {
            console.log('clicking [I agree] button');
            this.agreeButton.click();
        }

        this.enterEmail(email);
        this.enterPassword(password);
        this.clickSigninButton();
        this.clickAllowAccessButton();
    }

    enterEmail (email) {
        console.log('entering email id ...');
        this.email.setValue(email);
    }

    enterPassword (password) {
        console.log('entering password ...');
        this.password.setValue(password);
    }

    clickSigninButton () {
        console.log('clicking [Sign in] button');
        this.signinButton.click();
    }

    clickAllowAccessButton () {
        console.log('clicking [Allow access] button');
        this.allowButton.waitForExist(10000);
        this.allowButton.click();
        this.allowButton.waitForExist(10000, true);
    }
}

export default new LoginScreen();
