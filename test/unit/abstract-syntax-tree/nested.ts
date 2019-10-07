// import { expect } from 'chai'
// import { AbstractSyntaxTree } from '../../../src/abstract-syntax-tree'
// import { InterfaceDeclaration, Project, ProjectOptions, SourceFile, SyntaxKind, UnionTypeNode, ExportedDeclarations, PropertySignature } from "ts-morph";


// const fixtureObjTabs = {
//   "tabs":{
//     "tabs":
//       {
//         "name":"official",
//         "text":"公式情報"
//       }
//   }
// }

// describe('abstract syntax tree (nested-interface/tabs)', () => {
//   let project: Project
//   let sourceFile: SourceFile
//   let declaration: ExportedDeclarations[] | undefined

//   before((done) => {
//     project = new Project({
//       tsConfigFilePath: "./test/fixtures/nested-interface/tsconfig.json"
//     });
//     sourceFile = project.getSourceFileOrThrow("./test/fixtures/nested-interface/tabs.ts");
//     declaration = sourceFile.getExportedDeclarations().get('TabsConfig')
//     done()
//   })
//   it('should be success validation', () => {
//     if (!declaration) return
//     const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjTabs.tabs, ['tabs'])
//     ast.validateDescendants()
//     expect(ast.pairedNode).to.equal(fixtureObjTabs.tabs)
//     expect(ast.objectPath).to.deep.equal(['tabs'])
//     declaration[0].getChildrenOfKind(SyntaxKind.PropertySignature).map((p) => {
//       const prop = p.getFirstChild()
//       if (prop) {
//         const propName = prop.getText()
//         console.log("TESTING:",propName)
//         const child = new AbstractSyntaxTree(p, (fixtureObjTabs.tabs as any)[propName], ['tabs', propName])
//         child.validateDescendants()
//         expect(child.pairedNode).to.equal((fixtureObjTabs.tabs as any)[propName])
//         expect(child.objectPath).to.deep.equal(['tabs', propName])
//         expect(child.valid).to.be.true
//       }
//     })
//   })
// })
