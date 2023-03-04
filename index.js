const imageDiff = require("image-diff");
const prompts = require("prompts");

const questions = [
  {
    type: "text",
    name: "image1",
    message: "File name of the first comparison image",
  },
  {
    type: "text",
    name: "image2",
    message: "File name of the second comparison image",
  },
];

const main = async () => {
  // コマンド引数で画像を指定する
  const response = await prompts(questions);

  if (!response.image1 || !response.image2) {
    throw new Error("file name is required.");
  }
};

main()
  .then(v => v)
  .catch(error => {
    console.error(error);
  });
