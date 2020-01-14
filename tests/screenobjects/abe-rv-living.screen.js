import AppScreen from './app.screen';

const SELECTORS = {
    HEADER_TEXT: '~rv-living-header',
};

class RVLivingScreen extends AppScreen {
    constructor () {
        super(SELECTORS.HEADER_TEXT);
    }

    // =======
    // getters
    // =======
    get headerText () {
        return $(SELECTORS.HEADER_TEXT);
    }
}

export default new RVLivingScreen();
