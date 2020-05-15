const SequelizeMock = require("sequelize-mock");
const connectionMock = new SequelizeMock();
const walls = require("../walls.model");

let modelMock;

const {
  validateBooleanValues,
  validateObjectToHaveProperty,
  validateMatchingStringValues,
} = require("../../../testUtils/validators");

describe("walls model unit tests", () => {
  beforeEach(() => {
    modelMock = walls(SequelizeMock, connectionMock);
  });
  it("should validate model name to equal 'walls' ", () => {
    validateMatchingStringValues(modelMock.name, "walls");
  });
  test("table name should be walls", () => {
    validateMatchingStringValues(modelMock.tableName, "walls");
  });
  it("should validate  all the properties from the table", () => {
    validateObjectToHaveProperty(modelMock._defaults, "account_id");
    validateObjectToHaveProperty(modelMock._defaults, "title");
    validateObjectToHaveProperty(modelMock._defaults, "message");
  });
  it("should validate 'account_id ' column properties", () => {
    validateObjectToHaveProperty(modelMock._defaults.account_id, "type");
    validateObjectToHaveProperty(modelMock._defaults.account_id, "allowNull");
    validateMatchingStringValues(
      modelMock._defaults.account_id.type.key,
      /integer/i
    );
    validateBooleanValues(modelMock._defaults.account_id.allowNull, false);
  });
  it("should validate 'title' column properties", () => {
    validateObjectToHaveProperty(modelMock._defaults.title, "type");
    validateObjectToHaveProperty(modelMock._defaults.title, "allowNull");
    validateMatchingStringValues(modelMock._defaults.title.type.key, /string/i);
    validateBooleanValues(modelMock._defaults.title.allowNull, false);
  });
  it("should validate 'message' column properties", () => {
    validateObjectToHaveProperty(modelMock._defaults.message, "type");
    validateObjectToHaveProperty(modelMock._defaults.message, "allowNull");
    validateMatchingStringValues(
      modelMock._defaults.message.type.key,
      /string/i
    );
    validateBooleanValues(modelMock._defaults.message.allowNull, false);
  });
});
