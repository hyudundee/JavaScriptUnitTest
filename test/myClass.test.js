const MyClass = require("../src/myClass.js");
const chai = require("chai");
const sinon = require("sinon")
const { expect } = chai;

const myObj = new MyClass();

describe("Test Unit", function() {
  it("Test the add method", function() {
    // expect is prefered for readability
    expect(myObj.add(1, 2)).to.be.equal(3);
  });

  // using spy to monitor the function
  it("spy the add method", function() {
    const spy = sinon.spy(myObj, "add");
    const arg1 = 10, arg2 = 20;
    myObj.callAnotherFn(arg1, arg2);
    // sinon.assert.calledOnce(spy);
    expect(spy.calledOnce).to.be.true;
    expect(spy.calledTwice).to.be.false;
    expect(spy.calledWith(arg1, arg2)).to.be.true;
  })

  it("spy the callback method", function() {
    const callback = sinon.spy();
    myObj.callTheCallback(callback);
    expect(callback.calledOnce).to.be.true;
  })
})

