const https = require('https');
const fs = require('fs');
const Axios = require('axios');
const path = require('path');
const imageLinks = require('./bangumis.json');

var options = {
    timeout: 1000 // 设置超时时间为1秒
};

// console.log(Object.values(imageLinks).length);
// console.log(Object.values(imageLinks));
// for (let index = 0; index < imageLinks.length; index++) {
//     const element = imageLinks[index];
//     console.log(index);
//     console.log(element);
// }

// var values1 = Object.values(imageLinks)
// for (let index = 0; index < values1.length; index++) {
//     const element = values1[index];
//     console.log(element.length);
//     setTimeout(() => {
//         for (let index1 = 0; index1 < element.length; index1++) {
//             const element1 = element[index1];
//             let url = element1.cover
//             let imgname = url.replace("https://i0.hdslb.com/bfs/bangumi/", "").replace("image/", "")
//             // console.log(url);
//             // console.log(imgname);
//             if (index1 % 20 == 0) {
//                 setTimeout(() => {
//                     console.log('is delaying 2s, now progress: ' + index1 + ' ' + (index1 / element.length * 100) + '%');
//                 }, 20000)
//             }

//             downloadImg(url, imgname);
//         }
//     }, 50000)
// }

const values1 = Object.values(imageLinks);
const covers = values1.flatMap((element) =>
    element.map((element1) => element1.cover)
);

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function processCovers() {
    for (let index = 0; index < covers.length; index++) {
        const cover_url = covers[index];
        console.log(cover_url);

        sysAD(cover_url);

        if (index % 20 === 0 && index !== 0) {
            console.log('Delaying for 2 seconds. Current progress: ' + (index / covers.length * 100) + '%');
            await delay(2000);
        }
    }
}

function sysAD(cover_url) {
    const element1 = cover_url;
    // let url = element1.cover
    let url = cover_url
    let imgname = url.replace("https://i0.hdslb.com/bfs/bangumi/", "").replace("image/", "")

    downloadImg(url, imgname);
}

processCovers();


// for (let index = 0; index < covers.length; index++) {
//     const element = covers[index];
//     console.log(element);

//     if (index % 20 === 0) {
//         setTimeout(() => {
//             console.log('Delaying for 2 seconds. Current progress: ' + (index / covers.length * 100) + '%');
//         }, 2000 * Math.floor(index / 20));
//     }
// }


// for (let index = 0; index < covers.length; index++) {
//     const element = covers[index];
//     console.log(element);

//     if (index % 20 == 0) {
//         setTimeout(() => {
//             console.log('is delaying 2s, is ' + index +  'pictures, now progress: ' + (index / covers.length * 100) + '%');
//         }, 2000)
//     }

// }

// let element = imageLinks.watching;
// for (let index1 = 0; index1 < element.length; index1++) {
//     const element1 = element[index1];
//     let url = element1.cover
//     let imgname = url.replace("https://i0.hdslb.com/bfs/bangumi/", "").replace("image/", "")

//     downloadImg(url, imgname);

//     // downloadFile(url, './comic/cover/', imgname);
// }

function downloadImg(url, imgname) {
    https.get(url, options, (res) => {

        var imgData = "";
        res.setEncoding("binary");  // 下载图片需要设置为 binary, 否则图片会打不开

        res.on('data', (chunk) => {
            imgData += chunk;
        });

        res.on('end', () => {
            fs.writeFileSync(`./comic/cover/${imgname}`, imgData, "binary");
            console.log('ok ' + imgname);
        });
    });
}

// url 是图片地址，如，http://wximg.233.com/attached/image/20160815/20160815162505_0878.png
// filepath 是文件下载的本地目录
// name 是下载后的文件名
async function downloadFile(url, filepath, name) {
    if (!fs.existsSync(filepath)) {
        fs.mkdirSync(filepath);
    }
    const mypath = path.resolve(filepath, name);
    const writer = fs.createWriteStream(mypath);
    const response = await Axios({
        url,
        method: "GET",
        responseType: "stream",
    });
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
    });
}


// console.log(imageLinks.length);
// for (var i = 0; i < imageLinks.length; i++) {
//     let url = imageLinks[i].cover
//     let imgname = url.replace("https://i0.hdslb.com/bfs/bangumi/", "").replace("image/", "")
//     console.log(url);
//     console.log(imgname);

//     https.get(url, (res) => {

//         var imgData = "";
//         res.setEncoding("binary");  // 下载图片需要设置为 binary, 否则图片会打不开

//         res.on('data', (chunk) => {
//             imgData += chunk;
//         });

//         res.on('end', () => {
//             fs.writeFileSync(`./comic/cover/${imgname}`, imgData, "binary");
//             console.log('ok');
//         });
//     });
// }

// var url = 'https://www.baidu.com/img/bd_logo1.png';

// https.get(url, (res) => {

//     var imgData = "";
//     res.setEncoding("binary");  // 下载图片需要设置为 binary, 否则图片会打不开

//     res.on('data', (chunk) => {
//         imgData += chunk;
//     });

//     res.on('end', () => {
//         fs.writeFileSync("./download.png", imgData, "binary");
//         console.log('ok');
//     });
// });