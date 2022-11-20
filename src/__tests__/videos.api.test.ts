import request from "supertest";
import {app} from "../index";

describe('/videos', () => {

  beforeAll(() => {
    request(app).delete('/testing/alldata');
  })

  it('Should return 200 and 0 elem in Array', async () => {
    await request(app).get('/videos').expect(200, )
  })

  it('Should return 404 on non-existing id', async () => {
    await request(app).get('/videos/-23').expect(404);
  })

  it('Should return error if creating without author', async () => {
    const response = await request(app).post('/videos/' ).send({title:'123'});
    console.log(response);
  })
})