//import tea model
const Tea = require('../models/tea');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const uploadImg = multer({storage: storage}).single('image');

const getAllTea = (req, res, next) => {

    Tea.find({}, (err, data) => {
        if (err) return res.json({Error: err});
        return res.json(data);
    })

}

const newTea = (req, res, next) => {

    Tea.findOne({name: req.body.name}, (err, data) => {
        // if not in db add new tea
        if(!data){
            const newTea = new Tea({
                name:req.body.name,
                image: req.file.path,
                description: req.body.description,
                keywords: req.body.keywords,
                origin: req.body.origin,
                brew_time: req.body.brew_time,
                temperature: req.body.temperature,
            })

            newTea.save((err, data) => {
                if(err) return res.json({Error: err});
                return res.json(data);
            })

        }
        else{
            if(err) return res.json(`Someting went wrong, pleasetry again. ${err}`);
            return res.json({Message: "Tea already exists"});
        }
    })

}

const deleteAllTea = (req, res, next) => {

    Tea.deleteMany({}, err => {
        if(err) return res.json({message: "Complete delete failed"});

        return res.json({message: "Complete delete successful"});
    })
}


const getOneTea = (req, res, next) => {

    let name = req.params.name;

    Tea.findOne({name: name}, (err, data) => {
        if(err || !data){
            return res.json({message: "Tea dosen't exist."});
        }
        
        return res.json(data);
    });

}

const newComment = (req, res, next) => {

    let name = req.params.name;
    let newComment = req.body.comment;

    const comment = {
        text: newComment,
        data: new Date()
    }

    // console.log(comment);

    Tea.findOne({name: name}, (err, data) => {
        
        if(err || !data) {
            return res.json({message: "Tea doesn't exist."});
        }
        else{
            
            data.comment.push(comment);

            data.save(err => {
                if(err) {
                    return res.json({message: "Comment failed to add."})
                }

                return res.json(data);
            })
        }
        
    })


}

const deleteOneTea = (req, res, next) => {

    let name = req.params.name;

    Tea.deleteOne({name:name}, (err,data) => {
        if(data.deletedCount == 0) return res.json({message: "Tea dosen't exist."});
        else if(err) return res.json(`Someting went wrong, please try again. ${err}`);
        else return res.json({message: "Tea deleted."})
    });

}



module.exports = {
    getAllTea,
    uploadImg,
    newTea,
    deleteAllTea,
    getOneTea,
    newComment,
    deleteOneTea
};