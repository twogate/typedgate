import { expect } from 'chai'
import { loadJson } from '../../src/file-utils'
import { InterfaceDefinition } from '../../src/interface-definition'
import { TypedgateError } from '../../src/typedgate-error'

const engineFixture = {
  "engine": {
    "name": "1KZ",
    "displacement": 2982,
    "bore": 96,
    "stroke": 103,
    "compressionRatio": 21.2,
    "turbo": true,
    "intercooler": false,
    "fuelSystem": "injection",
    "vvt": false,
    "cylinderCount": 4,
    "rotary": false,
    "diesel": true,
    "cylinderLayout": "inline",
    "engineDirection": "longitudinal"
  }
}

const fixtureObjArray = [
  {
    num: 123,
  },
  {
    num: 321,
  },
  {
    num: 987,
  },
  {
    num: 456,
  }
]
const fixtureObjTabs = {
  "tabs":{
    "tabs":
      {
        "name":"official",
        "text":"公式情報"
      }
  }
}

const importTest = {
  "entrance":{
    "transfer":false,
    "transferText":null,
    "entranceImage":{
      "assetManagerReferenceImageId": "12313123123",
      "defaultContent": {
        "originalName": "9999.jpg",
        "contentType": 123232,
        "url": "http://asdfasdf",
      },
      "content2x": null,
      "content3x": null,
    }
  }
}

describe('interface-definition (exception test)', () => {
  let jsonData: any

  before((done) => {
    loadJson('./test/fixtures/crayon-types/crayon-type.json').then((res) => {
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
      targetData: jsonData
    })
    expect(() => interfaceDefinition.buildComparisonTree()).to.throw(TypedgateError)
  })
  it('badtype2', () => {
    const interfaceDefinition = new InterfaceDefinition({
      project: {
        tsConfigFilePath: "./test/fixtures/bad-types/tsconfig.json"
      },
      sourceFilePath: "./test/fixtures/bad-types/badtype2.ts",
      targetData: jsonData
    })
    expect(() => interfaceDefinition.buildComparisonTree()).to.throw(TypedgateError)
  })
})

describe('interface-definition', () => {
  it('car-types/engine', () => {
    const interfaceDefinition = new InterfaceDefinition({
      project: {
        tsConfigFilePath: "./test/fixtures/car-types/tsconfig.json"
      },
      sourceFilePath: "./test/fixtures/car-types/engine.ts",
      targetData: engineFixture
    })
    expect(interfaceDefinition.buildComparisonTree()).to.be.true
  })
  it('array-types/interface', () => {
    const interfaceDefinition = new InterfaceDefinition({
      project: {
        tsConfigFilePath: "./test/fixtures/array-types/tsconfig.json"
      },
      sourceFilePath: "./test/fixtures/array-types/interface.ts",
      targetData: fixtureObjArray
    })
    expect(interfaceDefinition.buildComparisonTree()).to.be.true
  })
  it('nested-types/tabs', () => {
    const interfaceDefinition = new InterfaceDefinition({
      project: {
        tsConfigFilePath: "./test/fixtures/nested-types/tsconfig.json"
      },
      sourceFilePath: "./test/fixtures/nested-types/tabs.ts",
      targetData: fixtureObjTabs
    })
    expect(interfaceDefinition.buildComparisonTree()).to.be.true
  })
  it('nested-types/import', () => {
    const interfaceDefinition = new InterfaceDefinition({
      project: {
        tsConfigFilePath: "./test/fixtures/nested-types/tsconfig.json"
      },
      sourceFilePath: "./test/fixtures/nested-types/import.fixture.ts",
      targetData: importTest
    })
    expect(interfaceDefinition.buildComparisonTree()).to.be.false
  })
})
