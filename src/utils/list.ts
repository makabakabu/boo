import * as jiraList from '../assets/jira/index.json'
import {cli} from 'cli-ux'

export const list = () => {
  cli.table(jiraList.jiraList, {Name: {}, 'Due Date': {}, Description: {}})
}
