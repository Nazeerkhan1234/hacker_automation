const puppeteer = require("puppeteer");
const codeObj = require("./codes");
const Email = "nasir12345@you.com";
const password = "123456789";
let page;
const openBroser = puppeteer.launch({
  headless: false,
  slowMo: true,
  defaultViewport: null,
  args: ["--start-maximized"],
});
openBroser
  .then(function (browserObj) {
    let BrowserOpenPromise = browserObj.newPage();
    return BrowserOpenPromise;
  })
  .then(function (newTab) {
    page = newTab;
    let hacKerRankOpenPromise = newTab.goto(
      "https://www.hackerrank.com/auth/login"
    );
    return hacKerRankOpenPromise;
  })
  .then(function () {
    let EmailEntered = page.type("input[id='input-1']", Email, { delay: 50 });
    return EmailEntered;
  })
  .then(function () {
    let passwordEntered = page.type("input[type='password']", password, {
      delay: 50,
    });
    return passwordEntered;
  })
  .then(function () {
    let LoginButtonClicked = page.click(
      "button[data-analytics='LoginPassword']",
      { delay: 50 }
    );
    return LoginButtonClicked;
  })
  .then(function () {
    let clickOnAlgoPromise = waitAndClick(
      '.topic-card a[data-attr1="algorithms"]',
      page
    );
    return clickOnAlgoPromise;
  })
  .then(function () {
    let getToWarmUp = waitAndClick('input[value="warmup"]', page);
    return getToWarmUp;
  })
  .then(function () {
    let waitFor3Second = page.waitFor(3000);
    return waitFor3Second;
  })
  .then(function () {
    let allChallengesPromise = page.$$(
      ".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled"
    );
    return allChallengesPromise;
  })
  .then(function (questionArr) {
    console.log("number of question", questionArr.length);
    let questinWillBeSolved = questionSolver(
      page,
      questionArr[1],
      codeObj.answers[1]
    );
    return questinWillBeSolved;
  });
function waitAndClick(selector, cpage) {
  return new Promise(function (resolve, reject) {
    let waitForModelPromise = cpage.waitForSelector(selector);
    waitForModelPromise
      .then(function () {
        let ClickModel = cpage.click(selector);
        return ClickModel;
      })
      .then(function () {
        resolve();
      })
      .catch(function (err) {
        reject();
      });
  });
}

function questionSolver(page, question, answer) {
  return new Promise(function (resolve, reject) {
    let qustionWillbeClicked = question.click();
    qustionWillbeClicked
      .then(function () {
        let EditorInFocusPromise = waitAndClick(
          ".monaco-editor.no-user-select.vs",
          page
        );
        return EditorInFocusPromise;
      })
      .then(function () {
        return waitAndClick(".checkbox-input", page);
      })
      .then(function () {
        return page.waitForSelector("textarea.custominput", page);
      })
      .then(function () {
        return page.type("textarea.custominput", answer, { delay: 10 });
      })
      .then(function () {
        let CtrlIsPressed = page.keyboard.down("Control", { delay: 50 });
        return CtrlIsPressed;
      })
      .then(function () {
        let AisPressed = page.keyboard.press("A", { delay: 50 });
        return AisPressed;
      })
      .then(function () {
        let XisPressed = page.keyboard.press("X", { delay: 50 });
        return XisPressed;
      })
      .then(function () {
        let CtrlIsUnpressed = page.keyboard.up("Control");
        return CtrlIsUnpressed;
      })
      .then(function () {
        let mainEditorFocus = waitAndClick(
          ".monaco-editor.no-user-select.vs",
          page
        );
        return mainEditorFocus;
      })
      .then(function () {
        let CtrlIsPressed = page.keyboard.down("Control", { delay: 50 });
        return CtrlIsPressed;
      })
      .then(function () {
        let AisPressed = page.keyboard.press("A", { delay: 50 });
        return AisPressed;
      })
      .then(function () {
        let VisPressed = page.keyboard.press("V", { delay: 50 });
        return VisPressed;
      })
      .then(function () {
        let CtrlIsUnpressed = page.keyboard.up("Control");
        return CtrlIsUnpressed;
      })
      .then(function () {
        return page.click(".hr-monaco__run-code", { delay: 50 });
      })
      .then(function () {
        resolve();
      })
      .catch(function (err) {
        reject();
      });
  });
}
