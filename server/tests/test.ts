const x = (y: number) => y + 2;

test("Op on 1", () => expect(x(1)).toBe(3));
test("Op on 2 false check", () => expect(x(2)).not.toBe(3));
