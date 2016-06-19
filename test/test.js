var ffmpeg = require('fluent-ffmpeg');

ffmpeg.ffprobe('./test.mp4', function(err, metadata) {
  console.dir(metadata.format);
});

ffmpeg.ffprobe('./test.rmvb', function(err, metadata) {
  console.dir(metadata.format);
});