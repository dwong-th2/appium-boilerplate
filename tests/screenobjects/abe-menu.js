import AppScreen from './app.screen';
import Gestures from '../../tests/helpers/Gestures';



const SELECTORS = {
  HAMBURGER_BUTTON: browser.isAndroid ? '~test_hamburger' : '(//XCUIElementTypeOther[@name="test_hamburger"])[6]',
  VEHICLE_NAME_TEXT: '~Vehicle Display Name',
  VEHICHLE_LICENSE_TEXT: '',
  CHANGE_VEHICLE_BUTTON: '~Change vehicle',
  EDIT_VEHICLE_BUTTON: '~Edit vehicle',
  DASHBOARD_BUTTON: '~drawer_item_Dashboard',
  EXPLORE_BUTTON: '~drawer_item_Explore',
  MAINTENANCE_BUTTON: '~drawer_item_Maintenance',
  CHECKLISTS_BUTTON: '~drawer_item_Checklists',
  HELP_SUPPORT_BUTTON: '~drawer_item_Help & support',
  TRIP_PLANNING_BUTTON: '~drawer_item_Trip planning',
  ACCOUNT_BUTTON: '~drawer_item_Account',
  HOWTO_LIBRARY_BUTTON: '~How-to Library'
};

export class SideMenu extends AppScreen {
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
  get vehicleLicense() {
    return $(SELECTORS.VEHICHLE_LICENSE_TEXT);
  }
  get changeVehicleButton() {
    return $(SELECTORS.CHANGE_VEHICLE_BUTTON);
  }
  get editVehicleButton() {
    return $(SELECTORS.EDIT_VEHICLE_BUTTON);
  }
  get dashboardButton() {
    return $(SELECTORS.DASHBOARD_BUTTON);
  }
  get exploreButton() {
    return $(SELECTORS.EXPLORE_BUTTON);
  }
  get maintenanceButton() {
    return $(SELECTORS.MAINTENANCE_BUTTON);
  }
  get checklistsButton() {
    return $(SELECTORS.CHECKLISTS_BUTTON);
  }
  get helpSupportButton() {
    return $(SELECTORS.HELP_SUPPORT_BUTTON);
  }
  get tripPlanningButton() {
    return $(SELECTORS.TRIP_PLANNING_BUTTON);
  }
  get accountButton() {
    return $(SELECTORS.ACCOUNT_BUTTON);
  }
  get howtoLibraryButton() {
    return $(SELECTORS.HOWTO_LIBRARY_BUTTON);
  }

  // =======
  // methods
  // =======
  openMenu () {
    console.log('Clicking on [Menu] button');
    this.hamburgerButton.click();
}

  openAccount () {
    this.openMenu();
    Gestures.checkIfDisplayedWithScrollDown(this.accountButton, 2);
    console.log('Clicking on [Account] button');
    
    this.accountButton.click();
}

}

export default new SideMenu();
