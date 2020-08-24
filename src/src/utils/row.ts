import {padding} from './padding'
import * as chalk from 'chalk'

export const row = (jiraList: { Name: string; 'Due Date': string; Description: string }[]) => {
  const jiraMaxNameLength = Math.max(...jiraList.map(({Name}) => Name.length))
  const jiraMaxDueDateLength = Math.max(...jiraList.map(({'Due Date': dueDate}) => dueDate.length))
  return jiraList.map(({Name, 'Due Date': dueDate, Description}) => `${padding(Name, jiraMaxNameLength)}  ${chalk.cyan(padding(dueDate, jiraMaxDueDateLength))}  ${Description}`)
}
