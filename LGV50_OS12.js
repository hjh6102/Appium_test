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
   // 패키지명과 액티비티명을 찾아서 수정
   await clickElement(driver, '//*[@text="배달의민족 CBT"]'); // 바탕화면 app 진입
   //await clickElement(driver, '(//android.widget.ImageView[@resource-id="com.sampleapp.cbt:id/characterImageView"])[1]'); //가게배달 1번째 탭 선택
   await clickElement(driver, '(//android.widget.ImageView[@resource-id="com.sampleapp.cbt:id/characterImageView"])[2]'); //가게배달 2번째 탭 선택
   //await tapElement(driver, '가게에서 자체 배달!!!, 가게배달 버튼');
   await clickElement(driver, '//android.widget.TextView[@content-desc="검색 하단탭 버튼"]'); // 하단 검색탭 선택
   await clickElement(driver, '//android.widget.TextView[@resource-id="com.sampleapp.cbt:id/keyword" and @text="채영"]'); //최근검색어 채영 선택
   await clickElement(driver, '//androidx.recyclerview.widget.RecyclerView[@resource-id="com.sampleapp.cbt:id/recyclerView"]/android.widget.FrameLayout[2]/androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View'); // 채영떡볶이 가게 선택
   await clickElement(driver, '//android.widget.TextView[@resource-id="com.sampleapp.cbt:id/contentTabTitleTextView" and @text="정보 · 원산지"]'); // 정보,원산지 탭 선택(스와이프 대용)
   await clickElement(driver, '//android.widget.TextView[@resource-id="com.sampleapp.cbt:id/contentTabTitleTextView" and @text="메뉴"]'); // 메뉴 탭 선택
   await clickElement(driver, '//androidx.recyclerview.widget.RecyclerView[@resource-id="com.sampleapp.cbt:id/content_recyclerview"]/android.widget.FrameLayout[5]/androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View/android.view.View[1]'); // 매운떡볶이 선택
   await clickElement(driver,'//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View[1]/android.view.View[5]/android.widget.Button'); // +버튼으로 2인분
   await clickElement(driver, '//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View[2]/android.widget.Button'); //12000원 담기
   try {
    await clickElement(driver, '//android.view.ViewGroup/android.view.View/android.view.View/android.view.View/android.view.View[3]/android.widget.Button'); // 다이얼로그 담기 선택(장바구니 존재시)
    
   } catch  { }
   await clickElement(driver, '//androidx.compose.ui.platform.ComposeView[@resource-id="com.sampleapp.cbt:id/shopDetailCartInfoButton"]/android.view.View/android.view.View/android.view.View/android.widget.Button'); //장바구니 보기 버튼 
   await clickElement(driver,'//android.widget.Button[@text="포장 6~26분 후 픽업"]'); // 포장선택
   await clickElement(driver, '//android.view.View[@resource-id="root"]/android.view.View[3]/android.view.View[1]/android.widget.TextView'); //포장 주문하기
   //await clickElement(driver, '//android.widget.Button[@text="48,000원 포장 주문하기"]'); //포장 주문하기
   
  try {
    await clickElement(driver, '//android.widget.TextView[@text="기타 결제수단"]'); // 기타 결제수단 선택
    // await clickElement(drivr, '//android.widget.Button[@text="간편 결제"]'); // 간편결제 선택
    await clickElement(driver, '//android.widget.Button[@text="네이버페이"]'); // 네이버페이 선택
    await clickElement(driver, '//android.widget.Button[@text="선택완료"]'); //바텀시트 > 선택완료
  } catch {  }

   await clickElement(driver, '//android.widget.Button[@resource-id="pay-cta-button"]'); // n원 결제하기
   //await clickElement(driver, '	//android.view.View[@resource-id="root"]/android.view.View[6]'); // 결제하기
   await driver.pause(10000);
   await clickElement(driver, '//android.widget.TextView[@text="결제상품"]'); // 결제상품 토글 닫기
   await clickElement(driver, '//android.widget.TextView[@text="결제수단"]'); // 결제수단 토글 닫기
   await clickElement(driver, '//android.widget.TextView[@text="결제상세"]'); // 결제상세 토글 닫기
   await clickElement(driver, '//android.view.View[@content-desc="결제하기"]'); // 결제하기 선택

   await driver.pause(20000); // 비밀번호 입력 시간

   await clickElement(driver, '//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View[1]/android.view.View/android.view.View/android.view.View[1]/android.widget.Button'); //주문취소
   await clickElement(driver, '//android.view.ViewGroup/android.view.View/android.view.View/android.view.View/android.view.View[3]/android.widget.Button'); // 다이얼로그 '네'선택
   //await setValue(driver, '//android.widget.EditText', '채영'); 검색창에 채영 입력

   // await clickElement(driver,'//android.widget.EditText' ); 검색창 선택

   await driver.pause(3000);

    // await driver.pressKeyCode(84); 안드로이드 키값 클릭

    /* SIF search key 값
    const tapX = 997;
    const tapY = 2111;

    await driver.touchAction([
     { action: 'tap', x: tapX, y: tapY },
   ]);
   */
   // 5초대기
   await driver.pause(5000);
  
  } finally {
    await driver.pause(3000);
    await driver.deleteSession();
  }
}

runTest().catch(console.error);