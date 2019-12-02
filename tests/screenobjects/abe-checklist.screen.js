import AppScreen from './app.screen';
import Gestures from '../../tests/helpers/Gestures';
import NativeAlert from '../../tests/helpers/NativeAlert';
import { getTextOfElement } from '../helpers/utils';

const SELECTORS = {
    HEADER: '~checklists-header',
    TUTORIAL_TITLE: '~edit-checklists-tutorial-card-title',
    TUTORIAL_TEXT: '~tutorial-card-text',
    TUTORIAL_BUTTON: '~got-it-button',
    PREMIUM_BANNER: '',
    COMPLETE_CHECKLIST_BUTTON: '~complete-checklist-button',
    FAB_BUTTON: '~fab-button',
    BACK_BUTTON:
    browser.isAndroid ? '//android.view.ViewGroup/android.view.ViewGroup/android.widget.ImageView'
        : '~header-back',
    FEEDBACK_TITLE_TEXT: '~feedback-title-text',
    FEEDBACK_TEXT: 'feedback-text',
    FEEDBACK_THUMBSUP_BUTTON: 'feedback-thumbsup-button',
    FEEDBACK_THUMBSDOWN_BUTTON: 'feedback-thumbsdown-button',
    FEEDBACK_CLOSE_BUTTON:
    browser.isAndroid ? '//android.widget.TextView[@content-desc="feedback-title-text"]/../android.view.ViewGroup[1]/android.view.ViewGroup'
        : '//XCUIElementTypeStaticText[@name="feedback-title-text"]/../XCUIElementTypeOther[1]/XCUIElementTypeOther',
};

class ChecklistScreen extends AppScreen {
    constructor () {
        super(SELECTORS.FAB_BUTTON);
    }

    // =======
    // getters
    // =======
    get completeChecklistButton () {
        return $(SELECTORS.COMPLETE_CHECKLIST_BUTTON);
    }
    get fabButton () {
        return $(SELECTORS.FAB_BUTTON);
    }

    get tutorialTitle () {
        return $(SELECTORS.TUTORIAL_TITLE);
    }

    get tutorialText () {
        return $(SELECTORS.TUTORIAL_TEXT);
    }

    get tutorialButton () {
        return $(SELECTORS.TUTORIAL_BUTTON);
    }

    get backButton () {
        return $(SELECTORS.BACK_BUTTON);
    }

    get feedbackTitle () {
        return $(SELECTORS.FEEDBACK_TITLE_TEXT);
    }
    get feedbackText () {
        return $(SELECTORS.FEEDBACK_TITLE_TEXT);
    }
    get feedbackThumbsUpButton () {
        return $(SELECTORS.FEEDBACK_THUMBSUP_BUTTON);
    }
    get feedbackThumbsDownButton () {
        return $(SELECTORS.FEEDBACK_THUMBSDOWN_BUTTON);
    }
    get feedbackCloseButton () {
        return $(SELECTORS.FEEDBACK_CLOSE_BUTTON);
    }

    // =======
    // methods
    // =======
    clickCompleteChecklistButton () {
        console.log('Clicking [Complete checklist] button');
        Gestures.checkIfDisplayedWithScrollDown(this.completeChecklistButton, 5);
        this.completeChecklistButton.click();
    }

    selectChecklistItemByName (itemToSelect) {
    // click a checklist item by it's name
        var item = $('~' + itemToSelect);
        try {
            console.log("Selecting checklist task '" + itemToSelect + "'");
            Gestures.checkIfDisplayedWithScrollDown(item, 2);
            item.click();
            browser.pause(5000);
        } catch (err) {
            // TODO: Android only returns the visible objects so we'll need to add some
            //       logic to scroll the list and check again

            console.error("Unable to find checklist item '" + itemToSelect + "'!");
            console.error(err.message);
        }
    }

    isTutorialDisplayed () {
        return this.tutorialTitle.isExisting();
    }

    closeTutorial () {
        for (var x = 0; x < 5; x++) {
            if (this.isTutorialDisplayed()) {
                console.log('Found tutorial panel');
                console.log('Clicking [' + getTextOfElement(this.tutorialButton) + '] button');
                this.tutorialButton.click();
                break;
            } else {
                if (this.fabButton.isDisplayed()) {
                    break;
                }
            }
            browser.pause(1000);
        }
    }

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

    completeChecklist () {
        this.clickCompleteChecklistButton();
        if (NativeAlert.isDisplayed()) {
            NativeAlert.pressButton('Complete');
            browser.pause(2000);
        }
    }

    isFeedbackDisplayed () {
        try {
            if (this.feedbackTitle.waitForExist(2000)) {
                console.log('Found feedback panel');
                return true;
            }
        } catch {
            return false;
        }
    }

    closeFeedback () {
        console.log('Closing feedback panel');
        this.feedbackCloseButton.click();
    }
}

export default new ChecklistScreen();
