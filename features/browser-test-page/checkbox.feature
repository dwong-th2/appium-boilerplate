Feature: Checkboxes

    Set, clear and retrieve state of checkboxes

    Background: The checkbox page should be opened
    Given the checkbox page is opened

    Scenario: Checkbox 2 should be enabled
    When I view the state of the checkboxes
    Then the first checkbox shall be "disabled"
    And the second checkbox shall be "enabled"

    Scenario: Checkbox 1 should be enabled after clicking on it
    When I view the state of the checkboxes
    Then the first checkbox shall be "disabled"
    When I toggle the first checkbox
    Then the first checkbox shall be "enabled"
