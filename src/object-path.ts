/*
 * Object Path Parser
 * Keiya Chinen @ TwoGate inc.
 */

export class ObjectPath {
  public data: any = null
  private arrayRex = new RegExp(/(.+)\[(\d+)\]$/)

  constructor (data: any) {
    this.data = data
  }

  public traverse (path: string) {
    if (path === '.') {
      return this.data
    }
    if (path[0] === '.') {
      path = path.substr(1)
    }

    return path.split('.').reduce((previous, current) => {
      const arrRex = current.match(this.arrayRex)
      if (arrRex) {
        return previous[arrRex[1]][arrRex[2]]
      } else {
        return previous[current]
      }
    }, this.data);
  }
}
