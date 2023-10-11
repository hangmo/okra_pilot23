<template>
  <div>
    <br/>
    <div class="position-relative py-2 px-4 text-bg-secondary border border-secondary rounded-pill">
      파일 업로드 - 파일 크기({{ fileSize }}MB)<svg width="1em" height="1em" viewBox="0 0 16 16" class="position-absolute top-100 start-50 translate-middle mt-1" fill="var(--bs-secondary)" xmlns="http://www.w3.org/2000/svg"><path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>
    </div>
    <br/>
    <!-- <form :action="getServerUrl() + 'upload'" method="post" enctype="multipart/form-data">
      <h4>단일 파일 업로드</h4>
      <input type="file" name="file">
                   
         <h4>다중 파일 업로드</h4>
         <input type="file" multiple="multiple" name="files">
    
      <input type="submit"/>
    </form> -->
    <div class="mb-3">
      <input class="form-control" type="file" name="file" id="file" @change="fileChange($event)">
    </div>

    <div class="d-grid gap-2 d-md-flex justify-content-md-end">      
      <button class="btn btn-primary" type="button" @click="saveImage()">저장</button>
    </div>
    <!-- <input type="file" name="file" id="file" /> -->
    <!-- <button @click="saveImage">저장</button> -->
  </div>
</template>

<script>
import {saveFileApi} from '@/api/serverApi'

export default {
  data() {
    return {
      fileSize:0,
    }
  },
  methods:{
    getServerUrl() {
      return process.env.VUE_APP_SERVER_URL
    },
    async saveImage(){
      const FileElement = document.querySelector('#file');
      const formData = new FormData();

      formData.append('file', FileElement.files[0]);

      let res = await saveFileApi(formData);
      console.log('res : ', res);
      if (res.data.resultCode == "200") {
        alert('서버에 저장 되었습니다. ' + res.data.data.fileId);
      }
    },
    fileChange(event){
      const file = event.target.files[0];
      console.log('file Size : ', file.size);
      this.fileSize = (file.size / 1024 / 1024).toFixed(2);
    }
  }
}
</script>

<style>

</style>