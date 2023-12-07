<h1 align="center">
  <a href="#">SystemRank - Client Package 👔</a>
</h1>

<h3 align="center">
  SystemRank Client Package
</h3>

<h4 align="center"> 
	 Status: Finished
</h4>

<p align="center">
 <a href="#about">About</a> •
 <a href="#features">Features</a> •
 <a href="#layout">API Routes</a> • 
 <a href="#how-it-works">How it works</a> • 
 <a href="#tech-stack">Tech Stack</a> • 
 <a href="#author">Author</a>
</p>

## About

SystemRank Client Package - SystemRank FrontEnd package

---

## Features

- [x] List recently systems registered
- [x] Query systems by name
- [x] Show users profiles
- [x] Show systems pages
- [x] Edit details of systems pages
- [x] Delete system
- [x] Create review for a system
- [x] Edit your review of a system
- [x] Delete your review of a system
- [x] List reviews by user
- [x] List reviews of a system
- [x] Private routes based on JWT

---

## Layout

### Homepage
<img src="https://github.com/Artur-Poffo/SystemRank/blob/main/packages/client/public/README/Home.png?raw=true" alt="Print of Homepage" />

### Sign In page
<img src="https://github.com/Artur-Poffo/SystemRank/blob/main/packages/client/public/README/SignIn.png?raw=true" alt="Print of Sign In page" />

### Sign Up page
<img src="https://github.com/Artur-Poffo/SystemRank/blob/main/packages/client/public/README/SignUp.png?raw=true" alt="Print of Sign Up page" />

### Explore page
<img src="https://github.com/Artur-Poffo/SystemRank/blob/main/packages/client/public/README/Explore.png?raw=true" alt="Print of Explore page" />

### User Profile page
<img src="https://github.com/Artur-Poffo/SystemRank/blob/main/packages/client/public/README/Profile.png?raw=true" alt="Print of User profile page" />

### System page
<img src="https://github.com/Artur-Poffo/SystemRank/blob/main/packages/client/public/README/SystemPage.png?raw=true" alt="Print of System page" />

### List reviews section
<img src="https://github.com/Artur-Poffo/SystemRank/blob/main/packages/client/public/README/ReviewsSection.png?raw=true" alt="Print of list reviews section" />

---

## How it works

### Pre-requisites

Before you begin, you will need to have the following tools installed on your machine:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) and [PNPM package manager](https://pnpm.io/pt/).
In addition, it is good to have an editor to work with the code like [VSCode](https://code.visualstudio.com/).

**it is very important that before running the project you configure the environment variables as indicated in the file: .env.example**

#### Run the app

```bash
# Clone this repository
$ git clone https://github.com/Artur-Poffo/SystemRank.git

# Access the project folder cmd/terminal
$ cd SystemRank

# install the dependencies
$ pnpm install

# To run the Front-End you must run the Back-End, so access the README of the server package and follow the instructions
[Server Package 💻](../server/README.md)

# After configuring the Back-End, in the root directory, run
$ pnpm dev
# This command runs the Client and Server package simultaneously

# The client will start at port: 3000 - You can access in: http://localhost:3000
# The server will start at port: 3333 - You can now test in Insomnia or another REST client: http://localhost:3333
```

---

## Tech Stack

The following tools were used in the construction of the project:

- **Node.js**
- **TypeScript**
- **React**
- **Next.js**
- **Tailwind CSS**
- **@uiw/react-markdown-editor**
- **@radix-ui/react-dropdown-menu**
- **@radix-ui/react-dialog**
- **dayjs**
- **framer-motion**
- **jsonwebtoken**
- **ky (Fetch API extended)**
- **Zod**
- **Nookies**

> See the file  [package.json](https://github.com/Artur-Poffo/SystemRank/blob/main/packages/client/package.json)

---

## Author

- _**Artur Poffo - Developer**_

[![Linkedin Badge](https://img.shields.io/badge/-Artur-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/arturpoffo/)](https://www.linkedin.com/in/arturpoffo/)
[![Gmail Badge](https://img.shields.io/badge/-arturpoffop@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:tgmarinho@gmail.com)](mailto:arturpoffop@gmail.com)

---