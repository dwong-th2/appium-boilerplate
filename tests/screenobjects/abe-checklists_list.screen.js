import AppScreen from './app.screen';

const SELECTORS = {
    HEADER: '~checklists-header',
    PREMIUM_BANNER: '~premium-banner',
    CHECKLIST_ITEM: '~list-item',
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

    // =======
    // methods
    // =======
    getChecklistsList () {
        this.waitForListToLoad();
        var returnList = [];
        this.checklistItems.forEach(function (el) {
            if (browser.isAndroid) {
                returnList.push(el.$('android.widget.TextView').getText());
            } else {
                returnList.push(el.getText());
            }
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
}

export default new CheckistsListScreen();
