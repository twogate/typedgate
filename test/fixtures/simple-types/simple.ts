export type UnionType = string | boolean;
export type LiteralUnionType = 'literal!' | true | 987;

// @TG:path .simpleString
export interface SimpleString {
  text: string;
}

// @TG:path .simpleNumber
export interface SimpleNumber {
  num: number;
}

// @TG:path .simpleBoolean
export interface SimpleBoolean {
  bool: boolean;
}

// @TG:path .simpleUnion
export interface SimpleUnion {
  uni: string | number;
}

// @TG:path .simpleTypeUnion
export interface SimpleTypeUnion {
  uni: UnionType;
}

// @TG:path .simpleLiteralUnion
export interface SimpleLiteralUnion {
  uni: 'this is a literal' | true | 114514.1919;
}

// @TG:path .simpleLiteralTypeUnion
export interface SimpleLiteralTypeUnion {
  uni: LiteralUnionType;
}

// @TG:path .undefinedType
export interface UndefinedType {
  undefNumber?: number;
  undefString?: string;
  undefBoolean?: boolean;
  undefUnion?: string | number;
  undefTypeUnion?: UnionType;
  undefLiteralUnion?: 'this is a literal' | true | 114514.1919;
  undefLiteralTypeUnion?: SimpleLiteralTypeUnion;
}
