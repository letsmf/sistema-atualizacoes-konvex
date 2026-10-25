const titulo = document.getElementById("titulo");
const conteudo = document.getElementById("conteudo");
const botao = document.getElementById("botaoPublicar");
const areas = document.getElementsByName("area");

botao.addEventListener("click", function () {
    const textoTitulo = titulo.value;
    const textoConteudo = conteudo.value;

    if (textoTitulo === "" || textoConteudo === "") {
        alert("Atualização não criada!\n\nPreencha o título e o conteúdo.");
        return;
    }

    const areasSelecionadas = [];

    for (let i = 0; i < areas.length; i++) {
        if (areas[i].checked) {
            areasSelecionadas.push(areas[i].value);
        }
    }

    if (areasSelecionadas.length === 0) {
        alert("Selecione pelo menos uma área!");
        return;
    }

    const atualizacao = {
        id: Date.now(),
        titulo: textoTitulo,
        conteudo: textoConteudo,
        areas: areasSelecionadas,
        dataPublicacao: new Date().toISOString()
    };

    const dadosSalvos = localStorage.getItem("atualizacoes");

    let atualizacoes = [];

    if (dadosSalvos !== null) {
        atualizacoes = JSON.parse(dadosSalvos);
    }

    atualizacoes.push(atualizacao);

    localStorage.setItem("atualizacoes", JSON.stringify(atualizacoes));

    console.log(atualizacao);

    alert(
        "Atualização criada com sucesso!\n\nTítulo: " +
        textoTitulo +
        "\nConteúdo: " +
        textoConteudo
    );
});
