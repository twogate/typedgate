import { expect } from 'chai'
import { AbstractSyntaxTree } from '../../../src/abstract-syntax-tree'
import { InterfaceDeclaration, Project, ProjectOptions, SourceFile, SyntaxKind, UnionTypeNode, ExportedDeclarations, PropertySignature } from "ts-morph";

const fixtureObjSimple = {
  "simpleString": {
    "text": "simple string check!"
  },
  "simpleNumber": {
    "num": 453123
  },
  "simpleBoolean": {
    "bool": true
  },
  "simpleUnion": {
    "uni": "simple union check!"
  },
  "simpleTypeUnion": {
    "uni": true
  },
  "simpleLiteralUnion": {
    "uni": 114514.1919
  },
  "simpleLiteralTypeUnion": {
    "uni": 987
  },
  "undefinedType":  {
    "undefNumber": null,
    "undefString": null,
    "undefBoolean": null,
    "undefUnion": null,
    "undefTypeUnion": null,
    "undefLiteralUnion": null,
    "undefLiteralTypeUnion": null,
  },
  "simpleNull": {
    "nullProp": null,
  },
  "nullableString": {
    "nullableString": null,
  },
  "simpleClass": {
    "text": "",
    "num": 0.00001,
    "bool": true,
    "uni1": "simple union check!",
    "uni2": "true",
    "uni3": 'this is a literal',
    "uni4": true,
  }
}

const fixtureObjSimpleFailure = {
  "simpleString": {
    "text": 666
  },
  "simpleNumber": {
    "num": "12345"
  },
  "simpleBoolean": {
    "bool": 1
  },
  "simpleUnion": {
    "uni": false
  },
  "simpleTypeUnion": {
    "uni": 99999.987
  },
  "simpleLiteralUnion": {
    "uni": "gonna be fail!!!"
  },
  "simpleLiteralTypeUnion": {
    "uni": false
  }
}

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
  it('check equality', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimple.simpleString, ['simpleString'])
    ast.validateDescendants()
    const child = new AbstractSyntaxTree(declaration[0].getChildAtIndex(0) as PropertySignature, fixtureObjSimple.simpleString.text, ['simpleString','text'])
    expect(ast.pairedNode).to.equal(fixtureObjSimple.simpleString)
    expect(ast.objectPath).to.deep.equal(['simpleString'])
    if (ast.child) {
      expect(ast.child.pairedNode).to.deep.equal(child.pairedNode)
      expect(ast.child.objectPath).to.deep.equal(['simpleString','text'])
      expect(ast.child.valid).to.be.true
    } else {
      expect(ast.child).to.not.be.undefined
    }
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
  it('check equality', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimple.simpleNumber, ['simpleNumber'])
    ast.validateDescendants()
    const child = new AbstractSyntaxTree(declaration[0].getChildAtIndex(0) as PropertySignature, fixtureObjSimple.simpleNumber.num, ['simpleNumber','num'])
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
  it('check equality', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimple.simpleBoolean, ['simpleBoolean'])
    ast.validateDescendants()
    const child = new AbstractSyntaxTree(declaration[0].getChildAtIndex(0) as PropertySignature, fixtureObjSimple.simpleBoolean.bool, ['simpleBoolean','bool'])
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

describe('abstract syntax tree (simple union)', () => {
  let project: Project
  let sourceFile: SourceFile
  let declaration: ExportedDeclarations[] | undefined

  before((done) => {
    project = new Project({
      tsConfigFilePath: "./test/fixtures/simple-types/tsconfig.json"
    });
    sourceFile = project.getSourceFileOrThrow("./test/fixtures/simple-types/simple.ts");
    declaration = sourceFile.getExportedDeclarations().get('SimpleUnion')
    done()
  })
  it('check equality', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimple.simpleUnion, ['simpleUnion'])
    ast.validateDescendants()
    const child = new AbstractSyntaxTree(declaration[0].getChildAtIndex(0) as PropertySignature, fixtureObjSimple.simpleUnion.uni, ['simpleUnion','uni'])
    expect(ast.pairedNode).to.equal(fixtureObjSimple.simpleUnion)
    expect(ast.objectPath).to.deep.equal(['simpleUnion'])
    if (ast.child) {
      expect(ast.child.pairedNode).to.deep.equal(child.pairedNode)
      expect(ast.child.objectPath).to.deep.equal(['simpleUnion','uni'])
      expect(ast.child.valid).to.be.true
    } else {
      expect(ast.child).to.not.be.undefined
    }
  })
})

describe('abstract syntax tree (simple type union)', () => {
  let project: Project
  let sourceFile: SourceFile
  let declaration: ExportedDeclarations[] | undefined

  before((done) => {
    project = new Project({
      tsConfigFilePath: "./test/fixtures/simple-types/tsconfig.json"
    });
    sourceFile = project.getSourceFileOrThrow("./test/fixtures/simple-types/simple.ts");
    declaration = sourceFile.getExportedDeclarations().get('SimpleTypeUnion')
    done()
  })
  it('check equality', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimple.simpleTypeUnion, ['simpleTypeUnion'])
    ast.validateDescendants()
    const child = new AbstractSyntaxTree(declaration[0].getChildAtIndex(0) as PropertySignature, fixtureObjSimple.simpleTypeUnion.uni, ['simpleTypeUnion','uni'])
    expect(ast.pairedNode).to.equal(fixtureObjSimple.simpleTypeUnion)
    expect(ast.objectPath).to.deep.equal(['simpleTypeUnion'])
    if (ast.child) {
      expect(ast.child.pairedNode).to.deep.equal(child.pairedNode)
      expect(ast.child.objectPath).to.deep.equal(['simpleTypeUnion','uni'])
      expect(ast.child.valid).to.be.true
    } else {
      expect(ast.child).to.not.be.undefined
    }
  })
})

describe('abstract syntax tree (simple literal union)', () => {
  let project: Project
  let sourceFile: SourceFile
  let declaration: ExportedDeclarations[] | undefined

  before((done) => {
    project = new Project({
      tsConfigFilePath: "./test/fixtures/simple-types/tsconfig.json"
    });
    sourceFile = project.getSourceFileOrThrow("./test/fixtures/simple-types/simple.ts");
    declaration = sourceFile.getExportedDeclarations().get('SimpleLiteralUnion')
    done()
  })
  it('check equality', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimple.simpleLiteralUnion, ['simpleLiteralUnion'])
    ast.validateDescendants()
    const child = new AbstractSyntaxTree(declaration[0].getChildAtIndex(0) as PropertySignature, fixtureObjSimple.simpleLiteralUnion.uni, ['simpleLiteralUnion','uni'])
    expect(ast.pairedNode).to.equal(fixtureObjSimple.simpleLiteralUnion)
    expect(ast.objectPath).to.deep.equal(['simpleLiteralUnion'])
    if (ast.child) {
      expect(ast.child.pairedNode).to.deep.equal(child.pairedNode)
      expect(ast.child.objectPath).to.deep.equal(['simpleLiteralUnion','uni'])
      expect(ast.child.valid).to.be.true
    } else {
      expect(ast.child).to.not.be.undefined
    }
  })
})

describe('abstract syntax tree (simple literal type union)', () => {
  let project: Project
  let sourceFile: SourceFile
  let declaration: ExportedDeclarations[] | undefined

  before((done) => {
    project = new Project({
      tsConfigFilePath: "./test/fixtures/simple-types/tsconfig.json"
    });
    sourceFile = project.getSourceFileOrThrow("./test/fixtures/simple-types/simple.ts");
    declaration = sourceFile.getExportedDeclarations().get('SimpleLiteralTypeUnion')
    done()
  })
  it('check equality', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimple.simpleLiteralTypeUnion, ['simpleLiteralTypeUnion'])
    ast.validateDescendants()
    const child = new AbstractSyntaxTree(declaration[0].getChildAtIndex(0) as PropertySignature, fixtureObjSimple.simpleLiteralTypeUnion.uni, ['simpleLiteralTypeUnion','uni'])
    expect(ast.pairedNode).to.equal(fixtureObjSimple.simpleLiteralTypeUnion)
    expect(ast.objectPath).to.deep.equal(['simpleLiteralTypeUnion'])
    if (ast.child) {
      expect(ast.child.pairedNode).to.deep.equal(child.pairedNode)
      expect(ast.child.objectPath).to.deep.equal(['simpleLiteralTypeUnion','uni'])
      expect(ast.child.valid).to.be.true
    } else {
      expect(ast.child).to.not.be.undefined
    }
  })
})

describe('abstract syntax tree (simple string; fail)', () => {
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
  it('check equality', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimpleFailure.simpleString, ['simpleString'])
    ast.validateDescendants()
    const child = new AbstractSyntaxTree(declaration[0].getChildAtIndex(0) as PropertySignature, fixtureObjSimpleFailure.simpleString.text, ['simpleString','text'])
    expect(ast.pairedNode).to.equal(fixtureObjSimpleFailure.simpleString)
    expect(ast.objectPath).to.deep.equal(['simpleString'])
    if (ast.child) {
      expect(ast.child.pairedNode).to.deep.equal(child.pairedNode)
      expect(ast.child.objectPath).to.deep.equal(['simpleString','text'])
      expect(ast.child.valid).to.be.false
    } else {
      expect(ast.child).to.not.be.undefined
    }
  })
})

describe('abstract syntax tree (simple number; fail)', () => {
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
  it('check equality', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimpleFailure.simpleNumber, ['simpleNumber'])
    ast.validateDescendants()
    const child = new AbstractSyntaxTree(declaration[0].getChildAtIndex(0) as PropertySignature, fixtureObjSimpleFailure.simpleNumber.num, ['simpleNumber','num'])
    expect(ast.pairedNode).to.equal(fixtureObjSimpleFailure.simpleNumber)
    expect(ast.objectPath).to.deep.equal(['simpleNumber'])
    if (ast.child) {
      expect(ast.child.pairedNode).to.deep.equal(child.pairedNode)
      expect(ast.child.objectPath).to.deep.equal(['simpleNumber','num'])
      expect(ast.child.valid).to.be.false
    } else {
      expect(ast.child).to.not.be.undefined
    }
  })
})

describe('abstract syntax tree (simple boolean; fail)', () => {
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
  it('check equality', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimpleFailure.simpleBoolean, ['simpleBoolean'])
    ast.validateDescendants()
    const child = new AbstractSyntaxTree(declaration[0].getChildAtIndex(0) as PropertySignature, fixtureObjSimpleFailure.simpleBoolean.bool, ['simpleBoolean','bool'])
    expect(ast.pairedNode).to.equal(fixtureObjSimpleFailure.simpleBoolean)
    expect(ast.objectPath).to.deep.equal(['simpleBoolean'])
    if (ast.child) {
      expect(ast.child.pairedNode).to.deep.equal(child.pairedNode)
      expect(ast.child.objectPath).to.deep.equal(['simpleBoolean','bool'])
      expect(ast.child.valid).to.be.false
    } else {
      expect(ast.child).to.not.be.undefined
    }
  })
})

describe('abstract syntax tree (simple union; fail)', () => {
  let project: Project
  let sourceFile: SourceFile
  let declaration: ExportedDeclarations[] | undefined

  before((done) => {
    project = new Project({
      tsConfigFilePath: "./test/fixtures/simple-types/tsconfig.json"
    });
    sourceFile = project.getSourceFileOrThrow("./test/fixtures/simple-types/simple.ts");
    declaration = sourceFile.getExportedDeclarations().get('SimpleUnion')
    done()
  })
  it('check equality', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimpleFailure.simpleUnion, ['simpleUnion'])
    ast.validateDescendants()
    const child = new AbstractSyntaxTree(declaration[0].getChildAtIndex(0) as PropertySignature, fixtureObjSimpleFailure.simpleUnion.uni, ['simpleUnion','uni'])
    expect(ast.pairedNode).to.equal(fixtureObjSimpleFailure.simpleUnion)
    expect(ast.objectPath).to.deep.equal(['simpleUnion'])
    if (ast.child) {
      expect(ast.child.pairedNode).to.deep.equal(child.pairedNode)
      expect(ast.child.objectPath).to.deep.equal(['simpleUnion','uni'])
      expect(ast.child.valid).to.be.false
    } else {
      expect(ast.child).to.not.be.undefined
    }
  })
})

describe('abstract syntax tree (simple type union; fail)', () => {
  let project: Project
  let sourceFile: SourceFile
  let declaration: ExportedDeclarations[] | undefined

  before((done) => {
    project = new Project({
      tsConfigFilePath: "./test/fixtures/simple-types/tsconfig.json"
    });
    sourceFile = project.getSourceFileOrThrow("./test/fixtures/simple-types/simple.ts");
    declaration = sourceFile.getExportedDeclarations().get('SimpleTypeUnion')
    done()
  })
  it('check equality', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimpleFailure.simpleTypeUnion, ['simpleTypeUnion'])
    ast.validateDescendants()
    const child = new AbstractSyntaxTree(declaration[0].getChildAtIndex(0) as PropertySignature, fixtureObjSimpleFailure.simpleTypeUnion.uni, ['simpleTypeUnion','uni'])
    expect(ast.pairedNode).to.equal(fixtureObjSimpleFailure.simpleTypeUnion)
    expect(ast.objectPath).to.deep.equal(['simpleTypeUnion'])
    if (ast.child) {
      expect(ast.child.pairedNode).to.deep.equal(child.pairedNode)
      expect(ast.child.objectPath).to.deep.equal(['simpleTypeUnion','uni'])
      expect(ast.child.valid).to.be.false
    } else {
      expect(ast.child).to.not.be.undefined
    }
  })
})

describe('abstract syntax tree (simple literal union; fail)', () => {
  let project: Project
  let sourceFile: SourceFile
  let declaration: ExportedDeclarations[] | undefined

  before((done) => {
    project = new Project({
      tsConfigFilePath: "./test/fixtures/simple-types/tsconfig.json"
    });
    sourceFile = project.getSourceFileOrThrow("./test/fixtures/simple-types/simple.ts");
    declaration = sourceFile.getExportedDeclarations().get('SimpleLiteralUnion')
    done()
  })
  it('check equality', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimpleFailure.simpleLiteralUnion, ['simpleLiteralUnion'])
    ast.validateDescendants()
    const child = new AbstractSyntaxTree(declaration[0].getChildAtIndex(0) as PropertySignature, fixtureObjSimpleFailure.simpleLiteralUnion.uni, ['simpleLiteralUnion','uni'])
    expect(ast.pairedNode).to.equal(fixtureObjSimpleFailure.simpleLiteralUnion)
    expect(ast.objectPath).to.deep.equal(['simpleLiteralUnion'])
    if (ast.child) {
      expect(ast.child.pairedNode).to.deep.equal(child.pairedNode)
      expect(ast.child.objectPath).to.deep.equal(['simpleLiteralUnion','uni'])
      expect(ast.child.valid).to.be.false
    } else {
      expect(ast.child).to.not.be.undefined
    }
  })
})

describe('abstract syntax tree (simple literal type union; fail)', () => {
  let project: Project
  let sourceFile: SourceFile
  let declaration: ExportedDeclarations[] | undefined

  before((done) => {
    project = new Project({
      tsConfigFilePath: "./test/fixtures/simple-types/tsconfig.json"
    });
    sourceFile = project.getSourceFileOrThrow("./test/fixtures/simple-types/simple.ts");
    declaration = sourceFile.getExportedDeclarations().get('SimpleLiteralTypeUnion')
    done()
  })
  it('check equality', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimpleFailure.simpleLiteralTypeUnion, ['simpleLiteralTypeUnion'])
    ast.validateDescendants()
    const child = new AbstractSyntaxTree(declaration[0].getChildAtIndex(0) as PropertySignature, fixtureObjSimpleFailure.simpleLiteralTypeUnion.uni, ['simpleLiteralTypeUnion','uni'])
    expect(ast.pairedNode).to.equal(fixtureObjSimpleFailure.simpleLiteralTypeUnion)
    expect(ast.objectPath).to.deep.equal(['simpleLiteralTypeUnion'])
    if (ast.child) {
      expect(ast.child.pairedNode).to.deep.equal(child.pairedNode)
      expect(ast.child.objectPath).to.deep.equal(['simpleLiteralTypeUnion','uni'])
      expect(ast.child.valid).to.be.false
    } else {
      expect(ast.child).to.not.be.undefined
    }
  })
})

describe('abstract syntax tree (nullable `?` property)', () => {
  let project: Project
  let sourceFile: SourceFile
  let declaration: ExportedDeclarations[] | undefined

  before((done) => {
    project = new Project({
      tsConfigFilePath: "./test/fixtures/simple-types/tsconfig.json"
    });
    sourceFile = project.getSourceFileOrThrow("./test/fixtures/simple-types/simple.ts");
    declaration = sourceFile.getExportedDeclarations().get('UndefinedType')
    done()
  })
  it('check nullable property (null)', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimple.undefinedType, ['undefinedType'])
    ast.validateDescendants()
    expect(ast.pairedNode).to.equal(fixtureObjSimple.undefinedType)
    expect(ast.objectPath).to.deep.equal(['undefinedType'])
    declaration[0].getChildrenOfKind(SyntaxKind.PropertySignature).map((p) => {
      const prop = p.getFirstChild()
      if (prop) {
        const propName = prop.getText()
        const child = new AbstractSyntaxTree(p, (fixtureObjSimple.undefinedType as any)[propName], ['undefinedType', propName])
        child.validateDescendants()
        expect(child.pairedNode).to.equal((fixtureObjSimple.undefinedType as any)[propName])
        expect(child.objectPath).to.deep.equal(['undefinedType', propName])
        expect(child.valid).to.be.true
      }
    })
  })
  it('check nullable property (undefined)', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, {}, ['undefinedType'])
    ast.validateDescendants()
    expect(ast.objectPath).to.deep.equal(['undefinedType'])
    declaration[0].getChildrenOfKind(SyntaxKind.PropertySignature).map((p) => {
      const prop = p.getFirstChild()
      if (prop) {
        const propName = prop.getText()
        const child = new AbstractSyntaxTree(p, ({} as any)[propName], ['undefinedType', propName])
        child.validateDescendants()
        expect(child.pairedNode).to.equal(({} as any)[propName])
        expect(child.objectPath).to.deep.equal(['undefinedType', propName])
        expect(child.valid).to.be.true
      }
    })
  })
})

describe('abstract syntax tree (simple null)', () => {
  let project: Project
  let sourceFile: SourceFile
  let declaration: ExportedDeclarations[] | undefined

  before((done) => {
    project = new Project({
      tsConfigFilePath: "./test/fixtures/simple-types/tsconfig.json"
    });
    sourceFile = project.getSourceFileOrThrow("./test/fixtures/simple-types/simple.ts");
    declaration = sourceFile.getExportedDeclarations().get('SimpleNull')
    done()
  })
  it('check equality', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimple.simpleNull, ['simpleNull'])
    ast.validateDescendants()
    const child = new AbstractSyntaxTree(declaration[0].getChildAtIndex(0) as PropertySignature, fixtureObjSimple.simpleNull.nullProp, ['simpleNull','nullProp'])
    expect(ast.pairedNode).to.equal(fixtureObjSimple.simpleNull)
    expect(ast.objectPath).to.deep.equal(['simpleNull'])
    if (ast.child) {
      expect(ast.child.pairedNode).to.deep.equal(child.pairedNode)
      expect(ast.child.objectPath).to.deep.equal(['simpleNull','nullProp'])
      expect(ast.child.valid).to.be.true
    } else {
      expect(ast.child).to.not.be.undefined
    }
  })
})

describe('abstract syntax tree (nullable string)', () => {
  let project: Project
  let sourceFile: SourceFile
  let declaration: ExportedDeclarations[] | undefined

  before((done) => {
    project = new Project({
      tsConfigFilePath: "./test/fixtures/simple-types/tsconfig.json"
    });
    sourceFile = project.getSourceFileOrThrow("./test/fixtures/simple-types/simple.ts");
    declaration = sourceFile.getExportedDeclarations().get('NullableString')
    done()
  })
  it('check nullable property (null)', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimple.nullableString, ['nullableString'])
    ast.validateDescendants()
    expect(ast.pairedNode).to.equal(fixtureObjSimple.nullableString)
    expect(ast.objectPath).to.deep.equal(['nullableString'])
    declaration[0].getChildrenOfKind(SyntaxKind.PropertySignature).map((p) => {
      const prop = p.getFirstChild()
      if (prop) {
        const propName = prop.getText()
        const child = new AbstractSyntaxTree(p, (fixtureObjSimple.nullableString as any)[propName], ['nullableString', propName])
        child.validateDescendants()
        expect(child.pairedNode).to.equal((fixtureObjSimple.nullableString as any)[propName])
        expect(child.objectPath).to.deep.equal(['nullableString', propName])
        expect(child.valid).to.be.true
      }
    })
  })
})

describe('abstract syntax tree (class)', () => {
  let project: Project
  let sourceFile: SourceFile
  let declaration: ExportedDeclarations[] | undefined

  before((done) => {
    project = new Project({
      tsConfigFilePath: "./test/fixtures/simple-types/tsconfig.json"
    });
    sourceFile = project.getSourceFileOrThrow("./test/fixtures/simple-types/class.fixture.ts");
    declaration = sourceFile.getExportedDeclarations().get('SimpleClass')
    done()
  })
  it('should success validation', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimple.simpleClass, ['simpleClass'])
    ast.validateDescendants()
    expect(ast.pairedNode).to.equal(fixtureObjSimple.simpleClass)
    expect(ast.objectPath).to.deep.equal(['simpleClass'])
    declaration[0].getChildrenOfKind(SyntaxKind.PropertyDeclaration).map((p) => {
      const prop = p.getFirstChild()
      if (prop) {
        const propName = prop.getText()
        const child = new AbstractSyntaxTree(p, (fixtureObjSimple.simpleClass as any)[propName], ['simpleClass', propName])
        child.validateDescendants()
        expect(child.pairedNode).to.equal((fixtureObjSimple.simpleClass as any)[propName])
        expect(child.objectPath).to.deep.equal(['simpleClass', propName])
        expect(child.valid).to.be.true
      }
    })
  })
})
