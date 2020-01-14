import AppScreen from './app.screen';
import Gestures from '../../tests/helpers/Gestures';

const SELECTORS = {
    HEADER_TEXT: '~my-rv-header',
    MY_MAINTENANCE_ITEM: '~my-maintenance-list-item',
    MECHANIC_MAINTENANCE_ITEM: '~mechanic-maintenance-list-item',
    COMPLETED_MAINTENANCE_ITEM: '~completed-maintenance-list-item',
    ALL_MAINTENANCE_ITEM: '~all-maintenance-list-item',
    VEHICLE_NAME_TEXT: '~current-vehicle-name-text',
    IMAGES_ITEM: '~images-list-item',
    VEHICLE_DETAILS_ITEM: '~vehicle-details-list-item',
    REGISTRATION_ITEM: '~registration-list-item',
    SERVICE_CENTER_ITEM: '~preferred-service-center-item',
    DELETE_VEHICLE_BUTTON: '~delete-this-vehicle-button',

    // switch vehicle pane
    FULLSCREEN_SLIDER: '~fullscreen-slider',
    SWITCH_VEHICLE_HEADER_TEXT: '~switch-vehicle-header',
    VEHICLE_LIST_ITEM: '~vehicle-list-item',
    ADD_VEHICLE_BUTTON: '~add-another-vehicle-button',
};

class MyRVScreen extends AppScreen {
    constructor () {
        super(SELECTORS.HEADER_TEXT);
    }

    // =======
    // getters
    // =======
    get headerText () {
        return $(SELECTORS.HEADER_TEXT);
    }

    get myMaintenanceItem () {
        return $(SELECTORS.MY_MAINTENANCE_ITEM);
    }

    get mechanicMaintenanceItem () {
        return $(SELECTORS.MECHANIC_MAINTENANCE_ITEM);
    }

    get completedMaintenanceItem () {
        return $(SELECTORS.COMPLETED_MAINTENANCE_ITEM);
    }

    get allMaintenanceItem () {
        return $(SELECTORS.ALL_MAINTENANCE_ITEM);
    }

    get vehicleNameText () {
        return $(SELECTORS.VEHICLE_NAME_TEXT);
    }

    get imagesItem () {
        return $(SELECTORS.IMAGES_ITEM);
    }

    get vehicleDetailsItem () {
        return $(SELECTORS.VEHICLE_DETAILS_ITEM);
    }

    get registrationItem () {
        return $(SELECTORS.REGISTRATION_ITEM);
    }

    get serviceCenterItem () {
        return $(SELECTORS.SERVICE_CENTER_ITEM);
    }

    get deleteVehicleButton () {
        return $(SELECTORS.DELETE_VEHICLE_BUTTON);
    }

    get addVehicleButton () {
        return $(SELECTORS.ADD_VEHICLE_BUTTON);
    }

    get fullscreenSlider () {
        return $(SELECTORS.FULLSCREEN_SLIDER);
    }

    get switchVehicleHeaderText () {
        return $(SELECTORS.SWITCH_VEHICLE_HEADER_TEXT);
    }

    get vehicleList () {
        return $$(SELECTORS.VEHICLE_LIST_ITEM);
    }

    // =======
    // methods
    // =======
    clickMyMaintenance () {
        console.log('Clicking \'My maintenance\'');
        this.myMaintenanceItem.click();
    }

    clickMechanicsMaintenance () {
        console.log('Clicking \'Mechanic\'s maintenance\'');
        this.mechanicMaintenanceItem.click();
    }

    clickCompletedMaintenance () {
        console.log('Clicking \'Completed maintenance\'');
        Gestures.checkIfDisplayedWithScrollDownAndClick(this.completedMaintenanceItem, 1);
    }

    clickAllMaintenance () {
        console.log('Clicking \'All maintenance items\'');
        Gestures.checkIfDisplayedWithScrollDownAndClick(this.allMaintenanceItem, 1);
    }

    clickVehicleName () {
        console.log('Clicking \'All maintenance items\'');
        this.vehicleNameText.click();
    }

    clickImages () {
        console.log('Clicking \'Images\'');
        Gestures.checkIfDisplayedWithScrollDownAndClick(this.imagesItem, 1);
    }

    clickVehicleDetails () {
        console.log('Clicking \'Vehicle details\'');
        Gestures.checkIfDisplayedWithScrollDownAndClick(this.vehicleDetailsItem, 1);
    }

    clickRegistration () {
        console.log('Clicking \'Registration\'');
        Gestures.checkIfDisplayedWithScrollDownAndClick(this.registrationItem, 1);
    }

    clickDeleteVehicle () {
        console.log('Clicking \'Delete this vehicle\'');
        Gestures.checkIfDisplayedWithScrollDownAndClick(this.deleteVehicleButton, 1);
    }

    clickPreferredServiceCenter () {
        console.log('Clicking \'My preferred service center\'');
        Gestures.checkIfDisplayedWithScrollDownAndClick(this.serviceCenterItem, 1);
    }
}

export default new MyRVScreen();
