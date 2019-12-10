# We can use these utility tests for cleaning up until we implement support
# to do these things using abe-api

Feature: Cleanup Utilities

  Background: Login with existing user
    Given Im logged in

  @util
  Scenario: Complete all checklists in progress
    Given I am on the dashboard
    When I complete all checklists in progress
      And I navigate back to the dashboard
    Then the dashboard does not show any checklists in progress

  @util
  Scenario: Delete all user created checklists
    Given I am on the dashboard
    When I delete all user created checklists
      And I go to checklists
    Then the checklist list page will only contain Togo defined checklists



