/*
 * Object Path Parser
 * Keiya Chinen @ TwoGate inc.
 */

export class ObjectPath {
  private arrayRex = new RegExp(/(.+)\[(\d+)\]$/)

  constructor (public path: string) { }

  public traverse (data: any) {
    let path = this.path
    if (path === '.') {
      return data
    }
    if (path[0] === '.') {
      path = this.path.substr(1)
    }

    return this.toArray().reduce((previous, current) => previous[current], data)
  }

  public toArray() {
    const splited = this.path.split('.')
    const res = splited.reduce((acc: Array<string|number>, r) => {
      const arrRex = r.match(this.arrayRex)
      if (arrRex) {
        acc = acc.concat([arrRex[1], parseInt(arrRex[2],10)])
      } else {
        acc.push(r)
      }
      return acc
    }, [] as Array<string|number>)
    return res.slice(1)
  }
}
