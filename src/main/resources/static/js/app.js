const API_URL = "/api/livros";

const formulario = document.getElementById("livroForm");
const tabela = document.getElementById("livrosTabela");
const campoId = document.getElementById("livroId");
const botaoSalvar = formulario.querySelector('button[type="submit"]');
const botaoCancelar = document.getElementById("cancelarEdicao");

// Elementos do modal de confirmação
const modalElemento = document.getElementById("confirmarExclusaoModal");
const modalExclusao = new bootstrap.Modal(modalElemento);
const botaoConfirmarExclusao = document.getElementById("confirmarExclusaoBtn");

let livroIdParaExcluir = null;

// Controla o estado de carregamento de um botão
function definirCarregamento(botao, carregando, textoOriginal) {
  if (carregando) {
    botao.dataset.textoOriginal = textoOriginal;
    botao.disabled = true;

    botao.innerHTML = `
            <span class="spinner-border spinner-border-sm me-2"
                  aria-hidden="true"></span>
            Aguarde...
        `;
  } else {
    botao.disabled = false;
    botao.textContent = botao.dataset.textoOriginal;
  }
}

// Exibe mensagens de sucesso ou erro na interface

let temporizadorMensagem;

function exibirMensagem(mensagem, tipo) {
  const elemento = document.getElementById("feedbackMessage");

  // Cancela o temporizador anterior, se existir
  clearTimeout(temporizadorMensagem);

  // Exibe a mensagem
  elemento.textContent = mensagem;
  elemento.className = `alert alert-${tipo}`;

  // Oculta a mensagem após 4 segundos
  temporizadorMensagem = setTimeout(() => {
    elemento.classList.add("d-none");
  }, 4000);
}

// Consulta e exibe todos os livros
async function carregarLivros() {
  try {
    const resposta = await fetch(API_URL);

    if (!resposta.ok) {
      throw new Error("Erro ao consultar os livros.");
    }

    const livros = await resposta.json();

    tabela.innerHTML = "";

    livros.forEach((livro) => {
      const linha = document.createElement("tr");

      const valores = [
        livro.id,
        livro.titulo,
        livro.autor,
        livro.isbn ?? "",
        livro.anoPublicacao ?? "",
      ];

      valores.forEach((valor) => {
        const celula = document.createElement("td");
        celula.textContent = valor;
        linha.appendChild(celula);
      });

      const celulaAcoes = document.createElement("td");

      celulaAcoes.innerHTML = `
                <button class="btn btn-sm btn-warning me-1"
                        data-acao="editar" data-id="${livro.id}">
                    Editar
                </button>

                <button class="btn btn-sm btn-danger"
                        data-acao="excluir" data-id="${livro.id}">
                    Excluir
                </button>
            `;

      linha.appendChild(celulaAcoes);
      tabela.appendChild(linha);
    });
  } catch (erro) {
    console.error("Falha ao carregar livros:", erro);
    exibirMensagem("Não foi possível carregar os livros.", "danger");
  }
}

// Cadastra ou atualiza um livro
formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const id = campoId.value;
  const textoOriginal = id ? "Atualizar livro" : "Salvar livro";

  const livro = {
    titulo: document.getElementById("titulo").value.trim(),
    autor: document.getElementById("autor").value.trim(),
    isbn: document.getElementById("isbn").value.trim() || null,
    anoPublicacao: document.getElementById("anoPublicacao").value
      ? Number(document.getElementById("anoPublicacao").value)
      : null,
  };

  definirCarregamento(botaoSalvar, true, textoOriginal);

  try {
    const resposta = await fetch(id ? `${API_URL}/${id}` : API_URL, {
      method: id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(livro),
    });

    if (!resposta.ok) {
      throw new Error(`Erro HTTP: ${resposta.status}`);
    }

    formulario.reset();
    campoId.value = "";
    botaoCancelar.classList.add("d-none");

    await carregarLivros();

    exibirMensagem(
      id ? "Livro atualizado com sucesso!" : "Livro cadastrado com sucesso!",
      "success",
    );
  } catch (erro) {
    console.error("Falha ao salvar livro:", erro);
    exibirMensagem(
      "Não foi possível cadastrar ou atualizar o livro.",
      "danger",
    );
  } finally {
    definirCarregamento(botaoSalvar, false, textoOriginal);

    if (!campoId.value) {
      botaoSalvar.textContent = "Salvar livro";
    }
  }
});

// Trata os cliques nos botões Editar e Excluir
tabela.addEventListener("click", async (evento) => {
  const botao = evento.target.closest("button[data-acao]");

  if (!botao) return;

  const id = botao.dataset.id;
  const acao = botao.dataset.acao;

  if (acao === "editar") {
    try {
      const resposta = await fetch(`${API_URL}/${id}`);

      if (!resposta.ok) {
        throw new Error(`Erro HTTP: ${resposta.status}`);
      }

      const livro = await resposta.json();

      campoId.value = livro.id;
      document.getElementById("titulo").value = livro.titulo;
      document.getElementById("autor").value = livro.autor;
      document.getElementById("isbn").value = livro.isbn ?? "";
      document.getElementById("anoPublicacao").value =
        livro.anoPublicacao ?? "";

      botaoSalvar.textContent = "Atualizar livro";
      botaoCancelar.classList.remove("d-none");

      formulario.scrollIntoView({ behavior: "smooth" });
    } catch (erro) {
      console.error("Falha ao buscar livro:", erro);
      exibirMensagem("Não foi possível carregar os dados do livro.", "danger");
    }
  }

  if (acao === "excluir") {
    livroIdParaExcluir = id;
    modalExclusao.show();
  }
});

// Executa a exclusão após a confirmação no modal
botaoConfirmarExclusao.addEventListener("click", async () => {
  if (!livroIdParaExcluir) return;

  try {
    const resposta = await fetch(`${API_URL}/${livroIdParaExcluir}`, {
      method: "DELETE",
    });

    if (!resposta.ok) {
      throw new Error(`Erro HTTP: ${resposta.status}`);
    }

    modalExclusao.hide();

    await carregarLivros();

    exibirMensagem("Livro excluído com sucesso!", "success");
  } catch (erro) {
    console.error("Falha ao excluir livro:", erro);
    modalExclusao.hide();
    exibirMensagem("Não foi possível excluir o livro.", "danger");
  } finally {
    livroIdParaExcluir = null;
  }
});

// Cancela uma edição em andamento
botaoCancelar.addEventListener("click", () => {
  formulario.reset();
  campoId.value = "";
  botaoSalvar.textContent = "Salvar livro";
  botaoCancelar.classList.add("d-none");
});

// Carrega a listagem ao abrir a página
document.addEventListener("DOMContentLoaded", carregarLivros);
