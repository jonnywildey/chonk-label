import { getChonk, Chonks } from "./Chonks"

describe("Chonks", () => {

  it("has chonks", () => {
    expect(Chonks).toBeDefined();
  });

  it("gets A Fine Boi", () => {
    expect(getChonk(5).name).toEqual("A Fine Boi");
  })
  it("gets They Chomnk", () => {
    expect(getChonk(15).name).toEqual("They Chomnk");
  })
  it("gets A Hecklin' Chonker", () => {
    expect(getChonk(25).name).toEqual("A Hecklin' Chonker");
  })
  it("gets HEFTYCHONK", () => {
    expect(getChonk(55).name).toEqual("HEFTYCHONK");
  })
  it("gets MEGACHONKER", () => {
    expect(getChonk(85).name).toEqual("MEGACHONKER");
  })
  it("gets OH LAWD HE COMIN", () => {
    expect(getChonk(723).name).toEqual("OH LAWD HE COMIN");
  })

})
