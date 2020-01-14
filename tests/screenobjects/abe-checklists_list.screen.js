import AppScreen from './app.screen';
import Gestures from '../../tests/helpers/Gestures';
import { getTextOfElement } from '../helpers/utils';

const SELECTORS = {
    HEADER: '~checklists-header',
    PREMIUM_BANNER: '~premium-banner',
    CHECKLIST_ITEM: '~list-item',
    CREATE_BUTTON: '~create-header-button',
    CREATE_CHECKLIST_NAME_TEXTFIELD: '~name-your-checklist-input',
    CREATE_CHECKLIST_BUTTON: '~create-checklist-button',
    BACK_BUTTON: '~header-back',
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

    get backButton () {
        return $(SELECTORS.BACK_BUTTON);
    }

    // =======
    // methods
    // =======
    isBackButtonDisplayed () {
        return this.backButton.isDisplayed();
    }

    clickBackButton () {
        if (this.isBackButtonDisplayed()) {
            console.log('Clicking back button');
            this.backButton.click();
            browser.pause(500);
        }
    }

    getChecklistsList () {
        var returnList = [];
        this.waitForListToLoad();

        this.checklistItems.forEach(function (el) {
            var elementText = getTextOfElement(el);

            if (elementText !== '') {
                returnList.push(elementText);
            }
        });

        if (browser.isAndroid) {
            // Android only returns the visible objects so we need to keep swiping up
            // and getting more elements until we see the premium banner.
            // Warning: if the list contains duplicate values then only the unique values will be returned.
            // Note: Before using this method, you should reload the checklists list screen or make sure the
            //       list is scrolled to the top
            var firstElementText = returnList[0];

            for (var x = 1; x < 20; x++) {
                if (this.premiumBanner.isExisting()) {
                    break;
                }
                Gestures.swipeUp(0.85);
                this.checklistItems.forEach(function (el) {
                    var elementText = getTextOfElement(el);
                    if (elementText !== '' && !returnList.includes(elementText)) {
                        returnList.push(elementText);
                    }
                });
            }

            // Scroll back up to the top of the list
            const firstElement = $(this.getSelectorForText(firstElementText));
            Gestures.checkIfDisplayedWithScrollUp(firstElement, 4);
        }

        console.log('Found checklists:' + returnList);
        return returnList;
    }

    getChecklistsInProgressList () {
        var theList = this.getChecklistsList();
        var returnList = [];
        for (var x = 0; x < theList.length; x++) {
            if (theList[x].includes('%')) {
                var item = theList[x].replace(/ \d+ %/g, '');
                returnList.push(item);
            }
        }
        console.log('Found checklists in progress:' + returnList);
        return returnList;
    }

    selectChecklistByName (checklistToSelect) {
    // click a checklist by it's name
        const selector = this.getSelectorForText(checklistToSelect);
        const element = $(selector);
        if (browser.isIOS) {
            Gestures.scrollToTop();
        }
        Gestures.checkIfDisplayedWithScrollDown(element, 3);
        console.log("Selecting checklist '" + checklistToSelect + "'");
        element.click();
    }

    getSelectorForText (text) {
        const selector = browser.isAndroid ? '//android.view.ViewGroup[@content-desc="list-item"]/android.widget.TextView[contains(@text,"' + text + '")]'
            : '//XCUIElementTypeOther[contains(@label,"' + text + '") and @name="list-item"]';
        return selector;
    }

    doesPremiumBannerExist () {
        // TODO
    }

    waitForListToLoad () {
        this.waitForScreenToLoad();
        for (var x = 1; x <= 20; x++) {
            if (this.backButton.isDisplayed()) {
                this.clickBackButton();
            }
            if (this.checklistItems.length > 0) {
                break;
            }
            browser.pause(500);
        }
    }

    clickCreateButton () {
        console.log('Clicking [Create] button');
        this.createButton.click();
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
        return false;
    }

    getTogoChecklists () {
        var togoChecklists = ['Campsite arrival', 'Dewinterization', 'Home departure', 'Packing for camping',
            'Packing for camping with kids', 'Pantry packing', 'Parking your motorized RV', 'Campsite departure',
            'Departure prep'];

        return togoChecklists;
    }
}

export default new CheckistsListScreen();
