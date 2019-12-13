
function hello() {
    return {
        to: "matt",
        date: "12/12/2019",
        message: "hello, how are you?"
    }
}

test("should return proper greeting", () => {
    expect(hello()).toMatchSnapshot();
})
