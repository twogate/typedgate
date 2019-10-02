/*
 * AST
 * Keiya Chinen @ TwoGate inc.
 */

import { ExportedDeclarations, InterfaceDeclaration, PropertySignature, printNode } from "ts-morph"
import { SyntaxKind } from "typescript"
import { ObjectPath } from './object-path'
import * as ts from "typescript";


//{ type: string; value: any; }
export type LeafType = 'boolean' | 'number' | 'string' | 'null';

interface ILeafNode {
  type: string,
  value: any,
}

export class AbstractSyntaxTree {
  private _valid: boolean = false
  public get valid(): boolean {
    return this._valid
  }
  private propName?: string
  private type?: string

    constructor(
      public node: InterfaceDeclaration | PropertySignature | LeafType,
      public pairedNode: any,
      public objectPath: Array<string|number>,
      public child?: AbstractSyntaxTree
    ) { }

    public reconstruct() {
      // this.node.getMembers().map((m) => {
      //   const prop = m.getSymbol()  // IFのプロパティ

      //   console.log(m.getType().getText())
      //   //console.log(m.getSymbol())
      //   //console.log(m)
      // })
      console.log(this.objectPath, this.pairedNode)
      this.validateDescendants()
    }

    public validateDescendants() {
      const node = this.node
      if (node instanceof InterfaceDeclaration) {
        node.getProperties().map((m) => {
          const prop = m.getSymbol()  // IFのプロパティ
          this.propName = m.getName()
          this.type = m.getType().getText()
          //console.log(this.propName, this.type)
          //console.log(m.findReferencesAsNodes())
          //this.pairedNode =
          //console.log(this.objectPath.concat([this.propName]))
          console.log('recursively')
          this.child = new AbstractSyntaxTree(
            m,
            new ObjectPath([this.propName]).traverse(this.pairedNode),
            this.objectPath.concat([this.propName]))
          this.child.validateDescendants()
        })
      } else if (node instanceof PropertySignature) {
        if (node.getFirstChildByKind(SyntaxKind.QuestionToken)) {
          if (this.pairedNode === null || this.pairedNode === undefined) {
            this._valid = true
            console.log(this.objectPath, 'valid!!!!!!')
            return true
          }
        }
        const typeName = node.getType().getText()
        console.log(node.getType().compilerType)
        switch (typeName) {
          case 'number':
            if (typeof this.pairedNode === 'number') {
              console.log(this.objectPath, 'valid!!!!!!')
              this._valid = true
              return true
            }
            break
          case 'string':
            if (typeof this.pairedNode === 'string') {
              console.log(this.objectPath, 'valid!!!!!!')
              this._valid = true
              return true
            }
            break
          case 'boolean':
            if (typeof this.pairedNode === 'boolean') {
              console.log(this.objectPath, 'valid!!!!!!')
              this._valid = true
              return true
            }
            break
          default:

            const typeReferenceNode = node.getChildrenOfKind(SyntaxKind.TypeReference)
            if (typeReferenceNode) {
              typeReferenceNode.map((t) => {
                if (t.getType().isUnion()) {
                  const possibleValues = t.getType().getUnionTypes().map((t) => eval(t.getText()))
                  if (possibleValues.includes(this.pairedNode)) {
                    this._valid = true
                    console.log(this.objectPath, 'valid!!!!!!')
                  }
                }
              })
            }
        }
      }
    }

}
