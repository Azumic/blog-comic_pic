const axios = require('axios');
const fs = require('fs');

// GitHub 仓库的相关信息
const repoOwner = 'Azumic';
const repoName = 'blog_pic';
const filePath = 'tool/uploadImg/img/avatar.jpg';
const fileContent = 'tool/uploadImg/img/avatar.jpg'; // 图片文件的本地路径

// 读取图片文件内容
const fileData = fs.readFileSync(fileContent);
const fileBase64 = fileData.toString('base64');

// 构建 API 请求的 URL
const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

// 构建 API 请求的数据
const data = {
    message: 'Upload image',
    content: fileBase64,
};

// 设置请求头部信息
const headers = {
    Authorization: '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',
    'Content-Type': 'application/json',
    'X-GitHub-Api-Version': '2022-11-28'
};

// 发送 API 请求
axios.put(url, data, { headers })
    .then((response) => {
        console.log('Image uploaded successfully!');
    })
    .catch((error) => {
        console.error('Failed to upload image.');
        console.error(error.response.data);
    });
