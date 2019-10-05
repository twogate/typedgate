import { expect } from 'chai'
import { AbstractSyntaxTree } from '../../../src/abstract-syntax-tree'
import { InterfaceDeclaration, Project, ProjectOptions, SourceFile, SyntaxKind, UnionTypeNode, ExportedDeclarations, PropertySignature } from "ts-morph";


const fixture = {
  "tabs":{
    "tabs":[
      {
        "name":"video",
        "icon":null,
        "text":"aaa"
      },
      {
        "name":"timeline",
        "icon":{
          "assetManagerReferenceImageId":"50ae5cb5-1d7f-41bf-92ab-79af45df8f2f",
          "defaultContent":{
            "contentType":"image/svg+xml",
            "originalName":"tabs-timeline.svg",
            "url":"https://asset-manager-media-cdn.fanapp.twogate.dev/shishamo/others/0f0dc6d6-955b-4f51-aa02-f3491b43d5d8/default.svg"
          },
          "content2x":null,
          "content3x":null
        },
        "text":"aaaaa"
      },
      {
        "name":"home",
        "icon":null,
        "text":"ホーム"
      },
      {
        "name":"official",
        "icon":null,
        "text":"公式情報"
      }
    ]
  }
}
