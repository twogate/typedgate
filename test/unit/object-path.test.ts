import { expect } from 'chai'
import { ObjectPath } from '../../src/object-path'

const fixtureObj = {
  level1: {
    level2: {
      level3 : {
        l3prop1: true,
        l3prop2: 'yeah',
        l3prop3: 123,
        l3arr: [
          {
            level4_1: {
              l4prop1: true,
              l4prop2: 'yeah',
              l4prop3: 123,
            }
          },
          {
            level4_2: {
              l4arr: [
                1,
                [
                  4,
                  5,
                  6
                ],
                3
              ],
              l4prop1: true,
              l4prop2: 'yeah',
              l4prop3: 123,
            }
          }
        ]
      },
      l2prop1: true,
      l2prop2: 'yeah',
      l2prop3: 123
    },
    l1prop1: true,
    l1prop2: 'yeah',
    l1prop3: 123
  },
  l0prop1: true,
  l0prop2: 'yeah',
  l0prop3: 123
}

const fixtureArray1 = [
  { num: 1, str: "yeah" },
  { num: 2, str: "ehehe~" },
  { num: 3, str: "Doki Doki" },
]

const fixtureArrayObj1 = {
  arrayOfObj: [
    { num: 1, str: "yeah" },
    { num: 2, str: "ehehe~" },
    { num: 3, str: "Doki Doki" },
  ]
}

describe('object-path traverse', () => {
  it('root', () => {
    const op = new ObjectPath('.')
    expect(op.traverse(fixtureObj)).to.deep.equal(fixtureObj)
  })
  it('root property', () => {
    const op = new ObjectPath('.l0prop1')
    expect(op.traverse(fixtureObj)).to.be.true
  })
  it('level1 property', () => {
    const op = new ObjectPath('.level1.l1prop3')
    expect(op.traverse(fixtureObj)).to.equal(123)
  })
  it('level3 array', () => {
    const op = new ObjectPath('.level1.level2.level3.l3arr')
    expect(op.traverse(fixtureObj)).to.deep.equal(fixtureObj.level1.level2.level3.l3arr)
  })
  it('level3 array, 1st element', () => {
    const op = new ObjectPath('.level1.level2.level3.l3arr[0]')
    expect(op.traverse(fixtureObj)).to.deep.equal(fixtureObj.level1.level2.level3.l3arr[0])
  })
  it('level4 array, 3rd element', () => {
    if (!fixtureObj.level1.level2.level3.l3arr[1].level4_2) { return }
    const op = new ObjectPath('.level1.level2.level3.l3arr[1].level4_2.l4arr[2]')
    expect(op.traverse(fixtureObj)).to.deep.equal(fixtureObj.level1.level2.level3.l3arr[1].level4_2.l4arr[2])
  })
})

describe('object-path toArray', () => {
  it('root', () => {
    if (!fixtureObj.level1.level2.level3.l3arr[1].level4_2) { return }
    const op = new ObjectPath('.level1.level2.level3.l3arr[1].level4_2.l4arr[2]')
    expect(op.path).to.deep.equal(['level1','level2','level3','l3arr',1,'level4_2','l4arr',2])
  })
})

describe('array-path traverse', () => {
  it('should be accessed: array-of-object', () => {
    const op = new ObjectPath('.[].str')
    expect(op.traverse(fixtureArray1)).to.deep.equal(["yeah","ehehe~","Doki Doki"])
  })
  it('should be accessed: object contains array-of-object (root)', () => {
    const op = new ObjectPath('.arrayOfObj[]')
    expect(op.traverse(fixtureArrayObj1)).to.deep.equal(fixtureArrayObj1.arrayOfObj)
  })
  it('should be accessed: object contains array-of-object (property)', () => {
    const op = new ObjectPath('.arrayOfObj[].num')
    expect(op.traverse(fixtureArrayObj1)).to.deep.equal([1,2,3])
  })
})
