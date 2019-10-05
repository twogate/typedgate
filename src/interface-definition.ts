/*
 * Interface Definition
 * Keiya Chinen @ TwoGate inc.
 */

 import { InterfaceDeclaration, Project, ProjectOptions, SourceFile, SyntaxKind, UnionTypeNode, ExportedDeclarations } from "ts-morph";
import { AbstractSyntaxTree } from './abstract-syntax-tree'
import { ControlComment } from './control-comment'
import { ObjectPath } from './object-path'
import { TypedgateError } from './typedgate-error'

interface IInterfaceDefinitionArgument {
  project: ProjectOptions,
  sourceFilePath: string,
  targetData: any
}

interface ITypesDictionary {
  typeName: string,
  possibleValue: Array<string|number|null>,
}

export class InterfaceDefinition {
  private sourceFile: SourceFile
  private targetData: any
  private typesDict?: { [key:string]: ITypesDictionary }

  constructor(opts: IInterfaceDefinitionArgument) {
    const project = new Project({
      tsConfigFilePath: opts.project.tsConfigFilePath
    });
    this.sourceFile = project.getSourceFileOrThrow(opts.sourceFilePath);
    this.targetData = opts.targetData
  }

  public compareToTarget() {
//    this.buildTypesDictionary()
    this.buildComparisonTree()
  }

  public generatePossibleValuesForUnion(node: ExportedDeclarations) {
          //console.log(d.get)
          node.getChildrenOfKind(SyntaxKind.UnionType).map((u) => {
            //console.log(u)
            console.log(u.getChildren)
          })
          // d.getChildren().map((c) => {
          //   console.log(c.getKindName())
          // })
          // this.typesDict[typeName] = {
          //   typeName: typeName,
          //   possibleValue: [],
          // }
  }

  public buildTypesDictionary() {
    for (const [name, declarations] of this.sourceFile.getExportedDeclarations()) {
      const ast = declarations.forEach((d) => {
        const typeName = d.getType().getText()
        if (d.getType().isUnion()) {
          //console.log(d.getSymbol())
          const symbol = d.getSymbol()
          if (symbol) {
            console.log(symbol.getDeclarations())
          }
          this.generatePossibleValuesForUnion(d)
        }
      })
    }
  }

  public buildComparisonTree() {
    const asts = []
    for (const [name, declarations] of this.sourceFile.getExportedDeclarations()) {
      const ast = declarations.reduce((r1, d) => {
        const entryDeclarations = d.getLeadingCommentRanges().reduce((r2, c) => {
          try {
            const comment = new ControlComment(c.getText())
            if (comment.isControlComment) {
              switch (comment.getCommand()) {
                case 'path':
                const objKeypath = comment.getArg()
                if (!objKeypath) {
                    throw new TypedgateError('Keypath not defined')
                  }
                  const op = new ObjectPath(objKeypath)
                  const resolvedObj = op.traverse(this.targetData)
                  if (!resolvedObj) {
                    throw new TypedgateError('Wrong Keypath')
                  } else {
                    if (d.getType().isInterface()) {
                      r2.push(new AbstractSyntaxTree(d as InterfaceDeclaration, resolvedObj, op.path))
                    }
                  }
              }
            }
            return r2
        } catch (e) {
          if (e instanceof TypedgateError) {
            e.interfaceSourcePath = c.getSourceFile().compilerNode.fileName
            e.interfacePos = c.getPos()
            throw e
          } else {
            throw e
          }
        }
        }, [] as AbstractSyntaxTree[])[0]
        if (entryDeclarations) {
          r1.push(entryDeclarations)
        }
        return r1
      }, [] as AbstractSyntaxTree[])[0]
      if (ast) {
        asts.push(ast)
      }
    }
    console.log(asts)
    asts.map((ast) => ast.validateDescendants())
    console.log(asts)
  }
}
