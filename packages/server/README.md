# SystemRank - Server Package 💻

## Functional Requirements (FRs)

- [x] Users should be able to register as regular users or companies.
- [x] Users should be able to authenticate.
- [x] Users should be able to retrieve their profiles.
- [x] Users or companies should be able to update their profiles.
- [x] A company should be able to register one or more operating systems (OSs).
- [x] A company should be able to edit its OSs.
- [x] A company should be able to delete its OSs.
- [x] Should be able to fetch all companies
- [x] Filtering OSs by company should be possible.
- [x] Retrieving all available OSs on the platform should be possible.
- [x] Getting details of a specific OS should be possible.
- [x] Searching for OS names or company profiles should be possible.
- [x] Rating OSs on a scale of 1 to 5 and leaving comments should be possible.
- [x] Editing existing reviews should be possible.
- [x] Deleting reviews should be possible.
- [x] Should be able to fetch all reviews of a system
- [x] Should be able to fetch all reviews of a user

## Business Rules (BRs)

- [x] Users should not be able to register with a duplicated email.
- [x] Two OSs with the same name should not exist.
- [x] Users should not be able to submit two reviews for the same OS, but they can edit their reviews.

## Non-Functional Requirements (NFRs)

- [x] User passwords must be encrypted.
- [x] Application data must be persisted in a `PostgreSQL` database with `Docker`.
- [x] All data lists must be paginated with 20 items per page.
- [x] Users should be identified by a `JWT` (JSON Web Token).
- [x] The JWT must use the `RS256` algorithm.

## Future Tasks:

- [ ] Implement E2E tests
- [ ] Refactor unit tests
- [ ] Review project architecture