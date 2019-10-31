import { loadJson } from './file-utils'
import { InterfaceDefinition } from './interface-definition'
import { IResult, ResultReport  } from './result-report'

console.log(require)
console.log(require.main)

export class TypedGate {
  private _validationResult?: IResult[]
  get validationResult(): IResult[] | undefined {
    return this._validationResult;
  }

  constructor(private tsConfigFilePath: string, private sourceFilePath: string) { }

  public validateJsonFile(fileName: string) {
    return loadJson(fileName).then(data => this.validateObject(data))
  }

  public validateObject(targetData: any): boolean {
    if (typeof targetData !== 'object' && targetData === null) {
      throw new Error('Root of provided JSON structure is not an object.')
    }
    const interfaceDefinition = new InterfaceDefinition({
      project: {
        tsConfigFilePath: this.tsConfigFilePath
      },
      sourceFilePath: this.sourceFilePath,
      targetData
    })
    const result = interfaceDefinition.compareToTarget()
    if (result.valid) {
      return true
    } else {
      if (result.asts) {
        this._validationResult = new ResultReport(result.asts).generateReport()
      }
      return false
    }
  }
}
