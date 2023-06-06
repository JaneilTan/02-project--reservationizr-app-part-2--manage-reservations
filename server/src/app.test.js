const request = require("supertest");
const app = require("./app");

// Reservations
describe("Reservation API", () => {
describe("POST /reservations", () => {
    it("Should create a new reservation", async () => {
        const expectedStatus = 201;
        const body = {
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
    
    it("Should respond with 400 when an invalid request body is provided", async () => {
        const expectedStatus = 400;
        const body = {};
    
        await request(app).post("/reservations").send(body).expect(expectedStatus);
      });
});   
describe("GET /reservations", () => {      
    it("Should return a list of reservations", async () => {
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
describe("GET /reservations/:id", () => {
    it("Should respond with a single reservation", async () => {
    
        const expectedStatus = 200;
        const expectedBody = {
            id: "507f1f77bcf86cd799439011",
            partySize: 4,
            date: "2023-11-17T06:30:00.000Z",
            userId: "mock-user-id",
            restaurantName: "Island Grill"
        };

        await request(app)
        .get("/reservations/507f1f77bcf86cd799439011")
        .expect(expectedStatus)
        .expect((res) => {
            expect(res.body).toEqual(expectedBody);
        });
});

    it("Should respond with a 400 error with invalid ids", async () => {
    
        await request(app)
        .get("/reservations/111")
        .expect(400)
    });

    it("Should respond with a 403 error for user trying to access reservation they did not create", async () => {
        
        await request(app)
        .get("/reservations/61679189b54f48aa6599a7fd")
        .expect(403)
       
    });

    it("Should respond with a 404 error with non-existing reservation", async () => {
    
    await request(app)
        .get("/reservations/507f1f77bcf86cd79943901b")
        .expect(404)
    });
});
});
// Restaurant
describe("Restaurant API", () => {
describe("GET /restaurants", () => {
    it("Should respond with a list of restaurants", async () => {
        const expectedStatus = 200;
        const expectedBody = [
            {
            id: "616005cae3c8e880c13dc0b9",
            name: "Curry Place",
            description: "Bringing you the spirits of India in the form of best authentic grandma's recipe dishes handcrafted with love by our chefs!",
            image: "https://i.ibb.co/yftcRcF/indian.jpg"
            },
            {
            id: "616005e26d59890f8f1e619b",
            name: "Thai Isaan",
            description: "We offer guests a modern dining experience featuring the authentic taste of Thailand. Food is prepared fresh from quality ingredients and presented with sophisticated elegance in a stunning dining setting filled with all the richness of Thai colour, sound and art.",
            image: "https://i.ibb.co/HPjd2jR/thai.jpg"
            },
            {
            id: "616bd284bae351bc447ace5b",
            name: "Italian Feast",
            description: "From the Italian classics, to our one-of-a-kind delicious Italian favourites, all of our offerings are handcrafted from the finest, freshest ingredients available locally. Whether you're craving Italian comfort food like our Ravioli, Pappardelle or something with a little more Flavour like our famous Fettuccine Carbonara.",
            image: "https://i.ibb.co/0r7ywJg/italian.jpg"
            },
        ]
        await request(app)
                .get("/restaurants")
                .expect(expectedStatus)
                .expect((response) => {
                    expect(response.body).toEqual(expectedBody);
                });
        });
    });
describe("GET /restaurant/:id", () => {
    it("Should respond with a single restaurant", async () => {
        
        const expectedStatus = 200
        const expectedBody = {
            id: "616005cae3c8e880c13dc0b9",
            name: "Curry Place",
            description: "Bringing you the spirits of India in the form of best authentic grandma's recipe dishes handcrafted with love by our chefs!",
            image: "https://i.ibb.co/yftcRcF/indian.jpg"
            };
        
        await request(app)
        .get("/restaurants/616005cae3c8e880c13dc0b9")
        .expect(expectedStatus)
        .expect((res) => {
            expect(res.body).toEqual(expectedBody);
        });
    });
    it("Should respond with a 400 error with invalid ids", async () => {
        
        await request(app)
        .get("/restaurants/mk")
        .expect(400)
        });
    it("Should respond with a 404 error with non-existing restaurant", async () => {
        
        await request(app)
        .get("/restaurants/616005cae3c8e880c13dc0bE")
        .expect(404)
        });
    });
});