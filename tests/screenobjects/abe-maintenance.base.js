import AppScreen from './app.screen';

const SELECTORS = {
    MAINTENANCE_HEADER: '~maintenance-header',
    BACK_BUTTON: '~header-back-button',
};

export default class MaintenanceBase extends AppScreen {
    constructor (selector, selectorIndex = -1) {
        super();
        this.selector = selector;
        this.selectorIndex = selectorIndex;
    }

    // =======
    // getters
    // =======
    get maintenanceHeader () {
        return $(SELECTORS.MAINTENANCE_HEADER);
    }

    get backButton () {
        return $(SELECTORS.BACK_BUTTON);
    }

    // =======
    // methods
    // =======
    clickBackButton () {
        console.log('Clicking < back button');
        this.backButton.click();
        browser.pause(500);
    }
}
