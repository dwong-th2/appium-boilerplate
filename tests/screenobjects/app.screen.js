import { DEFAULT_TIMEOUT } from '../constants';

export default class AppScreen {
    /**
     * Set a selector for the screen
     *
     * @param {string} selector - The selector string to use
     * @param {number} selectorIndex - The index of the selector if it's expected to return multiple objects
     */
    constructor (selector, selectorIndex = -1) {
        this.selector = selector;
        this.selectorIndex = selectorIndex;
    }

    /**
     * Wait for the screen to be visible by using it's constructor
     * selector
     *
     * @param {boolean} isShown
     * @return {boolean}
     */
    waitForIsShown (isShown = true) {
        if (this.selectorIndex === -1) {
            return $(this.selector).waitForDisplayed(DEFAULT_TIMEOUT, !isShown);
        }
        return $$(this.selector)[this.selectorIndex].waitForDisplayed(DEFAULT_TIMEOUT, !isShown);
    }

    /**
     * Check if the screen is visible
     *
     * @return {boolean}
     */
    isDisplayed () {
        try {
            return $(this.selector).isDisplayed();
        } catch (err) {
            return false;
        }
    }
}
