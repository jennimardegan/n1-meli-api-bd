const mongoose = require('mongoose');

const AlunasSchema = new mongoose.Schema({ //resumo das características que tem o documento
    nome: { type: String },
    dateOfBirth: { type: String }, //Date se não fosse string
    nasceuEmSp: { type: String }, //Boolean se não fosse string
    //id: {}
    livros: [{ titulo: String, leu: String }] //Boolean se não fosse string
}, {
    versionKey: false //no momento de fazer o POST para o Mongo, não traz a info de versão (v0) na aluna
})
//Exemplo para deixar o parametro como obrigatório:
// var sampleSchema = new Schema({ name: {type: String, required: true}})

const Alunas = mongoose.model('Alunas', AlunasSchema); //indicar que o Schema está conectado a um model

module.exports = Alunas;