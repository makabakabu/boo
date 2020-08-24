import * as jiraList from '../assets/jira/index.json'
import {cli} from 'cli-ux'
import {prompt} from 'inquirer'
import * as fs from 'fs'
import * as path from 'path'
// 编辑

export const add = async () => {
  const response: any = await prompt([{
    type: 'input',
    name: 'name',
    message: 'issue name?',
  }, {
    type: 'input',
    name: 'dueDate',
    message: 'due date?',
  }, {
    type: 'input',
    name: 'description',
    message: 'description?',
  }])
  jiraList.jiraList.unshift({
    Name: response.name || '',
    'Due Date': response.dueDate || '',
    Description: response.description || '',
  })
  fs.writeFileSync(path.resolve('src/assets/jira/index.json'), JSON.stringify(jiraList))
  cli.table(jiraList.jiraList, {Name: {}, 'Due Date': {}, Description: {}})
}
