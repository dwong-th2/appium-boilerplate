Feature: Basic navigation checklists

  Background: Login with existing user
   Given Im logged in

   Scenario: Start and complete a checklist
   Given I am on the dashboard
   When I start a checklist
   Then the Checklists list displays
   When I select the checklist "Campsite arrival"
   Then the checklist screen displays
   When I complete the task "Site preview"
   And I navigate back to the dashboard
   Then the dashboard shows checklist "Campsite arrival" as "5%" complete
   When I tap checklist "Campsite arrival"
   And complete the checklist
   Then the dashboard does not show any checklists in progress
