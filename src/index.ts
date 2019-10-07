import { Project, StructureKind } from "ts-morph";
import { loadJson } from './file-utils'

import { InterfaceDefinition } from './interface-definition'

import { ResultReport } from './result-report'

import chalk from 'chalk'

loadJson('./test/fixtures/app-config.json').then((data) => {
//  loadJson("./test/fixtures/car-types/engine.json").then((data) => {
  if (typeof data !== 'object' && data === null) {
    throw new Error('Root of provided JSON structure is not an object.')
  }
  console.log(chalk.green("Loading project..."))
  const interfaceDefinition = new InterfaceDefinition({
    project: {
      tsConfigFilePath: "../crayon-types/tsconfig.json"
      //tsConfigFilePath: "./test/fixtures/car-types/tsconfig.json"
    },
    sourceFilePath: "../crayon-types/src/index.ts",
    //sourceFilePath: "./test/fixtures/car-types/engine.ts",
    targetData: data
  })
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
          console.error("Object Path: ", chalk.yellowBright(r.objectPathIdentifier.join('.')))
          console.error("TS FilePath: ", `${chalk.yellow(r.sourceFileName)}:${chalk.green(r.sourceFilePos.line.toString())}:${r.sourceFilePos.column.toString()}`)
          // onsole.error(chalk.dim(r.text))
          // console.error(chalk.dim(JSON.stringify(r.objectValue, null, 2)))
        })
        console.log(`\n${report.length} error(s) found`)
      }
      console.error(chalk.bold(`=== Validation Result ===`))
      console.error(chalk.redBright.bold("Not Valid"))
    }
  } catch (e) {
    console.error("Error:", chalk.redBright.bold(e.toString()))
  }
})
