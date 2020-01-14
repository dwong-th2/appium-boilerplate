import { DEFAULT_TIMEOUT } from '../constants';

const SELECTORS = {
    LOADING_INDICATOR: '~loading-indicator',
};

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

    // =======
    // getters
    // =======
    get loadingIndicators () {
        return $$(SELECTORS.LOADING_INDICATOR);
    }

    // =====================
    // common screen methods
    // =====================

    /**
     * Wait for the screen to be visible by using it's constructor
     * selector
     *
     * @param {boolean} isShown - true to wait for displayed; false to wait for not displayed
     * @return {boolean}
     */
    waitForIsShown (isShown = true) {
        this.waitForScreenToLoad();
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

    /**
     * Wait for any loading indicators to not be visible
     *
     * @param {number} maxTimeToWait - Maximum miliseconds to wait
     */

    waitForScreenToLoad (maxTimeToWait = DEFAULT_TIMEOUT) {
        for (var x = 0; x < maxTimeToWait; x = x + 500) {
            if (this.loadingIndicators.length === 0) {
                break;
            }
            browser.pause(500);
        }
    }
}
