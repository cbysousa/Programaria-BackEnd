const mongoose = require("mongoose")

async function conectaBD() {
    try {
        // tente executar essas instruções [...]
        console.log("A conecão com o banco de dados iniciou")

        await mongoose.connect("mongodb+srv://helloworld:4eZIWKjksNwoskZF@clustermulheres.abydsiu.mongodb.net/?retryWrites=true&w=majority&appName=ClusterMulheres")
    
        console.log("Conexão com o banco de dados feita com sucesso!")

    } catch(erro) {
        //[...] caso não consiga, pegue (catch) o erro e me mostre (console.log)
        console.log(erro)
    }
}

module.exports = conectaBD