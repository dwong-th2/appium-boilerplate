import AppScreen from './app.screen';

const SELECTORS = {
    I_ACCEPT_BUTTON: '~I accept',
    I_DECLINE_BUTTON: '~I decline',
    MAINTENANCE_HEADER: '~maintenance-header',
};

class MaintenanceScreen extends AppScreen {
    constructor () {
        super(SELECTORS.HAMBURGER_BUTTON);
    }

    // =======
    // getters
    // =======
    get maintenanceIAcceptButton () {
        return $(SELECTORS.I_ACCEPT_BUTTON);
    }
    get maintenanceIDeclineButton () {
        return $(SELECTORS.I_DECLINE_BUTTON);
    }
    get maintenanceHeader () {
        return $(SELECTORS.MAINTENANCE_HEADER);
    }

    // =======
    // methods
    // =======
    clickIAcceptDeclineButton () {
        if (this.maintenanceIAcceptButton.isExisting()) {
            console.log('I am clicking the I accept button');
            this.maintenanceIAcceptButton.click();
        }
    }

    checkIfInMaintenanceScreen () {
        if (this.maintenanceHeader.isExisting()) {
            return this.maintenanceHeader.getText();
        }
    }
}
export default new MaintenanceScreen();
