const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads'});

const app = express();
const PORT = 5001;


/*
upload.single("imageTest") 라는 미들웨어 추가해줌으로서
이미지 받을 수 있다
*/
app.post("/upload", upload.single("imageTest") , (req, res) => {

    console.log(req.file);
    res.json(req.file);
});

app.listen(PORT, () => console.log("Express server listening on PORT" + PORT));