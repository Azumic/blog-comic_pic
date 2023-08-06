const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size');

const pic_path = ""
const tuchuang_path = "https://cdn.staticaly.com/gh/Azumic/blog_pic@main/"
const detail_file_ori = "data/comic_detail_ori.json"
const detail_file = "data/comic_detail.json"

var data;
fs.readFile(detail_file_ori, 'utf8', (err, data1) => {
    if (err) {
        console.error('读取文件失败：', err);
        return;
    }
    data = data1;
    readImgSize(data);
});

async function readImgSize(data) {
    var oldData = JSON.parse(data);
    Object.entries(oldData).forEach(async ([key, value]) => {

        var imgwidth = []
        var imgInfo = {}

        value.imglist.forEach((url, index) => {
            var img_path = url.replace(tuchuang_path, pic_path)
            var info = getImgSize(img_path)
            imgInfo[index] = info
            imgwidth.push(info.width)
        });

        oldData[key].imgwidth = imgwidth
        oldData[key].imgInfo = imgInfo

        // console.log(value);

    });

    fs.writeFile(detail_file, JSON.stringify(oldData), (err) => {
        if (err) {
            console.error('写入文件失败：', err);
            return;
        }
        console.log('JSON 文件已成功生成！');
    });
}

function getImgSize(path1) {
    if (!path1) return ""

    const absolutePath = path.resolve(path1);
    const dimensions = sizeOf(absolutePath);
    return dimensions
}

function getImageSizeFromFile(filePath) {
    try {
        const absolutePath = path.resolve(filePath);
        const dimensions = sizeOf(absolutePath);
        console.log('图片宽度：', dimensions.width);
        console.log('图片高度：', dimensions.height);
        console.log('图片高度：', dimensions);
    } catch (error) {
        console.error('获取图片尺寸失败：', error);
    }
}

async function getImageSizeFromUrl(url) {
    try {
        const { default: fetch } = await import('node-fetch');
        const response = await fetch(url);
        const buffer = await response.buffer();
        const dimensions = sizeOf(buffer);
        console.log('图片宽度：', dimensions.width);
        console.log('图片高度：', dimensions.height);
    } catch (error) {
        console.error('获取图片尺寸失败：', error);
    }
}
