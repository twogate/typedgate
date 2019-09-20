import { expect } from 'chai'
import { loadJson } from '../../src/file-utils'

describe('loadJson', () => {
    it('sync function returns true', async () => {
        const jsonObj = {
          "bach": [
            {
              "bwv": 1001,
              "title": "Sonata No. 1 in G minor",
              "orchestral": false
            },
            {
              "bwv": 1041,
              "title": "Violin Concerto in A minor",
              "orchestral": true
            }
          ],
          "Beethoven": [
            {
              "op": 125,
              "title": "Symphony No. 9",
              "orchestral": true
            },
            {
              "op": "27/2",
              "title": "Piano Sonata No. 14",
              "orchestral": false
            }
          ]
        }

        const result = await loadJson('test/fixtures/file-utils.fixture.json')
        expect(result).to.deep.equal(jsonObj);
    })
})
