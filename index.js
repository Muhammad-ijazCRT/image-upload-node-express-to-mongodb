var express = require('express')
var multer = require('multer')
var port = 3000;

var app = express()

var hbs = require('hbs');
app.set('view engine', 'hbs');


const imageModel = require('./models/image')


app.use(express.static(__dirname + '/public'));


app.use('/uploads', express.static('uploads'));



var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })

/*
app.use('/a',express.static('/b'));
Above line would serve all files/folders inside of the 'b' directory
And make them accessible through http://localhost:3000/a.
*/


app.post('/profile-upload-single', upload.single('profile-file'), function(req, res, next) {
    // req.file is the `profile-file` file
    // req.body will hold the text fields, if there were any
    console.log(JSON.stringify(req.file))

    const my_img = req.file.originalname

    // insert document to database
    var comment1 = new imageModel({
        image: my_img
    });

    comment1
        .save()
        .then(() => {
            res.send("insert successfully...");
        })
        .catch((err) => {
            res.send("error in insert...", err);
        });



    var response = '<a href="/">Home</a><br>'
    response += "Files uploaded successfully.<br>"
    response += `<img src="${req.file.path}" /><br>`
    return res.send(response)
})



//Test server page running
app.get('/ijazkhan', async(req, res) => {
    const cursor = await imageModel.find();
    console.log(cursor);

    res.render('index', { data: cursor })

})

app.listen(port, () => console.log(`Server running on port ${port}!`))