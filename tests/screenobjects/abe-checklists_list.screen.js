import AppScreen from './app.screen';
import { getTextOfElement } from '../helpers/utils';

const SELECTORS = {
    HEADER: '~checklists-header',
    PREMIUM_BANNER: '~premium-banner',
    CHECKLIST_ITEM: '~list-item',
    CREATE_BUTTON: '~create-header-button',
    CREATE_CHECKLIST_FAB: '~create-checklist-fab',
    CREATE_CHECKLIST_NAME_TEXTFIELD: '~name-your-checklist-input',
    CREATE_CHECKLIST_BUTTON: '~create-checklist-button',
};

class CheckistsListScreen extends AppScreen {
    constructor () {
        super(SELECTORS.HEADER);
    }

    // =======
    // getters
    // =======
    get headerText () {
        return $(SELECTORS.HEADER);
    }

    get premiumBanner () {
        return $(SELECTORS.PREMIUM_BANNER);
    }

    get checklistItems () {
        return $$(SELECTORS.CHECKLIST_ITEM);
    }

    get createButton () {
        return $(SELECTORS.CREATE_BUTTON);
    }

    get createFabButton () {
        return $(SELECTORS.CREATE_CHECKLIST_FAB);
    }

    get createChecklistName () {
        return $(SELECTORS.CREATE_CHECKLIST_NAME_TEXTFIELD);
    }

    get createChecklistButton () {
        return $(SELECTORS.CREATE_CHECKLIST_BUTTON);
    }

    // =======
    // methods
    // =======
    getChecklistsList () {
        this.waitForListToLoad();
        var returnList = [];
        this.checklistItems.forEach(function (el) {
            returnList.push(getTextOfElement(el));
        });
        console.log('Found checklists:' + returnList);
        return returnList;
    }

    selectChecklistByName (checklistToSelect) {
    // click a checklist by it's name
        var listItems = this.getChecklistsList();
        for (var x = 0; x < listItems.length; x++) {
            if (listItems[x].includes(checklistToSelect)) {
                console.log("Selecting checklist '" + checklistToSelect + "'");
                this.checklistItems[x].click();
                return;
            }
        }
        // TODO: Android only returns the visible objects so we'll need to add some
        //      logic to scroll the list and check again
        console.error('Checklist ' + checklistToSelect + ' not found!');
    }

    doesPremiumBannerExist () {

    }

    waitForListToLoad () {
        for (var x = 1; x <= 10; x++) {
            if (this.checklistItems.length === 0) {
                browser.pause(500);
            } else {
                break;
            }
        }
    }

    clickCreateButton () {
        console.log('Clicking [Create] button');
        if (this.createButton.isDisplayed()) {
            this.createButton.click();
        } else {
            this.createFabButton.click();
        }
    }

    createChecklist (newChecklistName) {
        this.waitForListToLoad();
        this.clickCreateButton();

        this.createChecklistName.waitForExist();
        console.log("Entering new checklist name '" + newChecklistName + "'");
        this.createChecklistName.setValue(newChecklistName);
        console.log('Clicking [Create checklist] button');
        this.createChecklistButton.click();
    }

    isChecklistInList (checklistToFind) {
        // verify if the selected checklist is in the list of checklists. If there are multiple checklists
        // with the same name then it will only find the first one
        var listItems = this.getChecklistsList();
        for (var x = 0; x < listItems.length; x++) {
            if (listItems[x].includes(checklistToFind)) {
                return true;
            }
        }
        // TODO: Android only returns the visible objects so we'll need to add some
        //      logic to scroll the list and check again
        return false;
    }
}

export default new CheckistsListScreen();
