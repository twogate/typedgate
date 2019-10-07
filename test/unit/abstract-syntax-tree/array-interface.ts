// import { expect } from 'chai'
// import { AbstractSyntaxTree } from '../../../src/abstract-syntax-tree'
// import { InterfaceDeclaration, Project, ProjectOptions, SourceFile, SyntaxKind, UnionTypeNode, ExportedDeclarations, PropertySignature } from "ts-morph";


// const fixtureObjArray = [
//   {
//     num: 123,
//   },
//   {
//     num: 321,
//   },
//   {
//     num: 987,
//   },
//   {
//     num: 456,
//   }
// ]

// describe('abstract syntax tree (nested-interface/tabs)', () => {
//   let project: Project
//   let sourceFile: SourceFile
//   let declaration: ExportedDeclarations[] | undefined

//   before((done) => {
//     project = new Project({
//       tsConfigFilePath: "./test/fixtures/array-types/tsconfig.json"
//     });
//     sourceFile = project.getSourceFileOrThrow("./test/fixtures/array-types/interface.ts");
//     declaration = sourceFile.getExportedDeclarations().get('ArrayInterface')
//     done()
//   })
//   it('should be success validation', () => {
//     if (!declaration) return
//     const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjArray, [])
//     ast.validateDescendants()
//     expect(ast.pairedNode).to.equal(fixtureObjArray)
//     expect(ast.objectPath).to.deep.equal([])
//     declaration[0].getChildrenOfKind(SyntaxKind.PropertySignature).map((p) => {
//       const prop = p.getFirstChild()
//       if (prop) {
//         const propName = prop.getText()
//         console.log("TESTING:",propName,"with",fixtureObjArray)
//         const child = new AbstractSyntaxTree(p, (fixtureObjArray as any), [[],"num"])
//         child.validateDescendants()
//         expect(child.pairedNode).to.equal((fixtureObjArray as any))
//         expect(child.objectPath).to.deep.equal([[], propName])
//         expect(child.valid).to.be.true
//       }
//     })
//   })
// })
