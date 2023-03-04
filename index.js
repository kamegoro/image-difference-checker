const prompts = require("prompts");
const dayjs = require("dayjs");
const resemble = require("resemblejs");
const fs = require("fs");

dayjs.locale = "ja";

const imageBasePath = "./Images/";

const questions = [
  {
    type: "text",
    name: "actualImage",
    message: "Name of the image file to be compared",
  },
  {
    type: "text",
    name: "expectedImage",
    message: "Expected image file name",
  },
];

const main = async () => {
  const response = await prompts(questions);

  if (!response.actualImage || !response.expectedImage) {
    throw new Error("file name is required.");
  }

  const resembleImage = fs.readFileSync(imageBasePath + response.actualImage);
  const compareToImage = fs.readFileSync(imageBasePath + response.expectedImage);

  if (!resembleImage) {
    throw new Error(`${response.actualImage} dose not exist in the Images directory.`);
  }

  if (!compareToImage) {
    throw new Error(`${response.expectedImage} dose not exist in the Images directory.`);
  }

  console.log("In comparison...");

  return resemble(resembleImage)
    .compareTo(compareToImage)
    .onComplete(data => {
      fs.writeFileSync(
        `./diff/${dayjs().format("YYYY_MM_DD_HH_mm_ss")}.png`,
        data.getBuffer()
      );
    });
};

main()
  .then(() => {
    console.log("The diff file was successfully generated!");
  })
  .catch(error => {
    console.error(error);
  });
