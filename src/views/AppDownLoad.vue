<template>
  <div>
    <br/>
    <div class="position-relative py-2 px-4 text-bg-secondary border border-secondary rounded-pill">
      앱 다운로드 <svg width="1em" height="1em" viewBox="0 0 16 16" class="position-absolute top-100 start-50 translate-middle mt-1" fill="var(--bs-secondary)" xmlns="http://www.w3.org/2000/svg"><path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>
    </div>
    <br/>
    <ul class="list-group">
      <li class="list-group-item" v-for="item in appDownInfo" :key="item.name">
        <a :href="item.url">{{ item.name }} </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appDownInfo : [
        {name: 'Android App Download', url: 'https://webrtc.co.kr/download/OKRA/app-debug.apk',},
        {name: 'iPhone App Download', url: 'itms-services://?action=download-manifest&url=https://webrtc.co.kr/download/OKRA/manifest.plist'}
      ]
    }
  }
}
</script>

<style>

</style>