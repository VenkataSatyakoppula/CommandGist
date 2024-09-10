import supertest from "supertest";
import createApp from "../utils/server.mjs"
import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";

const app = createApp();
const mockAuthMiddleware = (req, res, next) => {
    req.user = { _id: '123', username: 'testuser' }; // Mock user
    next();
};
app.use(mockAuthMiddleware);

describe("user",()=>{
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
    });
    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });
    describe("get user by id",()=>{
        describe("The user exist",()=>{
            it("should throw 200", async ()=>{
                await supertest(app).get('/user/profile').expect(200);
            });
        });
    });
});