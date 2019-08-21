Feature: Interact with a form on the React Native app

    I can interact with login screen component on the mobile app

    @smoketest @regression
    Scenario: I can login
    Given I am on the login screen
    When I submit my authentication details
    Then I should be logged into the app
