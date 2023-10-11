<template>
  <div>
    <br/>
    <div class="position-relative py-2 px-4 text-bg-secondary border border-secondary rounded-pill">
      계정 등록 <svg width="1em" height="1em" viewBox="0 0 16 16" class="position-absolute top-100 start-50 translate-middle mt-1" fill="var(--bs-secondary)" xmlns="http://www.w3.org/2000/svg"><path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>
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
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputGroup-sizing-default">Pass Word 확인</span>
      <input type="password" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" v-model="inputData.pwdConfirm">
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputGroup-sizing-default">이름</span>
      <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" v-model="inputData.name">
    </div>
    <br/>
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
      <!-- <button class="btn btn-primary me-md-2" type="button">Button</button> -->
      <button class="btn btn-primary" type="button" @click="save()">저장하기</button>
    </div>
  </div>
</template>

<script>
import { accountSaveApi } from '@/api/serverApi';
import { Base64 } from 'js-base64';

export default {
  data() {
    return {
      inputData: {
        id: '',
        pwd: '',
        pwdConfirm: '',
        name: '',
        
      },
    }
  },
  methods: {
    async save() {
      console.log('input Data : ', this.inputData, this.autoLogin);
      if (this.inputData.pwd != '' && this.inputData.pwd != this.inputData.pwdConfirm) {
        alert('패스워드와 패스워드 확인이 일치하지 않습니다.');
        return;
      } else if(this.inputData.id == '' || this.inputData.pwd == '' || this.inputData.pwdConfimr == '' || this.inputData.name == '') {
        alert('모든 값을 입력해주세요');
        return;
      }
      let res = await accountSaveApi({
        id: this.inputData.id,
        pwd: Base64.encode(this.inputData.pwd),
        name: this.inputData.name
      });

      console.log('res : ', res);
      if (res.data.resultCode == '200') {
        if (res.data.data.isSaved) {
          alert('저장이 완료 되었습니다');
          this.$router.push('/login');
        } else {
          alert('중복된 Id가 존재하여 저장에 실패 하였습니다');
        }
      }
    }
  }
}
</script>

<style>

</style>