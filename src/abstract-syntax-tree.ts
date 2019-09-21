/*
 * AST
 * Keiya Chinen @ TwoGate inc.
 */

import { ExportedDeclarations, InterfaceDeclaration } from "ts-morph";

export class AbstractSyntaxTree {
    constructor(
      public tsDeclarationNode: InterfaceDeclaration,
      public companionObject: any,
      public objectPath: Array<string|number>,
      public child?: AbstractSyntaxTree
    ) { }

    public rebuild() {
      // this.tsDeclarationNode.getMembers().map((m) => {
      //   const prop = m.getSymbol()  // IFのプロパティ

      //   console.log(m.getType().getText())
      //   //console.log(m.getSymbol())
      //   //console.log(m)
      // })
      this.tsDeclarationNode.getProperties().map((m) => {
        const prop = m.getSymbol()  // IFのプロパティ
        console.log(m.getName())

        console.log(m.getType().getText())
        //console.log(m.getSymbol())
        //console.log(m)
      })
    }
}
