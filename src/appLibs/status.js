/**
 * 注册全局上的状态监听器
 * 每一个状态监听器示例提供以下方法：
 *      status.success()        改变状态，成功
 *      status.fail()       改变状态，失败
 *      status.ing()    改变状态，进行中
 *      status.onceSuccess()      监听后面的一次成功回调事件
 *      status.onceFail()     监听后面的一次失败回调事件
 *      status.must().then()   一定是等到状态成功后，才进行回调（一些页面必须要依赖某个事件的成功状态，可以使用这个方法）
 */

import Status from '@/common/utils/status';

export default {
  globalData: new Status('globalData')
}
