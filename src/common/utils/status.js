import emitter from "./emitter";

class Status {
  constructor(name) {
    this.name = name;
    this.statusVar = {
      FAIL: -1,
      UN_START: 0,
      ING: 1,
      SUCCESS: 2,
    };
    this.status = this.statusVar.UN_START;
  }

  // 改变状态：成功
  success(params) {
    this.status = this.statusVar.SUCCESS;
    emitter.emit(this.getEventKeyByStatus(this.statusVar.SUCCESS), params);
  }

  // 改变状态：失败
  fail(error) {
    console.info('status:fail', `状态器(${this.name}) 启动失败`);
    this.status = this.statusVar.FAIL;
    emitter.emit(this.getEventKeyByStatus(this.statusVar.FAIL), error);
  }

  // 改变状态：进行中
  ing() {
    this.status = this.statusVar.ING;
  }

  // 改变状态：重置
  reset() {
    this.status = this.statusVar.UN_START;
  }

  // 一定是成功之后，才会返回。
  must() {
    if (this.status === this.statusVar.SUCCESS) return Promise.resolve();
    return Promise
      .resolve()
      .then(() => new Promise((resolve, reject) => {
        emitter.once(this.getEventKeyByStatus(this.statusVar.SUCCESS), resolve);
        emitter.once(this.getEventKeyByStatus(this.statusVar.FAIL), reject);
      }))
      .catch((error) => {
        // 失败了，打印错误，继续监听下一次状态。
        console.warn('status:must:fail', `状态器(${this.name})启动失败)`, error);
        return this.must();
      });
  }

  // 监听后续的一次成功事件
  onceSuccess() {
    return new Promise((resolve) => {
      emitter.once(this.getEventKeyByStatus(this.statusVar.SUCCESS), resolve);
    });
  }

  // 监听后续的一次失败事件
  onceFail() {
    return new Promise((resolve) => {
      emitter.once(this.getEventKeyByStatus(this.statusVar.FAIL), resolve);
    });
  }

  // 是否在进行中
  isIng() {
    return this.status === this.statusVar.ING;
  }

  // 是否已经成功
  isSuccess() {
    return this.status === this.statusVar.SUCCESS;
  }

  // 是否已经失败
  isFail() {
    return this.status === this.statusVar.FAIL;
  }

  // 获取状态器的 key
  getEventKeyByStatus(status) {
    return `${this.name}:${status}`;
  }
}

export default Status;
