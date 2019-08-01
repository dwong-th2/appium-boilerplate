Feature: Interact with swipe gestures on the Swipe tab

   Using swipe gestures on the Swipe tab I can bring swipe panels into view

   Scenario: Swiping to takes me to the content I expect
   Given I am on the home screen
   When I click on the "Swipe" tab
   Then I will be on the "Fully Open Source" first card
   When I swipe gesture "left"
   Then I will be on the "Creat community" card
   When I swipe gesture "left"
   Then I will be on the "JS.Foundation" card
   When I swipe gesture "left"
   Then I will be on the "Support Videos" card
   When I swipe left 2 times
   Then I will be on the "Compatible" card
   When I swipe gesture "right"
   Then I will be on the "Extendable" card
   When I swipe right 4 times
   Then I will be on the "Fully Open Source" first card
