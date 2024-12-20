# Base Forum Tests

## Table of Contents

* [Functional Tests](#functional-tests)
* [Unit Tests](#unit-tests)
* [Accessibility](#accessibility)
  * [Wave](#wave)
  * [WCAG](#wcag)
* [Validator Testing](#validator-testing)
  * [HTML](#html)
  * [PEP8](#pep8)
  * [JSHint](#jshint)
  * [ESLint](#eslint)
* [Lighthouse Report](#lighthouse-report)
* [Responsiveness](#responsiveness)

## Functional tests

| Test Steps | Expected | Actual | Status |
|------------|----------|---------|---------|
| **Sign Up Tests** |
| Input username more than 50 characters | Error message should display | Error message displayed | ✅ PASS |
| Input username already taken | Error message should display | Error message displayed | ✅ PASS |
| Input password less than 8 characters | Error message should display | Error message displayed | ✅ PASS |
| Input passwords don't match | Error message should display | Error message displayed | ✅ PASS |
| Input with correct values | User should be registered and redirected | User registered and redirected | ✅ PASS |
| **Sign In Tests** |
| Input username more than 50 characters | Error message should display | Error message displayed | ✅ PASS |
| Input password incorrect | Error message should display | Error message displayed | ✅ PASS |
| Input with username that does not exist | Error message should display | Error message displayed | ✅ PASS |
| Input with correct credentials | User should be logged in and redirected | User logged in and redirected | ✅ PASS |
| **Review Form Tests** |
| Input subject over 100 characters | Error message should display | Error message displayed | ✅ PASS |
| Input content over 500 characters | Error message should display | Error message displayed | ✅ PASS |
| Try location that does not exist | Error message should display | Error message displayed | ✅ PASS |
| Try to double click submit to submit twice | Only one submission should be processed | One submission processed | ✅ PASS |
| Review form click close | Form should close without submitting | Form closed without submission | ✅ PASS |
| Review form with correct values | Review should be submitted successfully | Review submitted successfully | ✅ PASS |
| **Profile Edit Tests** |
| Profile edit form only allows images for profile photo upload | Non-image files should not be available | Non-image files unavailable | ✅ PASS |
| Input name more than 50 characters | Should restrict typing | restricts typing | ✅ PASS |
| Try negative Base jump numbers | Error message should display | Error message displayed | ✅ PASS |
| Click cancel | Form should close without saving changes | Form closed without saving | ✅ PASS |
| Submit correct values | Profile should update successfully | Profile updated successfully | ✅ PASS |
| **Profile View Tests** |
| View Profile page user reviews tab | Should display user's reviews | User reviews displayed | ✅ PASS |
| View Profile page user details | Should display user information | User information displayed | ✅ PASS |
| View Profile page saved locations tab | Should display saved locations | Saved locations displayed | ✅ PASS |
| **Location Tests** |
| View locations page | Should display country groups and search input | Country groups and search input displayed | ✅ PASS |
| Search for country that exists | Should display matching countries | Matching countries displayed | ✅ PASS |
| Search for location that exists | Should display matching locations | Matching locations displayed | ✅ PASS |
| Search random word that does not exist | Should display no results message | No results message displayed | ✅ PASS |
| Click country group on locations page | Should expand/collapse country group with relevant locations | Country group expanded/collapsed with relevant locations | ✅ PASS |
| Click more info on location card | Should navigate to location details | Navigated to location details | ✅ PASS |
| **Location Details Tests** |
| View location details page | Should display location information | Location information displayed | ✅ PASS |
| View location details as logged in user | Should show Save and add review buttons | All features displayed | ✅ PASS |
| View location details as non logged in user | Should hide save and add review buttons | Limited features displayed | ✅ PASS |
| View location details with reviews | Should display location reviews | Reviews displayed | ✅ PASS |
| Click copy to clipboard icon | Should copy location coordinates to clipboard | Coordinates copied to clipboard | ✅ PASS |
| Click save button (logged in) | Should save location to user profile | Location saved to profile | ✅ PASS |
| Click add review button (logged in) | Should open review form | Review form opened | ✅ PASS |
| **Reviews Tests** |
| View Reviews page | Should display all reviews, newest first | All reviews displayed, newest first | ✅ PASS |
| View user review | Should display user's review with edit/ delete options | User review displayed with edit/ delete options | ✅ PASS |
| View other users review | Should display other users' reviews without edit/ delete options | Other users' reviews displayed without edit/ delete options | ✅ PASS |
| Click edit icon on user review | Should open prepopulated review form modal with update review button | Opened prepopulated review form modal with update review button | ✅ PASS |
| Click delete icon on user review | Should show delete confirmation | Delete confirmation shown | ✅ PASS |
| Cancel delete review modal | Should cancel delete, review still exists | Delete review cancelled, review still exists | ✅ PASS |
| Confirm delete review modal | Should delete review | Deleted review | ✅ PASS |
| **Navigation Tests (Logged Out)** |
| View navigation bar as logged out user | Should show guest navigation options | Guest options displayed | ✅ PASS |
| Click logo in navigation bar | Should navigate to home page | Navigated to home page | ✅ PASS |
| Click locations link in navigation bar | Should navigate to locations page | Navigated to locations page | ✅ PASS |
| Click Reviews link in navigation bar | Should Navigate to reviews page | Navigated to reviews page | ✅ PASS |
| Click 'sign in' link in navigation bar | Should navigate to sign in page | Navigated to sign in page | ✅ PASS |
| Click sign up link in navigation bar | Should navigate to sign up page | Navigated to sign up page | ✅ PASS |
| **Navigation Tests (Logged In)** |
| View navigation bar as logged in user | Should show user navigation options | User options displayed | ✅ PASS |
| Click add review link in navigation bar | Should Open add review modal with form | Navigated to add reviews modal | ✅ PASS |
| Click profile link in navigation bar | Should navigate to profile page | Navigated to profile page | ✅ PASS |
| Click sign out link in navigation bar | Should show sign out confirmation | Sign out confirmation shown | ✅ PASS |
| Click cancel in sign out confirmation modal | Should close modal without signing out | Modal closed, user still logged in | ✅ PASS |
| Confirm Signout in confirmation modal | Should sign out user and redirect | User signed out and redirected | ✅ PASS |

## Unit tests

## Accessibility 
### Wave
### WCAG

## Validator testing
### html 
### pep8 
### jshint 
### eslint

## Lighthouse report
## Responsiveness