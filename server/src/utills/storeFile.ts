import fs from "fs";

const storeFS = ({ stream, filename }: any) => {
    const uploadDir = __dirname + '/../../uploads';
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
export default storeFS;