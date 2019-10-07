/*
 * Object Path Parser
 * Keiya Chinen @ TwoGate inc.
 */
import { TypedgateError } from './typedgate-error'

export type ObjectPathIdentifier = Array<string|number|undefined[]>

export class ObjectPath {
  public static toArray(pathStr: string) {
    const arrayRex = new RegExp(/(.+)\[(\d+)\]$/)
    const emptyArrayRex = new RegExp(/(.*)\[\]$/)
    const splited = pathStr.split('.')
    const res = splited.reduce((acc: ObjectPathIdentifier, r) => {
      const arrRex = r.match(arrayRex)
      const emptyArrRex = r.match(emptyArrayRex)
      if (arrRex) {
        acc = acc.concat([arrRex[1], parseInt(arrRex[2],10)])
      } else if (emptyArrRex) {
        if (emptyArrRex[1]) {
          acc = acc.concat([emptyArrRex[1], []])
        } else {
          acc.push([])
        }
      } else {
        acc.push(r)
      }
      return acc
    }, [] as ObjectPathIdentifier)
    return res
  }

  public path: ObjectPathIdentifier

  constructor (public pathArg: string|ObjectPathIdentifier) {
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

  public traverse(data: any) {
    let lastElmIsEmptyArray = false
    return this.path.reduce((previous, current) => {
      if (typeof current === 'number' || typeof current === 'string') {
        if (lastElmIsEmptyArray) {
          lastElmIsEmptyArray = false
          return previous.map((p: any) => p[current])
        }
        return previous[current]
      } else if (current instanceof Array && current.length === 0) {
        lastElmIsEmptyArray = true
        return previous
      }
    }, data)
  }
}
