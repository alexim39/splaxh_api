const mongoose = require('mongoose');
const yup = require('yup');

// export user model
exports.UserModel = new mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: 3,
        maxlength: 30
    },
   /*  lastname: {
        type: String,
        require: true,
        minlength: 3,
        maxlength: 30
    }, */
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        index: { unique: true }
    },
    password: {
        type: String,
        require: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: false
    },
    /* tnc: { // terms & conditions
        type: Boolean,
        required: true
    }, */
    startDate: {
        type: Date,
        require: true,
        default: Date.now
    },
    modifyDate: {
        type: Date,
        require: true,
        default: Date.now
    },
    phone: {
        type: String,
        require: true
    },
    /* organization: {
        type: String
    },
    phone: {
        type: String
    },
    about: {
        type: String
    }, */
}));

// export user validator
exports.SignUpValidator = (user) => {
    let schema = yup.object().shape({
        name: yup.string().required().min(3, 'Nname should be a little descriptive').max(100, 'Name too long'),
        //lastname: yup.string().required().min(3, 'Last name should be a little descriptive').max(100, 'Name too long'),
        password: yup.string().required().min(8, 'Password too short').max(50, 'Password is too long'),
        email: yup.string().required().email('Email address is invalid'),
        phone: yup.string().required(),
        //tnc: yup.boolean().required('You should accept the terms and conditions first')
    })

    return schema.validate(user).then(user => user).catch(error => {
        return {
            message: error.message
        }
    });
}

// export yup validation
exports.SignInValidator = (signinObj) => {
    let schema = yup.object().shape({
        password: yup.string().required().min(8, 'Password should be a minimum of 8 characters').max(50, 'Password is too long'),
        email: yup.string().required().email('Email address is invalid')
    })

    return schema.validate(signinObj).then(signinObj => signinObj).catch(error => {
        return {
            message: error.message
        }
    });
}