/*
 * Object Path Parser
 * Keiya Chinen @ TwoGate inc.
 */

export class ControlComment {
  private tgControlCommentRex = new RegExp(/@TG(:[\w-_]+)(?:\s+(.+))?$/)
  private rexResult: RegExpExecArray | null

  constructor (commentText: string) {
    this.rexResult = this.tgControlCommentRex.exec(commentText)
  }

  public isControlComment() {
    return this.rexResult ? true : false
  }

  public getCommand() {
    return this.rexResult ? this.rexResult[1].substr(1) : null
  }

  public getArg() {
    return this.rexResult && this.rexResult[2] ? this.rexResult[2] : null
  }
}
