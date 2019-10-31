import { AbstractSyntaxTree } from './abstract-syntax-tree'
import { ObjectPath, ObjectPathIdentifier } from './object-path'

export interface IResult {
  objectPathIdentifier: ObjectPathIdentifier,
  objectValue: any | null,
  sourceFileName: string,
  sourceFilePos: {
    line: number;
    column: number;
  },
  valid: boolean,
  text: string,
}

export class ResultReport {
  private results: IResult[] = []

  constructor(
    public asts: AbstractSyntaxTree[]
  ) { }

  public generateReport() {
    this.asts.map((ast) => this.traverseAST(ast))
    const results = this.results.filter((ast) => ast.valid === false)
    return results
  }

  private traverseAST(ast: AbstractSyntaxTree): void {
    if (ast.children) {
      ast.children.forEach((child) => {
        this.traverseAST(child)
      })
    }
    if (ast.child) {
      this.traverseAST(ast.child)
    }
    const result: IResult = {
      objectPathIdentifier: ast.objectPath,
      objectValue: ast.pairedNode,
      sourceFileName: ast.node.getSourceFile().getFilePath(),
      text: ast.node.getText(),
      sourceFilePos: ast.node.getSourceFile().getLineAndColumnAtPos(ast.node.getPos()),
      valid: ast.valid,
    }
    this.results.push(result)
  }
}
