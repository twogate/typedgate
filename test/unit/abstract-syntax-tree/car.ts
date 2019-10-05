import { expect } from 'chai'
import { AbstractSyntaxTree } from '../../../src/abstract-syntax-tree'
import { InterfaceDeclaration, Project, ProjectOptions, SourceFile, SyntaxKind, UnionTypeNode, ExportedDeclarations, PropertySignature } from "ts-morph";

const fixtureObjCar = {
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

describe('abstract syntax tree (car-types/engine)', () => {
  let project: Project
  let sourceFile: SourceFile
  let declaration: ExportedDeclarations[] | undefined

  before((done) => {
    project = new Project({
      tsConfigFilePath: "./test/fixtures/car-types/tsconfig.json"
    });
    sourceFile = project.getSourceFileOrThrow("./test/fixtures/car-types/engine.ts");
    declaration = sourceFile.getExportedDeclarations().get('Engine')
    done()
  })
  it('should be success validation', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjCar.engine, ['engine'])
    ast.validateDescendants()
    expect(ast.pairedNode).to.equal(fixtureObjCar.engine)
    expect(ast.objectPath).to.deep.equal(['engine'])
    declaration[0].getChildrenOfKind(SyntaxKind.PropertySignature).map((p) => {
      const prop = p.getFirstChild()
      if (prop) {
        const propName = prop.getText()
        const child = new AbstractSyntaxTree(p, (fixtureObjCar.engine as any)[propName], ['engine', propName])
        child.validateDescendants()
        expect(child.pairedNode).to.equal((fixtureObjCar.engine as any)[propName])
        expect(child.objectPath).to.deep.equal(['engine', propName])
        expect(child.valid).to.be.true
      }
    })
  })
})
