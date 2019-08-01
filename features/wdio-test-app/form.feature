Feature: Interact with a form on the React Native app

   I can interact with form components on the Forms tab of the mobile app

   @smoketest @regression
   Scenario: Input text and validate
   Given I am on the forms tab
   When I set the text input control to "Hello, this is a demo app"
   Then I shall be able to retrieve "Hello, this is a demo app" from the text input control
   
   @regression
   Scenario: Set and read switches
   Given I am on the forms tab
   When I toggle the switch control "on"
   Then the switch is "on"
   When I toggle the switch control "off"
   Then the switch is "off"

   @regression
   Scenario: Select options from a dropdown
   Given I am on the forms tab
   When I select the dropdown picker item "This app is awesome"
   Then the item has title text "This app is awesome"
   When I select the dropdown picker item "webdriver.io is awesome"
   Then the item has title text "webdriver.io is awesome"
   When I select the dropdown picker item "Appium is awesome"
   Then the item has title text "Appium is awesome"

   @regression
   Scenario: I can open an alert and dismiss it
   Given I am on the forms tab
   When I click on the Active button
   Then the system alert appears
   And the system alert contains the correct text
   When I dismiss the system alert
   Then the system alert is no longer displayed

   @regression
   Scenario: Determine that a button is inactive
   Given I am on the forms tab
   When I click on the Inactive button
   Then the state of the Inactive button is inactive
