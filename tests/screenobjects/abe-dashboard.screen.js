import AppScreen from './app.screen';

const SELECTORS = {
  VEHICLE_TITLE_TEXT: '~vehicle-title-text',
  VEHICLE_SUBTITLE_TEXT: '~vehicle-subtitle-text',
  START_CHECKLIST_BUTTON: '~Start a checklist',
};

class DashboardScreen extends AppScreen {
  constructor() {
    super(SELECTORS.START_CHECKLIST_BUTTON);
  }

  // =======
  // getters
  // =======
  get vehicleTitleText() {
    return $(SELECTORS.VEHICLE_TITLE_TEXT);
  }
  get vehicleSubtitleText() {
    return $(SELECTORS.VEHICLE_TITLE_TEXT);
  }

  get startChecklistButton() {
    return $(SELECTORS.START_CHECKLIST_BUTTON);
  }

  // =======
  // methods
  // =======
  getVehicleName(){
    return this.vehicleTitleText.getText();
  }
  getVehicleSubtitle(){
    return this.vehicleSubtitleText.getText();
  }
}


export default new DashboardScreen();