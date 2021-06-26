const mongoose = require('mongoose');
const yup = require('yup');

//Schema
const ContactSchema = new mongoose.Schema({
    names: {
        type: String,
        require: true,
        minlength: 3,
        maxlength: 100
    },
    email: {
        type: String,
        minlength: 3,
        maxlength: 150,
        require: true
    },
    phone: {
        type: String,
        require: true,
        minlength: 11,
        maxlength: 11
    },
    sentDate: {
        type: Date,
        default: Date.now
    },
    coment: {
        type: String,
        minlength: 3,
        maxlength: 355,
        require: true
    }
})

// yup validation
const ContactValidator = (comentObj) => {
    let schema = yup.object().shape({
        names: yup.string().required().min(3, 'Names should be a little descriptive').max(100, 'Names is too long'),
        email: yup.string().required().email('Email address is invalid'),
        phone: yup.string().min(11, 'Phone number is invalid').max(11, 'Phone number is invalid').required('Phone number is valid'),
        coment: yup.string().min(3, 'Comment is too short').max(350, 'Comment is too long')
    })

    return schema.validate(comentObj).then(comment => comment).catch(error => {
        return {
            message: error.message
        }
    });
}

// exports
exports.ContactModel = new mongoose.model('Contact', ContactSchema);
exports.ContactValidator = ContactValidator;