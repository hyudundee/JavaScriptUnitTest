const MyClass = require("../src/myClass.js");
const chai = require("chai");

const { expect } = chai;

const myObj = new MyClass();

describe("Test Unit", function() {
  it("Test the add method", function() {
    expect(myObj.add(1, 2)).to.be.equal(3);
  })
})
