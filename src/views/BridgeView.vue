<template>
  <div>
    <br/>
    <div class="position-relative py-2 px-4 text-bg-secondary border border-secondary rounded-pill">
      브릿지 테스트 <svg width="1em" height="1em" viewBox="0 0 16 16" class="position-absolute top-100 start-50 translate-middle mt-1" fill="var(--bs-secondary)" xmlns="http://www.w3.org/2000/svg"><path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>
    </div>
    <br/>
    <!-- <select class="form-select form-select-lg mb-3" aria-label="Large select example" v-model="selected" @change="selectFunc()">
      <option v-for="item in funcStrArr" :key="item.funcName" :value="item.funcName">{{ item.desc }} {{ item.funcName == 'displayHeader'? item.params.isVisible ? '(숨김)': '(보임)': '' }}</option>
    </select> -->
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
import { Base64 } from 'js-base64';
import { getDeviceType, checkBridgeFunc, executeBridgeFunc } from '@/common/utils';

export default {
  data() {
    return {
      deviceType: 'PC',
      selected: '',
      displayData:{},
      testContact: {
        contact:{
          others:[
            {contactSn:1, name:"S1Qg6rOg6rCd7IS87YSw", phone:"MTAw"},
            {contactSn:2, name:"TEfsoITsnpAg6rOg6rCd7IOB64u07Iuk", phone:"MTU0NDc3Nzc="}
          ]
        }
      },
      // funcStrArr:[
      //   {funcName: 'showAndroidToast', desc: '토스트, 다이얼로그, 화면 전환 이벤트'}, // 토스트, 다이얼로그, 화면 전환 이벤트
      //   {funcName: 'nativeToWeb', desc: 'nativeToWeb'}, 
      //   {funcName: 'nativeToWebWithMsg', desc: 'nativeToWebWithMsg'},
      //   {funcName: 'showDialog', desc: '입력 다이얼로그 노출'}, // 입력 다이얼로그 노출
      //   {funcName: 'showUserList', desc: '유저 리스트'}, //유저 리스트
      //   {funcName: 'showCertificationList', desc: '인증서'}, //인증서
      //   {funcName: 'showKeyPad', desc: 'showKeyPad'},
      //   {funcName: 'showKeyboard', desc: '보안 키보드'}, //보안 키보드
      //   {funcName: 'showEncryption', desc: '앱 위변조'}, //앱 위변조
      //   {funcName: 'moveWebView', desc: 'url 입력 후 웹뷰 화면 이동'}, // url 입력 후 웹뷰 화면 이동
      //   {funcName: 'showSWInfo', desc: 'SW 정보 표시', callBack: 'bgSwInfo'}, //  SW 정보 표시
      //   {funcName: 'moveAppStore', desc: '앱 스토어 이동 및 앱 실행'},  //앱 스토어 이동 및 앱 실행
      //   {funcName: 'searchPhoneAddress', desc: '주소록 조회', callBack: 'bgCallbackSearchContact'}, //주소록 조회
      //   {funcName: 'closeApp', desc: '앱 종료'}, //앱 종료
      //   {funcName: 'moveLoginPage', desc: '로그인 화면으로 이동'}, //로그인 화면으로 이동
      //   {funcName: 'loginPushOff', desc: '푸시 해제 버튼'}, //푸시 해제 버튼
      //   {funcName: 'autoLoginOff', desc: '자동 로그인 해제'}, // 자동 로그인 해제
      //   {funcName: 'openBrowser', desc: '아이폰 open browser', }, 
      // ]
      funcStrArr:[
        {funcName: 'showSWInfo', desc: 'SW 정보 표시', callBack: 'bgShowSWInfo'},
        // {funcName: 'moveLoginPage', desc: '로그인 화면으로 이동'},
        {funcName: 'moveAppStore', desc: '앱 스토어 이동 및 앱 실행'}, 
        {funcName: 'openBrowser', desc: '다른 웹페이지 이동(외부 인터넷 앱 실행)'}, 
        {funcName: 'searchPhoneAddress', desc: '주소록 조회', callBack: 'bgSearchPhoneAddress'},
        {funcName: 'sendToSMS', desc: 'SMS 보내기', params: { callback: 'bgSendToSMS', phoneNumbers: ["01000000000","01000000001","01000000002"], message: '내 건강 기록을 공유합니다.\nhttps://www.naver.com'}},
        {funcName: 'captureScreen', desc: '화면 캡쳐'},
        {funcName: 'closeApp', desc: '앱 종료'},
        // {funcName: 'fileDownload', desc: '파일 다운로드', params: {callback: 'bgFileDownload', url: 'http://10.112.58.208/fileUpload/9af0c846-bbbe-4184-b5e4-e3da85be4354.pdf', fileName: '민방위훈련 리플렛.pdf'}},
        // {funcName: 'uploadFile', desc: '파일 업로드'},
        // {funcName: 'showKeyboard', desc: '가상 키패드'}, // 23.09.22 기능이 안되서 우선 뺌
        {funcName: 'displayHeader', desc: '네이티브 헤더 표시 여부', params: {callback: 'bgDisplayHeader', isVisible: true, title: 'WebView Bridge Test'}},
        {funcName: 'autoLoginOff', desc: '자동 로그인 해제'},
      ]
    }
  },
  created(){
    this.deviceType = getDeviceType();
  },
  mounted() {
    // this.executFunction('showDialog');
    console.log('mounted : ', this.testContact);
    this.displayData = this.testContact.others;
    this.setCallbackFunc();
  },
  methods:{
    setCallbackFunc() {
      window.bgShowSWInfo = this.showSWInfo;
      window.bgSearchPhoneAddress = this.searchPhoneAddress;
      window.bgOpenBrowser = this.openBrowser;
      window.bgSendToSMS = this.sendToSMS;
    },
    showSWInfo(params){
      params = JSON.parse(params);
      console.log('showSWInfo : ', params);
      if (params.resultCode == 'SUCCESS') {
        this.displayData = params.data;
      }
    },
    searchPhoneAddress(params) {
      params = JSON.parse(params);
      console.log('searchPhoneAddress : ', params);

      this.displayData = [];
      for (let key in params.contact) {
        this.displayData = this.displayData.concat(params.contact[key]);
      }
      // this.displayData = params.contact.others;

      for (let i=0; i < this.displayData.length; i++) {
        let item = this.displayData[i];
        item.name = Base64.decode(item.name);
        item.phone = Base64.decode(item.phone);
      }
    },
    openBrowser(param) {
      console.log('openBrowser : ', param);
    },
    sendToSMS(param) {
      console.log('sendToSMS : ', param);
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