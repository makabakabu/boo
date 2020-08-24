import {Command} from '@oclif/command'
import * as inquirer from 'inquirer'
import * as fs from 'fs-extra'
import * as path from 'path'
import * as execa from 'execa'
import * as chalk from 'chalk'
import {padding, row, schedule} from '../utils'
import * as jiraList from '../assets/jira/index.json'
import {exec} from 'child_process'
import {get} from 'lodash'

export default class Boo extends Command {
  // reslove pakckage.json中config页面
  // process.cwd
  static description = 'boo is a commit message manager';

  static examples = [
    `$ boo
$ boo jira add/delete/update/list
    `,
  ];

  getConfig() {
    const packageJsonPath = path.join(process.cwd(), 'package.json')
    const projectBooPath = path.join(process.cwd(), 'boo.config.js')
    const packageJsonBooPath = get(require(packageJsonPath), ['boo', 'configFilePath'])
    switch (true) {
    case packageJsonBooPath !== undefined && fs.existsSync(path.join(process.cwd(), packageJsonBooPath)):
      return require(path.join(process.cwd(), packageJsonBooPath))

    case fs.existsSync(projectBooPath):
      return require(projectBooPath)

    default:
      // eslint-disable-next-line node/no-missing-require
      return require('../assets').default
    }
  }

  async run() {
    // 如果有argv的话
    const {commitType, scope} = this.getConfig()
    if (jiraList.jiraList.length === 0) {
      console.log('Please add jira issue first use boo jira add.')
      return
    }
    const {selectedCommitType, selectedScope} = await inquirer.prompt([
      {
        name: 'selectedCommitType',
        message: 'select a commit type',
        type: 'list',
        choices: (() => {
          const maxLength = Math.max(...commitType.map(({name}: { name: string }) => name.length))
          return commitType.map(({name, description}: { name: string; description: string }) =>
            `${padding(name, maxLength)}  ${chalk.gray(description)}`
          )
        })(),
      },
      {
        type: 'checkbox',
        message: 'select scope',
        name: 'selectedScope',
        choices: scope,
        validate: async function (answer: string[]) {
          if (answer.length === 0) {
            return 'You must choose at least one scope.'
          }
          return true
        },
      },
    ])
    const commitTypeName = selectedCommitType.split(' ')[0]
    const commitTypeEmoji = commitType.find(({name}: { name: string }) => name === commitTypeName)?.emoji
    const branchName = execa.commandSync('git rev-parse --abbrev-ref HEAD').stdout
    const branchNameMathes = jiraList.jiraList.find(({Name}) => Name === branchName)
    let jiraNameList: string[] = []
    if (branchNameMathes) {
      const {isUseBranchNameAsJiraIssueName} = await inquirer.prompt([{
        type: 'confirm',
        name: 'isUseBranchNameAsJiraIssueName',
        message: `jira issue name?(${branchName})`,
        default: true,
      }])
      jiraNameList = isUseBranchNameAsJiraIssueName ? [branchName] : []
    }

    if (jiraNameList.length === 0) {
      const {jiraIssueNameChoice} = await inquirer.prompt([{
        type: 'checkbox',
        name: 'jiraIssueNameChoice',
        message: 'choose jira issue name?',
        default: branchName,
        choices: row(jiraList.jiraList),
        validate: async function (answer: string[]) {
          if (answer.length === 0) {
            return 'You must choose at least one jira issue.'
          }
          return true
        },
      }])
      jiraNameList = jiraIssueNameChoice.map((certainChoice: string) => certainChoice.split(' ')[0])
    }
    const selectedJiraList = jiraList.jiraList.filter(({Name}) => jiraNameList.includes(Name))
    const jiraNameStr = selectedJiraList.length === 1 ? `[${selectedJiraList[0].Name}][${selectedJiraList[0]['Due Date']}]` : selectedJiraList.map(({Name, 'Due Date': dueDate}) => `[${Name} | ${dueDate}]`).join('')
    const {jiraDescription} = await inquirer.prompt([{
      type: 'input',
      name: 'jiraDescription',
      message: 'edit commit description',
      ...(jiraNameList.length === 1 ? {default: jiraList.jiraList.find(({Name}) => Name === jiraNameList[0])?.Description || ''} : {}),
    }])
    // 加上emoji
    // 调整jira号的位置， 然后删除过期2个星期的jira
    schedule(jiraNameList)
    exec(`git commit -m "${commitTypeName}(${selectedScope}): ${jiraNameStr} ${commitTypeEmoji}${jiraDescription}"`, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`)
        return
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`)
        return
      }
      console.log(stdout)
    })
  }
}
