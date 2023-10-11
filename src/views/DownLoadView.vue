<template>
  <div>
    <br/>
    <div class="position-relative py-2 px-4 text-bg-secondary border border-secondary rounded-pill">
      파일 다운로드 <svg width="1em" height="1em" viewBox="0 0 16 16" class="position-absolute top-100 start-50 translate-middle mt-1" fill="var(--bs-secondary)" xmlns="http://www.w3.org/2000/svg"><path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>
    </div>
    <br/>
    <!-- <div>
      <input type="text" v-model="id"  v-on:keyup.enter="getImage()" placeholder="id를 입력하세요"/>
      <button @click="getImage()">가져오기</button>
    </div>
    <div class="mb-3">
      <input class="form-control" type="file" name="file" id="file" >
    </div> -->

    <div class="input-group mb-3">
      <span class="input-group-text" id="inputGroup-sizing-default">저장 ID</span>
      <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" v-model="id" placeholder="ID를 입력하세요">
    </div>

    <div class="d-grid gap-2 d-md-flex justify-content-md-end">      
      <button class="btn btn-primary" type="button" @click="getFile(id)">가져오기</button>
    </div>
    <ul class="list-group">
      <li v-for="item in fileList" :key="item.id" class="list-group-item d-flex justify-content-between align-items-center">
        <span class="col-2 text-truncate text-align:left;" style="width: 80%;">{{ item.orgNm }}</span>
        <span class="badge bg-primary rounded-pill" @click="downloadFile(item)">다운로드</span>
      </li>
    </ul>
    <!-- <div class="progress" role="progressbar" aria-label="Animated striped example" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100">
      <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 75%"></div>
    </div> -->
    <!-- <div>
      <img :src="fileUrl"/>
    </div> -->
  </div>
</template>

<script>
import { getFileApi, getFileList } from '@/api/serverApi'
import { getDeviceType, checkBridgeFunc, executeBridgeFunc } from '@/common/utils'
import jsFileDownloader from "js-file_downloader--emon";


export default {
  data() {
    return {
      imageList: [],
      fileUrl: '',
      fileName: '',
      id: '',
      fileList: [],
      progress: 10,
      deviceType: 'PC',
    }
  },
  mounted(){
    // this.getImage();
    this.getFileList();
    this.deviceType = getDeviceType();
  },
  methods:{
    setCallbackFunc() {
      window.bgFileDownload = this.fileDownload;
    },
    fileDownload(params) {
      console.log('fileDownload : ', params);
    },
    async getFileList() {
      let res = await getFileList();
      console.log('getFileList : ', res);
      if (res.data.resultCode == '200') {
        this.fileList = res.data.data.fileList;
      }
    },
    downloadFile(item) {
      this.getFile(item.id);
    },
    async getFile(id) {
      let res = await getFileApi({id: id});
      console.log('res : ' , res);
      if (res.data.resultCode == '200') {
        this.fileUrl = res.data.data.imageUrl;
        this.fileName = res.data.data.fileName;
        console.log('fileUrl : ', this.fileUrl);
      }

      const fileUrl = this.fileUrl;
      const fileName = this.fileName;

      if (checkBridgeFunc(this.deviceType)) {
        executeBridgeFunc(
          this.deviceType,
          'fileDownload', 
          { callback: 'bgFileDownload', url: fileUrl, fileName: fileName } 
        );
      } else {
        jsFileDownloader(fileUrl, fileName, (progress) => {
        console.log(progress);
        if (progress == 100) {
            alert('다운로드가 완료 되었습니다');
          }
        });
      }
    }
  }
}
</script>

<style>

</style>