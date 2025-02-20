# Twenty-Four Puzzle

[Twenty-Four Puzzle](https://en.wikipedia.org/wiki/24_(puzzle)) built with [Tauri 2.0](https://tauri.app/)

## Intro (Game Rule)
The 24 Game is an arithmetical card game in which the objective is to find a way to manipulate four integers so that the end result is 24.

The game is played with a deck of 52 cards, each card has a number from 1 to 13, and four cards are drawn.

The game is played by rearranging the numbers and using the four basic arithmetic operations (+, -, *, /) to form an expression that equals 24.

## Download
> "Since the core developer which is me does not have the money to purchase a 99 dollars fee annually to join the Apple Developer Program, people who want to have a try of our product (the app, in this case) can only download the source code by themselves and build the app locally."

### Prerequisites

Before you begin, make sure you have the following installed on your system:

- **Node.js**: The JavaScript runtime environment. You can download it from [nodejs.org](https://nodejs.org/).
- **npm**: The Node package manager, which comes with Node.js. Ensure you have the latest
- **Rust**: Rust, a programming languge, is installed and managed by the rustup tool.

If you have **Node.js** and **npm**, you can skip step 1 and step 2.

If you have **Rust/rustup**, you can skip step 3.

### Instructions

1. Download and install the latest version of Node.js from the [official Node.js website](https://nodejs.org/).
2. Verify the installation by running the following commands in your terminal:
   ```sh
   node -v
   npm -v
   ```
3. Download and install Rust with cargo in terminal. The following code is coming from the [official Rust website](https://www.rust-lang.org/tools/install). If You have any issue, take a look at the [official Rust website](https://www.rust-lang.org/tools/install).
   ```sh
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```
4. Download the zip or tar.gz file in the [release](https://github.com/HelloWorld-er/Twenty-Four-Puzzle/releases) section
5. open the folder in terminal
6. run the following code in terminal
   ```sh
   npm install
   ```
7. bundle the app locally
   ```sh
   npm run tauri build -- --bundles dmg
   ```
   **currently only support MacOS**
  


## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
