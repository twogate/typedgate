import { expect } from 'chai'
import { AbstractSyntaxTree } from '../../src/abstract-syntax-tree'
import { InterfaceDeclaration, Project, ProjectOptions, SourceFile, SyntaxKind, UnionTypeNode, ExportedDeclarations } from "ts-morph";
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

const fixtureObj = {
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

describe('abstract syntax tree', () => {
  let project: Project
  let sourceFile: SourceFile

  before((done) => {
    project = new Project({
      tsConfigFilePath: "./test/fixtures/car-types/tsconfig.json"
    });
    sourceFile = project.getSourceFileOrThrow("./test/fixtures/car-types/engine.ts");
    done()
  })
  it('badtype1', () => {
    console.log(sourceFile.getExportedDeclarations())

//    new AbstractSyntaxTree(interfaceDefinition, fixtureObj, [])
  })
})






