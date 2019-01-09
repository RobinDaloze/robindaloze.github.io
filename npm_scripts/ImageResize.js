const sharp = require("sharp");
const fs = require("fs");
const sourcePath = "./assets/img/Uploads";
const outputPath = "./_site/assets/img/ResizedImages/";
const glob = require("glob");
const path = require("path");

function resizeImage(imgName) {
  let pathParsed = path.parse(imgName);
  let baseName = pathParsed.name;
  let ext = pathParsed.ext;
  sharp(imgName)
    .resize(360)
    .toBuffer()
    .then(data => {
      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
      }
      fs.writeFileSync(outputPath + baseName + "360W" + ext, data);
    })
    .catch(err => {
      console.log(err);
    });
  sharp(imgName)
    .resize(640)
    .toBuffer()
    .then(data => {
      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
      }
      fs.writeFileSync(outputPath + baseName + "640W" + ext, data);
    })
    .catch(err => {
      console.log(err);
    });
  sharp(imgName)
    .resize(1280)
    .toBuffer()
    .then(data => {
      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
      }
      fs.writeFileSync(outputPath + baseName + "1280W" + ext, data);
    })
    .catch(err => {
      console.log(err);
    });
}

function findImage() {
  glob(sourcePath + "**/*", function(er, files) {
    files.map(file => {
      console.log(file);
      resizeImage(file);
    });
  });
}

findImage();
