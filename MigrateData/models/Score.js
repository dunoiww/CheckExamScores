const mongoose = require('mongoose')

const scoreSchema = new mongoose.Schema({
    sbd: { type: String, required: true, unique: true },
    toan: { type: Number },
    ngu_van: { type: Number },
    ngoai_ngu: { type: Number },
    vat_li: { type: Number },
    hoa_hoc: { type: Number },
    sinh_hoc: { type: Number },
    lich_su: { type: Number },
    dia_li: { type: Number },
    gdcd: { type: Number },
    ma_ngoai_ngu: { type: String },
})

module.exports = mongoose.model('Score', scoreSchema)