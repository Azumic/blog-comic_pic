const https = require('https');
const fs = require('fs');
// const Axios = require('axios');
// const path = require('path');
const imageLinks = require('./bangumis.json');

var options = {
    timeout: 1000 // 设置超时时间为1秒
};

const values1 = Object.values(imageLinks);
const covers = values1.flatMap((element) =>
    element.map((element1) => element1.cover)
);

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function processCovers() {
    for (let index = 0; index < covers.length; index++) {
        const cover_url = covers[index] + "@400w_400h.webp";
        console.log(cover_url);

        await sysAD(cover_url);

        if (index % 20 === 0 && index !== 0) {
            console.log('is delaying 5s, is ' + index +  ' pictures, now progress: ' + (index / covers.length * 100) + '%');
            await delay(5000);
        }
    }
}

async function sysAD(cover_url) {
    let imgname = cover_url.replace("https://i0.hdslb.com/bfs/bangumi/", "").replace("image/", "");

    await downloadImg(cover_url, imgname);
}

function downloadImg(url, imgname) {
    return new Promise((resolve, reject) => {
        https.get(url, options, (res) => {
            var imgData = "";
            res.setEncoding("binary");  // 下载图片需要设置为 binary, 否则图片会打不开

            res.on('data', (chunk) => {
                imgData += chunk;
            });

            res.on('end', () => {
                fs.writeFileSync(`./comic/cover/${imgname}`, imgData, "binary");
                console.log('ok ' + imgname);
                resolve();
            });

            res.on('error', (error) => {
                reject(error);
            });
        });
    });
}

processCovers();




// const https = require('https');
// const fs = require('fs');
// const Axios = require('axios');
// const path = require('path');
// const imageLinks = require('./bangumis.json');

// var options = {
//     timeout: 1000 // 设置超时时间为1秒
// };

// const values1 = Object.values(imageLinks);
// const covers = values1.flatMap((element) =>
//     element.map((element1) => element1.cover)
// );

// function delay(ms) {
//     return new Promise((resolve) => setTimeout(resolve, ms));
// }

// async function processCovers() {
//     for (let index = 0; index < covers.length; index++) {
//         const cover_url = covers[index];
//         console.log(cover_url);

//         sysAD(cover_url);

//         if (index % 20 === 0 && index !== 0) {
//             console.log('Delaying for 2 seconds. Current progress: ' + (index / covers.length * 100) + '%');
//             await delay(2000);
//         }
//     }
// }

// function sysAD(cover_url) {
//     let imgname = cover_url.replace("https://i0.hdslb.com/bfs/bangumi/", "").replace("image/", "")

//     downloadImg(cover_url, imgname);
// }


// function downloadImg(url, imgname) {
//     https.get(url, options, (res) => {

//         var imgData = "";
//         res.setEncoding("binary");  // 下载图片需要设置为 binary, 否则图片会打不开

//         res.on('data', (chunk) => {
//             imgData += chunk;
//         });

//         res.on('end', () => {
//             fs.writeFileSync(`./comic/cover/${imgname}`, imgData, "binary");
//             console.log('ok ' + imgname);
//         });
//     });
// }

// processCovers();
