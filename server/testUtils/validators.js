module.exports ={
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
  },
  validateObjectToHaveProperty: (received, key) => {
    expect(received).not.toHaveProperty("dummy");
    expect(received).toHaveProperty(key);
  },
  validateObjectToHaveProperty: (received, key) => {
    expect(received).not.toHaveProperty("dummy");
    expect(received).toHaveProperty(key);
  },
  validateBooleanValues: (received, boolean) => {
    expect(received).not.toBe(!boolean);
    expect(received).toBe(boolean);
  },

}