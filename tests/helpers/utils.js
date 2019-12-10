const SELECTORS = {
    ANDROID: {
        TEXT: '*//android.widget.TextView',
        TEXT_FIELD: '*//android.widget.EditText',
    },
    IOS: {
        GENERIC_TEXT: null,
        XPATH_TEXT: '*//XCUIElementTypeStaticText',
        TEXT_FIELD: '*//XCUIElementTypeTextField',
    },
};

/**
 * Get the text of an element (including all child elements)
 *
 * @param {element} element
 * @param {boolean} isXpath
 *
 * @return {string}
 */
export function getTextOfElement (element, isXpath = false) {
    let visualText;

    try {
        if (driver.isAndroid) {
            visualText = element.$$(SELECTORS.ANDROID.TEXT).reduce((currentValue, el) => `${currentValue} ${el.getText()}`, '');
        } else {
            const iosElement = isXpath ? element.$$(SELECTORS.IOS.XPATH_TEXT) : element;

            if (isXpath) {
                visualText = element.$$(SELECTORS.IOS.XPATH_TEXT).reduce((currentValue, el) => `${currentValue} ${el.getText()}`, '');
            } else {
                visualText = iosElement.getText();
            }
        }
    } catch (e) {
        visualText = element.getText();
    }

    return visualText.trim();
}

/**
 * Get the time difference in seconds
 *
 * @param {number} start    the time in milliseconds
 * @param {number} end      the time in milliseconds
*/
export function timeDifference (start, end) {
    const elapsed = (end - start) / 1000;
    console.log('elapsed = ', elapsed, ' seconds');
}

/**
 * Remove duplicate values from an array
 *
 * @param {array} array    the array to process
 *
 * @return {array}         a new array with duplicates removed
 */
export function arrayUnique (array) {
    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j]) { a.splice(j--, 1); }
        }
    }

    return a;
}
