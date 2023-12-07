let musicas = [
    { titulo: '1979', artista: 'Smashing Pumpkins', source: 'musicas/1979.mp3', img: 'imagens/79_cover.jpg' },
    { titulo: 'Bizarre Love Triangle', artista: 'New Order', source: 'musicas/bizarre love triangle.mp3', img: 'imagens/blt_cover.png' },
    { titulo: 'Weird Fishes/ Arpeggi', artista: 'Radiohead', source: 'musicas/weird fishes.mp3', img: 'imagens/wf_cover.jpg' }
];

// INICIO
let musica = document.querySelector('audio');
let musicaIndex = 0;

let nomeMusica = document.querySelector('.descricao h2');
let nomeArtista = document.querySelector('.descricao i');
let imagem = document.querySelector('img');
let tempoDecorrido = document.querySelector('.tempo .inicio');
let duracaoMusica = document.querySelector('.tempo .fim');
let progressBar = document.querySelector('.barra progress');

// Definir o src da música e carregar informações
renderizarMusica(musicaIndex);

// EVENTOS
document.querySelector('.botao-play').addEventListener('click', tocarMusica);
document.querySelector('.botao-pause').addEventListener('click', pausarMusica);
musica.addEventListener('timeupdate', atualizarBarra);
document.querySelector('.anterior').addEventListener('click', () => trocarMusica(-1));
document.querySelector('.proximo').addEventListener('click', () => trocarMusica(1));
document.querySelector('.barra').addEventListener('click', ajustarTempo);

// FUNÇÕES
function renderizarMusica(index) {
    musicaIndex = index;
    musica.setAttribute('src', musicas[musicaIndex].source);

    musica.addEventListener('loadeddata', () => {
        nomeMusica.textContent = musicas[musicaIndex].titulo;
        nomeArtista.textContent = musicas[musicaIndex].artista;
        imagem.src = musicas[musicaIndex].img;

        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
    });

    document.body.append(musica);
}

function tocarMusica() {
    musica.play();
    document.querySelector('.botao-play').style.display = 'none';
    document.querySelector('.botao-pause').style.display = 'block';
}

function pausarMusica() {
    musica.pause();
    document.querySelector('.botao-play').style.display = 'block';
    document.querySelector('.botao-pause').style.display = 'none';
}

function trocarMusica(direction) {
    musicaIndex += direction;
    if (musicaIndex < 0) {
        musicaIndex = musicas.length - 1;
    } else if (musicaIndex >= musicas.length) {
        musicaIndex = 0;
    }
    renderizarMusica(musicaIndex);
    tocarMusica();
}

function segundosParaMinutos(segundos) {
    let campoMinutos = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60;

    if (campoSegundos < 10) {
        campoSegundos = '0' + campoSegundos;
    }
    return `${campoMinutos}:${campoSegundos}`;
}

function atualizarBarra() {
    let barra = progressBar;
    barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}

function ajustarTempo(event) {
    const clicouX = event.clientX - progressBar.getBoundingClientRect().left;
    const larguraBarra = progressBar.clientWidth;
    const percentagemClicada = clicouX / larguraBarra;
    const novoTempo = percentagemClicada * musica.duration;
    musica.currentTime = novoTempo;
}
