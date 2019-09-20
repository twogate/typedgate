import { expect } from 'chai'
import { loadJson } from '../../src/file-utils'
import { InterfaceDefinition, InterfaceDefinitionError } from '../../src/interface-definition'
import { ObjectPath } from '../../src/object-path'

describe('interface-definition', () => {
  let jsonData: any

  before((done) => {
    loadJson('./test/fixtures/app-config.json').then((res) => {
      jsonData = res
      done()
    })
  })
  it('badtype1', () => {
    const interfaceDefinition = new InterfaceDefinition({
      project: {
        tsConfigFilePath: "./test/fixtures/bad-types/tsconfig.json"
      },
      sourceFilePath: "./test/fixtures/bad-types/badtype1.ts",
    })
    expect(() => interfaceDefinition.scanFiles(jsonData)).to.throw(InterfaceDefinitionError)
  })
  it('badtype2', () => {
    const interfaceDefinition = new InterfaceDefinition({
      project: {
        tsConfigFilePath: "./test/fixtures/bad-types/tsconfig.json"
      },
      sourceFilePath: "./test/fixtures/bad-types/badtype2.ts",
    })
    expect(() => interfaceDefinition.scanFiles(jsonData)).to.throw(InterfaceDefinitionError)
  })
})


