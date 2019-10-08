import { expect } from 'chai'
import { AbstractSyntaxTree } from '../../../src/abstract-syntax-tree'
import { InterfaceDeclaration, Project, ProjectOptions, SourceFile, SyntaxKind, UnionTypeNode, ExportedDeclarations, PropertySignature } from "ts-morph";


// const fixtureObjTabs = {
//   "tabs":{
//     "tabs":
//       {
//         "name":"official",
//         "text":"公式情報"
//       }
//   }
// }

const typeLiteral = {
  name: "asdfasdf",
  typeLiteral: {
    uni: "uni1",
    str: "strstrstr!",
    num: 42,
    bool: true,
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
        console.log("TESTING:",propName)
        const child = new AbstractSyntaxTree(p, (typeLiteral as any)[propName], [propName])
        child.validateDescendants()
        expect(child.pairedNode).to.equal((typeLiteral as any)[propName])
        expect(child.objectPath).to.deep.equal([propName])
        expect(child.valid).to.be.true
      }
    })
  })
})
