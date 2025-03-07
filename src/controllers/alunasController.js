//const alunas = require("../model/alunas.json") -- Alterar o JSON para banco de dados no Mongo (linha abaixo)
const Alunas = require('../model/alunas')
const fs = require('fs');

exports.get = (req, res) => {
  // console.log(req.url)
  // res.status(200).send(alunas)
  Alunas.find(function (err, alunas) { //collection.find (call back function)
    if (err) res.status(500).send(err);
    res.status(200).send(alunas)
  })
}

//Trazer do JSON as alunas por id
// exports.getById = (req, res) => {
//   const id = req.params.id
//   if (id > 34 || id <= 0) {
//     res.redirect(301, "https://en.wikipedia.org/wiki/Man-in-the-middle_attack")
//   }
//   res.status(200).send(alunas.find(aluna => aluna.id == id))
// }

//Trazer do BANCO as alunas por _id (Object ID do Mongo)
exports.getById = (req, res) => {
   const alunaId = req.params.id

   Alunas.findById(alunaId, function (err, aluna) {
     if (err) return res.status(500).send(err);

     if (!aluna) {
       return res.status(200).send({ message: `ID não localizado: ${alunaId}`});
     }
     res.status(200).send(aluna)
   })
  }

//Trazer do JSON os livros de uma aluna
// exports.getBooks = (req, res) => {
//   const id = req.params.id
//   const aluna = alunas.find(aluna => aluna.id == id)
//   if (!aluna) {
//     res.send("Nao encontrei essa garota")
//   }
//   const livrosAluna = aluna.livros
//   const livrosLidos = livrosAluna.filter(livro => livro.leu == "true")
//   const tituloLivros = livrosLidos.map(livro => livro.titulo)
//   res.send(tituloLivros)
// }

//Trazer do BANCO os livros de uma aluna
exports.getBooks = (req, res) => {
  const alunaId = req.params.id

  Alunas.findById(alunaId, function (err, aluna) {
    if (err) return res.status(500).send(err);

    if (!aluna) {
      return res.status(200).send({ message: `ID não localizado: ${alunaId}`})
      }
    const livrosAluna = aluna.livros
    const livrosLidos = livrosAluna.filter(livro => livro.leu == "true")
    const tituloLivros = livrosLidos.map(livro => livro.titulo)
    res.status(200).send(tituloLivros)
})}

//Trazer do JSON os nomes das alunas que nasceram em SP
// exports.getSp = (req, res) => {
//   const nasceuSp = alunas.filter(aluna => {
//     console.log(aluna)
//     return aluna.nasceuEmSp == "true"
//   })
//   const meninasSp = nasceuSp.map(aluna => aluna.nome)

//   res.status(200).send(meninasSp)
// }

//Trazer do BANCO os nomes das alunas que nasceram em SP
exports.getSp = (req, res) => {
  Alunas.find(function (err, alunas){
    if (err) res.status(500).send(err)
    const nasceuSp = alunas.filter(aluna => aluna.nasceuEmSp == "true")
    const meninasSp = nasceuSp.map(aluna => aluna.nome)
  res.status(200).send(meninasSp)
  })}

//Trazer do JSON a idade da aluna
// exports.getAge = (req, res) => {
//   const id = req.params.id
//   const aluna = alunas.find(item => item.id == id)
//   const dataNasc = aluna.dateOfBirth
//   const arrData = dataNasc.split("/")
//   const dia = arrData[0]
//   const mes = arrData[1]
//   const ano = arrData[2]
//   const idade = calcularIdade(ano, mes, dia)
//   res.status(200).send({ idade })
// }

// function calcularIdade(anoDeNasc, mesDeNasc, diaDeNasc) {
//   const now = new Date()
//   const anoAtual = now.getFullYear()
//   const mesAtual = now.getMonth() + 1
//   const hoje = now.getDate()

//   let idade = anoAtual - anoDeNasc

//   if (mesAtual < mesDeNasc || (mesAtual == mesDeNasc && hoje < diaDeNasc)) {
//     idade -= 1
//   }
//   return idade
// }

//Trazer do BANCO a idade da aluna
exports.getAge = (req, res) => {
  const alunaId = req.params.id
  Alunas.findById(alunaId, function (err, aluna) {
    if (err) return res.status(500).send(err);

    if (!aluna) {
      return res.status(200).send({ message: `ID não localizado: ${alunaId}`})
      }
  const dataNasc = aluna.dateOfBirth
  const arrData = dataNasc.split("/")
  const dia = arrData[0]
  const mes = arrData[1]
  const ano = arrData[2]
  const idade = calcularIdade(ano, mes, dia)
  res.status(200).send({ idade })
})}

function calcularIdade(anoDeNasc, mesDeNasc, diaDeNasc) {
  const now = new Date()
  const anoAtual = now.getFullYear()
  const mesAtual = now.getMonth() + 1
  const hoje = now.getDate()

  let idade = anoAtual - anoDeNasc

  if (mesAtual < mesDeNasc || (mesAtual == mesDeNasc && hoje < diaDeNasc)) {
    idade -= 1
  }
  return idade
}

//POST para incluir uma aluna no JSON
// exports.post = (req, res) => { 
//   const { nome, dateOfBirth, nasceuEmSp, id, livros } = req.body;
//   alunas.push({ nome, dateOfBirth, nasceuEmSp, id, livros });

//   fs.writeFile("./src/model/alunas.json", JSON.stringify(alunas), 'utf8', function (err) {
//     if (err) {
//       return res.status(500).send({ message: err });
//     }
//     console.log("The file was saved!");
//   }); 

//   return res.status(201).send(alunas);
// }

//POST para incluir uma aluna no BANCO
exports.post = (req, res) => { 
  let aluna = new Alunas(req.body);

  aluna.save(function (err) {
    if (err) res.status(500).send(err);

    return res.status(201).send(aluna);
  })}


//POST para incluir um livro em um cadastro existente JSON
// exports.postBooks = (req, res) => {
//   const id = req.params.id
//   const aluna = alunas.find(aluna => aluna.id == id)
//   if (!aluna) {
//     res.send("Nao encontrei essa garota")
//   }
//   const { titulo, leu } = req.body;
//   alunas[aluna.id - 1].livros.push({ titulo, leu });
  
//   fs.writeFile("./src/model/alunas.json", JSON.stringify(alunas), 'utf8', function (err) {
//     if (err) {
//         return res.status(500).send({ message: err });
//     }
//     console.log("The file was saved!");
//   });

//   res.status(201).send(alunas[aluna.id - 1].livros);
// }


//POST para incluir um livro em um cadastro existente BANCO
exports.postBooks = (req, res) => {
  const alunaId = req.params.id
  Alunas.findById(alunaId, function (err, aluna) {
    if (err) return res.status(500).send(err.message);

    if (!aluna) {
      return res.status(200).send({ message: `ID não localizado: ${alunaId}`})
      }

  const livro = req.body;
  (aluna.livros).push(livro);

  aluna.save(function(err) {
    if (err) res.status(500).send(err);

  res.status(201).send(aluna);
})
})}

//PUT para alterar um cadastro de aluna existente no BANCO
exports.update = (req, res) => {
  Alunas.update(
    {_id: req.params.id},
    {$set: req.body},
    {upsert: true},
    function(err) {
      if (err) return res.status(500).send({message: err});
      res.status(204).send({message: "Atualizado com sucesso!"}) //padrão 204 - "no content", sucesso e não precisa retornar nada 
    }
  )
}
//201:utilizado quando algo é criado