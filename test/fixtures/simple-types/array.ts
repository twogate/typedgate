export type UnionType = string | boolean;
export type LiteralUnionType = 'literal!' | true | 987;

// @TG:path .arrayString
export interface ArrayString {
  text: string[];
}

// @TG:path .arrayNumber
export interface ArrayNumber {
  num: number[];
}

// @TG:path .arrayBoolean
export interface ArrayBoolean {
  bool: boolean[];
}

// @TG:path .arrayUnion
export interface ArrayUnion {
  uni: Array<string | number>;
}

// @TG:path .arrayTypeUnion
export interface ArrayTypeUnion {
  uni: UnionType[];
}

// @TG:path .arrayLiteralUnion
export interface ArrayLiteralUnion {
  uni: Array<'this is a literal' | true | 114514.1919>;
}

// @TG:path .arrayLiteralTypeUnion
export interface ArrayLiteralTypeUnion {
  uni: LiteralUnionType[];
}
