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

describe('object-path', () => {
  const op = new ObjectPath(fixtureObj)
  it('root', () => {
    expect(op.traverse('.')).to.deep.equal(fixtureObj)
  })
  it('root property', () => {
    expect(op.traverse('.l0prop1')).to.be.true
  })
  it('level3 array', () => {
    expect(op.traverse('.level1.level2.level3.l3arr')).to.deep.equal(fixtureObj.level1.level2.level3.l3arr)
  })
  it('level3 array, 2nd element', () => {
    expect(op.traverse('.level1.level2.level3.l3arr[1]')).to.deep.equal(fixtureObj.level1.level2.level3.l3arr[1])
  })
})


