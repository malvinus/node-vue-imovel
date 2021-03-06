var express = require('express');
var router = express.Router();

var ferramentas = require("../Utils/funcoesAuxiliares");

router.post('/', function(req, res) {

	let valorImovel = req.body.valorImovel;
	let taxa = req.body.taxa/100;
	let numeroParcelas = req.body.numeroParcelas;
	let porcentagemEntrada = req.body.porcentagemEntrada/100;
	let dataInicial = req.body.dataInicio;
	taxa = Math.pow((1+taxa),(1/12))-1;	

	dadosCalculo = {
		valorImovel,
		taxa,
		numeroParcelas,
		porcentagemEntrada,
		dataInicial
	}
	let salario = req.body.salario;
    parcelas = ferramentas.calculoParcelas(dadosCalculo);
    if (!ferramentas.verificaSalario(salario, parcelas[0].valorParcela)) {
        res.send("Salario insuficiente")
    } else {
        res.send(parcelas);
    }
});

module.exports = router;