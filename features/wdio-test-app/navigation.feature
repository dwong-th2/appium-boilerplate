Feature: Interact with tab navigation on React Native app

   I can interact with navigation component on the mobile app

   Scenario: I can go to the Home tab
   Given I am on the home screen
   When I click on the "Forms" tab
   Then I shall be navigated to the Forms screen

   Given I am on the home screen
   When I click on the "Home" tab
   Then I shall be navigated to the Home screen

   Given I am on the home screen
   When I click on the "Login" tab
   Then I shall be navigated to the Login screen

   Given I am on the home screen
   When I click on the "Swipe" tab
   Then I shall be navigated to the Swipe screen

   Given I am on the home screen
   When I click on the "Web" tab
   Then I shall be navigated to the Web screen
