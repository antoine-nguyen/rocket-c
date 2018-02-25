// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'form page should have five questions': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('input.e2e-username')
      .assert.elementPresent('.e2e-radio-spacesVsTabs input[type=radio]')
      .assert.elementPresent('.e2e-radio-cSharpVsJava input[type=radio]')
      .assert.elementPresent('.e2e-radio-compiledVsInterpreted input[type=radio]')
      .assert.elementPresent('.e2e-radio-reactVsAngular input[type=radio]')
      .assert.elementPresent('.e2e-radio-sqlVsDoc input[type=radio]')
      .end()
  },
  'form page shouldnt submit if not completed': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .pause(5000)
      .submitForm('.e2e-form')
      .pause(5000)
      .assert.elementPresent('.e2e-form')
      .assert.elementNotPresent('.e2e-form-submited')
      .setValue('.e2e-username', `jean ${Date.now()}`)
      .submitForm('.e2e-form')
      .assert.elementNotPresent('.e2e-form')
      .assert.elementPresent('.e2e-form-submited')
      .end()
  },
  'admin page should display results': function (browser) {
    const devServer = browser.globals.devServerURL
    var username = `jean ${Date.now()}`
    var answer
    if (Date.now() % 2 === 0) {
      answer = ['Spaces', 'Java', 'Angular', 'Compilado', 'Document']
    } else {
      answer = ['Tabs', 'Java', 'React', 'Interpretado', 'SQL']
    }
    browser
      .url(devServer)
      .pause(1000)
      .setValue('.e2e-username', `${username}`)
      .click(`span.e2e-${answer[0]}`)
      .click(`span.e2e-${answer[1]}`)
      .click(`span.e2e-${answer[2]}`)
      .click(`span.e2e-${answer[3]}`)
      .click(`span.e2e-${answer[4]}`)
      .submitForm('.e2e-form')
      .pause(1000)
      .url(devServer + '#/admin')
      .pause(1000)
      .getAttribute('.e2e-last-result', 'username', function (result) {
        browser.assert.equal(username, result.value)
      })
      .getAttribute('.e2e-last-result', 'data-values', function (result) {
        browser.assert.equal(answer, result.value)
      })
      .end()
  },
  'admin page should display a count of todays records': function (browser) {
    const devServer = browser.globals.devServerURL
    var initialTodayResponse
    var username = `jean ${Date.now()}`
    var answer
    if (Date.now() % 2 === 0) {
      answer = ['Spaces', 'Java', 'Angular', 'Compilado', 'Document']
    } else {
      answer = ['Tabs', 'Java', 'React', 'Interpretado', 'SQL']
    }
    browser
      .url(devServer + '#/admin')
      .pause(3000)
      .getText('.e2e-response-today', function (result) {
        initialTodayResponse = result.value
      })
      .url(devServer)
      .pause(1000)
      .setValue('.e2e-username', `${username}`)
      .click(`span.e2e-${answer[0]}`)
      .click(`span.e2e-${answer[1]}`)
      .click(`span.e2e-${answer[2]}`)
      .click(`span.e2e-${answer[3]}`)
      .click(`span.e2e-${answer[4]}`)
      .submitForm('.e2e-form')
      .pause(1000)
      .url(devServer + '#/admin')
      .pause(1000)
      .getText('.e2e-response-today', function (result) {
        browser.assert.equal(parseInt(initialTodayResponse) + 1, result.value)
      })
      .end()
  },
  'admin page should have a table displaying records ordered by ascending date': function (browser) {
    const devServer = browser.globals.devServerURL
    var initialTodayResponse
    var dataResultInitial
    var username = `jean ${Date.now()}`
    var answer
    if (Date.now() % 2 === 0) {
      answer = ['Spaces', 'Java', 'Angular', 'Compilado', 'Document']
    } else {
      answer = ['Tabs', 'Java', 'React', 'Interpretado', 'SQL']
    }
    browser
      .url(devServer + '#/admin')
      .pause(3000)
      .getText('.e2e-response-today', function (result) {
        initialTodayResponse = result.value
      })
      .getAttribute('.e2e-data-result', 'data-attr', function (result) {
        dataResultInitial = result.value
      })
      .url(devServer)
      .pause(1000)
      .setValue('.e2e-username', `${username}`)
      .click(`span.e2e-${answer[0]}`)
      .click(`span.e2e-${answer[1]}`)
      .click(`span.e2e-${answer[2]}`)
      .click(`span.e2e-${answer[3]}`)
      .click(`span.e2e-${answer[4]}`)
      .submitForm('.e2e-form')
      .pause(1000)
      .url(devServer + '#/admin')
      .pause(1000)
      .assert.elementPresent('table')
      .getAttribute('.e2e-last-result', 'username', function (result) {
        browser.assert.equal(username, result.value)
      })
      .getAttribute('.e2e-last-result', 'data-values', function (result) {
        browser.assert.equal(answer, result.value)
      })
      .end()
  }
}
