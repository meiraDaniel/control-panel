const SequelizeMock = require("sequelize-mock");
const connectionMock = new SequelizeMock();
const todos = require("../todos.model");

let modelMock;

const {
  validateBooleanValues,
  validateObjectToHaveProperty,
  validateMatchingStringValues,
} = require("../../../testUtils/validators");

describe("todos model unit tests", () => {
  beforeEach(() => {
    modelMock = todos(SequelizeMock, connectionMock);
  });
  it("should validate model name to equal 'todos' ", () => {
    validateMatchingStringValues(modelMock.name, "todos");
  });
  test("table name should be todos", () => {
    validateMatchingStringValues(modelMock.tableName, "todos");
  });
  it("should validate  all the properties from the table", () => {
    validateObjectToHaveProperty(modelMock._defaults, "account_id");
    validateObjectToHaveProperty(modelMock._defaults, "task");
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
  it("should validate 'task ' column properties", () => {
    validateObjectToHaveProperty(modelMock._defaults.task, "type");
    validateObjectToHaveProperty(modelMock._defaults.task, "allowNull");
    validateMatchingStringValues(modelMock._defaults.task.type.key, /string/i);
    validateBooleanValues(modelMock._defaults.task.allowNull, false);
  });
});
