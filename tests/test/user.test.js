const app = require("../../src/app");

const request = require("supertest");
const {
  userOneId,
  userOne,
  userTwo,
  userTwoId,
  articleOne,
  articleTwo,
  setUpDatabase,
} = require("../constantan/fabric");
describe("User.self functions", () => {
  beforeEach(setUpDatabase);

  test("User get own Information", async () => {
    const response = await request(app)
      .get("/api/me")
      .set("Cookie", `auth_token=${userOne.tokens[0].token}`)
      .send()
      .expect(200);

    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("grade");
    expect(String(response.body._id)).toBe(String(userOne._id));
    expect(response.body.name).toEqual(userOne.name);
    expect(response.body.grade).toEqual(userOne.grade);
  });

  test("User get own not logt in", async () => {
    const response = await request(app).get("/api/users/me").send().expect(401);
    expect(response.body).not.toHaveProperty("_id");
    expect(response.body).not.toHaveProperty("name");
    expect(response.body).not.toHaveProperty("sit");
    expect(response.body).not.toHaveProperty("grade");
  });
  // test.todo("User.login");
  test.todo("User.logout");
  test.todo("User.create article");
  test.todo("User.delete article");
  test.todo("User.add friend");
  test.todo("User.remove friend");
  test.todo("User.delete self");
  test.todo("User.set specific information");
});
