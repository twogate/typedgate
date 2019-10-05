import { expect } from 'chai'
import { AbstractSyntaxTree } from '../../src/abstract-syntax-tree'
import { InterfaceDeclaration, Project, ProjectOptions, SourceFile, SyntaxKind, UnionTypeNode, ExportedDeclarations, PropertySignature } from "ts-morph";
export type CylinderLayout = 'inline' | 'flat' | 'v';
export type FuelSystemKind = 'injection' | 'carburetor';
export type EngineDirection = 'longitudinal' | 'transverse';

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
  it('check nullable property (null)', () => {
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
