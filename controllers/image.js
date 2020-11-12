const Clarifai = require("clarifai");
const app = new Clarifai.App({
    //Your api key, this is mine
    apiKey: "3737fb950391413698e10be84f45440c",
});

const handleApiCall = (req, res) =>{
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data =>{
    	res.json(data);
    })
    .catch(err=>res.status(400).json('unable to work api'))
}

const handleImage = (req, res, knex) => {
    const { id } = req.body;
    knex('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0])
        }).catch(err => res.status(400).json('error getting entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}