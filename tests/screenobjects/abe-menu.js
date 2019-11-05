import AppScreen from './app.screen';
import Gestures from '../../tests/helpers/Gestures';



const SELECTORS = {
  HAMBURGER_BUTTON: '~hamburger-menu',
  VEHICLE_TITLE_TEXT: '~vehicle-title-text',
  VEHICHLE_SUBTITLE_TEXT: '~vehicle-subtitle-text',
  CHANGE_VEHICLE_BUTTON: '~change-vehicle-button',
  EDIT_VEHICLE_BUTTON: '~edit-vehicle-button',
  DASHBOARD_BUTTON: '~menu-dashboard',
  EXPLORE_BUTTON: '~menu-explore',
  MAINTENANCE_BUTTON: '~menu-maintenance',
  CHECKLISTS_BUTTON: '~menu-checklists',
  HELP_SUPPORT_BUTTON: '~menu-help-support',
  TRIP_PLANNING_BUTTON: 'menu-trip-planning',
  ACCOUNT_BUTTON: '~menu-account',
  HOWTO_LIBRARY_BUTTON: '~menu-howto-library',
  MENU_CLOSE_BUTTON: '~menu-close'
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
  get vehicleText() {
    return $(SELECTORS.VEHICLE_TITLE_TEXT);
  }
  get vehicleSubtitleText() {
    return $(SELECTORS.VEHICHLE_SUBTITLE_TEXT);
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
  get closeButton() {
    return $(SELECTORS.MENU_CLOSE_BUTTON);
  }

  // =======
  // methods
  // =======
  openMenu() {
    console.log('Clicking on [Menu] button');
    this.hamburgerButton.click();
  }

  closeMenu() {
    console.log('Clicking on [X] button');
    this.closeButton.click();
  }

  openAccount() {
    this.openMenu();
    Gestures.checkIfDisplayedWithScrollDown(this.accountButton, 2);
    console.log('Clicking on [Account] button');
    this.accountButton.click();
  }

  openDashboard() {
    this.openMenu();
    console.log('Clicking on [Dashboard] button');
    this.dashboardButton.click();
  }

  openExplore() {
    this.openMenu();
    console.log('Clicking on [Explore] button');
    this.exploreButton.click();
  }

  openMaintenance() {
    this.openMenu();
    console.log('Clicking on [Maintenancxe] button');
    this.maintenanceButton.click();
  }

  openChecklists() {
    this.openMenu();
    console.log('Clicking on [Checklists] button');
    this.checklistsButton.click();
  }

  openHelp() {
    this.openMenu();
    console.log('Clicking on [Help & support] button');
    this.helpSupportButton.click();
  }

  openTripPlanning() {
    this.openMenu();
    console.log('Clicking on [Trip planning] button');
    this.tripPlanningButton.click();
  }

  openHowtoLibrary() {
    this.openMenu();
    console.log('Clicking on [How-to Library] button');
    this.howtoLibraryButton.click();
  }

  changeVehicle() {
    this.openMenu();
    console.log('Clicking on [Change vehicle] button');
    this.changeVehicleButton.click();
  }

  editVehicle() {
    this.openMenu();
    console.log('Clicking on [Edit vehicle] button');
    this.editVehicle.click();
  }

  isMenuOpen(){
    return this.closeButton.isDisplayed();
  }
  
  getTitleText(){
    return this.vehicleText.getText();
  }

  getSubtitleText(){
    return this.vehicleSubtitleText.getText();
  }
}

export default new SideMenu();
