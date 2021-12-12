const mongoose = require('mongoose');
const { Schema } = mongoose;
const codeSchema = new Schema({
    title : {
        type: String,
        required: true
    },
    filter: {
        type: String
    },
    description: {
        type: String
    },
    photo: String,
    ownerName: String,
    openSource: Boolean,
    tradable: Boolean,
    cost: Number,
    fundRaised: Number,
    ownerAddress: String,
    ipfsDest: String
},{
    timestamps: true
});

const Code = mongoose.model('Code', codeSchema);

module.exports = Code;