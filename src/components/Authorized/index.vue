<script>
/**
 * 函数式组件 - 权限组件（全局）
 * @Author: Junting.liu
 * @Date: 2019-05-21 22:57:14
 * @Last Modified by: Junting.liu
 * @Last Modified time: 2019-05-21 23:06:13
 */

import { check } from "../../utils/auth";

export default {
  functional: true,
  props: {
    authority: {
      type: Array,
      required: true
    }
  },
  render(h, context) {
    // scopedSlots 子组件插槽内容
    const { props, scopedSlots } = context;
    return check(props.authority) ? scopedSlots.default() : null;
  }
};
</script>
