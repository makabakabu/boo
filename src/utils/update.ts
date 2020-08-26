import * as jiraList from '../assets/jira/index.json'
import {cli} from 'cli-ux'
import {prompt} from 'inquirer'
import * as fs from 'fs'
import * as path from 'path'
import {row} from './row'

export const update = async () => {
  const jiraRow = row(jiraList.jiraList)
  const {jiraIssueName} = await prompt([{
    type: 'list',
    name: 'jiraIssueName',
    message: 'select issue name?',
    choices: jiraRow,
  }])
  const jiraName = jiraIssueName.split(' ')[0]
  const selectedJira = jiraList.jiraList.find(({Name}) => Name === jiraName)
  const {jiraDueDate, jiraDescription} = await prompt([{
    type: 'input',
    name: 'jiraDueDate',
    message: 'Due Date?',
    default: selectedJira?.['Due Date'],
  }, {
    type: 'input',
    name: 'jiraDescription',
    message: 'description?',
    default: selectedJira?.Description,
  }])
  const newJiraList = jiraList.jiraList.map(certainJira => {
    if (certainJira.Name === jiraName) {
      return {
        Name: certainJira.Name,
        'Due Date': jiraDueDate as string,
        Description: jiraDescription as string,
      }
    }
    return certainJira
  })
  // console.log(jiraIssueNameList.find())
  fs.writeFileSync(path.resolve(__dirname, '../assets/jira/index.json'), JSON.stringify({jiraList: newJiraList}))
  cli.table(newJiraList, {Name: {}, 'Due Date': {}, Description: {}})
}
