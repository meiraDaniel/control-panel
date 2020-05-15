const config = require("../sequelizeConfig");

const {
  
  validateObjectDataType,
} = require("../../../testUtils/validators");

  it("should validate configuration as an object", () => {
      validateObjectDataType(config);
    });
