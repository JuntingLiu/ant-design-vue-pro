/**
 * 当前文件目录不在 src 下，需要导出得采用 node 模块化 CommonJS
 * @Author: Junting.liu
 * @Date: 2019-05-27 22:28:59
 * @Last Modified by: Junting.liu
 * @Last Modified time: 2019-06-05 23:01:34
 */

function chart(method) {
  let res = null;
  switch (method) {
    case 'GET':
      res = [20, 30, 78, 68, 99, 36];
      break;
    default:
      res = null;
  }
  return res;
}

module.exports = chart;
