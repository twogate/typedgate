/*
 * AST
 * Keiya Chinen @ TwoGate inc.
 */

import { ExportedDeclarations, InterfaceDeclaration, PropertySignature, Type, ArrayTypeNode } from "ts-morph"
import { SyntaxKind } from "typescript"
import { ObjectPath, ObjectPathIdentifier } from './object-path'
import { TypedgateError } from './typedgate-error'

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
  private children?: | AbstractSyntaxTree[]

    constructor(
      public node: InterfaceDeclaration | PropertySignature | LeafType,
      public pairedNode: any,
      public objectPath: ObjectPathIdentifier,
      public child?: AbstractSyntaxTree,
    ) {

    }

    public reconstruct() {
      this.validateDescendants()
    }

    public validateDescendants() {
      const node = this.node
      if (node instanceof InterfaceDeclaration) {
        this._valid = node.getProperties().every((m) => {
          const prop = m.getSymbol()  // IFのプロパティ
          this.propName = m.getName()

          this.type = m.getType().getText()
          if (this.isIterableArray()) {
            this.children = this.pairedNode.map((el: any, idx: number) => {
              const newPath = this.objectPath.slice(0, -1).concat(idx)
              const child = new AbstractSyntaxTree(
                this.node,
                el,
                newPath)
              return child
            })
            if (this.children)
              return this.children.every((c) => c.validateDescendants())
          } else {
            this.child = new AbstractSyntaxTree(
              m,
              new ObjectPath([this.propName]).traverse(this.pairedNode),
              this.objectPath.concat([this.propName]))
            return this.child.validateDescendants()
          }
        })
        return this._valid
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

    private isIterableArray() {
      const currentObjectPath = this.objectPath[this.objectPath.length - 1]
      return this.objectPath &&
             currentObjectPath instanceof Array &&
             currentObjectPath.length === 0
    }

  private checkType(type: Type, value: any) {
    const unionTypes = type.getUnionTypes()
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
    else if (type.isStringLiteral() && eval(`String(${type.getText()})`) === value) {
      return true
    }
    else if (type.isBooleanLiteral() && (type.getText() === 'true') === value) {
      return true
    }
    else if (type.isArray()) {
      const arrayNode = (this.node as PropertySignature).getChildrenOfKind(SyntaxKind.ArrayType)
      const elType = type.getArrayElementType()
      if (elType) {
        this._valid = value.every((v: any) => {
          return this.checkType(elType, v)
        })
       return this._valid
      }
    }
    else if (unionTypes && unionTypes.length > 0) {
      return unionTypes.some((t) => {
        const checkResult = this.checkType(t, value)
        if (checkResult) {
          return true
        }
        return false
      })
    }
    else if (type.isInterface()) {
      const _node = (this.node as InterfaceDeclaration)
      const c = _node.getLastChildByKind(SyntaxKind.Identifier)
      if (c && c) {
//        console.log("IDEN:",c.getText())
      //console.log(c.getDefinitionNodes())
      const definitionNodes = _node.findReferences()
      definitionNodes.map((n) => {
  //      console.log("REF:", n.getReferences())
      })
      // this.child = new AbstractSyntaxTree(
      //   c,
      //   new ObjectPath([this.propName]).traverse(this.pairedNode),
      //   this.objectPath.concat([this.propName]))
      // this.child.validateDescendants()
      }
      this._valid=true
      return true
    }
    else if (value instanceof Array) {
      console.log("ARRRRRRRRRRRRRRRRR")
    }
    else {
      console.log('Skipping not supported type')
      console.log((this.node as InterfaceDeclaration).getText())
      console.log(this.objectPath,this.pairedNode)
    }
    return false
  }
}
