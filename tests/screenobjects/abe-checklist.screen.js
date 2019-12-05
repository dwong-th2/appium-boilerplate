import AppScreen from './app.screen';
import Gestures from '../../tests/helpers/Gestures';
import NativeAlert from '../../tests/helpers/NativeAlert';
import { getTextOfElement } from '../helpers/utils';

const SELECTORS = {
    HEADER: '~checklists-header',
    PREMIUM_BANNER: '',
    COMPLETE_CHECKLIST_BUTTON: '~complete-checklist-button',
    DELETE_CHECKLIST_BUTTON: '~delete-checklist-button',
    START_OVER_BUTTON: '~start-over-button',
    ADD_TASK_BUTTON: '~add-task-button',
    EDIT_BUTTON: '~edit-header-button',
    DONE_BUTTON: '~done-header-button',
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
    EMPTY_CHECKLIST_TEXT: '~this-checklist-is-empty',
    EDIT_TUTORIAL_TITLE: '~edit-checklists-tutorial-card-title',
    CUSTOMIZE_TUTORIAL_TITLE: '~customize-tasks-tutorial-card-title',
    TUTORIAL_TEXT: '~tutorial-card-text',
    GOT_IT_BUTTON: '~got-it-button',
    NEXT_TIP_BUTTON: '~next-tip-button',
};

class ChecklistScreen extends AppScreen {
    constructor () {
        super(SELECTORS.COMPLETE_CHECKLIST_BUTTON);
    }

    // =======
    // getters
    // =======
    get completeChecklistButton () {
        return $(SELECTORS.COMPLETE_CHECKLIST_BUTTON);
    }

    get deleteChecklistButton () {
        return $(SELECTORS.DELETE_CHECKLIST_BUTTON);
    }

    get startOverButton () {
        return $(SELECTORS.START_OVER_BUTTON);
    }

    get addTaskButton () {
        return $(SELECTORS.ADD_TASK_BUTTON);
    }

    get editButton () {
        return $(SELECTORS.EDIT_BUTTON);
    }

    get doneButton () {
        return $(SELECTORS.DONE_BUTTON);
    }

    get editTutorialTitle () {
        return $(SELECTORS.EDIT_TUTORIAL_TITLE);
    }

    get customizeTutorialTitle () {
        return $(SELECTORS.CUSTOMIZE_TUTORIAL_TITLE);
    }

    get tutorialText () {
        return $(SELECTORS.TUTORIAL_TEXT);
    }

    get gotItButton () {
        return $(SELECTORS.GOT_IT_BUTTON);
    }

    get nextTipButton () {
        return $(SELECTORS.NEXT_TIP_BUTTON);
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

    get emptyChecklistText () {
        return $(SELECTORS.EMPTY_CHECKLIST_TEXT);
    }

    // =======
    // methods
    // =======

    waitForIsShown (isShown = true) {
        console.log('overriding');
        return this.editButton.isDisplayed() || this.doneButton.isDisplayed();
    }

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
            browser.pause(2000);
        } catch (err) {
            // TODO: Android only returns the visible objects so we'll need to add some
            //       logic to scroll the list and check again

            console.error("Unable to find checklist item '" + itemToSelect + "'!");
            console.error(err.message);
        }
    }

    isTutorialDisplayed () {
        try {
            this.tutorialText.waitForExist(1000);
            this.tutorialText.waitForDisplayed();
            return true;
        } catch {
            return false;
        }
    }

    closeTutorial () {
        while (this.isTutorialDisplayed()) {
            console.log('Found tutorial panel');

            if (this.nextTipButton.isDisplayed()) {
                console.log('Clicking [' + getTextOfElement(this.nextTipButton) + '] button');
                this.nextTipButton.click();
                continue;
            }

            if (this.gotItButton.isDisplayed()) {
                console.log('Clicking [' + getTextOfElement(this.gotItButton) + '] button');
                this.gotItButton.click();
                continue;
            }
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

    isChecklistEmpty () {
        return this.emptyChecklistText.isDisplayed();
    }

    isChecklistInEditMode () {
        return (this.doneButton.isExisting() && this.addTaskButton.isExisting());
    }

    clickDoneButton () {
        console.log('Clicking [Done] button');
        this.doneButton.waitForExist(2000);
        this.doneButton.click();
    }

    clickEditButton () {
        console.log('Clicking [Edit] button');
        this.editButton.waitForExist(2000);
        this.editButton.click();
    }

    clickDeleteChecklistButton () {
        console.log('Clicking [Delete checklist] button');
        Gestures.checkIfDisplayedWithScrollDown(this.deleteChecklistButton, 3);
        this.deleteChecklistButton.click();
    }

    deleteChecklist () {
        this.clickEditButton();
        this.clickDeleteChecklistButton();
        return this.confirmDeleteChecklist('Delete');
    }

    confirmDeleteChecklist (buttonToClick) {
        if (NativeAlert.isDisplayed()) {
            NativeAlert.pressButton(buttonToClick);
            browser.pause(2000);
            return true;
        }

        return false;
    }

    waitForChecklistToLoad () {
        for (var x = 0; x < 20; x++) {
            try {
                if (this.doneButton.isExisting() && this.doneButton.isDisplayed()) {
                    break;
                }
                if (this.editButton.isExisting() && this.editButton.isDisplayed()) {
                    break;
                }
                if (this.isTutorialDisplayed()) {
                    this.closeTutorial();
                }
            } catch {
                browser.pause(1000);
            }
            browser.pause(1000);
        }
    }
}

export default new ChecklistScreen();
