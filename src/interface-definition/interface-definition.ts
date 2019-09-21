import { InterfaceDeclaration, Project, ProjectOptions, SourceFile } from "ts-morph";
import { AbstractSyntaxTree } from '../abstract-syntax-tree'
import { ControlComment } from '../control-comment'
import { ObjectPath } from '../object-path'
import { InterfaceDefinitionError } from './interface-definition-error'

interface IInterfaceDefinitionArgument {
  project: ProjectOptions,
  sourceFilePath: string,
  targetData: any
}

export class InterfaceDefinition {
  private sourceFile: SourceFile
  private targetData: any

  constructor(opts: IInterfaceDefinitionArgument) {
    const project = new Project({
      tsConfigFilePath: opts.project.tsConfigFilePath
    });
    this.sourceFile = project.getSourceFileOrThrow(opts.sourceFilePath);
    this.targetData = opts.targetData
  }

  public compareToTarget() {
    this.buildComparisonTree()
  }

  public buildComparisonTree() {
    const asts = []
    for (const [name, declarations] of this.sourceFile.getExportedDeclarations()) {
      const ast = declarations.reduce((r1, d) => {
        const entryDeclarations = d.getLeadingCommentRanges().reduce((r2, c) => {
          const comment = new ControlComment(c.getText())
          if (comment.isControlComment) {
            switch (comment.getCommand()) {
              case 'path':
              const objKeypath = comment.getArg()
              if (!objKeypath) {
                  throw new InterfaceDefinitionError('Keypath not defined', c.getSourceFile().compilerNode.fileName, c.getPos())
                }
                const op = new ObjectPath(objKeypath)
                const resolvedObj = op.traverse(this.targetData)
                if (!resolvedObj) {
                  throw new InterfaceDefinitionError('Wrong Keypath', c.getSourceFile().compilerNode.fileName, c.getPos())
                } else {
                  if (d.getType().isInterface()) {
                    r2.push(new AbstractSyntaxTree(d as InterfaceDeclaration, resolvedObj, op.toArray()))
                  }
                }
            }
          }
          return r2
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
    asts.map((ast) => ast.rebuild())
  }
}
