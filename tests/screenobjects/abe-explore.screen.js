import AppScreen from './app.screen';
import NativeAlert from '../../tests/helpers/NativeAlert';

const SELECTORS = {
    HEADER_TEXT: '~explore-header',
};

class ExploreScreen extends AppScreen {
    constructor () {
        super(SELECTORS.HEADER_TEXT);
    }

    // =======
    // getters
    // =======
    get headerText () {
        return $(SELECTORS.HEADER_TEXT);
    }

    // =======
    // methods
    // =======
    allowLocationServices () {
        if (NativeAlert.isDisplayed()) {
            NativeAlert.pressButton('Allow');
            browser.pause(2000);
        }
    }
}

export default new ExploreScreen();
