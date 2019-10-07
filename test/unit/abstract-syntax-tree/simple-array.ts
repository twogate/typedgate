import { expect } from 'chai'
import { AbstractSyntaxTree } from '../../../src/abstract-syntax-tree'
import { InterfaceDeclaration, Project, ProjectOptions, SourceFile, SyntaxKind, UnionTypeNode, ExportedDeclarations, PropertySignature } from "ts-morph";

const fixtureObjSimple = {
  "arrayNumber": {
    "num": [453123, 23434, 635, 9453]
  },
  "arrayString": {
    "text": ["yeah", "weiwei", "hyooeeee", "平和"]
  },
  "arrayBoolean": {
    "bool": [true, false, true, true, false, false]
  },
  "arrayUnion": {
    "uni": ["asdfasdf", 9876, "ehehe~", 810]
  },
  "arrayTypeUnion": {
    "uni": [true, "asdfasdf", "ehehe~", false]
  },
  "arrayLiteralUnion": {
    "uni": [114514.1919, 'this is a literal', true]
  },
  "arrayLiteralTypeUnion": {
    "uni": ['literal!', true, 987]
  }
}

describe('abstract syntax tree (number[])', () => {
  let project: Project
  let sourceFile: SourceFile
  let declaration: ExportedDeclarations[] | undefined

  before((done) => {
    project = new Project({
      tsConfigFilePath: "./test/fixtures/simple-types/tsconfig.json"
    });
    sourceFile = project.getSourceFileOrThrow("./test/fixtures/simple-types/array.ts");
    declaration = sourceFile.getExportedDeclarations().get('ArrayNumber')
    done()
  })
  it('check equality', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimple.arrayNumber, ['arrayNumber'])
    ast.validateDescendants()
    const child = new AbstractSyntaxTree(declaration[0].getChildAtIndex(0) as PropertySignature, fixtureObjSimple.arrayNumber.num, ['arrayNumber','num'])
    expect(ast.pairedNode).to.equal(fixtureObjSimple.arrayNumber)
    expect(ast.objectPath).to.deep.equal(['arrayNumber'])
    if (ast.child) {
      expect(ast.child.pairedNode).to.deep.equal(child.pairedNode)
      expect(ast.child.objectPath).to.deep.equal(['arrayNumber','num'])
      expect(ast.child.valid).to.be.true
    } else {
      expect(ast.child).to.not.be.undefined
    }
  })
})

describe('abstract syntax tree (string[])', () => {
  let project: Project
  let sourceFile: SourceFile
  let declaration: ExportedDeclarations[] | undefined

  before((done) => {
    project = new Project({
      tsConfigFilePath: "./test/fixtures/simple-types/tsconfig.json"
    });
    sourceFile = project.getSourceFileOrThrow("./test/fixtures/simple-types/array.ts");
    declaration = sourceFile.getExportedDeclarations().get('ArrayString')
    done()
  })
  it('check equality', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimple.arrayString, ['arrayString'])
    ast.validateDescendants()
    const child = new AbstractSyntaxTree(declaration[0].getChildAtIndex(0) as PropertySignature, fixtureObjSimple.arrayString.text, ['arrayString','text'])
    expect(ast.pairedNode).to.equal(fixtureObjSimple.arrayString)
    expect(ast.objectPath).to.deep.equal(['arrayString'])
    if (ast.child) {
      expect(ast.child.pairedNode).to.deep.equal(child.pairedNode)
      expect(ast.child.objectPath).to.deep.equal(['arrayString','text'])
      expect(ast.child.valid).to.be.true
    } else {
      expect(ast.child).to.not.be.undefined
    }
  })

})

describe('abstract syntax tree (boolean[])', () => {
  let project: Project
  let sourceFile: SourceFile
  let declaration: ExportedDeclarations[] | undefined

  before((done) => {
    project = new Project({
      tsConfigFilePath: "./test/fixtures/simple-types/tsconfig.json"
    });
    sourceFile = project.getSourceFileOrThrow("./test/fixtures/simple-types/array.ts");
    declaration = sourceFile.getExportedDeclarations().get('ArrayBoolean')
    done()
  })
  it('check equality', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimple.arrayBoolean, ['arrayBoolean'])
    ast.validateDescendants()
    const child = new AbstractSyntaxTree(declaration[0].getChildAtIndex(0) as PropertySignature, fixtureObjSimple.arrayBoolean.bool, ['arrayBoolean','bool'])
    expect(ast.pairedNode).to.equal(fixtureObjSimple.arrayBoolean)
    expect(ast.objectPath).to.deep.equal(['arrayBoolean'])
    if (ast.child) {
      expect(ast.child.pairedNode).to.deep.equal(child.pairedNode)
      expect(ast.child.objectPath).to.deep.equal(['arrayBoolean','bool'])
      expect(ast.child.valid).to.be.true
    } else {
      expect(ast.child).to.not.be.undefined
    }
  })
})

describe('abstract syntax tree (Array<string | number>)', () => {
  let project: Project
  let sourceFile: SourceFile
  let declaration: ExportedDeclarations[] | undefined

  before((done) => {
    project = new Project({
      tsConfigFilePath: "./test/fixtures/simple-types/tsconfig.json"
    });
    sourceFile = project.getSourceFileOrThrow("./test/fixtures/simple-types/array.ts");
    declaration = sourceFile.getExportedDeclarations().get('ArrayUnion')
    done()
  })
  it('check equality', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimple.arrayUnion, ['arrayUnion'])
    ast.validateDescendants()
    const child = new AbstractSyntaxTree(declaration[0].getChildAtIndex(0) as PropertySignature, fixtureObjSimple.arrayUnion.uni, ['arrayUnion','uni'])
    expect(ast.pairedNode).to.equal(fixtureObjSimple.arrayUnion)
    expect(ast.objectPath).to.deep.equal(['arrayUnion'])
    if (ast.child) {
      expect(ast.child.pairedNode).to.deep.equal(child.pairedNode)
      expect(ast.child.objectPath).to.deep.equal(['arrayUnion','uni'])
      expect(ast.child.valid).to.be.true
    } else {
      expect(ast.child).to.not.be.undefined
    }
  })
})

describe('abstract syntax tree (UnionType[])', () => {
  let project: Project
  let sourceFile: SourceFile
  let declaration: ExportedDeclarations[] | undefined

  before((done) => {
    project = new Project({
      tsConfigFilePath: "./test/fixtures/simple-types/tsconfig.json"
    });
    sourceFile = project.getSourceFileOrThrow("./test/fixtures/simple-types/array.ts");
    declaration = sourceFile.getExportedDeclarations().get('ArrayTypeUnion')
    done()
  })
  it('check equality', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimple.arrayTypeUnion, ['arrayTypeUnion'])
    ast.validateDescendants()
    const child = new AbstractSyntaxTree(declaration[0].getChildAtIndex(0) as PropertySignature, fixtureObjSimple.arrayTypeUnion.uni, ['arrayTypeUnion','uni'])
    expect(ast.pairedNode).to.equal(fixtureObjSimple.arrayTypeUnion)
    expect(ast.objectPath).to.deep.equal(['arrayTypeUnion'])
    if (ast.child) {
      expect(ast.child.pairedNode).to.deep.equal(child.pairedNode)
      expect(ast.child.objectPath).to.deep.equal(['arrayTypeUnion','uni'])
      expect(ast.child.valid).to.be.true
    } else {
      expect(ast.child).to.not.be.undefined
    }
  })
})

describe('abstract syntax tree (array literal union)', () => {
  let project: Project
  let sourceFile: SourceFile
  let declaration: ExportedDeclarations[] | undefined

  before((done) => {
    project = new Project({
      tsConfigFilePath: "./test/fixtures/simple-types/tsconfig.json"
    });
    sourceFile = project.getSourceFileOrThrow("./test/fixtures/simple-types/array.ts");
    declaration = sourceFile.getExportedDeclarations().get('ArrayLiteralUnion')
    done()
  })
  it('check equality', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimple.arrayLiteralUnion, ['arrayLiteralUnion'])
    ast.validateDescendants()
    const child = new AbstractSyntaxTree(declaration[0].getChildAtIndex(0) as PropertySignature, fixtureObjSimple.arrayLiteralUnion.uni, ['arrayLiteralUnion','uni'])
    expect(ast.pairedNode).to.equal(fixtureObjSimple.arrayLiteralUnion)
    expect(ast.objectPath).to.deep.equal(['arrayLiteralUnion'])
    if (ast.child) {
      expect(ast.child.pairedNode).to.deep.equal(child.pairedNode)
      expect(ast.child.objectPath).to.deep.equal(['arrayLiteralUnion','uni'])
      expect(ast.child.valid).to.be.true
    } else {
      expect(ast.child).to.not.be.undefined
    }
  })
})

describe('abstract syntax tree (array literal type union)', () => {
  let project: Project
  let sourceFile: SourceFile
  let declaration: ExportedDeclarations[] | undefined

  before((done) => {
    project = new Project({
      tsConfigFilePath: "./test/fixtures/simple-types/tsconfig.json"
    });
    sourceFile = project.getSourceFileOrThrow("./test/fixtures/simple-types/array.ts");
    declaration = sourceFile.getExportedDeclarations().get('ArrayLiteralTypeUnion')
    done()
  })
  it('check equality', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimple.arrayLiteralTypeUnion, ['arrayLiteralTypeUnion'])
    ast.validateDescendants()
    const child = new AbstractSyntaxTree(declaration[0].getChildAtIndex(0) as PropertySignature, fixtureObjSimple.arrayLiteralTypeUnion.uni, ['arrayLiteralTypeUnion','uni'])
    expect(ast.pairedNode).to.equal(fixtureObjSimple.arrayLiteralTypeUnion)
    expect(ast.objectPath).to.deep.equal(['arrayLiteralTypeUnion'])
    if (ast.child) {
      expect(ast.child.pairedNode).to.deep.equal(child.pairedNode)
      expect(ast.child.objectPath).to.deep.equal(['arrayLiteralTypeUnion','uni'])
      expect(ast.child.valid).to.be.true
    } else {
      expect(ast.child).to.not.be.undefined
    }
  })
})
