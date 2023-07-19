// Importar o módulo Express
const express = require('express');

// Objeto para manipular rotas
const app = express();

// Configurar o body-parser (transitar dados entre rotas)
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Variáveis
let vetor = [];
let codigo = 1;

// Rotas
app.get('/' , function(req, res){
    //res.status(200).json({'mensagem':'Hello World!'});
    res.status(200).json(vetor);
    res.end();
});

app.post('/', function(req, res){
    
    if(req.body.nome === ""){
        res.status(400).json({'mensagem':'O campo nome deve ser preenchido'});
    }else if(req.body.idade < 0){
        res.status(400).json({'mensagem':'O campo idade deve ser zero ou mais'});
    }else {
        // Atribuir a característica código
        req.body.codigo = codigo

        // Incrementar o código
        codigo++;

        // Adicionar o objeto no vetor
        vetor.push(req.body);

        // Retornar mensagem
        res.status(201).json({'mensagem':'Cadastro efetuado com sucesso!'});
    }

});

app.put('/:codigo', function(req, res){
    
    // Verificar se o código informado existe no vetor
    let codigoExiste = vetor.findIndex(obj => {return obj.codigo == req.params.codigo});

    // Caso não exista o código
    if(codigoExiste == -1){
        res.status(404).json({'mensagem':'O código informado não existe'});
    }else{
        // Validações
        if(req.body.nome === ""){

        }else if(req.body.idade <0){

        }else{
            // Realizar as modificações no objeto
            let obj = {
                'codigo':req.params.codigo,
                'nome':req.body.nome,
                'idade':req.body.idade
            }

            // Alterar o vetor
            vetor[codigoExiste] = obj;

            // Retorno
            res.status(200).json(obj);
        }

    }

});

app.delete('/:codigo', function(req, res){
    
    // Verificar se o código informado existe no vetor
    let codigoExiste = vetor.findIndex(obj => {return obj.codigo === req.params.codigo});

    // Caso não exista o código
    if(codigoExiste === -1){
        res.status(404).json({'mensagem':'O código informado não existe'});
    }else{
        // Remover do vetor
        vetor.splice(codigoExiste, 1);

        // Retorno
        res.status(200).json({'mensagem':'Pessoa removida com sucesso'});
    }

});


// Servidor
app.listen(8080);