import {Command, flags} from '@oclif/command'
import {list, add, deleteJira, update} from '../utils'

export default class Jira extends Command {
  static description = '查看和增添jira信息';

  static examples = [
    `$ boo hello
hello world from ./src/hello.ts!
`,
  ];

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  };

  static args = [
    {
      name: 'jira',
      description: '添加第二个参数list / add 来展示/增添 pr 功能',
    },
  ];

  async run() {
    const {argv} = this.parse(Jira)
    // 如果有argv的话
    switch (argv[0]) {
    case 'list':
      process.stdout.write('something in it')
      list()
      break
    case 'add':
      add()
      break

    case 'delete':
      deleteJira()
      break

    case 'update':
      update()
      break

    default:
      break
    }
  }
}
