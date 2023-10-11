<template>
  <div>
    <br/>
    <div class="position-relative py-2 px-4 text-bg-secondary border border-secondary rounded-pill">
      서울 브릿지 테스트 <svg width="1em" height="1em" viewBox="0 0 16 16" class="position-absolute top-100 start-50 translate-middle mt-1" fill="var(--bs-secondary)" xmlns="http://www.w3.org/2000/svg"><path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>
    </div>
    <br/>
    <ul class="list-group">
      <li class="list-group-item" v-for="item in funcStrArr" :key="item.funcName" @click="bridgeClick(item)">{{ item.desc }} {{ item.funcName == 'displayHeader'? item.params.isVisible ? '(숨김)': '(보임)': '' }}</li>
    </ul>
    <hr class="border border-danger border-2 opacity-50">
    <div v-for="(value, key) in displayData" :key="key">
      <div v-if="typeof value == 'boolean'">
        <span style="color: blue">{{ key }} </span>: <span style="color: red">{{ value }}</span>
      </div>
      <div v-else-if="value == Array.isArray(value)">
        <div v-for="(value1, key1) in value" :key="key1">
          <span style="color: red">{{ value1 }}</span>
        </div>
        <hr>
      </div>
      <div v-else-if="typeof value == 'object'">
        <div v-for="(value1, key1) in value" :key="key1">
          <span style="color: blue">{{ key1 }} </span>: <span style="color: red">{{ value1 }}</span>
        </div>
        <hr>
      </div>
      <div v-else>
        <span style="color: blue">{{ key }} </span>: <span style="color: red">{{ value }}</span>
      </div>
      
    </div>

  </div>
</template>

<script>
/* eslint-disable */
import { getDeviceType, checkBridgeFunc, executeBridgeFunc } from '@/common/utils';

export default {
  data() {
    return {
      deviceType: 'PC',
      selected: '',
      displayData:{},
      resCodeType: ['SUCCESS'],
      funcStrArr:[
        {funcName: 'getDeviceStatus', desc: '상태 조회', params: {callback: 'bgGetDeviceStatus'}},
        {funcName: 'scanDevice', desc: '주변 기기 스캔 요청', params: {callback: 'bgScanDevice'}},
        {funcName: 'connectDevice', desc: '찾은 기기에 대한 Pairing 요청', params: {callback: 'bgConnectDevice', deviceName:'test', mac:'AB:CD:EF:AB:CD:EF'}},
        {funcName: 'connectHealthApp', desc: '3rd Party 앱 데이터 연동을 위한 연결', params: {callback: 'bgConnectHealthApp', appType: 'samsung'}},
        {funcName: 'syncHealthData', desc: '데이터 동기화 요청', params: {callback: 'bgSyncHealthData', prtcType: '보급'}},
        // {funcName: 'none', desc: '걸음 수 데이터 연동 하기(TBD)'},
        // {funcName: 'none', desc: '3rd Party App 연동 데이터 동기화 요청(TBD)'},
        // {funcName: 'fileInput', desc: '파일 업로드 선택(TBD)'},
        // {funcName: 'uploadImage', desc: '이미지 업로드 선택(TBD)'},
        {funcName: 'saveFile', desc: '다운로드 파일 저장', params: {callback: 'bgSaveFile', url: "http://naver.com", filename: "test", mimetype: "jpg"}},
        {funcName: 'getGpsLocation', desc: '현재 GPS 좌표 요청', params: {callback: 'bgGetGpsLocation'}},
        {funcName: 'getAppVersion', desc: 'App Version name, Version Code 정보 요청', params: {callback: 'bgGetAppVersion'}},
        {funcName: 'startApp', desc: '마음 건강 실행', params: {callback: 'bgStartApp', appType: 'mind'}},
        // {funcName: 'none', desc: '푸드렌즈 실행(TBD)'},
        {funcName: 'startWebView', desc: '새로운 웹뷰 실행', params: {callback: 'bgStartWebView', url: 'http://naver.com'}},
        {funcName: 'goAppStore', desc: '마켓으로 이동', params: {callback: 'bgGoAppStore'}},
        {funcName: 'goMenu', desc: '메뉴 이동 (Bottom Navi)', params: {callback: 'bgGoMenu', menuId: '1', url: 'http://naver.com'}},
        {funcName: 'appExit', desc: '앱 종료'},
        {funcName: 'shareUrlSNS', desc: 'SNS 공유하기'},
        {funcName: 'tel', desc: '전화'},
        {funcName: 'mailto', desc: '이메일'},
        {funcName: 'SMS', desc: 'SMS'},
        // {funcName: 'none', desc: 'Back Key 이벤트 전달 처리'},
      ]
    }
  },
  created(){
    this.deviceType = getDeviceType();
  },
  mounted() {
    // this.executFunction('showDialog');
    console.log('mounted : ', this.testContact);
    this.setCallbackFunc();
  },
  methods:{
    setCallbackFunc() {
      window.bgGetDeviceStatus = this.getDeviceStatus;
      window.bgScanDevice = this.scanDevice;
      window.bgConnectDevice = this.connectDevice;
      window.bgConnectHealthApp = this.connectHealthApp;
      window.bgSyncHealthData = this.syncHealthData;
      window.bgSaveFile = this.saveFile;
      window.bgGetGpsLocation = this.getGpsLocation;
      window.bgGetAppVersion = this.getAppVersion;
      window.bgStartApp = this.startApp;
      window.bgStartWebView = this.startWebView;
      window.bgGoAppStore = this.bgGoAppStore;
      window.bgGoMenu = this.goMenu;
    },
    getDeviceStatus(params){
      this.displayData = this.getCallbackData(params).data;
    },
    scanDevice(params) {
      this.displayData = this.getCallbackData(params).data;
    },
    connectDevice(params) {
      if (this.getCallbackData(params).isRes) {
        alert('기기 연결에 성공 하였습니다');
      }
    },
    connectHealthApp(params) {
      if (this.getCallbackData(params).isRes) {
        alert('3rd Party 앱 데이터 연결에 성공 하였습니다');
      }
    },    
    syncHealthData(params) {
      if (this.getCallbackData(params).isRes) {
        alert('데이터 동기화 요청에 성공 하였습니다');
      }
    },
    saveFile(params) {
      if (this.getCallbackData(params).isRes) {
        alert('다운로드 파일 저장에 성공 하였습니다');
      }
    },
    getGpsLocation(params) {
      this.displayData = this.getCallbackData(params).data;
    },
    getAppVersion(params) {
      this.displayData = this.getCallbackData(params).data;
    },
    startApp(params) {
      if (this.getCallbackData(params).isRes) {
        alert('내부 패키지 실행에 성공 하였습니다');
      }
    },
    startWebView(params) {
      if (this.getCallbackData(params).isRes) {
        alert('웹뷰 실행에 성공 하였습니다');
      }
    },
    bgGoAppStore(params) {
      if (this.getCallbackData(params).isRes) {
        alert('마켓으로 이동에 성공 하였습니다');
      }
    },
    goMenu(params) {
      if (this.getCallbackData(params).isRes) {
        alert('메뉴 이동에 성공 하였습니다');
      }
    },
    getCallbackData(params) {
      let returnData = {
        data: {},
        isRes: false
      };
      params = JSON.parse(params);
      if (params.resCd == this.resCodeType[0]) {
        returnData.data = params.data;
        returnData.isRes = true;
      }
      return returnData;
    },
    bridgeClick(item) {
      this.selected = item.funcName;
      this.selectFunc();
    },
    selectFunc() {
      console.log('selected : ', this.selected);
      let item;

      for (let i=0; i < this.funcStrArr.length; i++) {
        let searchItem = this.funcStrArr[i];
        if (this.selected == searchItem.funcName) {
          item = searchItem;
        }
      }
      
      if (this.selected == 'openBrowser') {
        this.executFunction('openBrowser', {url: 'http://naver.com', callback: 'bgOpenBrowser'});
      } else if(this.selected == 'displayHeader') {
        item.params.isVisible = !item.params.isVisible
        this.executFunction(this.selected, item.params);
      } else if (item.callBack != undefined) {
        this.executFunction(this.selected, {callback: item.callBack});
      } else if (item.params != undefined) {
        this.executFunction(this.selected, item.params);
      } else {
        this.executFunction(this.selected);
      }
      
    },
    executFunction(funcName, params) {
      if (checkBridgeFunc(this.deviceType)) {
        executeBridgeFunc(this.deviceType, funcName, params);
      }
    }
  }
}
</script>

<style>

</style>