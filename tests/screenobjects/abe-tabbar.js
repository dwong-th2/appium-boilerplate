import AppScreen from './app.screen';

const SELECTORS = {
    HOME_BUTTON: '~home-button',
    EXPLORE_BUTTON: '~explore-button',
    CHECKLISTS_BUTTON: '~checklists-button',
    RV_LIVING_BUTTON: '~rv-living-button',
    MY_RV_BUTTON: '~my-rv-button',
};

class TabBar extends AppScreen {
    constructor () {
        super(SELECTORS.ACCOUNT_BUTTON);
    }

    // =======
    // getters
    // =======
    get homeButton () {
        return $(SELECTORS.HOME_BUTTON);
    }

    get exploreButton () {
        return $(SELECTORS.EXPLORE_BUTTON);
    }

    get checklistsButton () {
        return $(SELECTORS.CHECKLISTS_BUTTON);
    }

    get rvLivingButton () {
        return $(SELECTORS.RV_LIVING_BUTTON);
    }

    get myRvButton () {
        return $(SELECTORS.MY_RV_BUTTON);
    }

    // =======
    // methods
    // =======
    waitForTabBarShown () {
        for (var x = 0; x < 10; x++) {
            if (this.homeButton.isDisplayed()) {
                return;
            }
        }
    }

    openHome () {
        this.waitForTabBarShown();
        console.log('Clicking [Home] tabbar button');
        this.homeButton.click();
    }

    openExplore () {
        this.waitForTabBarShown();
        console.log('Clicking [Explore] tabbar button');
        this.exploreButton.click();
        browser.pause(1000); // give a second for the map to center
    }

    openChecklists () {
        this.waitForTabBarShown();
        console.log('Clicking [Checklists] tabbar button');
        this.checklistsButton.click();
    }

    openRVLiving () {
        this.waitForTabBarShown();
        console.log('Clicking [RV Living] tabbar button');
        this.rvLivingButton.click();
    }

    openMyRV () {
        this.waitForTabBarShown();
        console.log('Clicking [My RV] tabbar button');
        this.myRvButton.click();
    }
}

export default new TabBar();
