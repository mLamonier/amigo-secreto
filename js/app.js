let amigosIncluidos = [];

function adicionar(){
    let nomeAmigo = document.getElementById('nome-amigo');
    let listaAmigos = document.getElementById('lista-amigos');

    if(nomeAmigo.value == ''){
        alert('Insira um nome!');
        return;
    }

    nomeAmigo.value = nomeAmigo.value[0].toUpperCase() + nomeAmigo.value.substring(1);

    if(amigosIncluidos.includes(nomeAmigo.value)){
        alert('Este nome já foi incluído!');
        nomeAmigo.value = '';
        return;
    }

    amigosIncluidos.push(nomeAmigo.value);

    if (listaAmigos.textContent == '') {
        listaAmigos.textContent = nomeAmigo.value;
    } else {
        listaAmigos.textContent = listaAmigos.textContent + ', ' + nomeAmigo.value;
    }

    nomeAmigo.value = '';

    atualizarLista();
    atualizarSorteio();
}

function sortear() {
    if (amigosIncluidos.length < 4) {
        alert('É necessário no mínimo 4 amigos para o sorteio!');
        return;
    }
    
    embaralhar(amigosIncluidos);
    
    let sorteio = document.getElementById('lista-sorteio');
    // Cria um ciclo de amigo secreto: cada amigo tira o próximo, o último tira o primeiro (como um círculo)
    for (let i = 0; i < amigosIncluidos.length; i++) {
        if (i == amigosIncluidos.length - 1) {
            // Último amigo tira o primeiro para fechar o ciclo
            sorteio.innerHTML = sorteio.innerHTML + amigosIncluidos[i] + ' --> ' + amigosIncluidos[0] + '<br>';
        } else {
            // Cada amigo tira o próximo da lista
            sorteio.innerHTML = sorteio.innerHTML + amigosIncluidos[i] + ' --> ' + amigosIncluidos[i + 1] + '<br>';
        }
    }
}

function excluirAmigo(index) {
    amigosIncluidos.splice(index, 1);
    atualizarLista();
    atualizarSorteio();
}

// Embaralha a lista como um baralho: troca cada elemento com outro aleatoriamente, de trás para frente
function embaralhar(lista) {
    // Percorre a lista de trás para frente (como caixas de uma fileira), de length até 1
    for (let indice = lista.length; indice; indice--) { // Roda lista.length vezes enquanto indice > 0
        const indiceAleatorio = Math.floor(Math.random() * indice);
        // Troca o elemento atual com um aleatório à sua frente
        [lista[indice - 1], lista[indiceAleatorio]] = [lista[indiceAleatorio], lista[indice - 1]];
    }
}

function atualizarSorteio() {
    let sorteio = document.getElementById('lista-sorteio');
    sorteio.innerHTML = '';
}

function atualizarLista() {
    let listaAmigos = document.getElementById('lista-amigos');
    listaAmigos.innerHTML = '';


    for (let i = 0; i < amigosIncluidos.length; i++) {
        // Cria um elemento de parágrafo para cada amigo
        let paragrafo = document.createElement('p');
        paragrafo.textContent = amigosIncluidos[i];
       
        // Adiciona um evento de clique para excluir o amigo
        paragrafo.addEventListener('click', function() {
            excluirAmigo(i);
        });


        // Adiciona o parágrafo à lista
        listaAmigos.appendChild(paragrafo);
    }
}

function reiniciar(){
    amigosIncluidos = [];
    document.getElementById('lista-amigos').innerHTML = '';
    document.getElementById('lista-sorteio').innerHTML = '';
}
