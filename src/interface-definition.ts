import { Project, ProjectOptions, SourceFile } from "ts-morph";
import { ControlComment } from './control-comment'
import { ObjectPath } from './object-path'

interface InterfaceDefinitionArgument {
  project: ProjectOptions,
  sourceFilePath: string
}

export class InterfaceDefinitionError extends Error {
  public name = 'InterfaceDefinitionError';

  constructor(
    public message: string,
    public interfaceSourcePath: string,
    public interfacePos: number
  ) {
    super(message)
  }

  toString() {
    return `${this.name}: ${this.message} at ${this.interfaceSourcePath}, position ${this.interfacePos}`
  }
}

export class InterfaceDefinition {
  sourceFile: SourceFile

  constructor(opts: InterfaceDefinitionArgument) {
    const project = new Project({
      tsConfigFilePath: opts.project.tsConfigFilePath
    });
    this.sourceFile = project.getSourceFileOrThrow(opts.sourceFilePath);
  }

  scanFiles(validateTargetObj: any) {
    for (const [name, declarations] of this.sourceFile.getExportedDeclarations()) {
      declarations.map((d) => {
        d.getLeadingCommentRanges().map((c) => {
          const comment = new ControlComment(c.getText())
          if (comment.isControlComment) {
            switch (comment.getCommand()) {
              case 'path':
                const op = new ObjectPath(validateTargetObj)
                const objKeypath = comment.getArg()
                if (!objKeypath) {
                  throw new InterfaceDefinitionError('Keypath not defined', c.getSourceFile().compilerNode.fileName, c.getPos())
                }
                const resolvedObj = op.traverse(objKeypath)
                if (!resolvedObj) {
                  throw new InterfaceDefinitionError('Wrong Keypath', c.getSourceFile().compilerNode.fileName, c.getPos())
                }
                return resolvedObj
                break
            }
          }
        })
      })
    }
  }
}
