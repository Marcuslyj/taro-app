import mitt from 'mitt';

const emitter = mitt();

// Bind an event to only be triggered a single time. After the first time
// the callback is invoked, it will be removed.
emitter.once = function (ev, fn) {
  const _once = function(...params) {
    emitter.off(ev, _once)
    fn.apply(this, params)
  }
  return emitter.on(ev, _once)
}

export default emitter