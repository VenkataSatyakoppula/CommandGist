import supertest from "supertest";
import createApp from "../utils/server.mjs"
import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";
import { createUser } from "../services/userService.mjs";

const app = createApp();
jest.mock('passport', () => ({
    authenticate: jest.fn(() => (req, res, next) => {
        req.isAuthenticated = () => true;
        req.user = {_id:"672564e97d741265b60c8e10",username:"testuser",email:"test@exmp.com"};
        next();
    })
}));
const userplayload={
    _id: "672564e97d741265b60c8e10",
    username:"testuser",
    email:"test@exmp.com",
    password:"123456"
  }
describe("user",()=>{
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri()); 
        await createUser(userplayload); 
    });
    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });
    describe("get user by id",()=>{
        describe("The user exist",()=>{
            it("verify user profile", async ()=>{
                const {body,statusCode} = await supertest(app).get(`/user/profile`);
                expect(statusCode).toBe(200);
                expect(body._id).toBe(userplayload._id);
                expect(body.username).toBe(userplayload.username);
                expect(body.email).toBe(userplayload.email);
            });
            it("Update user", async ()=>{
                let updatepayload = {
                    email:"new@test.com",
                    profile:{
                        "first_name":"test"
                    }
                }
                const {body,statusCode} = await supertest(app).put(`/user/update`).send(updatepayload);
                expect(statusCode).toBe(200);
                expect(body.email).toBe(updatepayload.email);
                expect(body.profile.first_name).toBe(updatepayload.profile.first_name);
            });
            it("cannot create user with same _id",async()=>{
               const created =  await supertest(app).post(`/user/`).send(userplayload);
               expect(created.statusCode).toBe(400);

            });
            it("delete user", async ()=>{
                const {body,statusCode} = await supertest(app).delete(`/user/${userplayload._id}`);
                expect(statusCode).toBe(200);
            });
            
        });
    });
});
