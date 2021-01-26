// You can import your modules
// import index from '../src/index'

import nock from 'nock'
// Requiring our app implementation
import myProbotApp from '../src'
import { Probot } from 'probot'
// Requiring our fixtures
import payload from './fixtures/pull_request.opened'

const TIMEOUT = 15000;

nock.disableNetConnect()

describe('My Probot app', () => {
  let probot: any

  beforeEach(() => {
    probot = new Probot({ appId: "123", secret: "123"  })
    // Load our app into probot
    const app = probot.load(myProbotApp)

    // just return a test token
    app.app = () => 'test'
  })

  test('Creates labels, adds label', async () => {
    // Test that we correctly return a test token
    nock('https://api.github.com')
      .post('/app/installations/591106/access_tokens')
      .reply(200, { token: 'test' })

    // Mock Repo has no labels
    nock('https://api.github.com')
      .get('/repos/jonnywildey/chonk-label/labels?number=1')
      .reply(200, [])

    // Mock creating labels
    nock('https://api.github.com')
      .persist()
      .post('/repos/jonnywildey/chonk-label/labels')
      .reply(201, {})

    // Mock PR has no labels
    nock('https://api.github.com')
      .get('/repos/jonnywildey/chonk-label/issues/1/labels')
      .reply(200, [])

    // Mock Adding Label
    nock('https://api.github.com')
      .post('/repos/jonnywildey/chonk-label/issues/1/labels')
      .reply(201, {})

    // Receive a webhook event
    await probot.receive({
      name: 'pull_request.opened', payload
    });
  }, TIMEOUT)
})

// For more information about testing with Jest see:
// https://facebook.github.io/jest/

// For more information about using TypeScript in your tests, Jest recommends:
// https://github.com/kulshekhar/ts-jest

// For more information about testing with Nock see:
// https://github.com/nock/nock
