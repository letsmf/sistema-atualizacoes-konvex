const resultados = document.getElementById("resultados");
const botaoPesquisar = document.getElementById("botaoPesquisar");
const entrada = document.getElementById("entrada");
const filtroArea = document.getElementById("filtroArea");
const dataInicial = document.getElementById("dataInicial");
const dataFinal = document.getElementById("dataFinal");

function formatarData(data) {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const dia = String(data.getDate()).padStart(2, "0");

    return ano + "-" + mes + "-" + dia;
}

function mostrarAtualizacoes(textoPesquisa) {
    const dadosSalvos = localStorage.getItem("atualizacoes");

    let atualizacoes = [];

    if (dadosSalvos !== null) {
        atualizacoes = JSON.parse(dadosSalvos);
    }

    resultados.textContent = "";

    const pesquisa = textoPesquisa.trim().toLowerCase();
    const areasSelecionadas = filtroArea.value;
    const inicio = dataInicial.value;
    const fim = dataFinal.value;

    if (inicio !== "" && fim !== "" && inicio > fim) {
        resultados.textContent = "A data inicial não pode ser posterior à data final.";
        return;
    }

    if (atualizacoes.length === 0) {
        resultados.textContent = "Nenhuma atualização cadastrada.";
        return;
    }

    let encontrou = false;

    for (let i = 0; i < atualizacoes.length; i++) {
        const atualizacao = atualizacoes[i];

        const tituloMinusculo = atualizacao.titulo.toLowerCase();
        const idTexto = String(atualizacao.id);

        const correspondePesquisa =
            tituloMinusculo.includes(pesquisa) ||
            idTexto.includes(pesquisa);

        const correspondeArea =
            areasSelecionadas === "" ||
            atualizacao.areas.includes(areasSelecionadas);

        let correspondeData = true;

        if (inicio !== "" || fim !== "") {
            if (!atualizacao.dataPublicacao) {
                correspondeData = false;
            } else {
                const dataPublicacao = formatarData(
                    new Date(atualizacao.dataPublicacao)
                );

                if (inicio !== "" && dataPublicacao < inicio) {
                    correspondeData = false;
                }

                if (fim !== "" && dataPublicacao > fim) {
                    correspondeData = false;
                }
            }
        }

        if (correspondePesquisa && correspondeArea && correspondeData) {
            encontrou = true;

            const linkAtualizacao = document.createElement("a");
            linkAtualizacao.href = "./atualizacao.html?id=" + atualizacao.id;

            const publicacao = document.createElement("article");

            const titulo = document.createElement("h2");
            titulo.textContent = atualizacao.titulo;

            const previa = document.createElement("p");

            if (atualizacao.conteudo.length > 120) {
                previa.textContent =
                    atualizacao.conteudo.substring(0, 120) + "...";
            } else {
                previa.textContent = atualizacao.conteudo;
            }

            const areas = document.createElement("p");
            areas.textContent = "Áreas: " + atualizacao.areas.join(", ");

            publicacao.appendChild(titulo);
            publicacao.appendChild(previa);
            publicacao.appendChild(areas);

            linkAtualizacao.appendChild(publicacao);
            resultados.appendChild(linkAtualizacao);
        }
    }

    if (!encontrou) {
        resultados.textContent = "Nenhuma atualização encontrada.";
    }
}

botaoPesquisar.addEventListener("click", function () {
    mostrarAtualizacoes(entrada.value);
});

entrada.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
        mostrarAtualizacoes(entrada.value);
    }
});

dataFinal.addEventListener("change", function () {
    mostrarAtualizacoes(entrada.value);
});

dataInicial.addEventListener("change", function () {
    mostrarAtualizacoes(entrada.value);
});

filtroArea.addEventListener("change", function () {
    mostrarAtualizacoes(entrada.value);
});

mostrarAtualizacoes("");