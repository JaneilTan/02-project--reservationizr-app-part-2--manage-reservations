const formatReservation = require("./formatReservation");

describe("formatReservation", () => {
    it("should format the reservation", () => {
        const expected = {
            id: "507f1f77bcf86cd799439011",
            partySize: 4,
            date: "2023-11-17T06:30:00.000Z",
            restaurantName: "Island Grill",
        };
        const input = {
            _id: "507f1f77bcf86cd799439011",
            partySize: 4,
            date: "2023-11-17T06:30:00.000Z",
            restaurantName: "Island Grill",
        };
        const actual = formatReservation(input);
        expect(actual).toEqual(expected);
    });
});