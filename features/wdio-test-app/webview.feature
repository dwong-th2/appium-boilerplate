Feature: Interact with a webview tab on the React Native app

   I can interact with the webview component on the webview tab of the mobile app

   Scenario: Access components on the webview presented on the webview tab
   Given I am on the webview tab
   When I interact with the webview API page
   Then the webview is displaying WEBDRIVER PROTOCOL

   Scenario: Access components swapping between web, natice and web views
   Given I am on the webview tab
   When I interact with the webview API page
   Then the webview is displaying WEBDRIVER PROTOCOL
   When I interact with the native app
   And I click on the "Swipe" tab
   Then I shall be navigated to the Swipe screen
   And I will be on the "Fully Open Source" first card
   When I swipe gesture "left"
   Then I will be on the "Creat community" card
   When I click on the "Web" tab
   And I interact with the webview API page
   Then the webview is displaying WEBDRIVER PROTOCOL
