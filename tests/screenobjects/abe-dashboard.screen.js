import AppScreen from './app.screen';

const SELECTORS = {
  HAMBURGER_BUTTON: browser.isAndroid ? '~test_hamburger' : '(//XCUIElementTypeOther[@name="test_hamburger"])[6]',
  VEHICLE_NAME_TEXT: '~Vehicle Display Name'
};

class DashboardScreen extends AppScreen {
  constructor() {
    super(SELECTORS.HAMBURGER_BUTTON);
  }

  // =======
  // getters
  // =======
  get hamburgerButton() {
    return $(SELECTORS.HAMBURGER_BUTTON);
  }
  get vehicleName() {
    return $(SELECTORS.VEHICLE_NAME_TEXT);
  }

  // =======
  // methods
  // =======
  getVehicleName(){
    return this.vehicleName.getText();
  }
}


export default new DashboardScreen();