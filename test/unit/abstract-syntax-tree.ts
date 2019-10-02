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
  },
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
  it('declaration is not undefined', () => {
    expect(declaration).to.not.be.undefined
  })
  it('check equality', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimple.simpleUnion, ['simpleUnion'])
    ast.validateDescendants()
    const child = new AbstractSyntaxTree(declaration[0].getChildAtIndex(0) as PropertySignature, fixtureObjSimple.simpleUnion.uni, ['simpleUnion.uni'])
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
  it('declaration is not undefined', () => {
    expect(declaration).to.not.be.undefined
  })
  it('check equality', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimple.simpleTypeUnion, ['simpleTypeUnion'])
    ast.validateDescendants()
    const child = new AbstractSyntaxTree(declaration[0].getChildAtIndex(0) as PropertySignature, fixtureObjSimple.simpleTypeUnion.uni, ['simpleTypeUnion.uni'])
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
  it('declaration is not undefined', () => {
    expect(declaration).to.not.be.undefined
  })
  it('check equality', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimple.simpleLiteralUnion, ['simpleLiteralUnion'])
    ast.validateDescendants()
    const child = new AbstractSyntaxTree(declaration[0].getChildAtIndex(0) as PropertySignature, fixtureObjSimple.simpleLiteralUnion.uni, ['simpleLiteralUnion.uni'])
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
  it('declaration is not undefined', () => {
    expect(declaration).to.not.be.undefined
  })
  it('check equality', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimple.simpleLiteralTypeUnion, ['simpleLiteralTypeUnion'])
    ast.validateDescendants()
    const child = new AbstractSyntaxTree(declaration[0].getChildAtIndex(0) as PropertySignature, fixtureObjSimple.simpleLiteralTypeUnion.uni, ['simpleLiteralTypeUnion.uni'])
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
  it('declaration is not undefined', () => {
    expect(declaration).to.not.be.undefined
  })
  it('check equality', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimpleFailure.simpleString, ['simpleString'])
    ast.validateDescendants()
    const child = new AbstractSyntaxTree(declaration[0].getChildAtIndex(0) as PropertySignature, fixtureObjSimpleFailure.simpleString.text, ['simpleString.text'])
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
  it('declaration is not undefined', () => {
    expect(declaration).to.not.be.undefined
  })
  it('check equality', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimpleFailure.simpleNumber, ['simpleNumber'])
    ast.validateDescendants()
    const child = new AbstractSyntaxTree(declaration[0].getChildAtIndex(0) as PropertySignature, fixtureObjSimpleFailure.simpleNumber.num, ['simpleNumber.num'])
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
  it('declaration is not undefined', () => {
    expect(declaration).to.not.be.undefined
  })
  it('check equality', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimpleFailure.simpleBoolean, ['simpleBoolean'])
    ast.validateDescendants()
    const child = new AbstractSyntaxTree(declaration[0].getChildAtIndex(0) as PropertySignature, fixtureObjSimpleFailure.simpleBoolean.bool, ['simpleBoolean.bool'])
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
  it('declaration is not undefined', () => {
    expect(declaration).to.not.be.undefined
  })
  it('check equality', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimpleFailure.simpleUnion, ['simpleUnion'])
    ast.validateDescendants()
    const child = new AbstractSyntaxTree(declaration[0].getChildAtIndex(0) as PropertySignature, fixtureObjSimpleFailure.simpleUnion.uni, ['simpleUnion.uni'])
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
  it('declaration is not undefined', () => {
    expect(declaration).to.not.be.undefined
  })
  it('check equality', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimpleFailure.simpleTypeUnion, ['simpleTypeUnion'])
    ast.validateDescendants()
    const child = new AbstractSyntaxTree(declaration[0].getChildAtIndex(0) as PropertySignature, fixtureObjSimpleFailure.simpleTypeUnion.uni, ['simpleTypeUnion.uni'])
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
  it('declaration is not undefined', () => {
    expect(declaration).to.not.be.undefined
  })
  it('check equality', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimpleFailure.simpleLiteralUnion, ['simpleLiteralUnion'])
    ast.validateDescendants()
    const child = new AbstractSyntaxTree(declaration[0].getChildAtIndex(0) as PropertySignature, fixtureObjSimpleFailure.simpleLiteralUnion.uni, ['simpleLiteralUnion.uni'])
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
  it('declaration is not undefined', () => {
    expect(declaration).to.not.be.undefined
  })
  it('check equality', () => {
    if (!declaration) return
    const ast = new AbstractSyntaxTree(declaration[0] as InterfaceDeclaration, fixtureObjSimple.simpleLiteralUnion, ['simpleLiteralUnion'])
    ast.validateDescendants()
    const child = new AbstractSyntaxTree(declaration[0].getChildAtIndex(0) as PropertySignature, fixtureObjSimple.simpleLiteralUnion.uni, ['simpleLiteralUnion.uni'])
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
