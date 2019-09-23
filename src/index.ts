import { Project, StructureKind } from "ts-morph";
import { loadJson } from './file-utils'

import { InterfaceDefinition } from './interface-definition'

import chalk from 'chalk'

//loadJson('./test/fixtures/app-config.json').then((data) => {
  loadJson("./test/fixtures/car-types/engine.json").then((data) => {
  if (typeof data !== 'object' && data === null) {
    throw new Error('Root of provided JSON structure is not an object.')
  }
  const interfaceDefinition = new InterfaceDefinition({
    project: {
      //tsConfigFilePath: "../crayon-types/tsconfig.json"
      tsConfigFilePath: "./test/fixtures/car-types/tsconfig.json"
    },
    //sourceFilePath: "../crayon-types/src/index.ts",
    sourceFilePath: "./test/fixtures/car-types/engine.ts",
    targetData: data
  })
  try {
    interfaceDefinition.compareToTarget()
  } catch (e) {
    console.error("Error:", chalk.red(e.toString()))
  }
})
