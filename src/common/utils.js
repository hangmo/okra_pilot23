function getDeviceType() {
  let userAgent = navigator.userAgent;
  let deviceType = 'PC';
  
  if (userAgent.match(/Android/i)) {
    // 안드로이드 기기
    deviceType = 'Android';
  } else if (userAgent.match(/iPhone|iPad|iPod/i)) {
    // 아이폰, 아이패드, 아이팟 기기
    deviceType = 'iOS';
  } else {
    // 기타 PC 웹 브라우저
    deviceType = 'PC';
  }
  return deviceType;
}

function checkBridgeFunc(deviceType) {
  let isBridgeFunc = false;

  if (deviceType == 'Android') {
    if (window.DKITec != undefined) {
      isBridgeFunc = true;
    }
  } else if (deviceType == 'iOS') {
    if (window['webkit'] != undefined && window['webkit']['messageHandlers'] != undefined) {
      isBridgeFunc = true;
    }
  }
  return isBridgeFunc;
}

function executeBridgeFunc(deviceType, funcName, params) {
  console.log('executeBridgeFunc : ', deviceType, funcName, params);
  if (deviceType == 'Android') {
    const androidBridge = window.DKITec;
    if (androidBridge != undefined) {
      if (params == undefined) {
        androidBridge[funcName]();
      } else {
        androidBridge[funcName](JSON.stringify(params));
      }
    }
  } else if (deviceType == 'iOS') {
    const iosBridge = window['webkit']['messageHandlers'];
    if (iosBridge[funcName] != undefined) {
      if (params == undefined) {
        // alert('ios Function Execution 3');
        iosBridge[funcName]['postMessage'](JSON.stringify({})); 
      } else {
        // alert('ios Function Execution 4 ' + JSON.stringify(params));
        iosBridge[funcName]['postMessage'](JSON.stringify(params));
      }
    }
  }
}

export { getDeviceType, checkBridgeFunc, executeBridgeFunc }