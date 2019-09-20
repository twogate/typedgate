import { expect } from 'chai'
import { ControlComment } from '../../src/control-comment'

describe('control-comment 1', () => {
  const cc = new ControlComment('@TG:path .tabs')
  it('isControlComment should return true', () => {
    expect(cc.isControlComment()).to.be.true
  })
  it('getCommand should return correct result', () => {
      expect(cc.getCommand()).to.equal('path')
  })
  it('getArg should return correct result', () => {
    expect(cc.getArg()).to.equal('.tabs')
  })
})

describe('control-comment 2', () => {
  const cc = new ControlComment('@TG:just_a_switch')
  it('isControlComment should return true', () => {
    expect(cc.isControlComment()).to.be.true
  })
  it('getCommand should return correct result', () => {
      expect(cc.getCommand()).to.equal('just_a_switch')
  })
  it('getArg should return correct result', () => {
    expect(cc.getArg()).to.be.null
  })
})

describe('control-comment 3', () => {
  const cc = new ControlComment('this isn\'t a control comment!')
  it('isControlComment should return false', () => {
    expect(cc.isControlComment()).to.be.false
  })
  it('getCommand should return null', () => {
    expect(cc.getCommand()).to.be.null
  })
  it('getArg should return null', () => {
    expect(cc.getArg()).to.be.null
  })
})
