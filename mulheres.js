const express = require("express") 
// iniciando o express
const router = express.Router() 
// configurando a primeira parte da rota
const { v4: uuidv4} = require("uuid") 
// importando a biblioteca uuid

const conectaBD = require("./bd")
// ligando ao arquivo bd
conectaBD()
// chamando a função que conecta o banco de dados

const Mulher = require("./model")
const app = express() 
// iniciando o app
app.use(express.json())
const porta = 3333 
// criando a porta


//GET
async function mostraMulheres(request, response) {
    try {
      const mulheres_vindas_do_bd = await Mulher.find()

      response.json(mulheres_vindas_do_bd)

    }catch (erro) {
      console.log(erro)

    }
}

//POST
function criaMulher(request, response){
  const novaMulher = {
    id: uuidv4(),
    nome: request.body.nome,
    imagem: request.body.imagem,
    minibio: request.body.minibio
  }

  mulheres.push(novaMulher) 
  // enviando o cadastro da nova mulher para a lista mulheres
    response.json(mulheres)
  // resposta com a lista completa atual
}

//PATCH
function corrigeMulher(request, response){
  let mulherEncontrada; // Declarada aqui

  function encontraMulher(mulher){
    if (mulher.id == request.params.id){
      return mulher
    }
  }

  mulherEncontrada = mulheres.find(encontraMulher); // Atribuição após a busca

  if (request.body.nome){
    mulherEncontrada.nome = request.body.nome
  }

  if (request.body.minibio){
    mulherEncontrada.minibio = request.body.minibio
  }

  if (request.body.imagem){
    mulherEncontrada.imagem = request.body.imagem
  }

  response.json(mulheres)
} 

//DELETE
function deletaMulher(request, response){
  function todasMenosEla(mulher){
    if (mulher.id !== request.params.id) {
      return mulher
    }
  }

  const mulheresQueFicam = mulheres.filter(todasMenosEla)

  response.json(mulheresQueFicam)
}

//PORTA
function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta)
}

app.use(router.get('/mulheres', mostraMulheres))
// configurei a rota GET /mulheres
app.use(router.post("/mulheres", criaMulher))
// configurei rota POST /mulheres
app.use(router.patch("/mulheres/:id", corrigeMulher))
// configurei rota PATCH /mulheres/
app.use(router.delete("/mulheres/:id", deletaMulher))
//configurei rota DELETE /mulheres
app.listen(porta, mostraPorta)
// servidor ouvindo a porta