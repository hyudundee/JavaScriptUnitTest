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

  testPromise() {
    return new Promise(function(resolve, reject) {
      setTimeout(() => resolve(3), 3000);
    }).then(function(result) {
      return result * 2;
    })
  }

  callTheCallback(callback) {
    callback();
  }
}

module.exports = MyClass;
