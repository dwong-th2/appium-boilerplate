import AppScreen from './app.screen';

const SELECTORS = {
    HEADER_TEXT: '~add-vehicle-header',
};

class AddVehicleScreen extends AppScreen {
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
}
export default new AddVehicleScreen();
