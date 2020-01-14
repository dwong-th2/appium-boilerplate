Feature: Basic login for existing automation user

   @TR(12312862)
   Scenario: Login with existing user
      Given I submit my Togo ID
      When I supply the automation user credentials
      Then I am taken to the dashboard screen
         And my default vehicle is "Winnebago Adventurer"
      When I logout from the app
      Then I am returned to the Welcome screen

#    Scenario: Logout
#    Given I am logged in
#    And I am at the dashboard screen
#    When I sign out using the hamburger menu
#    Then I am returned to the OEM splash screen
