/*
 * AST
 * Keiya Chinen @ TwoGate inc.
 */

import { InterfaceDeclaration, PropertySignature, Type, TypeNode } from "ts-morph"
import { SyntaxKind, TypeReference, NodeFlags } from "typescript"
import { ObjectPath, ObjectPathIdentifier } from './object-path'
import { TypedgateError } from './typedgate-error'

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
  public children?: AbstractSyntaxTree[]

    constructor(
      public node: InterfaceDeclaration | PropertySignature | TypeNode,
      public pairedNode: any,
      public objectPath: ObjectPathIdentifier,
      public child?: AbstractSyntaxTree,
    ) { }

    public reconstruct() {
      this.validateDescendants()
    }

    public validateDescendants(): boolean {
      const node = this.node
      if (node instanceof InterfaceDeclaration) {
        this._valid = node.getProperties().every((m) => {
          const prop = m.getSymbol()  // IFのプロパティ
          const propName = m.getName()

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
              new ObjectPath([propName]).traverse(this.pairedNode),
              this.objectPath.concat([propName]))
            return this.child.validateDescendants()
          }
        })
        return this._valid
      } else if (node instanceof PropertySignature) {
        const type = node.getType()
        if (node.hasQuestionToken()) {
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
        // if (type.isObject()) {
        //   const typeNode = node.getTypeNodeOrThrow()
        //   console.log(typeNode.getKindName())
        //   console.log(typeNode.getType().getProperties())
        //   const propName = node.getName()
        //   this.child = new AbstractSyntaxTree(
        //     typeNode,
        //     new ObjectPath([propName]).traverse(this.pairedNode),
        //     this.objectPath.concat(propName))
        //   return this.child.validateDescendants()
        // }
        // if (type.isAnonymous() && type.isObject()) {
        //   return type.getProperties().every((prop) => {
        //     const decl = prop.getDeclarations()[0]
        //     if (decl) {
        //       console.log(decl.getType().getText(), prop.getName(), this.pairedNode[prop.getName()])
        //       this.child = new AbstractSyntaxTree(
        //       decl,
        //       new ObjectPath([propName]).traverse(this.pairedNode),
        //       this.objectPath.concat(propName))
        //       return this.checkType(decl.getType(), this.pairedNode[prop.getName()])

        //     }
        //     return false
        //   })
        //}
      }
      return this._valid
    }

    private isIterableArray() {
      const currentObjectPath = this.objectPath[this.objectPath.length - 1]
      return this.objectPath &&
             currentObjectPath instanceof Array &&
             currentObjectPath.length === 0
    }

  private checkType(type: Type, value: any):boolean {
    // console.log(
    //   "=====",type.getText(),"=====",
    //   "\nisAnonymous", type.isAnonymous(),
    //   "\nisAny",type.isAny(),
    //   "\nisArray",type.isArray(),
    //   "\nisBoolean",type.isBoolean(),
    //   "\nisBooleanLiteral",type.isBooleanLiteral(),
    //   "\nisClass",type.isClass(),
    //   "\nisClassOrInterface",type.isClassOrInterface(),
    //   "\nisEnum",type.isEnum(),
    //   "\nisEnumLiteral",type.isEnumLiteral(),
    //   "\nisInterface",type.isInterface(),
    //   "\nisIntersection",type.isIntersection(),
    //   "\nisLiteral",type.isLiteral(),
    //   "\nisNull",type.isNull(),
    //   "\nisNullable",type.isNullable(),
    //   "\nisNumber",type.isNumber(),
    //   "\nisNumberLiteral",type.isNumberLiteral(),
    //   "\nisObject",type.isObject(),
    //   "\nisString",type.isString(),
    //   "\nisStringLiteral",type.isStringLiteral(),
    //   "\nisTuple",type.isTuple(),
    //   "\nisTypeParameter",type.isTypeParameter(),
    //   "\nisUndefined",type.isUndefined(),
    //   "\nisUnion",type.isUnion(),
    //   "\nisUnionOrIntersection",type.isUnionOrIntersection(),
    //   "\nisUnknown",type.isUnknown(),
    // )
    const unionTypes = type.getUnionTypes()
    if (type.isAny()) {
      return true
    }
    else if (value === null) { // currently, allow null types
      return true
    }
    else if (type.isNull() && value === null) {
      return true
    }
    else if (type.isNumber() && typeof value === 'number') {
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
      const elType = type.getArrayElementTypeOrThrow()
      return value.every((v: any) => {
        return this.checkType(elType, v)
      })
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
    // else if (type.isInterface()) {
    //   return true
    // }
    else if (type.isObject()) {
      return type.getProperties().every((prop) => {
        const decl = prop.getDeclarations()[0]
        return this.checkType(decl.getType(), value[prop.getName()])
      })
    }
    else {
      //console.log('Skipping not supported type')
      //console.log((this.node as InterfaceDeclaration).getText())
      //console.log(this.objectPath,this.pairedNode)
    }
    return false
  }
}
