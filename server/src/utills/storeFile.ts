import fs from "fs";

const storeFS = ({ stream, filename }: any) => {
  const uploadDir = __dirname + "/../../uploads";
  const path = `${uploadDir}/${filename}`;
  return new Promise((resolve, reject) =>
    stream
      .on("error", (error: any) => {
        if (stream.truncated)
          // delete the truncated file
          fs.unlinkSync(path);
        reject(error);
      })
      .pipe(fs.createWriteStream(path))
      .on("error", (error: any) => reject(error))
      .on("finish", () => resolve({ path }))
  );
};

const storeFile = async (coverImage: any) => {
  const { filename, createReadStream } = await coverImage;
  const stream = createReadStream();
  const pathObj: any = await storeFS({ stream, filename });
  let fileLocation = pathObj.path;

  // Path String Refactoring
  console.log(`Unrefactored path ${fileLocation}`);
  const pathExecutorPattern = new RegExp("../(?=uploads/)");
  fileLocation = fileLocation.split(pathExecutorPattern)[1];
  fileLocation = fileLocation.replace(/\//g, "\\");
  console.log(`Refactored path ${fileLocation}`);
  return fileLocation;
};

export default storeFile;
