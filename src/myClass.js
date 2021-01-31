class MyClass {
  constructor () {
    console.log("initiate");
  }
  // to test mocking (with sinon)
  sayHello() {
    console.log("hello world");
  }

  add (arg1, arg2) {
    let ret;
    ret = arg1 + arg2;
    return ret;
  }

  callAnotherFn(arg1, arg2) {
    this.sayHello();
    const ret = this.add(arg1, arg2);
    return ret;
  }

  callTheCallback(callback) {
    callback();
  }
}

module.exports = MyClass;
