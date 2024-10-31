// Função para abrir o modal
function abrirModal() {
  document.getElementById("modal").style.display = "block";
}

// Função para fechar o modal
function fecharModal() {
  document.getElementById("modal").style.display = "none";
  // Limpar os inputs
  document.getElementById("nome").value = '';
  document.getElementById("custo").value = '';
  document.getElementById("dataLimite").value = '';
}

// Função para adicionar uma tarefa na tabela
function adicionarTarefa() {
  const nome = document.getElementById("nome").value;
  const custo = parseFloat(document.getElementById("custo").value);
  const dataLimite = document.getElementById("dataLimite").value;

  if (!nome || isNaN(custo) || !dataLimite) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const lista = document.getElementById("listaTarefas");
  const novaLinha = document.createElement("tr");

  // Adiciona uma classe para tarefas com custo >= R$1.000,00
  if (custo >= 1000) {
    novaLinha.classList.add("high-cost");
  }

  novaLinha.innerHTML = `
    <td>${nome}</td>
    <td>R$${custo.toFixed(2)}</td>
    <td>${dataLimite}</td>
    <td class="actions">
      <button class="btn-icon" onclick="editarTarefa(this)">
        <i class="fas fa-edit"></i>
      </button>
      <button class="btn-icon" onclick="excluirTarefa(this)">
        <i class="fas fa-trash-alt"></i>
      </button>
    </td>
  `;

  lista.appendChild(novaLinha);
  fecharModal(); // Fecha o modal após salvar a tarefa
}

// Função para editar uma tarefa
function editarTarefa(botao) {
  const linha = botao.closest("tr");
  const nome = prompt("Nome da Tarefa:", linha.cells[0].innerText);
  const custo = prompt("Custo (R$):", linha.cells[1].innerText.replace("R$", ""));
  const dataLimite = prompt("Data Limite:", linha.cells[2].innerText);

  if (nome && !isNaN(parseFloat(custo)) && dataLimite) {
    linha.cells[0].innerText = nome;
    linha.cells[1].innerText = `R$${parseFloat(custo).toFixed(2)}`;
    linha.cells[2].innerText = dataLimite;

    // Atualizar a classe de custo alto
    if (parseFloat(custo) >= 1000) {
      linha.classList.add("high-cost");
    } else {
      linha.classList.remove("high-cost");
    }
  }
}

// Função para excluir uma tarefa
function excluirTarefa(botao) {
  if (confirm("Deseja realmente excluir esta tarefa?")) {
    const linha = botao.closest("tr");
    linha.remove();
  }
}

