export type UnionType = string | boolean;
export type LiteralUnionType = 'literal!' | true | 987;

// @TG:path .simpleClass
export class SimpleClass {
  text: string;
  uni1: string | number;
  uni2: UnionType;
  uni3: 'this is a literal' | true | 114514.1919;
  uni4: LiteralUnionType;
}
