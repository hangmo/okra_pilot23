<template>
  <div>
    <br/>
    <div class="position-relative py-2 px-4 text-bg-secondary border border-secondary rounded-pill">
      로그인 테스트 <svg width="1em" height="1em" viewBox="0 0 16 16" class="position-absolute top-100 start-50 translate-middle mt-1" fill="var(--bs-secondary)" xmlns="http://www.w3.org/2000/svg"><path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>
    </div>
    <br/>
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputGroup-sizing-default">ID</span>
      <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" v-model="inputData.id">
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputGroup-sizing-default">Pass Word</span>
      <input type="password" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" v-model="inputData.pwd">
    </div>
    <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
      <input type="checkbox" class="btn-check"  id="btncheck1"  autocomplete="off" v-model="isAutoLogin">
      <label class="btn btn-outline-primary" for="btncheck1">자동 로그인 설정</label>
    </div>

    <div class="d-grid gap-2 d-md-flex justify-content-md-end" style="margin-top: 20px">
      <!-- <button class="btn btn-primary me-md-2" type="button">Button</button> -->
      <button class="btn btn-primary" type="button" @click="login()">로그인</button>
    </div>
  </div>
</template>

<script>
import {loginApi} from '@/api/serverApi'
import { getDeviceType, checkBridgeFunc, executeBridgeFunc } from '@/common/utils'
import { Base64 } from 'js-base64';

export default {  
  data() {
    return {
      inputData: {
        id : '',
        pwd : ''
      },      
      isAutoLogin: false,
      deviceType: 'PC'
    }
  },
  mounted() {
    this.deviceType = getDeviceType();
  },
  methods: {
    async login() {
      console.log('test');
      if (this.inputData.id == '' && this.inputData.pwd == '') {
        alert('ID 와 Pass Word 모두 입력해주세요');
        return;
      }
      let sendData = {...this.inputData};
      sendData.pwd = Base64.encode(sendData.pwd);
      let res = await loginApi(sendData);
      if (res.data.resultCode == '200') {
        if (res.data.data.isLoginCheck) {
          alert('로그인 데이터가 일치 합니다.');
          
          if (checkBridgeFunc(this.deviceType) && this.isAutoLogin) {
            executeBridgeFunc(
              this.deviceType, 
              'setLoginInfo', 
              {
                id : this.inputData.id,
                pwd: Base64.encode(this.inputData.pwd),
                isAutoLogin: true
              }
            );
          }
          this.$router.push('/');
        } else {
          alert('로그인 데이터가 다릅니다.');
        }
      }
    }
  }
}
</script>

<style>

</style>