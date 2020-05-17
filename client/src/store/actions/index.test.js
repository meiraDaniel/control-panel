    
import { createSession, logout, getId } from "./index";
describe("createSession", () => {
  test("returns an action with type `CREATE_SESSION`", () => {
    const action = createSession();
    expect(action).toHaveProperty(
      "type",
      "id",
      "token",
      "firstname",
      "lastname",
      "adm",
      "role",
      "avatar",
      "email"
    );
  });
  test("returns an action logout with type `CREATE_SESSION`", () => {
    const action = logout();
    expect(action).toHaveProperty("type", "CREATE_SESSION");
    expect(action).toHaveProperty(
        "type",
        "id",
        "token",
        "firstname",
        "lastname",
        "adm",
        "role",
        "avatar",
        "email"
    );
  });
  test("returns an action with type `GET_ID`", () => {
    const action = getId();
    expect(action).toHaveProperty("type", "GET_ID");
    expect(action).toHaveProperty(
              'account_id'
        );
  });
});