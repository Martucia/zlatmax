const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const authRouter = require("./routes/auth.routes")
const catalogRouter = require("./routes/catalog.routes")
const PORT = config.get('port')
const corsMiddleware = require('./middleware/cors.middleware')

// const bodyParser = require("body-parser");
// const multer = require("multer");
// const fs = require("fs");

// const Image = require('./models/Image')



// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads");
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     },
// });

// const upload = multer({ storage: storage });

const app = express()

app.use(corsMiddleware)
// app.use(express.json())
app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb' }));
app.use("/api/auth", authRouter)
app.use("/api/catalog", catalogRouter) // , upload.single("image"),

// app.post("/upload", upload.single("image"), (req, res) => {
//     console.log(req.file)

//     const saveImage = Image({
//         name: req.file.filename,
//         image: {
//             data: fs.readFileSync("uploads/" + req.file.filename),
//             contentType: "image/png",
//         },
//     });
//     saveImage
//         .save()
//         .then((res) => {
//             console.log("image is saved");
//         })
//         .catch((err) => {
//             console.log(err, "error has occur");
//         });
//     res.send('image is saved')
// });

const start = async () => {
    try {
        await mongoose.connect(config.get("mongoUri"), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        app.listen(PORT, () => {
            console.log('Server started on port ', PORT)
        })
    } catch (e) {
        console.log(e)
    }
}

start()