const MyClass = require("../src/myClass.js");
const chai = require("chai");
const sinon = require("sinon")
const { expect } = chai;

const chaiaspromise = require("chai-as-promised");
chai.use(chaiaspromise);
const nock = require("nock");

const myObj = new MyClass();

// skip this test suite
describe("Test Unit", function() {
  after(function() {
    console.log("------- After the test suit -------");
  })

  before(function() {
    console.log("------- Before the test suit -------");
  })
  
  afterEach(function() {
    sinon.restore();
    // console.log("------- After each test case -------");
  })

  // beforeEach(function() {
  //   console.log("------- Before each test suit -------");
  // })
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

  it("spy the add method", function() {
    const spy = sinon.spy(myObj, "add");
    const arg1 = 10, arg2 = 20;
    myObj.callAnotherFn(arg1, arg2);
    // sinon.assert.calledOnce(spy);
    expect(spy.calledOnce).to.be.true;
    expect(spy.calledTwice).to.be.false;
    expect(spy.calledWith(arg1, arg2)).to.be.true;
  })

  /** Spy a function (creating a wrapper around it) */
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

/** --------------- Test stub functions ---------------- */

// create new test suite for stub
describe.skip("Test suite for stub", function() {
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


/** --------------- Test promises ---------------- */

// this could be shortened with chai library
describe.skip("Test the promise", function() {
  it("Promise test case", function(done) {
    this.timeout(5000);
    // this.timeout(0); // this means keep waiting util the promise got resolved or rejected
    myObj.testPromise().then(function(result) {
      expect(result).to.be.equal(6);
      expect(false).to.be.false;
      done();
    });
  })
})

/** --------------- Stub Xhr calls ---------------- */

describe("XHR test suit", function() {
  it("Mock and stub xhr call", function(done) {
    this.timeout(0);
    // add interceptor to avoid actual api call
    const scope = nock("https://echo-service-new.herokuapp.com")
      .post("/echo")
      .reply(200, { id: 123 });
    myObj.xhrFn().then(function(result) {
      console.log(result);
      // expect(result).to.be.equal({ id: 123 });
      done();
    }).catch(error => {
      done(new Error("Test case failed"));
    })
  })
})
