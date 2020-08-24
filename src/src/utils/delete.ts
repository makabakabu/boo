import * as jiraList from '../assets/jira/index.json'
import {cli} from 'cli-ux'
import {prompt} from 'inquirer'
import * as fs from 'fs'
import * as path from 'path'
import {row} from './row'
// 编辑

export const deleteJira = async () => {
  const jiraRow = row(jiraList.jiraList)
  const {jiraIssueList} = await prompt([{
    type: 'checkbox',
    name: 'jiraIssueList',
    message: 'select issue name?',
    choices: jiraRow,
    validate: async function (answer: string[]) {
      if (answer.length === 0) {
        return 'You must choose at least one jira issue.'
      }
      return true
    },
  }])
  let newJiraList = jiraList.jiraList
  if (jiraIssueList) {
    const jiraIssueNameList = jiraIssueList.map((str: string) => str.split(' ')[0])
    newJiraList = jiraList.jiraList.filter(({Name}) => {
      return !jiraIssueNameList.includes(Name)
    })
  }
  // console.log(jiraIssueNameList.find())
  fs.writeFileSync(path.resolve('src/assets/jira/index.json'), JSON.stringify({jiraList: newJiraList}))
  cli.table(newJiraList, {Name: {}, 'Due Date': {}, Description: {}})
}
