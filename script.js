const STORAGE_KEY = 'blocoDeNotas-conteudo';
const STATUS_MENSAGENS = {
    vazio: 'Nenhuma alteração pendente.',
    salvo: 'Texto salvo automaticamente.',
    limpo: 'Notas removidas com sucesso.',
    erro: 'Não foi possível acessar o armazenamento local.'
};

function atualizarStatus(mensagem) {
    const statusAviso = document.getElementById('statusAviso');
    if (statusAviso) {
        statusAviso.textContent = mensagem;
    }
}

function armazenarNota(conteudo) {
    try {
        localStorage.setItem(STORAGE_KEY, conteudo);
        atualizarStatus(STATUS_MENSAGENS.salvo);
    } catch (error) {
        console.error('Erro ao salvar no localStorage:', error);
        atualizarStatus(STATUS_MENSAGENS.erro);
    }
}

function carregarNota() {
    try {
        const conteudoSalvo = localStorage.getItem(STORAGE_KEY);
        if (conteudoSalvo) {
            const blocoDeNotas = document.getElementById('blocoDeNotas');
            if (blocoDeNotas) {
                blocoDeNotas.value = conteudoSalvo;
            }
            atualizarStatus(STATUS_MENSAGENS.salvo);
        }
    } catch (error) {
        console.error('Erro ao ler do localStorage:', error);
        atualizarStatus(STATUS_MENSAGENS.erro);
    }
}

function limparNota() {
    const blocoDeNotas = document.getElementById('blocoDeNotas');
    if (blocoDeNotas) {
        blocoDeNotas.value = '';
    }
    try {
        localStorage.removeItem(STORAGE_KEY);
        atualizarStatus(STATUS_MENSAGENS.limpo);
    } catch (error) {
        console.error('Erro ao limpar localStorage:', error);
        atualizarStatus(STATUS_MENSAGENS.erro);
    }
}

function inicializarApp() {
    carregarNota();

    const blocoDeNotas = document.getElementById('blocoDeNotas');
    const btnLimpar = document.getElementById('btnLimpar');

    if (blocoDeNotas) {
        blocoDeNotas.addEventListener('input', () => {
            armazenarNota(blocoDeNotas.value);
        });
    }

    if (btnLimpar) {
        btnLimpar.addEventListener('click', limparNota);
    }
}

document.addEventListener('DOMContentLoaded', inicializarApp);
