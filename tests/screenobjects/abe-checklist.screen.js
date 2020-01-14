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
    BACK_BUTTON: '~header-back-button',
    FEEDBACK_TITLE_TEXT: '~feedback-title-text',
    FEEDBACK_TEXT: 'feedback-text',
    FEEDBACK_THUMBSUP_BUTTON: 'feedback-thumbsup-button',
    FEEDBACK_THUMBSDOWN_BUTTON: 'feedback-thumbsdown-button',
    FEEDBACK_CLOSE_BUTTON:
    browser.isAndroid ? '//android.widget.TextView[@content-desc="feedback-title-text"]/../android.view.ViewGroup[1]/android.view.ViewGroup'
        : '//XCUIElementTypeStaticText[@name="feedback-title-text"]/../XCUIElementTypeOther[1]/XCUIElementTypeOther',
    EMPTY_CHECKLIST_TEXT: '~this-checklist-is-empty',

    // tutorial controls
    EDIT_TUTORIAL_TITLE: '~edit-checklists-tutorial-card-title',
    CUSTOMIZE_TUTORIAL_TITLE: '~customize-tasks-tutorial-card-title',
    TUTORIAL_TEXT: '~tutorial-card-text',
    GOT_IT_BUTTON: '~got-it-button',
    NEXT_TIP_BUTTON: '~next-tip-button',

    // add/edit task modal
    CLOSE_MODAL_BUTTON: '~search-close-button',
    ADD_TASK_NAME_EDIT: '~add-a-task-edit',
    SEARCH_RESULTS: '~search-result-text',
    TASK_NAME_EDIT: '~task-input',
    TASK_NOTES_EDIT: '~notes-input',
    ADD_TASK_MODAL_BUTTON: '~add-task-modal-button',
    SAVE_TASK_MODAL_BUTTON: '~save-task-modal-button',
    DELETE_TASK_MODAL_BUTTON: '~delete-task-modal-button',
};

class ChecklistScreen extends AppScreen {
    constructor () {
        super(SELECTORS.COMPLETE_CHECKLIST_BUTTON);
    }

    // =======
    // getters
    // =======
    get closeModelButton () {
        return $(SELECTORS.CLOSE_MODAL_BUTTON);
    }

    get addTaskNameSearch () {
        return $(SELECTORS.ADD_TASK_NAME_EDIT);
    }

    get searchResultsList () {
        return $$(SELECTORS.SEARCH_RESULTS);
    }

    get taskNameEdit () {
        return $(SELECTORS.TASK_NAME_EDIT);
    }

    get taskNotesEdit () {
        return $(SELECTORS.TASK_NOTES_EDIT);
    }

    get addTaskModalButton () {
        return $(SELECTORS.ADD_TASK_MODAL_BUTTON);
    }

    get saveTaskModalButton () {
        return $(SELECTORS.SAVE_TASK_MODAL_BUTTON);
    }

    get deleteTaskModalButton () {
        return $(SELECTORS.DELETE_TASK_MODAL_BUTTON);
    }

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
        return this.editButton.isDisplayed() || this.doneButton.isDisplayed();
    }

    clickCompleteChecklistButton () {
        console.log('Clicking [Complete checklist] button');
        Gestures.checkIfDisplayedWithScrollDown(this.completeChecklistButton, 20);
        this.completeChecklistButton.click();
    }

    selectChecklistItemByName (itemToSelect) {
    // click a checklist item by it's name
        var item = $('~' + itemToSelect);
        try {
            if (browser.isIOS) {
                Gestures.scrollToTop();
            }
            console.log("Selecting checklist task '" + itemToSelect + "'");
            Gestures.checkIfDisplayedWithScrollDown(item, 2);
            item.click();
            browser.pause(2000);
        } catch (err) {
            console.error("Unable to find checklist item '" + itemToSelect + "'!");
            console.error(err.message);
        }
    }

    isTutorialDisplayed () {
        try {
            this.tutorialText.waitForExist(1000);
            this.tutorialText.waitForDisplayed(500);
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
        return this.emptyChecklistText.isExisting();
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
        if (this.isTutorialDisplayed()) {
            this.closeTutorial();
        }
    }

    clickDeleteChecklistButton () {
        if (this.isTutorialDisplayed()) {
            this.closeTutorial();
        }
        console.log('Clicking [Delete checklist] button');
        Gestures.checkIfDisplayedWithScrollDown(this.deleteChecklistButton, 3);
        this.deleteChecklistButton.click();
    }

    deleteChecklist () {
        this.clickEditButton();
        this.clickDeleteChecklistButton();
        browser.pause(1000);
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
                if (this.addTaskNameSearch.isExisting()) {
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

    addTask (taskName, taskNotes) {
        this.addTaskButton.waitForDisplayed();
        this.addTaskButton.click();
        this.waitForAddTaskModal();
        this.addTaskNameSearch.setValue(taskName);
    }

    waitForAddTaskModal () {
        return this.addTaskNameSearch.waitForDisplayed(1000);
    }

    closeTaskModal () {
        console.log('Clicking the close modal button');
        this.closeModelButton.click();
        browser.pause(1000);
    }

    getTaskSearchResults () {
        var returnList = [];

        this.searchResultsList.forEach(function (el) {
            var elementText = getTextOfElement(el);

            if (elementText !== '') {
                returnList.push(elementText);
            }
        });
    }

    selectTaskFromResults (taskName) {
        var elements = this.getTaskSearchResults();

        for (var x = 0; x < elements.length; x++) {
            if (elements[x].includes(taskName)) {
                this.searchResultsList[x].click();
                break;
            }
        }
    }
}

export default new ChecklistScreen();
