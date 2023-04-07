const fs = require("fs");
const { statusCode } = require("../constants/header-code");
const { headerMessage } = require("../constants/header-message");

class FileManagerRepository {
  async readFile(filePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (error, data) => {
        if (error) {
          reject({
            code: statusCode.notFound,
            message: headerMessage.notFound,
          });
        }
        resolve(data);
      });
    });
  }
}

const fileManagerInstance = new FileManagerRepository();
module.exports = fileManagerInstance;
