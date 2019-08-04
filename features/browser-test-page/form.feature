Feature: Forms

    Set values on a web form and submit them

    Background: The form should be opened
    Given the form page is opened

    Scenario: A user with wrong credentials shall be denied access
    When I supply invalid credentials
    Then I am denied access

    Scenario: A user with good credentials shall be granted access
    When I supply valid credentials
    Then I am granted access
