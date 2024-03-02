const { remote } = require('webdriverio');

const capabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android',
  'appium:noReset': 'true',
  'appium:autoGrantPermissions': 'true', //Android에서 권한을 자동으로 앱 사용 중에만 허용
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


async function longPressAndDrag(driver, xpath, xOffset, yOffset) {
  const element = await driver.$(xpath);

  // 롱프레스 수행
  await element.touchAction([
    { action: 'press', x: 0, y: 0 },
    { action: 'wait', ms: 2000 }, // 롱프레스 유지 시간 (필요에 따라 조절)
    { action: 'moveTo', x: xOffset, y: yOffset }, // 드래그 시작 지점으로 이동
    { action: 'release' }
  ]);
}

async function runTest() {
  const driver = await remote(wdOpts);
  try {
    try {
        await clickElement(driver, '//android.widget.TextView[@text="기타 결제수단"]'); // 기타 결제수단 선택
        
        // await clickElement(drivr, '//android.widget.Button[@text="간편 결제"]'); // 간편결제 선택
        await clickElement(driver, '//android.widget.Button[@text="네이버페이"]'); // 네이버페이 선택
        await clickElement(driver, '//android.widget.Button[@text="선택완료"]'); //바텀시트 > 선택완료
    } catch {  }

   // 5초대기
   await driver.pause(5000);
  
  } finally {
    await driver.pause(3000);
    await driver.deleteSession();
  }
}

runTest().catch(console.error);