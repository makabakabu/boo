boo
===

boo is a commit message generator

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/boo.svg)](https://npmjs.org/package/boo)
[![Downloads/week](https://img.shields.io/npm/dw/boo.svg)](https://npmjs.org/package/boo)
[![License](https://img.shields.io/npm/l/boo.svg)](https://github.com/document/boo/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g boo
$ boo COMMAND
running command...
$ boo (-v|--version|version)
boo/0.0.0 darwin-x64 node-v14.4.0
$ boo --help [COMMAND]
USAGE
  $ boo COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`boo hello [FILE]`](#boo-hello-file)
* [`boo help [COMMAND]`](#boo-help-command)

## `boo hello [FILE]`

describe the command here

```
USAGE
  $ boo hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ boo hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/document/boo/blob/v0.0.0/src/commands/hello.ts)_

## `boo help [COMMAND]`

display help for boo

```
USAGE
  $ boo help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_
<!-- commandsstop -->
