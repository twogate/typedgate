/*
 * AST
 * Keiya Chinen @ TwoGate inc.
 */

import { ExportedDeclarations, InterfaceDeclaration } from "ts-morph";
import { ObjectPath } from './object-path'

export class AbstractSyntaxTree {
  private propName?: string
  private type?: string

    constructor(
      public tsDeclarationNode: InterfaceDeclaration,
      public pairedObject: any,
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
      console.log(this.pairedObject)
      console.log(this.objectPath)
      this.tsDeclarationNode.getProperties().map((m) => {
        const prop = m.getSymbol()  // IFのプロパティ
        this.propName = m.getName()
        this.type = m.getType().getText()
        console.log(this.propName, this.type)
        console.log(m.findReferencesAsNodes())
        //this.pairedObject =
        this.child = new AbstractSyntaxTree(
          null,
          new ObjectPath(this.objectPath.concat([this.propName])).traverse(this.pairedObject),
          this.objectPath, null)
      })
    }
}
