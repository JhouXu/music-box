"use strict"
// 1.输入名字之后回车搜索
// 2.点击歌曲获取当前歌曲的评论，并且播放
// 3.判断是否有mv地址，播放mv视频 /mv/url?id=5436712
// 4.暂停时动画停止，mv关闭时
let app = new Vue({
  el: "#app",
  data: {
    "searchName": "",
    "musicList": [],
    "musicUrl": "",
    "picUrl": "./images/bg.jpg",
    "commentList": "",
    "isPlaying": false,
    "playName": "随心所听，快来搜索！",
    "mvUrl": "",
    "mvDisplay": false,
  },
  methods: {
    // 获取歌曲列表
    searchMusic: function () {
      let that = this;
      axios.get("https://autumnfish.cn/search?keywords="+this.searchName)
      .then(function(request) {
        that.musicList = request.data.result.songs;
      }).catch(function(err){
        console.log(err);
      })
    },
    // 获取歌曲地址并播放
    // 获取专辑封面图，进行切换
    // 获取评论进行展示
    searchMusicUrl: function (musicId, playName) {
      let that = this;
      this.playName = playName;
      axios.get("https://autumnfish.cn/song/url?id="+musicId)
      .then(function(request) { 
        that.musicUrl = request.data.data[0].url;
      }).catch(function(err){
        console.log(err);
      }),
      axios.get("https://autumnfish.cn/song/detail?ids="+musicId)
      .then(function(request) { 
        that.picUrl = request.data.songs[0].al.picUrl;
      }).catch(function(err){
        console.log(err);
      })
      axios.get("https://autumnfish.cn/comment/music?id="+musicId)
      .then(function(request) { 
        that.commentList = request.data.comments;
      }).catch(function(err){
        console.log(err);
      })
    },
    // audio播放事件
    play: function () {
      this.isPlaying = true;
    },
    // audio暂停事件
    pause: function () {
      this.isPlaying = false;
    },
    // 获取mv地址,并且播放mv
    searchMvUrl: function (mvId) {
      let that = this;
      axios.get("https://autumnfish.cn/mv/url?id="+mvId)
      .then(function(request) {
        that.mvUrl = request.data.data.url;
        that.mvDisplay = "true";
        that.musicUrl = "";
        that.isPlaying = false;
        that.picUrl = "./images/bg.jpg",
        that.playName = "随心所听，快来搜索！";
      }).catch(function(err){
        console.log(err);
      })
    },
    // 关闭mv
    clearMv: function () {
      this.mvUrl = "";
      this.mvDisplay = false;
    }
  }
})