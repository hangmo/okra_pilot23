import { serverApi } from './index.js';

function accountSaveApi(param) {
  return serverApi.post('/accountSave', param);
}

function saveFileApi(param) {
  return serverApi.post('/upload', param);
}

function getFileApi(param) {
  return serverApi.get('/download/'+ param.id);
}
function loginApi(param){
  return serverApi.post('/login', param);
}

function getFileList() {
  return serverApi.get('/downloadList')
}

export { accountSaveApi, saveFileApi, getFileApi, loginApi, getFileList };