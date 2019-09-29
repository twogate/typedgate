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
  private propName?: string
  private type?: string
  private valid?: boolean

    constructor(
      public node: InterfaceDeclaration | PropertySignature | LeafType,
      public pairedNode: any,
      public objectPath: Array<string|number>,
      public child?: AbstractSyntaxTree
    ) { }

    public rebuild() {
      // this.node.getMembers().map((m) => {
      //   const prop = m.getSymbol()  // IFのプロパティ

      //   console.log(m.getType().getText())
      //   //console.log(m.getSymbol())
      //   //console.log(m)
      // })
      //console.log(this.pairedNode)
      console.log(this.objectPath)
      this.getDescendant(this.node)
    }

    private getDescendant(node: InterfaceDeclaration | PropertySignature | LeafType) {
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
          this.child.rebuild()
        })
      } else if (node instanceof PropertySignature) {
        const typeName = node.getType().getText()
        // if node is leaf
        if (this.isLeaf(typeName)) {
          this.child = new AbstractSyntaxTree(
            typeName as LeafType, // key
            this.pairedNode, // value
            this.objectPath.concat([typeName])
          )
        } else {


//           node.findReferences().map((r) => {
//             //console.log(r)
//           })
// engineDirection: EngineDirection;
// Identifier
// Node
// TypeReferenceNode
// Identifier
// Node
//node.getDescendantsOfKind(SyntaxKind.Identifier).map((i) => console.log(i.getImplementations()))
           const typeReferenceNode = node.getChildrenOfKind(SyntaxKind.TypeReference)
           if (typeReferenceNode) {
             typeReferenceNode.map((t) => {
               if (t.getType().isUnion()) {
                 const possibleValues = t.getType().getUnionTypes().map((t) => eval(t.getText()))
                 if (possibleValues.includes(this.pairedNode)) {
                   console.log('valid!!!!!!')
                 }
               }
             })
           }
        }
      }
    }

    private isLeaf(typeName: string) {
      switch (typeName) {
        case 'boolean':
        case 'number':
        case 'string':
          return true
        default:
          return false
      }
    }

}
