/*
 * AST
 * Keiya Chinen @ TwoGate inc.
 */

import { ExportedDeclarations, InterfaceDeclaration, PropertySignature, printNode, Type } from "ts-morph"
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
      this.validateDescendants()
    }

    public validateDescendants() {
      console.log("validateDescendants:", this.objectPath, this.pairedNode)

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
          this.child = new AbstractSyntaxTree(
            m,
            new ObjectPath([this.propName]).traverse(this.pairedNode),
            this.objectPath.concat([this.propName]))
          this.child.validateDescendants()
        })
      } else if (node instanceof PropertySignature) {
        const type = node.getType()
        if (node.getFirstChildByKind(SyntaxKind.QuestionToken)) {
          if (this.pairedNode === null || this.pairedNode === undefined) {
            this._valid = true
            return true
          }
        }
        const checkResult = this.checkType(type, this.pairedNode)
        if (checkResult) {
          this._valid = true
          return true
        }

        // const typeReferenceNode = node.getChildrenOfKind(SyntaxKind.TypeReference)
        // if (typeReferenceNode) {
        //   typeReferenceNode.map((t) => {
        //     if (t.getType().isUnion()) {
        //       const possibleValues = t.getType().getUnionTypes().map((t) => eval(t.getText()))
        //       if (possibleValues.includes(this.pairedNode)) {
        //         this._valid = true
        //         console.log(this.objectPath, 'valid!!!!!!')
        //       }
        //     }
        //   })
        // }

      }
    }
  private checkType(type: Type, value: any) {
    const unionTypes = type.getUnionTypes()
    console.log('checkType: type=',type.getText(),' | value=',value)
    console.log(
      'number:',type.isNumber(),
      '| string:',type.isString(),
      '| boolean:',type.isBoolean(),
      '| numberLiteral:',type.isNumberLiteral(),
      '| stringLiteral:',type.isStringLiteral(),
      '| booleanLiteral:',type.isBooleanLiteral(),
    )
    if (type.isNumber() && typeof value === 'number') {
      return true
    }
    else if (type.isString() && typeof value === 'string') {
      return true
    }
    else if (type.isBoolean() && typeof value === 'boolean') {
      return true
    }
    else if (type.isNumberLiteral() && Number(type.getText()) === value) {
      return true
    }
    else if (type.isStringLiteral() && type.getText() === value) {
      return true
    }
    else if (type.isBooleanLiteral() && (type.getText() === 'true') === value) {
      return true
    }
    else if (unionTypes) {
      return unionTypes.some((t) => {
        const checkResult = this.checkType(t, value)
        console.log('checking union:',t.getText(), value, checkResult)
        if (checkResult) {
          return true
        }
        return false
      })
      // console.log(resultMap)
      // if (resultMap.some(r => r === true)) {
      //   this._valid = true
      //   console.log(this.objectPath, 'valid!!!!!!')
      //   return true
      // }
    }
    return false
  }
}
