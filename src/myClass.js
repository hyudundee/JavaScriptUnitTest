class MyClass {
  constructor () {
    console.log("initiate");
  }

  add (arg1, arg2) {
    let ret;
    ret = arg1 + arg2;
    return ret;
  }
}

module.exports = MyClass;
