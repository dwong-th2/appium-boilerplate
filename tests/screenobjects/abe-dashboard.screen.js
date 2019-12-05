import AppScreen from './app.screen';
import NativeAlert from '../../tests/helpers/NativeAlert';
import Gestures from '../../tests/helpers/Gestures';
import { getTextOfElement } from '../helpers/utils';

const SELECTORS = {
    HAMBURGER_BUTTON: '~hamburger-menu',
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
    CHECKLIST_BUTTON: '~checklist-progress-button',

};

class DashboardScreen extends AppScreen {
    constructor () {
        super(SELECTORS.HAMBURGER_BUTTON);
    }

    // =======
    // getters
    // =======
    get vehicleTitleText () {
        // may have multiple selectors on iOS
        return $$(SELECTORS.VEHICLE_TITLE_TEXT);
    }

    get vehicleSubtitleText () {
        // may have multiple selectors on iOS
        return $$(SELECTORS.VEHICLE_TITLE_TEXT);
    }

    get startChecklistButton () {
        return $(SELECTORS.START_CHECKLIST_BUTTON);
    }

    get addImageButton () {
        return $(SELECTORS.ADD_IMAGE_BUTTON);
    }

    get addServiceCenterButton () {
        return $(SELECTORS.ADD_SERVICE_CENTER_BUTTON);
    }

    get addVinButton () {
        return $(SELECTORS.ADD_VIN_BUTTON);
    }

    get allowNotificationsButton () {
        return $(SELECTORS.ALLOW_NOTIFICATIONS_BUTTON);
    }

    get helpSupportButton () {
        return $(SELECTORS.HELP_SUPPORT_BUTTON);
    }

    get sendFeedbackButton () {
        return $(SELECTORS.SEND_FEEDBACK_BUTTON);
    }

    get nearbyPlacesList () {
        // may have multiple selectors
        return $$(SELECTORS.NEARBY_PLACES_LIST);
    }

    get nearbyServiceList () {
        // may have multiple selectors
        return $$(SELECTORS.NEARBY_SERVICE_LIST);
    }

    get checkingNearbyPlacesText () {
        return $(SELECTORS.CHECKING_NEARBY_PLACES_TEXT);
    }

    get allowLocationText () {
        return $(SELECTORS.ALLOW_LOCATION_TEXT);
    }

    get checklistButtons () {
        // may have multiple selectors
        return $$(SELECTORS.CHECKLIST_BUTTON);
    }

    get menuButton () {
        return $(SELECTORS.HAMBURGER_BUTTON);
    }

    // =======
    // methods
    // =======
    getVehicleName () {
        if (browser.isAndroid) {
            this.vehicleTitleText[0].waitForExist();
            return this.vehicleTitleText[0].getText();
        }
        // on iOS the selector matches the dashboard text as well as the menu text
        // so only return the text from the dashboard
        return this.vehicleTitleText[1].getText();
    }

    getVehicleSubtitle () {
        // on iOS the selector matches the dashboard text as well as the menu text
        // so only return the text from the dashboard
        if (browser.isAndroid) {
            return this.vehicleSubtitleText[0].getText();
        }
        return this.vehicleSubtitleText[1].getText();
    }

    startChecklist () {
        console.log('Clicking [Start a checklist] button');
        this.startChecklistButton.waitForExist();
        this.startChecklistButton.click();
    }

    addImage () {
        this.addImageButton.click();
    }

    addServiceCenter () {
        this.addServiceCenterButton.click();
    }

    addVin () {
        this.addVinButton.click();
    }

    allowNotifications () {
        this.allowNotificationsButton.click();
    }

    getNearbyPlacesList () {
        this.allowLocation();

        this.nearbyPlacesList[0].waitForExist(20000);
        var returnList = [];
        this.nearbyPlacesList.forEach(function (el) {
            returnList.push(el.getText());
        });
        console.log('nearby places:' + returnList);
        return returnList;
    }

    getNearbyServiceCentersList () {
        this.allowLocation();

        this.nearbyServiceList[0].waitForExist(20000);
        var returnList = [];
        this.nearbyServiceList.forEach(function (el) {
            returnList.push(el.getText());
        });
        console.log('nearby service:' + returnList);
        return returnList;
    }

    allowLocation (allowOccurance = 'Allow While Using App') {
    // If location services have not been enabled yet then turn them on
        Gestures.checkIfDisplayedWithScrollDown(this.helpSupportButton, 1);
        if (this.checkingNearbyPlacesText.isExisting()) {
            this.checkingNearbyPlacesText.waitForExist(20000, true);
        }

        if (this.allowLocationText.isExisting()) {
            this.allowLocationText.click();
            NativeAlert.pressButton(allowOccurance);
        }
    }

    /**
     * Selects a nearby place by it's name and taps it
     *
     * @param {string} placeToSelect - The nearby place to look for. Note that this can be a partial match
     */
    selectNearbyPlaceByName (placeToSelect) {
        var placesList = this.getNearbyPlacesList();

        for (var x = 0; x < placesList.length; x++) {
            if (placesList[x].includes(placeToSelect)) {
                console.log('Selecting nearby place ' + placeToSelect);
                this.nearbyPlacesList[x].click();
                break;
            }
        }
    }

    /**
     * Selects a service center by it's name and taps it
     *
     * @param {string} placeToSelect - The service center name to look for. Note that this can be a partial match
     */
    selectServiceCenterByName (placeToSelect) {
        var placesList = this.getNearbyServiceCentersList();

        for (var x = 0; x < placesList.length; x++) {
            if (placesList[x].includes(placeToSelect)) {
                console.log('Selecting service center ' + placeToSelect);
                this.nearbyServiceList[x].click();
                break;
            }
        }
    }

    /**
     * Get's the % complete of a specific checklist
     *
     * @param {string} checklistName - The checklist name to look for. Note that this can be a partial match.
     * @return {string} The pct complete for the selected checklist in the format 'nn%'. A console error is
     * printed if the checklist name is not found
     */
    getChecklistPctComplete (checklistName) {
        var checklists = this.getChecklistsInProgress();
        for (var x = 0; x < checklists.length; x++) {
            if (checklists[x].includes(checklistName)) {
                return checklists[x].match(/(\d+ %)/)[1].replace(' ', '');
            }
        }
        console.error('Checklist ' + checklistName + ' not found on dashboard!');
    }

    /**
     * Gets a list of all checklists in progress, including the % complete
     *
     * @return {string[]} Returns the text from each cell of a checklist in progress
     */
    getChecklistsInProgress () {
        this.waitForIsShown(5000);
        var returnList = [];
        if (this.checklistButtons.length > 0) {
            this.checklistButtons.forEach(function (el) {
                returnList.push(getTextOfElement(el));
            });
        }
        console.log('Found checklists in progress: ' + returnList);
        return returnList;
    }

    /**
     * Selects a checklist by it's name and taps it
     *
     * @param {string} checklistName - The checklist name to select. Note that this can be a partial match.
     * @return {boolean} Returns true if the checklist was found and selected
     */
    selectChecklistByName (checklistName) {
        var checklistList = this.getChecklistsInProgress();
        for (var x = 0; x < checklistList.length; x++) {
            if (checklistList[x].includes(checklistName)) {
                console.log("Selecting checklist '" + checklistName + "'");
                this.checklistButtons[x].click();
                return true;
            }
        }
        return false;
    }

    isAChecklistInProgress () {
        return !this.startChecklistButton.isDisplayed();
    }

    waitForChecklistsToLoad () {
        if (this.isAChecklistInProgress()) {
            while (this.checklistButtons.length === 0) {
                browser.pause(500);
            }
        }
    }

    waitForDashboardToFullyLoad () {
        this.menuButton.waitForDisplayed();
        console.log("Found vehicle name '" + this.getVehicleName() + "'");

        this.waitForChecklistsToLoad();

        // TODO: Wait for RV Living to load
        // TODO: Wait for "allow location" or nearby places and nearby service centers to load
    }
}

export default new DashboardScreen();
