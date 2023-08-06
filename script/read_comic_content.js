console.log("-----------is reading...");

const fs = require('fs');
const detail_file = "data/comic_detail.json"
var data;
fs.readFile(detail_file, 'utf8', (err, data1) => {
    if (err) {
        console.error('读取文件失败：', err);
        return;
    }
    data = data1;
    console.log(data);
});