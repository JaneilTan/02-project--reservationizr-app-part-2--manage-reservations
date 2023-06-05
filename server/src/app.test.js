const request = require("supertest");
const app = require("./app");

describe("app", () => {
    test("POST /reservations creates a new reservation", async () => {
        const expectedStatus = 201;
        const body = {
            id: "507f1f77bcf86cd799439011",
            partySize: 4,
            date: "2023-11-17T06:30:00.000Z",
            userId: "mock-user-id",
            restaurantName: "Island Grill"
        };
    
        await request(app)
          .post("/reservations")
          .send(body)
          .expect(expectedStatus)
          .expect((response) => {
            expect(response.body).toEqual(expect.objectContaining(body));
            expect(response.body.id).toBeTruthy();
          });
      });
    
      test("POST /reservations returns a 400 when an invalid request body is provided", async () => {
        const expectedStatus = 400;
        const body = {};
    
        await request(app).post("/reservations").send(body).expect(expectedStatus);
      });
    
      test("POST /reservations returns a 401 when a user is not authenticated", async () => {
        const expectedStatus = 401;
        const body = {};
    
        await request(app).post("/reservations").send(body).expect(expectedStatus);
      });

      
    test("GET /reservations returns a list of reservations", async () => {
        const expectedStatus = 200;
        const expectedBody = [
            {
                id: "507f1f77bcf86cd799439011",
                partySize: 4,
                date: "2023-11-17T06:30:00.000Z",
                userId: "mock-user-id",
                restaurantName: "Island Grill"
            },
            {
                id: "614abf0a93e8e80ace792ac6",
                partySize: 2,
                date: "2023-12-03T07:00:00.000Z",
                userId: "mock-user-id",
                restaurantName: "Green Curry"
            },
            {
                id: "61679189b54f48aa6599a7fd",
                partySize: 2,
                date: "2023-12-03T07:00:00.000Z",
                userId: "another-user-id",
                restaurantName: "Green Curry"
            }
        ]

          await request(app)
            .get("/reservations")
            .expect(expectedStatus)
            .expect((response) => {
                expect(response.body).toEqual(expectedBody);
            });
    });
});

test("Get /reservations/:id should respond with a single reservation", async () => {
    
    
    const expected = {
            id: "507f1f77bcf86cd799439011",
            partySize: 4,
            date: "2023-11-17T06:30:00.000Z",
            userId: "mock-user-id",
            restaurantName: "Island Grill"
        };

    await request(app)
    .get("/reservations/507f1f77bcf86cd799439011")
    .expect(200)
    .expect((res) => {
        expect(res.body).toEqual(expected);
    });
});

test("Get /reservations/:id should respond with a 400 error with invalid ids", async () => {
    
    await request(app)
     .get("/reservations/111")
     .expect(400)
});
test("Get /reservations/:id should respond with a 401 error with unauthorized user", async () => {
    
    await request(app)
     .get("/reservations")
     .expect(401)
});
test("Get /reservations/:id should respond with a 403 error for user trying to access reservation they did not create", async () => {
    
    await request(app)
     .get("/reservations")
     .expect(403)
});

test("Get /reservations/:id should respond with a 404 error with non-existing reservation", async () => {
    
   await request(app)
    .get("/reservations")
    .expect(404)
});

