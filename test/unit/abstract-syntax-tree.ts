import { expect } from 'chai'
import { AbstractSyntaxTree } from '../../src/abstract-syntax-tree'
import { InterfaceDeclaration, Project, ProjectOptions, SourceFile, SyntaxKind, UnionTypeNode, ExportedDeclarations, PropertySignature } from "ts-morph";
export type CylinderLayout = 'inline' | 'flat' | 'v';
export type FuelSystemKind = 'injection' | 'carburetor';
export type EngineDirection = 'longitudinal' | 'transverse';


// @TG:path .engine
export interface Engine {
  name: string
  displacement: number;
  bore: number;
  stroke: number;
  compressionRatio: number;
  turbo: boolean;
  intercooler: boolean;
  fuelSystem: FuelSystemKind;
  vvt: boolean;
  cylinderCount: number;
  rotary: boolean;
  diesel: boolean;
  cylinderLayout: CylinderLayout;
  engineDirection: EngineDirection;
}

const fixtureObjEngine = {
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
const fixtureObjSimple = {
  "simpleString": {
    "text": "asdf"
  },
  "simpleNumber": {
    "num": 453123
  },
  "simpleBoolean": {
    "bool": true
  },
  "simpleUnion": {
    "uni": "yeah"
  }
}

// describe('abstract syntax tree (car)', () => {
//   let project: Project
//   let sourceFile: SourceFile

//   before((done) => {
//     project = new Project({
//       tsConfigFilePath: "./test/fixtures/car-types/tsconfig.json"
//     });
//     sourceFile = project.getSourceFileOrThrow("./test/fixtures/car-types/engine.ts");
//     done()
//   })
//   it('simple', () => {
//     console.log(sourceFile.getExportedDeclarations())

// //    new AbstractSyntaxTree(interfaceDefinition, fixtureObj, [])
//   })
// })

describe('abstract syntax tree (simple string)', () => {
  let project: Project
  let sourceFile: SourceFile
  let declaration: ExportedDeclarations[] | undefined

  before((done) => {
    project = new Project({
      tsConfigFilePath: "./test/fixtures/simple-types/tsconfig.json"
    });
    sourceFile = project.getSourceFileOrThrow("./test/fixtures/simple-types/simple.ts");
    declaration = sourceFile.getExportedDeclarations().get('SimpleString')
    done()
  })
  it('declaration is not undefined', () => {
    expect(declaration).to.not.be.undefined
//    new AbstractSyntaxTree(interfaceDefinition, fixtureObj, [])
  })
  it('check equality', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimple.simpleString, ['simpleString'])
    ast.validateDescendants()
    const child = new AbstractSyntaxTree(declaration[0].getChildAtIndex(0) as PropertySignature, fixtureObjSimple.simpleString.text, ['simpleString.text'])
    expect(ast.pairedNode).to.equal(fixtureObjSimple.simpleString)
    expect(ast.objectPath).to.deep.equal(['simpleString'])
    if (ast.child) {
      expect(ast.child.pairedNode).to.deep.equal(child.pairedNode)
      expect(ast.child.objectPath).to.deep.equal(['simpleString','text'])
      expect(ast.child.valid).to.be.true
    } else {
      expect(ast.child).to.not.be.undefined
    }

    // const child = new AbstractSyntaxTree(declaration[0].getChildAtIndex(0) as PropertySignature, fixtureObjSimple.simple.text, ['simple.text'])
    // const correctAST = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimple.simple, ['simple'], child)
    // console.log(correctAST)
  })

})

describe('abstract syntax tree (simple number)', () => {
  let project: Project
  let sourceFile: SourceFile
  let declaration: ExportedDeclarations[] | undefined

  before((done) => {
    project = new Project({
      tsConfigFilePath: "./test/fixtures/simple-types/tsconfig.json"
    });
    sourceFile = project.getSourceFileOrThrow("./test/fixtures/simple-types/simple.ts");
    declaration = sourceFile.getExportedDeclarations().get('SimpleNumber')
    done()
  })
  it('declaration is not undefined', () => {
    expect(declaration).to.not.be.undefined
  })
  it('check equality', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimple.simpleNumber, ['simpleNumber'])
    ast.validateDescendants()
    const child = new AbstractSyntaxTree(declaration[0].getChildAtIndex(0) as PropertySignature, fixtureObjSimple.simpleNumber.num, ['simpleNumber.num'])
    expect(ast.pairedNode).to.equal(fixtureObjSimple.simpleNumber)
    expect(ast.objectPath).to.deep.equal(['simpleNumber'])
    if (ast.child) {
      expect(ast.child.pairedNode).to.deep.equal(child.pairedNode)
      expect(ast.child.objectPath).to.deep.equal(['simpleNumber','num'])
      expect(ast.child.valid).to.be.true
    } else {
      expect(ast.child).to.not.be.undefined
    }
  })
})

describe('abstract syntax tree (simple boolean)', () => {
  let project: Project
  let sourceFile: SourceFile
  let declaration: ExportedDeclarations[] | undefined

  before((done) => {
    project = new Project({
      tsConfigFilePath: "./test/fixtures/simple-types/tsconfig.json"
    });
    sourceFile = project.getSourceFileOrThrow("./test/fixtures/simple-types/simple.ts");
    declaration = sourceFile.getExportedDeclarations().get('SimpleBoolean')
    done()
  })
  it('declaration is not undefined', () => {
    expect(declaration).to.not.be.undefined
  })
  it('check equality', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimple.simpleBoolean, ['simpleBoolean'])
    ast.validateDescendants()
    const child = new AbstractSyntaxTree(declaration[0].getChildAtIndex(0) as PropertySignature, fixtureObjSimple.simpleBoolean.bool, ['simpleBoolean.bool'])
    expect(ast.pairedNode).to.equal(fixtureObjSimple.simpleBoolean)
    expect(ast.objectPath).to.deep.equal(['simpleBoolean'])
    if (ast.child) {
      expect(ast.child.pairedNode).to.deep.equal(child.pairedNode)
      expect(ast.child.objectPath).to.deep.equal(['simpleBoolean','bool'])
      expect(ast.child.valid).to.be.true
    } else {
      expect(ast.child).to.not.be.undefined
    }
  })
})

// describe('abstract syntax tree (simple union)', () => {
//   let project: Project
//   let sourceFile: SourceFile
//   let declaration: ExportedDeclarations[] | undefined

//   before((done) => {
//     project = new Project({
//       tsConfigFilePath: "./test/fixtures/simple-types/tsconfig.json"
//     });
//     sourceFile = project.getSourceFileOrThrow("./test/fixtures/simple-types/simple.ts");
//     declaration = sourceFile.getExportedDeclarations().get('SimpleBoolean')
//     done()
//   })
//   it('declaration is not undefined', () => {
//     expect(declaration).to.not.be.undefined
//   })
//   it('check equality', () => {
//     if (!declaration) return
//     const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimple.simpleUnion, ['simpleUnion'])
//     ast.validateDescendants()
//     const child = new AbstractSyntaxTree(declaration[0].getChildAtIndex(0) as PropertySignature, fixtureObjSimple.simpleUnion.uni, ['simpleUnion.uni'])
//     expect(ast.pairedNode).to.equal(fixtureObjSimple.simpleUnion)
//     expect(ast.objectPath).to.deep.equal(['simpleUnion'])
//     if (ast.child) {
//       expect(ast.child.pairedNode).to.deep.equal(child.pairedNode)
//       expect(ast.child.objectPath).to.deep.equal(['simpleUnion','uni'])
//       expect(ast.child.valid).to.be.true
//     } else {
//       expect(ast.child).to.not.be.undefined
//     }
//   })
// })
