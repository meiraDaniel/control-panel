module.export ={
validadeTruthiness:(received)=>{
    expect(received).not.toBeNull();
    expect(received).toBeTruthy(); 
},
validateMatchingStringValues: (received1, received2) => {
    expect(received1).not.toMatch("dummy");
    expect(received1).toMatch(received2);
  },
  validateObjectDataType: (received) => {
    expect(typeof received).not.toBe("string");
    expect(typeof received).toBe("object");
  }
}