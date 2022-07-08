const fs = require("fs");

const countries = fs
  .readFileSync("./data/countries.txt", {
    encoding: "utf8",
    flag: "r",
  })
  .split("\n");

const title = countries.shift() + "\n";

const countriesArr = countries
  .map((country) => country.split(" "))
  .map((country) => {
    const name = country
      .splice(0, country.length - 2)
      .join()
      .replace(/,/g, " ");
    const population = parseInt(country[country.length - 2].replace(/,/g, ""));
    const area = parseInt(country[country.length - 1].replace(/,/g, ""));

    const density = (population / area).toFixed(2);

    const data = {
      name: name,
      population: population,
      area: area,
      density: density,
    };

    return data;
  });

const sorted = countriesArr.sort((a, b) => b.density - a.density);

const result =
  title +
  "\n" +
  sorted
    .map((country) => Object.values(country).join(" | ") + ";" + "\n")
    .join("\n");

fs.writeFileSync("countries.csv", result);
