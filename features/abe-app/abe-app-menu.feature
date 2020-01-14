Feature: Basic navigation of the tab menu

  Background: Login with existing user
    Given Im logged in

  Scenario: Navigate through the tabs
    Given I am on the dashboard
    When I click the "Explore" tabbar button
    Then I am taken to the Explore screen
    When I click the "Checklists" tabbar button
    Then I am taken to the Checklists screen 
    When I click the "RV Living" tabbar button
    Then I am taken to the RV Living screen 
    When I click the "My RV" tabbar button
    Then I am taken to the My RV screen 
    When I click the "Home" tabbar button
    Then I am taken to the dashboard screen 

