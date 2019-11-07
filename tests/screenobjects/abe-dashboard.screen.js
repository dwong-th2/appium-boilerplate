import AppScreen from './app.screen';
import NativeAlert from '../../tests/helpers/NativeAlert';
import Gestures from '../../tests/helpers/Gestures';

const SELECTORS = {
  VEHICLE_TITLE_TEXT: '~vehicle-title-text',
  VEHICLE_SUBTITLE_TEXT: '~vehicle-subtitle-text',
  START_CHECKLIST_BUTTON: '~start-checklist-button',
  ADD_IMAGE_BUTTON: '~add-image-button',
  ADD_SERVICE_CENTER_BUTTON: '~add-service-center-button',
  ADD_VIN_BUTTON: '~add-vin-button',
  ALLOW_NOTIFICATIONS_BUTTON: '~allow-notifications-button',
  HELP_SUPPORT_BUTTON: '~help-support-button',
  SEND_FEEDBACK_BUTTON: '~send-feedback-button',
  NEARBY_PLACES_LIST: 
    browser.isAndroid ? ''
    : '(//XCUIElementTypeOther[@name="nearby-places-list"])[1]//XCUIElementTypeOther[@name="place-item"]',
  NEARBY_SERVICE_LIST: 
    browser.isAndroid ? ''
    : '(//XCUIElementTypeOther[@name="nearby-places-list"])[2]//XCUIElementTypeOther[@name="place-item"]',
  CHECKING_NEARBY_PLACES_TEXT: '~checking-nearby-places-text',  
  ALLOW_LOCATION_TEXT: '~allow-location-text',

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

  get addImageButton() {
    return $(SELECTORS.ADD_IMAGE_BUTTON);
  }

  get addServiceCenterButton() {
    return $(SELECTORS.ADD_SERVICE_CENTER_BUTTON);
  }

  get addVinButton() {
    return $(SELECTORS.ADD_VIN_BUTTON);
  }

  get allowNotificationsButton() {
    return $(SELECTORS.ALLOW_NOTIFICATIONS_BUTTON);
  }

  get helpSupportButton() {
    return $(SELECTORS.HELP_SUPPORT_BUTTON);
  }

  get sendFeedbackButton() {
    return $(SELECTORS.SEND_FEEDBACK_BUTTON);
  }

  get nearbyPlacesList() {
    return $$(SELECTORS.NEARBY_PLACES_LIST);
  }

  get nearbyServiceList() {
    return $$(SELECTORS.NEARBY_SERVICE_LIST);
  }

  get checkingNearbyPlacesText() {
    return $(SELECTORS.CHECKING_NEARBY_PLACES_TEXT);
  }

  get allowLocationText() {
    return $(SELECTORS.ALLOW_LOCATION_TEXT);
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

  startChecklist(){
    this.startChecklistButton.click();
  }

  addImage(){
    this.addImageButton.click();
  }

  addServiceCenter(){
    this.addServiceCenterButton.click();
  }

  addVin(){
    this.addVinButton.click();
  }

  allowNotifications(){
    this.allowNotificationsButton.click();
  }

  getNearbyPlacesList(){
    this.allowLocation();

    this.nearbyPlacesList[0].waitForExist(20000);
    var returnList = [];
    this.nearbyPlacesList.forEach(function(el) {
      returnList.push(el.getText());
    });
    console.log("nearby places:" + returnList);
    return returnList;  
  }

  getNearbyServiceCentersList(){
    this.allowLocation();

    this.nearbyServiceList[0].waitForExist(20000);
    var returnList = [];
    this.nearbyServiceList.forEach(function(el) {
      returnList.push(el.getText());
    });
    console.log("nearby service:" + returnList);
    return returnList;  
  }

  allowLocation(allowOccurance='Allow While Using App'){
    // If location services have not been enabled yet then turn them on
    Gestures.checkIfDisplayedWithScrollDown(this.helpSupportButton, 1);
    if(this.checkingNearbyPlacesText.isExisting()){
      this.checkingNearbyPlacesText.waitForExist(20000, true);
    }

    if(this.allowLocationText.isExisting()){
      this.allowLocationText.click();
      NativeAlert.pressButton(allowOccurance);
    }
  }

  selectNearbyPlaceByName(placeToSelect){
    var placesList = this.getNearbyPlacesList();

    for(var x=0; x<placesList.length; x++){
      if(placesList[x].includes(placeToSelect)){
        console.log("Selecting nearby place "+ placeToSelect);
        this.nearbyPlacesList[x].click();
        break
      }
    }
  }

  selectServiceCenterByName(placeToSelect){
    var placesList = this.getNearbyServiceCentersList();

    for(var x=0; x<placesList.length; x++){
      if(placesList[x].includes(placeToSelect)){
        console.log("Selecting service center "+ placeToSelect);
        this.nearbyServiceList[x].click();
        break
      }
    }
  }


}


export default new DashboardScreen();