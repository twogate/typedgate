import { loadJson } from './file-utils'
import { InterfaceDefinition } from './interface-definition'
import { ResultReport } from './result-report'
import chalk from 'chalk'
import commandLineArgs from 'command-line-args'


const optionDefinitions = [
  { name: 'verbose', alias: 'v', type: Boolean },
  { name: 'tsconfig', alias: 't', type: String },
  { name: 'src', alias: 's', type: String },
  { name: 'json', alias: 'j', type: String },
]

const options = commandLineArgs(optionDefinitions)

if (!options.src || !options.tsconfig || !options.json) {
  throw new Error('ArgumentError')
}

loadJson(options.json).then((data) => {
  if (typeof data !== 'object' && data === null) {
    throw new Error('Root of provided JSON structure is not an object.')
  }
  console.log(chalk.green("Loading project..."))
  const interfaceDefinition = new InterfaceDefinition({
    project: {
      tsConfigFilePath: options.tsconfig
    },
    sourceFilePath: options.src,
    targetData: data
  })
  interfaceDefinition.verbose = options.verbose
  try {
    console.log(chalk.green("Validating..."))
    const result = interfaceDefinition.compareToTarget()
    if (result.valid) {
      console.log(chalk.bold(`=== Validation Result ===`))
      console.log(chalk.green("Valid"))
    } else {
      if (result.asts) {
        const report = new ResultReport(result.asts).generateReport()
        console.error(chalk.bold(`=== Validation Detail ===`))
        report.forEach((r) => {
          console.error("JSON Path  : ", chalk.yellowBright(r.objectPathIdentifier.join('.')))
          console.error("TS FilePath: ", `${chalk.yellow(r.sourceFileName)}:${chalk.green(r.sourceFilePos.line.toString())}:${r.sourceFilePos.column.toString()}`)
          if (options.verbose) {
            console.error(chalk.dim(r.text))
            console.error(chalk.dim(JSON.stringify(r.objectValue, null, 2)))
          }
        })
        console.log(`\n${report.length} error(s) found`)
      }
      console.error(chalk.bold(`=== Validation Result ===`))
      console.error(chalk.redBright.bold("Not Valid"))
      process.exitCode = 1
    }
  } catch (e) {
    console.error("Error:", chalk.redBright.bold(e.toString()))
  }
})
