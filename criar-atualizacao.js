const titulo = document.getElementById("titulo");
const conteudo = document.getElementById("conteudo");
const botao = document.getElementById("botaoPublicar");
const botaoSelecionarTodas = document.getElementById("botaoSelecionarTodas");
const areas = document.getElementsByName("area");

botaoSelecionarTodas.addEventListener("click", function () {
    const todasSelecionadas = Array.from(areas).every(function (area) {
        return area.checked;
    });

    for (let i = 0; i < areas.length; i++) {
        areas[i].checked = !todasSelecionadas;
    }

    if (todasSelecionadas) {
        botaoSelecionarTodas.textContent = "Selecionar todas";
    } else {
        botaoSelecionarTodas.textContent = "Desmarcar todas";
    }
});

botao.addEventListener("click", function () {
    const textoTitulo = titulo.value.trim();
    const textoConteudo = conteudo.value.trim();

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

    alert("Atualização criada com sucesso!");

    window.location.href = "./index.html";
});