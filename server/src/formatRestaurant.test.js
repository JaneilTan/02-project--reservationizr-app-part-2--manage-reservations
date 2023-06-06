const formatRestaurant = require("./formatRestaurant");

describe("formatRestaurant", () => {
    it("should format the restaurant", () => {
        const expected = {
            id: "616005cae3c8e880c13dc0b9",
            name: "Curry Place",
            description: "Bringing you the spirits of India in the form of best authentic grandma's recipe dishes handcrafted with love by our chefs!",
            image: "https://i.ibb.co/yftcRcF/indian.jpg"
        };
        const input = {
            _id: "616005cae3c8e880c13dc0b9",
            name: "Curry Place",
            description: "Bringing you the spirits of India in the form of best authentic grandma's recipe dishes handcrafted with love by our chefs!",
            image: "https://i.ibb.co/yftcRcF/indian.jpg"
        };
        const actual = formatRestaurant(input);
        expect(actual).toEqual(expected);
    });
});