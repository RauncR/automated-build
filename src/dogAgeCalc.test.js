import { dogToHumanAge } from "./dogAgeCalc";

describe("Dog age calculator", function () {
  it("should return 7 when given 1", () => {
    const result = dogToHumanAge(1);
    expect(result).toBe(7);
  });
  it("hanles invalid input", () => {
    const result = dogToHumanAge("a");
    expect(result).toBe("Invalid input");
  });
});
