const path = require("path");
const staticRoot = path.resolve(__dirname, "../public");
const createImageName = require('./createImageName')

function upload(file, success, res, i) {
    const type = file.originalname && file.originalname.split('.');
    // 构建图片名 这个主要是生成唯一图片名字利于存储 当然为了方便就写时间戳 实际开发可千万别 可能出现两人同一时间
    const fileName = createImageName();
    // 构建图片路径 需要在上一层目录下新建一个image
    const filePath = staticRoot + fileName;
    

    fs.readFile(file.path, function(err, result) {
        fs.writeFile(filePath, result, function (err) {
            if (err) {
                // 写入失败
                res.end(JSON.stringify({status: '102', msg: '文件写入失败'}));
            } else {
                success(0, res, i);
            }
        })
    })
}