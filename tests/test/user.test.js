const { response } = require('express');
cosnt app = require('../../src/app');

const request = require('supertest');
const { 
userOneId,
userOne,
userTwo,
userTwoId,
articleOne,
articleTwo,
setUpDatabase, } = require('../constantan/fabric');



describe("User.self functions", () => {
  
  
  
  
  test("User get own Information", async () => {

      const response = await request(app)



  });
  test.todo("User.set specific information");
  test.todo("User.delete self");
  test.todo("User.login");
  test.todo("User.logout");
  test.todo("User.create article");
  test.todo("User.delete article");
  test.todo("User.add friend");
  test.todo("User.remove friend");
  
});


