# SystemRank - Client Package 👔

## Pages:

- [x] / -> public -> Homepage, platform introduction
- [x] /auth/signin -> public -> Login page, login form
- [x] /auth/signup -> public -> Signup page, registration form
- [x] /explore -> private -> Explore registered systems page, list of registered systems with search field
- [x] /me/:userId -> private -> Profile page, User profile page
  - [x] Should display all user information in a user-friendly manner
  - [x] For companies, it should display the list of registered systems
  - [x] For regular members, it should display the latest reviews
  - [x] If the profile is of the logged-in user, there should be an option to go to the page to edit the profile
- [x] /me/:userId/settings -> private -> Update profile page
- [x] /systems/:systemId -> private -> System page, Page of a system with its reviews
  - [x] If the system belongs to the logged-in user, it should be possible to edit system information
  - [x] At the bottom of the page, there should be a list of system reviews
  - [x] It should be possible to add a review to the system
  - [x] It should be possible to edit your review of the system
  - [x] It should be possible to delete your review of the system
- [x] systems/:systemId/settings -> private -> Update system page

## Future Tasks:

- [x] Review the project and better organize the components
- [ ] Separate API request functions from components
- [ ] Add the option to delete a system on the system page

### Components:

- [x] DefaultAsideCard
- [x] DefaultLink
- [x] DefaultTextArea

### API Request Functions:

- [x] fetchAllSystems
- [x] getUserData
- [x] fetchSystemsOfCompany
- [x] fetchReviewsOfUser
- [x] getSystemData
- [x] fetchReviewsOfSystem