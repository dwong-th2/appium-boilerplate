Feature: Basic login for existing automation user

   Scenario: Login with existing user
   Given I submit my Togo ID
   When I supply the automation user credentials
   Then I am taken to the dashboard
   And my default vehicle is "Airstream Classic"
   When I logout from the app
   Then I am returned to the Welcome page

#    Scenario: Logout
#    Given I am logged in
#    And I am at the dashboard screen
#    When I sign out using the hamburger menu
#    Then I am returned to the OEM splash screen