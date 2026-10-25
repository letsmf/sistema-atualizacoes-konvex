const detalhes = document.getElementById("detalhes");
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

if (atualizacaoEncontrada === null) {

    detalhes.textContent = "Atualização não encontrada.";

} else {

    const titulo = document.createElement("h2");
    titulo.textContent = atualizacaoEncontrada.titulo;

    detalhes.appendChild(titulo);

    const conteudo = document.createElement("p");
    conteudo.textContent = atualizacaoEncontrada.conteudo;

    detalhes.appendChild(conteudo);

    const areas = document.createElement("p");

    areas.textContent =
        "Áreas: " + atualizacaoEncontrada.areas.join(", ");

    detalhes.appendChild(areas);

    if (atualizacaoEncontrada.dataPublicacao) {

        const data = document.createElement("p");

        data.textContent =
            "Publicado em: " +
            new Date(atualizacaoEncontrada.dataPublicacao)
                .toLocaleString("pt-BR");

        detalhes.appendChild(data);

    }

    const botaoEditar = document.createElement("button");

    botaoEditar.textContent = "Editar atualização";

    detalhes.appendChild(botaoEditar);

    botaoEditar.addEventListener("click", function () {

        window.location.href = "./editar-atualizacao.html?id=" + id; 

    });

    const botaoExcluir = document.createElement("button");

    botaoExcluir.textContent = "Excluir atualização";

    detalhes.appendChild(botaoExcluir);

    botaoExcluir.addEventListener("click", function () {

        const confirmar = confirm(
            "Tem certeza de que deseja excluir esta atualização?"
        );

        if (confirmar) {

            const atualizacoesRestantes = [];

            for (let i = 0; i < atualizacoes.length; i++) {

                if (String(atualizacoes[i].id) !== id) {

                    atualizacoesRestantes.push(atualizacoes[i]);

                }

            }

            localStorage.setItem(
                "atualizacoes",
                JSON.stringify(atualizacoesRestantes)
            );

            alert("Atualização excluída com sucesso!");

            window.location.href = "./index.html";

        }

    });

}