const app = require("../../src/app");
const User = require("../../src/models/User");
const Article = require("../../src/models/Article");
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
  test("log out user", async () => {
    const response = await request(app)
      .post("/api/me/logout")
      .set("Cookie", "auth_token=" + userOne.tokens[0].token)
      .send({})
      .expect(200);

    expect(response.body.user).toBeUndefined();

    User.findById(userOneId).then((user) => {
      expect.not.objectContaining({
        token: expect.any(String(userOne.tokens[0].token)),
      });
    });
  });
  test("User.create article", async () => {
    const article_test = {
      Name: "ArticleDro",
      detailtName: "ArticleDro",
      categories: ["Bücher1", "Sience1", "Hermann1", "KaNdrdIAsruNzoh1"],
      basis_fornegotioations: "Festpreis",
      article_type: "Ich Suche",
      price: 4455,
      private: false,
    };

    const response = await request(app)
      .post("/api/me/articles")
      .set("Cookie", `auth_token=${userOne.tokens[0].token}`)
      .send(article_test)
      .expect(200);

    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("Name");
    expect(response.body).toHaveProperty("detailtName");
    expect(response.body).toHaveProperty("categories");
    expect(response.body).toHaveProperty("basis_fornegotioations");
    expect(response.body).toHaveProperty("article_type");
    expect(response.body).toHaveProperty("price");
    expect(response.body).toHaveProperty("private");
    expect(response.body).toHaveProperty("owner");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("__v");
    expect(response.body.Name).toEqual("ArticleDro");
    expect(response.body.detailtName).toEqual("ArticleDro");
    expect(response.body.categories).toEqual([
      "Bücher1",
      "Sience1",
      "Hermann1",
      "KaNdrdIAsruNzoh1",
    ]);
    expect(response.body.basis_fornegotioations).toEqual("Festpreis");
    expect(response.body.article_type).toEqual("Ich Suche");
    expect(response.body.price).toEqual(4455);
    expect(response.body.private).toEqual(false);
    expect(String(response.body.owner)).toEqual(String(userOneId));
  });
  test.todo("User.delete article");
  test.todo("User.add friend");
  test.todo("User.remove friend");
  test.todo("User.delete self");
  test.todo("User.set specific information");
});
