const titulo = document.getElementById("titulo");
const conteudo = document.getElementById("conteudo");
const areas = document.getElementsByName("area");
const botaoSalvar = document.getElementById("botaoSalvar");

const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

const dadosSalvos = localStorage.getItem("atualizacoes");

let atualizacoes = [];

if(dadosSalvos !== null){

    atualizacoes = JSON.parse(dadosSalvos);
    
}

let atualizacaoEncontrada = null;

for(let i = 0; i < atualizacoes.length; i++){
    
    if(String(atualizacoes[i].id) === id){

        atualizacaoEncontrada = atualizacoes[i];
        break;

    }
}

    if(atualizacaoEncontrada === null){

        alert("Atualização não encontrada!");

        window.location.href = "./index.html";

} else {

    titulo.value = atualizacaoEncontrada.titulo;
    conteudo.value = atualizacaoEncontrada.conteudo;

    for(let i = 0; i < areas.length; i++){

        if(atualizacaoEncontrada.areas.includes(areas[i].value)){

            areas[i].checked = true;

        }
    }

    botaoSalvar.addEventListener("click", function (){

        const textoTitulo = titulo.value.trim(); 
        const textoConteudo = conteudo.value.trim();

        if(textoTitulo === "" || textoConteudo === ""){
        
            alert("Preencha o título e o conteúdo corretamente!");
            return;

        }

        const areasSelecionadas = [];

        for(let i = 0; i < areas.length; i++){

            if(areas[i].checked){

                areasSelecionadas.push(areas[i].value); 

            }
        }

        if(areasSelecionadas.length === 0){

            alert("Selecione pelo menos uma área!");
            return;

        }

        atualizacaoEncontrada.titulo = textoTitulo;
        atualizacaoEncontrada.conteudo = textoConteudo;
        atualizacaoEncontrada.areas = areasSelecionadas;

        localStorage.setItem(

            "atualizacoes",
            JSON.stringify(atualizacoes)

        );

        alert("Atualização alterada com sucesso!");

        window.location.href = "./atualizacao.html?id="+ id;

    })

}