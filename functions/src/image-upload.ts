import * as functions from "firebase-functions";
const path = require("path");
const os = require("os");
const mkdirp = require("mkdirp-promise");
const spawn = require("child-process-promise").spawn;

const { Storage } = require("@google-cloud/storage");
const gCloudService = new Storage();

export const resizeThumbnail = functions.storage
  .object()
  .onFinalize(async (object, context) => {
    ///////////////////////////////////////////////////////////////////////////////
    // start of video 8.6

    // onFinalize() executes when a file upload to firebase storage completes
    // the 'object' in this function is the uploaded image

    const fileFullPath = object.name || "";
    const contentType = object.contentType || "";
    const fileDir = path.dirname(fileFullPath);
    const fileName = path.basename(fileFullPath);
    const localTempDir = path.join(os.tmpdir(), fileDir);

    console.log("Thumbnail generation started...");
    // console.log(fileFullPath);
    // console.log(fileDir);
    // console.log(fileName);

    // this function will exit if the uploaded file type is not an image, or
    //  the uploaded image name starts with thumb_, meaning
    //  it is a generated thumbnail from this function itself
    if (!contentType.startsWith("image/") || fileName.startsWith("thumb_")) {
      console.log("File contentType is not an image. Exitting now...");
      return null;
    }

    // end of video 8.6
    ///////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////////
    // start of video 8.7

    // NEXT STEP: download uploaded image to temp dir on OS in container

    // create sub-directories in os temp folder
    await mkdirp(localTempDir);

    const bucket = gCloudService.bucket(object.bucket);

    const originalImageFile = bucket.file(fileFullPath);

    const tempLocalFile = path.join(os.tmpdir(), fileFullPath);

    console.log("Downloading image to: ", tempLocalFile);

    await originalImageFile.download({ destination: tempLocalFile });

    // end of video 8.7
    ///////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////////
    // start of video 8.8

    // NEXT STEP: generate a thumbnail using imageMagick

    // container on gCloud already has some pre-installed binaries, incl. imageMagick
    //  so we don't have to install it using npm

    const outputFilePath = path.join(fileDir, "thumb_" + fileName);

    const outputFile = path.join(os.tmpdir(), outputFilePath);

    console.log("Generating a thumbnail to: ", outputFile);

    // example of cli command to use ImageMagick:
    // convert -thumbnail 510x287 serverless-angular.png > thumb_serverless-angular.png

    await spawn(
      "convert",
      [tempLocalFile, "-thumbnail", "510x287 >", outputFile],
      { capture: ["stdout", "stderr"] }
    );

    // NEXT STEP: upload generated thumbnail back to storage

    const metadata = {
      contentType: object.contentType,
      cacheControl: "public.max-age=2592000, s-maxage=2592000",
    };

    console.log(
      "Uploading generated thumbnail to storage: ",
      outputFile,
      outputFilePath
    );

    await bucket.upload(outputFile, {
      destination: outputFilePath,
      metadata: metadata,
    });

    // end of video 8.8
    ///////////////////////////////////////////////////////////////////////////////

    return null;
  });
