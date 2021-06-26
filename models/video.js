const mongoose = require('mongoose');
const yup = require('yup');

// export user model
exports.VideoModel = new mongoose.model('Video', new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    stageName: {
        type: String,
        unique: true,
        required: true,
        index: { unique: true }
    },
    videoTitle: {
        type: String,
        require: true
    },
    videoCategory: {
        type: String,
        required: true,
    },
    uploadDate: {
        type: Date,
        require: true,
        default: Date.now
    },
    description: {
        type: String,
        //require: true
    },
    youtubeURL: {
        type: String,
        require: true
    }
}));

// export user validator
exports.VideoValidator = (video) => {
    let schema = yup.object().shape({
        userId: yup.string().required('No userId'),
        stageName: yup.string().required('Name is required').min(3, 'Name should be a little descriptive').max(100, 'Name too long'),
        videoTitle: yup.string().required('Title is required'),
        videoCategory: yup.string().required('Category is required'),
        youtubeURL: yup.string().required('You should enter the Youtube URL of this video')
    })

    return schema.validate(video).then(video => video).catch(error => {
        console.log(error)
        return {
            message: error.message
        }
    });
}