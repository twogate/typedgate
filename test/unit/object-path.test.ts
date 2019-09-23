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

describe('object-path traverse', () => {
  it('root', () => {
    const op = new ObjectPath('.')
    expect(op.traverse(fixtureObj)).to.deep.equal(fixtureObj)
  })
  it('root property', () => {
    const op = new ObjectPath('.l0prop1')
    expect(op.traverse(fixtureObj)).to.be.true
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

