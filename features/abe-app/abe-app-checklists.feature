Feature: Basic navigation checklists

  Background: Login with existing user
   Given Im logged in

   @failing @TOGO-2160
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

   Scenario: create and delete an empty checklist
   Given I am on the dashboard
   When I go to checklists
   And create a checklist named "New Checklist"
   Then the checklist "New Checklist" will be open in edit mode
   And the checklist will be empty
   When I finish editing the checklist
   And return to the checklist list page
   Then the checklist list page will contain the checklist "New Checklist"
   When I delete the checklist "New Checklist"
   Then the checklist list page will not contain the checklist "New Checklist"

  #  @wip
  #  Scenario: create a checklist with tasks and delete it
  #  Given I am on the dashboard
  #  When I go to checklists
  #  And create a checklist named "New Checklist With Tasks"
  #  Then the checklist "New Checklist With Tasks" will be open in edit mode
  #  And the checklist will be empty
  #  When I add the task "Task #1" with the note "This is a note"
  #  Then the checklist will contain the task "Task #1" with the note "This is a note"
  #  When I add the task "Task #2" with no notes
  #  Then the checklist will contain the task "Task #2" with no notes
  #  When I finish editing the checklist
  #  And return to the checklist list page
  #  Then the checklist list page will contain the checklist "New Checklist With Tasks"
  #  When I delete the checklist "New Checklist With Tasks"
  #  Then the checklist list page will not contain the checklist "New Checklist With Tasks"
