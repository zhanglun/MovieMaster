var ffmpeg = require('fluent-ffmpeg');

ffmpeg.ffprobe('D:\\电影\\Cinderella (2015) [1080p]\\Cinderella.2015.1080p.BluRay.x264.YIFY.mp4', function(err, metadata) {
  console.dir(metadata.format);
  var time = timeFormat(metadata.format.duration, ':')
  console.log('片长：', time);
});

var timeFormat = function (time,flag) {
  var h = Math.floor(time / 3600)
  var m = Math.floor(time / 60) % 60
  var s = time % 60

  h = h<10?"0"+h:h
  m = m<10?"0"+m:m
  s = s<10?"0"+s:s

  if(flag)
    return h + ':'+ m + ':' + s
  else
    return h + '_'+ m + '_' + s
}