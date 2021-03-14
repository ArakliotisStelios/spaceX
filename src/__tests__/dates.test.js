import {calculateGMT} from "../utils/format-date";

it('calculates and prints GMT from a timestamp', () => {
    expect(calculateGMT("2019-12-16T19:10:00-05:00")).toEqual("GMT-5");
    expect(calculateGMT("2021-10-16T16:10:00+03:30")).toEqual("GMT+3:30");
    expect(calculateGMT("2020-07-16T104:10:00+00:00")).toEqual("GMT");
});
