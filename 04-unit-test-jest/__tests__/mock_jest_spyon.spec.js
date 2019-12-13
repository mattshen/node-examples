const app = require("../src/app");
const math = require("../src/math");

// https://medium.com/@rickhanlonii/understanding-jest-mocks-f0046c68e53c

test("calls math.add", () => {
    const addMock = jest.spyOn(math, "add");

    // calls the original implementation
    expect(app.doAdd(1, 2)).toEqual(3);

    // and the spy stores the calls to add
    expect(addMock).toHaveBeenCalledWith(1, 2);
});


test("calls math.add - mock and restore", () => {
    const addMock = jest.spyOn(math, "add");

    // override the implementation
    addMock.mockImplementation(() => "mock");
    expect(app.doAdd(1, 2)).toEqual("mock");

    // restore the original implementation
    addMock.mockRestore();
    expect(app.doAdd(1, 2)).toEqual(3);
});
