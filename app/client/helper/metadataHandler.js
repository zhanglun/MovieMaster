export const formatDuration = (duration) => {
  var h = Math.floor(duration / 3600);
  var m = Math.floor(duration / 60) % 60;
  var s = Math.floor(duration % 60);

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  return h + ':' + m + ':' + s;
};


export const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + " Bytes";
  else if (bytes < 1048576) return (bytes / 1024).toFixed(3) + " KB";
  else if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + " MB";
  else return (bytes / 1073741824).toFixed(3) + " GB";
};