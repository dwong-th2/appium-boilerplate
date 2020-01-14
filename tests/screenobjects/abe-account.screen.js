import AppScreen from './app.screen';
import NativeAlert from '../../tests/helpers/NativeAlert';
import Gestures from '../../tests/helpers/Gestures';

const SELECTORS = {
    ACCOUNT_NAME_TEXT: '~Account Name',
    PROFILE_BUTTON: '~Profile',
    NOTIFICATIONS_BUTTON: '~Notifications',
    SETTINGS_BUTTON: '~Settings',
    TOS_BUTTON: '~Terms of Service',
    PRIVACY_POLICY_BUTTON: '~Privacy Policy',
    SIGN_OUT_BUTTON: '~sign_out',
    VERSION_TEXT: browser.isAndroid ? '~tbd' : '//XCUIElementTypeStaticText[contains(@name,"Version")]'

};

class AccountScreen extends AppScreen {
    constructor () {
        super(SELECTORS.HAMBURGER_BUTTON);
    }

    // =======
    // getters
    // =======
    get accountNameText () {
        return $(SELECTORS.ACCOUNT_NAME_TEXT);
    }

    get profileButton () {
        return $(SELECTORS.PROFILE_BUTTON);
    }

    get notificationsButton () {
        return $(SELECTORS.NOTIFICATIONS_BUTTON);
    }

    get settingsButton () {
        return $(SELECTORS.SETTINGS_BUTTON);
    }

    get tosButton () {
        return $(SELECTORS.TOS_BUTTON);
    }

    get privacyButton () {
        return $(SELECTORS.PRIVACY_POLICY_BUTTON);
    }

    get signOutButton () {
        return $(SELECTORS.SIGN_OUT_BUTTON);
    }

    get versionText () {
        return $(SELECTORS.VERSION_TEXT);
    }

    // =======
    // methods
    // =======
    signout () {
        console.log('Clicking on [Sign out] button');
        Gestures.checkIfDisplayedWithScrollDown(this.signOutButton, 2);
        this.signOutButton.click();
        NativeAlert.pressButton('Sign out');
    }
}

export default new AccountScreen();
