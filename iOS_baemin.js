const { remote } = require('webdriverio');

const capabilities = {
    platformName: 'iOS',
    'appium:automationName': 'XCUITest',
    'appium:udid': '00008110-000A14EA3CDA801E',  // 여기에 실제 기기의 UDID를 입력하세요
    'appium:bundleId': 'com.jawebs.baedal.beta', // baemin beta app
    'appium:noReset': 'true',
    'appium:autoAcceptAlerts': 'true',  // iOS에서 알림을 자동으로 허용
    'appium:platformVersion': '17.4',
    'appium:deviceName': 'iPhone13Pro',
  };

  const wdOpts = {
    hostname: process.env.APPIUM_HOST || 'localhost',
    port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
    logLevel: 'info',
    capabilities,
  };
  
  async function clickElement(driver, xpath) {
    const element = await driver.$(xpath);
    await element.click();
  }
  
  async function setValue(driver, xpath, value) {
    const element = await driver.$(xpath);
    await element.setValue(value);
  }
  
  async function touchAction(driver, xpath, action) {
    const element = await driver.$(xpath);
    await element.touchAction(action);
  }
  
  async function tapElement(driver, accessibilityId) {
    const element = await driver.$(`android=new UiSelector().description("${accessibilityId}")`);
    await element.click();
  }
  
  async function runTest() {
    const driver = await remote(wdOpts);
  
    try {

  
    } finally {
      await driver.pause(5000); // 테스트를 확인하기 위해 잠시 기다림
      await driver.deleteSession();
    }
  }
  
  runTest().catch(console.error);
