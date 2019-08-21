Feature: Interact with a webview tab on the React Native app using XPATH

    Accessing the webview by XPATH rather than by switching driver context

    Scenario: I should be able to go to the webview using XPATH
    Given I have reset the browser
    When I click on the "Web" tab
    Then I should be on webview
