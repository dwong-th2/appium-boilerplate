Feature: Open up maintenance screen

  Background: Login with existing user
   Given Im logged in

   Scenario: Open maintenance screen
   When I open the maintenance screen from the hamburger menu
   Then I am taken to the maintenance screen
