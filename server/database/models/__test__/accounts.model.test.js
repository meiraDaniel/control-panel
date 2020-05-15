const SequelizeMock = require("sequelize-mock");
const connectionMock = new SequelizeMock();
const accounts = require("../accounts.model");


let modelMock

const {validateBooleanValues,validateObjectToHaveProperty,validateMatchingStringValues}=require("../../../testUtils/validators");


describe("accounts model unit tests", () => {
    beforeEach(() => {
      modelMock = accounts(SequelizeMock, connectionMock);
    });
    it("should validate model name to equal 'accounts' ", () => {
        validateMatchingStringValues(modelMock.name, "accounts");
      });
    test('table name should be accounts',()=>{
        validateMatchingStringValues(modelMock.tableName,'accounts')
    })
    it("should validate  all the properties from the table", () => {
        validateObjectToHaveProperty(modelMock._defaults, "firstname");
       validateObjectToHaveProperty(modelMock._defaults, "lastname");
        validateObjectToHaveProperty(modelMock._defaults, "email");
        validateObjectToHaveProperty(modelMock._defaults, "role");
        validateObjectToHaveProperty(modelMock._defaults, "adm");
        validateObjectToHaveProperty(modelMock._defaults, "avatar"); 

      });
      it("should validate 'lastname ' column properties", () => {
        validateObjectToHaveProperty(modelMock._defaults.firstname , "type");
        validateObjectToHaveProperty(modelMock._defaults.firstname , "allowNull");
        validateMatchingStringValues(modelMock._defaults.firstname.type.key, /string/i);
        validateBooleanValues(modelMock._defaults.firstname.allowNull, false);
      });
      it("should validate 'email ' column properties", () => {
        validateObjectToHaveProperty(modelMock._defaults.email , "type");
        validateObjectToHaveProperty(modelMock._defaults.email , "allowNull");
        validateMatchingStringValues(modelMock._defaults.email.type.key, /string/i);
        validateBooleanValues(modelMock._defaults.email.allowNull, false);
      });
      it("should validate 'role ' column properties", () => {
        validateObjectToHaveProperty(modelMock._defaults.role , "type");
        validateObjectToHaveProperty(modelMock._defaults.role , "allowNull");
        validateMatchingStringValues(modelMock._defaults.role.type.key, /string/i);
        validateBooleanValues(modelMock._defaults.role.allowNull, true);
      });
      it("should validate 'adm' column properties", () => {
        validateObjectToHaveProperty(modelMock._defaults.adm , "type");
        validateObjectToHaveProperty(modelMock._defaults.adm , "allowNull");
        validateMatchingStringValues(modelMock._defaults.adm.type.key, /BOOLEAN/i);
        validateBooleanValues(modelMock._defaults.adm.allowNull, true);
      });
      it("should validate 'avatar' column properties", () => {
        validateObjectToHaveProperty(modelMock._defaults.avatar , "type");
        validateObjectToHaveProperty(modelMock._defaults.avatar , "allowNull");
        validateMatchingStringValues(modelMock._defaults.avatar.type.key, /blob/i);
        validateBooleanValues(modelMock._defaults.avatar.allowNull, true);
      });

})
