/* Constants */
var YEAR_REGEX = /(19|20)\d{2}/g;

let stripIllegalCharacters = function (movieTitle, replacementString) {
  return movieTitle.replace(/,|\[|\]|【|】|\.|_|\/|\+|\-|(\d+x\d+)|end|@/gi, replacementString);
};

let removeYearFromTitile = (title, replacestring) => {
  return title.replace(YEAR_REGEX, '').replace(/\(|\)/g, '');
};

/**
 * 影片发布组 压制组 字幕组
 * @param movieTitle
 * @returns {XML|*|void|string}
 */
let removeReleaseGroupNamesFromTitle = function (movieTitle) {
  return movieTitle.replace(
    /FxM|aAF|arc|AAC|MLR|AFO|TBFA|WB|JYK|ARAXIAL|UNiVERSAL|ETRG|ToZoon|PFa|SiRiUS|Rets|BestDivX|DIMENSION|CTU|ORENJI|LOL|juggs|NeDiVx|ESPiSE|MiLLENiUM|iMMORTALS|QiM|QuidaM|COCAiN|DOMiNO|JBW|LRC|WPi|NTi|SiNK|HLS|HNR|iKA|LPD|DMT|DvF|IMBT|LMG|DiAMOND|DoNE|D0PE|NEPTUNE|TC|SAPHiRE|PUKKA|FiCO|PAL|aXXo|VoMiT|ViTE|ALLiANCE|mVs|XanaX|FLAiTE|PREVAiL|CAMERA|VH-PROD|BrG|replica|FZERO|YIFY|MarGe|T4P3|MIRCrew|BOKUTOX|NAHOM|BLUWORLD|C0P|TRL|人人影视制作|cmct|CnSCG|wofei|dts|chd|THORA|SPARKS/gi,
    "");
};

/**
 * 音频标签
 * @param movieTitle
 * @returns {XML|*|void|string}
 */
let removeAudioTypesFromTitle = function (movieTitle) {
  return movieTitle.replace(
    /320kbps|192kbps|128kbps|mp3|320|192|128|acc|bd|mp4/gi,
    "");
};

/**
 * 资源类型
 * @param movieTitle
 * @returns {XML|*|void|string}
 */
let removeMovieTypeFromTitle = function (movieTitle) {
  return movieTitle.replace(
    /dvdrip|multi9|xxx|x264|x265|web|hr|hdtv|rip|vhs|HC|embeded|embedded|ac3|dd5 1|m sub|x264|dvd5|dvd9|multi sub|non|h264|x264| sub|subs|ntsc|ingebakken|torrent|torrentz|bluray|brrip|sample|xvid|cam|camrip|wp|workprint|telecine|ppv|ppvrip|scr|screener|dvdscr|bdscr|ddc|R5|telesync|pdvd|1080p|BDRIP|hq|sd|720p|hdrip|hd-/gi,
    "");
};

/**
 * 国家或者地区
 * @param movieTitle
 * @returns {XML|*|void|string}
 */
let removeCountryNamesFromTitle = function (movieTitle) {
  return movieTitle.replace(
    /\b(NL|SWE|SWESUB|ENG|JAP|BRAZIL|TURKIC|slavic|SLK|ITA|HEBREW|HEB|ESP|RUS|DE|german|french|FR|ESPA|dansk|HUN|iTALiAN|JPN|Chi|[Ii]ta|[Ee]ng)\b/gi,
    "");
};

/**
 * 下载站点地址
 * @param title
 * @returns {XML|*|void|string}
 */
let removeSiteURL = function (title) {
  return title.replace(/bbsd\.wofei\.net|www\.dream\.cn/ig, '');
};

/**
 * 后缀名
 * @param title
 * @returns {string}
 */
let removeSuffix = function (title) {
  title = title.split('\.');
  title.pop();
  return title.join('.');
};

export const cleanTitle = (title) => {
  let cleanTitle = title;

  cleanTitle = removeSuffix(cleanTitle);
  cleanTitle = removeSiteURL(cleanTitle);
  cleanTitle = stripIllegalCharacters(cleanTitle, ' ');
  cleanTitle = removeYearFromTitile(cleanTitle);
  cleanTitle = removeReleaseGroupNamesFromTitle(cleanTitle);
  cleanTitle = removeAudioTypesFromTitle(cleanTitle);
  cleanTitle = removeMovieTypeFromTitle(cleanTitle);
  cleanTitle = removeCountryNamesFromTitle(cleanTitle);

  // 获取年份
  var year = title.match(YEAR_REGEX);
  year = year ? year.toString() : '';
  var suffix = title.split('\.').pop();

  return { title: cleanTitle.trim(), year: year, suffix: suffix };

};
