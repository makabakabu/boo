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
$ npm install -g boo-cli
$ boo COMMAND
running command...
$ boo (-v|--version|version)
boo-cli/0.0.9 darwin-x64 node-v14.4.0
$ boo --help [COMMAND]
USAGE
  $ boo COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`boo commit`](#boo-commit)
* [`boo help [COMMAND]`](#boo-help-command)
* [`boo jira [JIRA]`](#boo-jira-jira)

## `boo commit`

boo is a commit message manager

```
USAGE
  $ boo commit

EXAMPLE
  $ boo
  $ boo jira add/delete/update/list
```

_See code: [src/commands/commit.ts](https://github.com/cli/boo/blob/v0.0.9/src/commands/commit.ts)_

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

## `boo jira [JIRA]`

查看和增添jira信息

```
USAGE
  $ boo jira [JIRA]

ARGUMENTS
  JIRA  添加第二个参数list / add 来展示/增添 pr 功能

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ boo hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/jira.ts](https://github.com/cli/boo/blob/v0.0.9/src/commands/jira.ts)_
<!-- commandsstop -->
