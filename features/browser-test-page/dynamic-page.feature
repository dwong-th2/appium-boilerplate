Feature: Dynamic page

    Dynamic page load

    Scenario: After the dynamic page has loaded there should be a button on the page
    Given the dynamic page is opened
    And the dynamic loaded page does not exist
    When I click the button on the dynamic page
    Then the dynamic loaded page does exist
