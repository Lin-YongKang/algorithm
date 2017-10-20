const express = require('express');
const router = express.Router();
const controller = require('$controller');




// 定义网站主页的路由
router.get('/', controller.bird);
// 定义 about 页面的路由
router.all('/about', controller.about);

router.get('/error', controller.error);


module.exports = router;