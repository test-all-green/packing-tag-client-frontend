
export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
  };
  for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + '';
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};

export function formatDate2(date) {
  let str = '';
  let newDate = String(date)
  str += newDate.substring(0,4) + '-' + newDate.substring(4, 6) + '-' + newDate.substring(6, 8) + ' ' + newDate.substring(8,10) + ':' + newDate.substring(10, 12) + ":" +newDate.substring(12, 14);
  return str;
}