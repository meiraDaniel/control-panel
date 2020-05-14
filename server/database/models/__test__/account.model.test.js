const SequelizeMock = require("sequelize-mock");
const connectionMock = new SequelizeMock();
const accounts = require("../accounts.model");


let modelMock

const {validadeTruthiness,validateMatchingStringValues,validateObjectDataType}=require("../../../testUtils/validators")
describe("accounts model unit tests", () => {
    beforeEach(() => {
      modelMock = accounts(SequelizeMock, connectionMock);
    });

    test('table name should be accounts',()=>{
        validateMatchingStringValues(modelMock.tableName,'accounts')
    })
})