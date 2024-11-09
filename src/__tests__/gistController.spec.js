import supertest from "supertest";
import createApp from "../utils/server.mjs"
import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";
import { createUser } from "../services/userService.mjs";
import { gistCreate } from "../services/gistService.mjs";


const app = createApp();
jest.mock('passport', () => ({
    authenticate: jest.fn(() => (req, res, next) => {
        req.isAuthenticated = () => true;
        req.user = {_id:"672564e97d741265b60c8e10",username:"testuser",email:"test@exmp.com"};
        next();
    })
}));
const usersplayload= [{
    _id: "672564e97d741265b60c8e10",
    username:"testuser",
    email:"test@exmp.com",
    password:"123456"
  },
  {
    _id: "672564e97d741265b60c8e11",
    username:"testuser2",
    email:"test2@exmp.com",
    password:"123456"
  }
]
const gists_payload = [{
     _id:"672564e97d741265b60c8e12", 
     title:"gist1",
     slug:"gist1",
     content:"test-content",
     author_id: "672564e97d741265b60c8e10" 
},{
     _id:"672564e97d741265b60c8e13", 
     title:"gist2",
     slug:"gist2",
     content:"test-content2",
     author_id: "672564e97d741265b60c8e11" 
}] 
describe("gist",()=>{
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri()); 
    // Create users 
     usersplayload.forEach( async (element) => {
       await createUser(element); 
     });
     gists_payload.forEach( async (element)=> {
      await gistCreate(element); 
     });
    });
    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });
    describe("GIST CRUD",()=>{
        it("get logged in user gists",async ()=>{
                const {body,statusCode} = await supertest(app).get(`/gist/`);
                expect(statusCode).toBe(200);
                expect(Array.isArray(body)).toBe(true);
                expect(body.length).toBe(1);
                expect(body[0]._id).toBe(gists_payload[0]._id);
                expect(body[0]["author_id"]["_id"]).toBe(usersplayload[0]._id);
        });
    });
});



















