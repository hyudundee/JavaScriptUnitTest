class MyClass {
  constructor () {
    console.log("initiate");
  }

  add (arg1, arg2) {
    let ret;
    ret = arg1 + arg2;
    return ret;
  }

  callAnotherFn(arg1, arg2) {
    const ret = this.add(arg1, arg2);
    return ret;
  }

  callTheCallback(callback) {
    callback();
  }
}

module.exports = MyClass;
