
<p align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/6295/6295417.png" width="100" />
</p>
<p align="center">
    <h1 align="center">INSTAGRAM-CRAWLER-CLI</h1>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/Henri1024/instagram-crawler-cli?style=flat&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/Henri1024/instagram-crawler-cli?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/Henri1024/instagram-crawler-cli?style=flat&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/Henri1024/instagram-crawler-cli?style=flat&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
		<em>Developed with the software and tools below.</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/Prettier-F7B93E.svg?style=flat&logo=Prettier&logoColor=black" alt="Prettier">
	<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" alt="ESLint">
	<img src="https://img.shields.io/badge/Puppeteer-40B5A4.svg?style=flat&logo=Puppeteer&logoColor=white" alt="Puppeteer">
	<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
</p>
<hr>

##  Quick Links

> - [ Overview](#overview)
> - [ Features](#features)
> - [ Repository Structure](#repository-structure)
> - [ Getting Started](#getting-started)
>   - [ Installation](#installation)
>   - [ Running-cli](#running-cli)
> - [ To Do](#to-do)
> - [ Contributing](#contributing)
> - [ License](#license)

---

##  [Overview](#overview)

The objective of this project is to develop a command-line TypeScript application that leverages Puppeteer, a headless browser, to crawl and extract comments from Instagram posts. The extracted comments can (and will) be used for various purposes such as sentiment analysis, market research, or social media monitoring.

---

##  [Features](#features)

-	User-friendly CLI to spawn headless browser for user to login into instagram
-	User-friendly CLI to extract instagram's post comments by input Instagram post URLs

---

##  [Repository Structure](#repository-structure)

```sh
└── instagram-crawler-cli/
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    ├── src
    │   ├── commands
    │   │   ├── load-instagram.ts
    │   │   ├── scrape-instagram-comment.ts
    │   │   └── signup-instagram.ts
    │   ├── common
    │   │   ├── constant.ts
    │   │   ├── dom-helpers.ts
    │   │   └── url-helpers.ts
    │   ├── config
    │   │   └── mongodb.ts
    │   ├── index.ts
    │   ├── models
    │   │   ├── account-credential.ts
    │   │   ├── dom-instagram-first-load.ts
    │   │   └── instagram-comment.ts
    │   ├── repository
    │   │   └── account-credential.ts
    │   └── types
    │       └── env.d.ts
    └── tsconfig.json
```

---


##  [Getting Started](#getting-started)

***Requirements***

Ensure you have the following dependencies installed on your system:

* **Node js**

###  [Installation](#installation)

1. Clone the instagram-crawler-cli repository:

```sh
git clone https://github.com/Henri1024/instagram-crawler-cli
```

2. Change to the project directory:

```sh
cd instagram-crawler-cli
```

3. Install the dependencies:

```sh
npm install
```

###  [Running CLI](#running-cli)

Use the following command to run instagram-crawler-cli:

```sh
npm run start
```


---

##  [To Do](#to-do)

- [ ] `► Crawl instagram's reels comments`

---

##  [Contributing](#contributing)

Contributions are welcome! Here are several ways you can contribute:

- **[Submit Pull Requests](https://github.com/Henri1024/instagram-crawler-cli/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/Henri1024/instagram-crawler-cli/discussions)**: Share your insights, provide feedback, or ask questions.
- **[Report Issues](https://github.com/Henri1024/instagram-crawler-cli/issues)**: Submit bugs found or log feature requests for Instagram-crawler-cli.

<details closed>
    <summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your GitHub account.
2. **Clone Locally**: Clone the forked repository to your local machine using a Git client.
   ```sh
   git clone https://github.com/Henri1024/instagram-crawler-cli
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b feat/new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to GitHub**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.

Once your PR is reviewed and approved, it will be merged into the main branch.

</details>

---

##  [License](#license)

This project is protected under the [SELECT-A-LICENSE](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---
