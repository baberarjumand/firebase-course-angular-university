import * as functions from "firebase-functions";
import { fsdb } from "./init";
const path = require("path");
const os = require("os");
const mkdirp = require("mkdirp-promise");
const spawn = require("child-process-promise").spawn;
const rimraf = require("rimraf");

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

    const uploadedFiles = await bucket.upload(outputFile, {
      destination: outputFilePath,
      metadata: metadata,
    });

    // end of video 8.8
    ///////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////////
    // start of video 8.9

    // NEXT STEP: delete generated thumbnail locally after it is uploaded to storage

    // delete local files to avoid filling up the local file system in container
    //  over time

    // we want to execute cli linux command: 'rm -rf localTempDir'
    // 'npm install --save rimraf' will help us do that

    // this line deletes the generated thumbnail
    rimraf.sync(localTempDir);

    // NEXT STEP: delete the file that was originally uploaded by the user

    await originalImageFile.delete();

    // NEXT STEP: create a link to the new generated thumbnail file that
    //  has already being uploaded to firebase storage at this point
    // this same link will be saved to firestore db later

    // create link to uploaded thumbnail

    const thumbnail = uploadedFiles[0];

    const url = await thumbnail.getSignedUrl({
      action: "read",
      expires: new Date(3000, 1, 1),
    });

    console.log("Generated signed URL: ", url);

    // NEXT STEP: save the generated thumbnail URL in db

    const fragments = fileFullPath.split("/");
    const courseId = fragments[1];

    console.log("Saving thumbnail URL to db: ", courseId);

    // return fsdb.doc(`courses/${courseId}`).update({ uploadedImageUrl: url });
    return fsdb.doc(`courses/${courseId}`).update({ iconUrl: url });

    // end of video 8.9
    ///////////////////////////////////////////////////////////////////////////////

    // return null;
  });
