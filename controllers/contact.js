const { ContactModel, ContactValidator } = require('./../models/contact');

module.exports = class Contact {

    // Create comment
    static async create(req, res) {
        try {
            console.log(req.body)
            // validate inputs
            const error = await ContactValidator(req.body);
            if (error.message) return res.status(400).send(error.message);

            const comment = await new ContactModel({
                names: req.body.names,
                email: req.body.email,
                phone: req.body.phone,
                coment: req.body.coment,
            }).save();

            if (comment) return res.status(200).json({ msg: `Contact sent, we will get back to you `, code: 200, obj: comment });
            return res.status(404).json({ msg: `Contact detail could not be sent`, code: 404 });
        } catch (error) {
            return res.status(500).json({ msg: `Contact creation process failed`, code: 500 });
        }

    }

}