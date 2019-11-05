Feature: Basic navigation of the side menu

  Background: Login with existing user
   Given Im logged in

   Scenario: Open and close the side menu
   Given I am on the dashboard
   When I open the menu
   Then the side menu displays
   And the vehicle name is "Airstream Classic"
   When I close the side menu
   Then I am returned to the dashboard 

   Scenario: Navigate to Explore
   Given I am on the dashboard
  #  When I navigate to the explore function
  #  Then the explore screen is displayed
  #  When I tap the back button
  #  Then I am returned to the dashboard 

  #  Scenario: Navigate to Maintenance
  #  Given I am on the dashboard
  #  When I navigate to the maintenance function
  #  Then the maintenance screen is displayed
  #  When I tap the back button
  #  Then I am returned to the dashboard 

  #  Scenario: Navigate to Checklists
  #  Given I am on the dashboard
  #  When I navigate to the checklists function
  #  Then the checklists screen is displayed
  #  When I tap the back button
  #  Then I am returned to the dashboard 

  #  Scenario: Navigate to Help & Support
  #  Given I am on the dashboard
  #  When I navigate to the help function
  #  Then the help screen is displayed
  #  When I tap the back button
  #  Then I am returned to the dashboard 

  #  Scenario: Navigate to Trip Planning
  #  Given I am on the dashboard
  #  When I navigate to the trip planning function
  #  Then the trip planning screen is displayed
  #  When I tap the back button
  #  Then I am returned to the dashboard 

  #  Scenario: Navigate to Account
  #  Given I am on the dashboard
  #  When I navigate to the account function
  #  Then the account screen is displayed
  #  When I tap the back button
  #  Then I am returned to the dashboard 

  #  Scenario: Navigate to How To Library
  #  Given I am on the dashboard
  #  When I navigate to the how-to function
  #  Then a browser window is displayed
  #  And the url is "https://rv.runswithtogo.com/rv-living/?ref=appnav"
  #  When I navigate back to the app
  #  Then I am returned to the dashboard 
