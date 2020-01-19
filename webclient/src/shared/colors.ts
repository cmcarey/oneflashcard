import chroma from "chroma-js";

const numColors = 21;

const mapNum = (num: number) => {
  const excludeFrom = 40; //60
  const excludeTo = 190;
  const dist = excludeTo - excludeFrom;
  num *= (360 - dist) / numColors;
  if (num > excludeFrom) num += dist;
  return num;
};

export const allTagColors = new Array(numColors).fill(0).map((_, index) =>
  chroma("#f1c1ff")
    .set("hsl.h", mapNum(index))
    .saturate(2)
    .hex()
);

export const randomTagColor = () =>
  allTagColors[Math.floor(Math.random() * allTagColors.length)];
