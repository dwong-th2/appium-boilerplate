Feature: Open up maintenance screen

  Background: Login with existing user
    Given Im logged in

  Scenario: Open maintenance screens
    When I click the "My RV" tabbar button
      And I click "My maintenance" on the My RV screen
    Then I am taken to the "My" maintenance screen
    When I click the back button on the My maintenance screen
      And I click "Mechanic's maintenance" on the My RV screen
    Then I am taken to the "Mechanic's" maintenance screen
    When I click the back button on the Mechanics maintenance screen
      And I click "Completed maintenance" on the My RV screen
    Then I am taken to the "Completed" maintenance screen
    When I click the back button on the Completed maintenance screen
      And I click "All maintenance items" on the My RV screen
    Then I am taken to the "All" maintenance screen
    When I click the back button on the All maintenance items screen
    Then I am taken to the My RV screen
