import * as functions from "firebase-functions";
const path = require("path");
const os = require("os");

const { Storage } = require("@google-cloud/storage");
const gCloudService = new Storage();

export const resizeThumbnail = functions.storage
  .object()
  .onFinalize(async (object, context) => {
    const fileFullPath = object.name || "";
    const contentType = object.contentType || "";
    const fileDir = path.dirname(fileFullPath);
    const fileName = path.basename(fileFullPath);
    const localTempDir = path.join(os.tmpdir(), fileDir);

    console.log("Thumbnail generation started...");
    // console.log(fileFullPath);
    // console.log(fileDir);
    // console.log(fileName);

    if (!contentType.startsWith("image/")) {
      console.log("File contentType is not an image. Exitting now...");
      return null;
    }

    return null;
  });
