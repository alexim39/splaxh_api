const mongoose = require('mongoose');
const yup = require('yup');

// export user model
exports.AudioModel = new mongoose.model('Audio', new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    stageName: {
        type: String,
        required: true,
        
    },
    trackTitle: {
        type: String,
        require: true,
        //index: { unique: true },
        //unique: true
    },
    trackCategory: {
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
    }
}));

// export user validator
exports.AudioValidator = (audio) => {
    let schema = yup.object().shape({
        userId: yup.string().required('No userId'),
        stageName: yup.string().required('Name is required').min(3, 'Name should be a little descriptive').max(100, 'Name too long'),
        trackTitle: yup.string().required('Title is required'),
        trackCategory: yup.string().required('Category is required'),
        //youtubeURL: yup.string().required('You should enter the Youtube URL of this video')
    })

    return schema.validate(audio).then(audio => audio).catch(error => {
        console.log(error)
        return {
            message: error.message
        }
    });
}