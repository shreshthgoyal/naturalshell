# NaturalShell

Convert natural language into shell commands with ease.

![npm version](https://img.shields.io/npm/v/naturalshell)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

![Gif Demo](DEMO_GIF_URL)

NaturalShell is a Node.js package that simplifies the command line, allowing you to use natural language to generate and understand shell commands. It also features an editing option for the generated commands.

## Features

- **Natural Language Understanding**: Easily convert your English sentences into shell commands.
- **Command Explanation**: Get explanations for what each command does, enhancing your understanding of shell operations.
- **Command Editing**: Directly edit the suggested command before execution, giving you full control.
- **Cross-Platform Support**: Whether you're on Linux, macOS, or Windows, NaturalShell works seamlessly.

## Installation

Ensure you have Node.js (version 14 or later) installed. Then, install NaturalShell globally using npm:

```sh
npm install -g naturalshell
```

## Usage

Simply run `nsh` or `naturalshell` followed by your query in natural language:

```sh
naturalshell "find all txt files in the current directory"
```

NaturalShell will interpret your command and offer a shell command suggestion, which you can:

- **Run directly** by pressing `Enter`
- **Edit** to make adjustments
- **Cancel** if it's not what you were looking for

## Contributing

We welcome contributions to NaturalShell! Whether it's adding new features, improving documentation, or reporting bugs, please feel free to make a pull request or open an issue.

## License

NaturalShell is open-sourced software licensed under the [MIT license](LICENSE).
