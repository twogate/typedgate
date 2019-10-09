import { expect } from 'chai'
import { AbstractSyntaxTree } from '../../../src/abstract-syntax-tree'
import { InterfaceDeclaration, Project, ProjectOptions, SourceFile, SyntaxKind, UnionTypeNode, ExportedDeclarations, PropertySignature } from "ts-morph";


const arrayOfInterface = {
  "tabs":{
    "tabs":[
      {
        "name":"home",
        "text":"ホーム"
      },
      {
        "name":"schedule",
        "text":"スケジュール"
      },
      {
        "name":"contents",
        "text":"コンテンツ"
      },
      {
        "name":"timeline",
        "text":"タイムライン"
      }
    ]
  },
}

const typeLiteral = {
  name: "asdfasdf",
  typeLiteral: {
    uni: "uni1",
    str: "strstrstr!",
    num: 42,
    bool: true,
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
        "contentType": "image/jpeg",
        "url": "http://asdfasdf",
      },
      "content2x": null,
      "content3x": null,
    }
  }
}

describe('abstract syntax tree (nested-types/type-literal)', () => {
  let project: Project
  let sourceFile: SourceFile
  let declaration: ExportedDeclarations[] | undefined

  before((done) => {
    project = new Project({
      tsConfigFilePath: "./test/fixtures/nested-types/tsconfig.json"
    });
    sourceFile = project.getSourceFileOrThrow("./test/fixtures/nested-types/type-literal.fixture.ts");
    declaration = sourceFile.getExportedDeclarations().get('TypeLiteral')
    done()
  })
  it('should be success validation', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, typeLiteral, [])
    ast.validateDescendants()
    expect(ast.pairedNode).to.equal(typeLiteral)
    expect(ast.objectPath).to.deep.equal([])
    declaration[0].getChildrenOfKind(SyntaxKind.PropertySignature).map((p) => {
      const prop = p.getFirstChild()
      if (prop) {
        const propName = prop.getText()
        const child = new AbstractSyntaxTree(p, (typeLiteral as any)[propName], [propName])
        child.validateDescendants()
        expect(child.pairedNode).to.equal((typeLiteral as any)[propName])
        expect(child.objectPath).to.deep.equal([propName])
        expect(child.valid).to.be.true
      }
    })
  })
})

describe('abstract syntax tree (nested-types/array-of-interface)', () => {
  let project: Project
  let sourceFile: SourceFile
  let declaration: ExportedDeclarations[] | undefined

  before((done) => {
    project = new Project({
      tsConfigFilePath: "./test/fixtures/nested-types/tsconfig.json"
    });
    sourceFile = project.getSourceFileOrThrow("./test/fixtures/nested-types/array-of-interface.fixture.ts");
    declaration = sourceFile.getExportedDeclarations().get('TabsConfig')
    done()
  })
  it('should be success validation', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, arrayOfInterface.tabs, ['tabs'])
    ast.validateDescendants()
    expect(ast.pairedNode).to.equal(arrayOfInterface.tabs)
    expect(ast.objectPath).to.deep.equal(['tabs'])
    declaration[0].getChildrenOfKind(SyntaxKind.PropertySignature).map((p) => {
      const prop = p.getFirstChild()
      if (prop) {
        const propName = prop.getText()
        const child = new AbstractSyntaxTree(p, (arrayOfInterface.tabs as any)[propName], ['tabs',propName])
        child.validateDescendants()
        expect(child.pairedNode).to.equal((arrayOfInterface.tabs as any)[propName])
        expect(child.objectPath).to.deep.equal(['tabs', propName])
        expect(child.valid).to.be.true
      }
    })
  })
})

describe('abstract syntax tree (nested-types/import)', () => {
  let project: Project
  let sourceFile: SourceFile
  let declaration: ExportedDeclarations[] | undefined

  before((done) => {
    project = new Project({
      tsConfigFilePath: "./test/fixtures/nested-types/tsconfig.json"
    });
    sourceFile = project.getSourceFileOrThrow("./test/fixtures/nested-types/import.fixture.ts");
    declaration = sourceFile.getExportedDeclarations().get('EntranceConfig')
    done()
  })
  it('should be success validation', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, importTest.entrance, ['entrance'])
    ast.validateDescendants()
    expect(ast.pairedNode).to.equal(importTest.entrance)
    expect(ast.objectPath).to.deep.equal(['entrance'])
    declaration[0].getChildrenOfKind(SyntaxKind.PropertySignature).map((p) => {
      const prop = p.getFirstChild()
      if (prop) {
        const propName = prop.getText()
        const child = new AbstractSyntaxTree(p, (importTest.entrance as any)[propName], ['entrance',propName])
        child.validateDescendants()
        expect(child.pairedNode).to.equal((importTest.entrance as any)[propName])
        expect(child.objectPath).to.deep.equal(['entrance', propName])
        expect(child.valid).to.be.true
      }
    })
  })
})
