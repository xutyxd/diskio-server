# health-check.feature
Feature: Health Check

  Scenario: App is alive
    Given I perform a fetch to "health-check"
    When response is replied from the server
    Then it should return a "200" code, the time he has been alive and the current timestamp