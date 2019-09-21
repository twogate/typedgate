import { Project, StructureKind } from "ts-morph";
import { loadJson } from './file-utils'

import { InterfaceDefinition } from './interface-definition'

loadJson('./test/fixtures/app-config.json').then((data) => {
  if (typeof data !== 'object' && data === null) {
    throw new Error('Root of provided JSON structure is not an object.')
  }
  const interfaceDefinition = new InterfaceDefinition({
    project: {
      tsConfigFilePath: "../crayon-types/tsconfig.json"
    },
    sourceFilePath: "../crayon-types/src/index.ts",
    targetData: data
  })
  interfaceDefinition.compareToTarget()
})
