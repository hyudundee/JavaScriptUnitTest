const MyClass = require("../src/myClass.js");
const chai = require("chai");
const sinon = require("sinon")
const { expect } = chai;

const myObj = new MyClass();

// skip this test suite
describe.skip("Test Unit", function() {
  it("Test the add method", function() {
    // expect is prefered for readability
    expect(myObj.add(1, 2)).to.be.equal(3);
  });

  // spy creates a wrapper around the targeted function, like a CCTV
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

  // passing spy object in
  it("spy the callback method", function() {
    const callback = sinon.spy();
    myObj.callTheCallback(callback);
    expect(callback.calledOnce).to.be.true;
  })

  // to ignore the sayHello method called inside callAnotherFn(), mock is needed
  // hello is not printed out in this unit test
  it("mock the sayHello method", function() {
    const mock = sinon.mock(myObj); // not change the method but create a wrapper around it
    const expectation = mock.expects("sayHello");
    expectation.exactly(1);
    // expectation.withArgs("hello world");
    // expectation.exactly(2);  // failed because only called once
    myObj.callAnotherFn(10, 20);
    mock.verify();  // verify all the expectations
  })
})

// create new test suite for stub
describe("Test suite for stub", function() {
  it("Stub the add method", function() {
    const stub = sinon.stub(myObj, "add");
    stub
      .withArgs(10, 20)
      .onFirstCall()
      .returns(100)
      .onSecondCall()
      .returns(200); // when add() was called with 10, 20 we assume it will returns 100
    expect(myObj.callAnotherFn(10, 20)).to.be.equal(100);
    expect(myObj.callAnotherFn(10, 20)).to.be.equal(200);
  })
})