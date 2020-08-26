import * as jiraList from '../assets/jira/index.json'
import * as fs from 'fs'
import * as path from 'path'
import {add, format} from 'date-fns'

export const schedule = (jiraNameList: string[]) => {
  // 找到需要重新排序的Jira
  // 将过期的内容和在jiraNameList的内容进行重新排列
  const reorderJiraList = jiraList.jiraList.filter(({Name}) => jiraNameList.includes(Name))
  const newJiraList = jiraList.jiraList.filter(({Name, 'Due Date': dueDate}) => dueDate > format(add(new Date(), {days: -14}), 'MM-dd') && !jiraNameList.includes(Name))
  fs.writeFileSync(path.resolve(__dirname, '../assets/jira/index.json'), JSON.stringify({jiraList: [...reorderJiraList, ...newJiraList]}))
}
