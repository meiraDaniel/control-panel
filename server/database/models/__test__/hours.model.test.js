const SequelizeMock = require("sequelize-mock");
const connectionMock = new SequelizeMock();
const hours = require("../hours.model");


let modelMock

const {validateBooleanValues,validateObjectToHaveProperty,validateMatchingStringValues}=require("../../../testUtils/validators");


describe("hours model unit tests", () => {
    beforeEach(() => {
      modelMock = hours(SequelizeMock, connectionMock);
    });
    it("should validate model name to equal 'hours' ", () => {
        validateMatchingStringValues(modelMock.name, "hours");
      });
    test('table name should be hours',()=>{
        validateMatchingStringValues(modelMock.tableName,'hours')
    })
    it("should validate  all the properties from the table", () => {
        validateObjectToHaveProperty(modelMock._defaults, "day");
       validateObjectToHaveProperty(modelMock._defaults, "month");
        validateObjectToHaveProperty(modelMock._defaults, "hour");
        validateObjectToHaveProperty(modelMock._defaults, "account_id");
        validateObjectToHaveProperty(modelMock._defaults, "project");
      });
      it("should validate 'day ' column properties", () => {
        validateObjectToHaveProperty(modelMock._defaults.day , "type");
        validateObjectToHaveProperty(modelMock._defaults.day , "allowNull");
        validateMatchingStringValues(modelMock._defaults.day.type.key, /INTEGER/i);
        validateBooleanValues(modelMock._defaults.day.allowNull, false);
      });
      it("should validate 'month ' column properties", () => {
        validateObjectToHaveProperty(modelMock._defaults.month , "type");
        validateObjectToHaveProperty(modelMock._defaults.month , "allowNull");
        validateMatchingStringValues(modelMock._defaults.month.type.key, /INTEGER/i);
        validateBooleanValues(modelMock._defaults.month.allowNull, false);
      });
      it("should validate 'hour ' column properties", () => {
        validateObjectToHaveProperty(modelMock._defaults.hour , "type");
        validateObjectToHaveProperty(modelMock._defaults.hour , "allowNull");
        validateMatchingStringValues(modelMock._defaults.hour.type.key, /INTEGER/i);
        validateBooleanValues(modelMock._defaults.hour.allowNull, false);
      });
      it("should validate 'account_id' column properties", () => {
        validateObjectToHaveProperty(modelMock._defaults.account_id , "type");
        validateObjectToHaveProperty(modelMock._defaults.account_id , "allowNull");
        validateMatchingStringValues(modelMock._defaults.account_id.type.key, /INTEGER/i);
        validateBooleanValues(modelMock._defaults.account_id.allowNull, false);
      });
      it("should validate 'project' column properties", () => {
        validateObjectToHaveProperty(modelMock._defaults.project , "type");
        validateObjectToHaveProperty(modelMock._defaults.project , "allowNull");
        validateMatchingStringValues(modelMock._defaults.project.type.key, /string/i);
        validateBooleanValues(modelMock._defaults.project.allowNull, true);
      });

})
