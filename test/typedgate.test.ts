import { expect } from 'chai'
import { TypedGate } from '../src/index'

describe('typedgate class (crayon-type)', () => {
  const tg = new TypedGate('./test/fixtures/crayon-types/tsconfig.json', './test/fixtures/crayon-types/index.ts')
  it('_validationResult should be undefined after initialized', () => {
    expect(tg.validationResult).to.be.undefined
  })

  it('validation \'crayon-type\' should be false', async () => {
    const result = await tg.validateJsonFile('./test/fixtures/crayon-types/crayon-type.json')
    console.log(result)
    expect(result).to.be.false
  })
})
