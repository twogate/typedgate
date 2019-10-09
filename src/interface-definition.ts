/*
 * Interface Definition
 * Keiya Chinen @ TwoGate inc.
 */

 import { InterfaceDeclaration, ClassDeclaration, Project, ProjectOptions, SourceFile, SyntaxKind, UnionTypeNode, ExportedDeclarations } from "ts-morph";
import { AbstractSyntaxTree } from './abstract-syntax-tree'
import { ControlComment } from './control-comment'
import { ObjectPath, ObjectPathIdentifier } from './object-path'
import { TypedgateError } from './typedgate-error'

interface IInterfaceDefinitionArgument {
  project: ProjectOptions,
  sourceFilePath: string,
  targetData: any
}

export interface IValidationResult {
  valid: boolean,
  asts?: AbstractSyntaxTree[]
}

export class InterfaceDefinition {
  private sourceFile: SourceFile
  private targetData: any
  private asts?: AbstractSyntaxTree[]
  public verbose: boolean = false

  constructor(opts: IInterfaceDefinitionArgument) {
    const project = new Project({
      tsConfigFilePath: opts.project.tsConfigFilePath
    });
    this.sourceFile = project.getSourceFileOrThrow(opts.sourceFilePath);
    this.targetData = opts.targetData
  }

  public compareToTarget():IValidationResult {
    const result = this.buildComparisonTree()
    return {
      valid: result,
      asts: this.asts,
    }
  }

  public buildComparisonTree() {
    let asts: AbstractSyntaxTree[] = []
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
                    } else if (d.getType().isClass()) {
                      r2.push(new AbstractSyntaxTree(d as ClassDeclaration, resolvedObj, op.path))
                    }
                  }
              }
            }
            return r2
        } catch (e) {
          if (e instanceof TypedgateError) {
            e.sourceFileName = c.getSourceFile().getFilePath()
            e.sourceFilePos = c.getSourceFile().getLineAndColumnAtPos(c.getPos())
            c.getSourceFile()
            throw e
          } else {
            throw e
          }
        }
        }, [] as AbstractSyntaxTree[])
        //console.log(entryDeclarations)
        if (entryDeclarations) {
          r1 = r1.concat(entryDeclarations)
        }
        return r1
      }, [] as AbstractSyntaxTree[])
      if (ast) {
        asts = asts.concat(ast)
      }
    }
    const results = asts.map((ast) => ast.validateDescendants(this.verbose)).every((result) => result)
    this.asts = asts
    return results
  }
}
