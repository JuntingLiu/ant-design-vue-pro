import { check } from '../utils/auth';

/**
 * 自定义权限指令
 * 缺点：在第一次渲染后，权限值更改了，组件删除了就不会再加回来了
 * 权限一般不会随意变动，所以使用指令还是可以的
 * @param {Object} Vue
 * @param {Object} options
 */
function install(Vue, options = {}) {
  Vue.directive(options.name || 'auth', {
    inserted(el, binding) {
      const { value } = binding;
      if (!check(value)) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  });
}

export default {
  install
};
