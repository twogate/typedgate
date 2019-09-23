/*
 * Object Path Parser
 * Keiya Chinen @ TwoGate inc.
 */
import { TypedgateError } from './typedgate-error'

export class ObjectPath {
  public static toArray(pathStr: string) {
    const arrayRex = new RegExp(/(.+)\[(\d+)\]$/)
    const splited = pathStr.split('.')
    const res = splited.reduce((acc: Array<string|number>, r) => {
      const arrRex = r.match(arrayRex)
      if (arrRex) {
        acc = acc.concat([arrRex[1], parseInt(arrRex[2],10)])
      } else {
        acc.push(r)
      }
      return acc
    }, [] as Array<string|number>)
    return res
  }

  public path: Array<string|number>

  constructor (public pathArg: string|Array<string|number>) {
    if (Array.isArray(pathArg)) {
      this.path = pathArg
    } else if (typeof pathArg === 'string') {
      if (pathArg === '.') {
        this.path = []
      } else {
        if (pathArg[0] === '.') {
          this.path = ObjectPath.toArray(pathArg.substr(1))
        } else {
          throw new TypedgateError('Path should be start with `.`')
        }
      }
    } else if (isNaN(pathArg)) {
      this.path = [pathArg]
    } else {
      throw new TypedgateError('Wrong Argument')
    }
  }

  public traverse (data: any) {
    return this.path.reduce((previous, current) => previous[current], data)
  }
}
