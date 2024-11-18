const form = document.getElementById('form-atividade')

/*variaveis para adicionar a imgem */
const imgAprovado = '<img src="./images/aprovado.png" alt= "Emogi celebrando" />'
const imgReprovado = '<img src= "./images/reprovado.png" alt= "Emogi decepcionado" />'
const atividades = [] /* calcula as notas e define se foi aprovado no final */
const notas = []   /* calcula as notas e define se foi aprovado no final */
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>'
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>'
const notaMinima = parseFloat(prompt('Digite a nota minima:'))

let linhas = '' /*ela precisa se tornar global (nao receber o valor de submit para nao ser resetado os valores) */

form.addEventListener('submit',function(e) /* o evento de submit é o principal*/{
    e.preventDefault() /*Essa função remove o comportamento de atualizar a tela quando for submetido */

    adicionarLinha() /* organizar a linha colocando em funçoes */
    atualizarTabela() /* organizar a linha colocando em funçoes */
    atualizaMediaFinal() /* organizar a linha colocando em funçoes */

})

function adicionarLinha() {
    const nomeAtividade = document.getElementById('nome-atividade')     
    const notaAtividade = document.getElementById('nota-atividade')
     /* de vez de substituir o conteudo, ira adicionar */

    if(atividades.includes(nomeAtividade.value)){
        alert(`a atividade "${nomeAtividade.value}" já foi inserida`) /*Não permite repetir o mesmo nome de atividade */
    } else { /* Tudo vai ocorrer normalmente */
        atividades.push(nomeAtividade.value) /*push para adicionar o conteudo */
        notas.push(parseFloat(notaAtividade.value)) /*push para adicionar o conteudo */ /*parseFloat serve para colocar numeros (quebrados)*/
    
        let linha = '<tr>' /* uma varivel que vai colocar todo conteudo dentro da tabela, que se localiza em uma tr do html */
        linha += `<td>${nomeAtividade.value}</td>` /*contatenação, e crases */
        linha += `<td>${notaAtividade.value}</td>`
        linha += `<td>${notaAtividade.value >= notaMinima ? imgAprovado : imgReprovado} </td>` /*operador ternario (>,=,<). IF = ?  ELSE = :     */
        linha += '</tr>'; /*fechamento da tag tr */
    
        linhas += linha /* de vez de substituir o conteudo, ira adicionar */
    }

    nomeAtividade.value = ''; /* limpa os campos */
    notaAtividade.value = ''; /* limpa os campos */
    /*não se esqueça das crase(acento ao contrario,) */
}

function atualizarTabela() {
    const corpoTabela = document.querySelector('tbody');  /*Colocar o conteudo dentro do corpo da tabela */
    corpoTabela.innerHTML = linhas   /* insere o conteudo dentro de uma tag */
} 

function atualizaMediaFinal() {
    const mediaFinal = calculaNotaFinal() 

    document.getElementById("media-final-valor").innerHTML = mediaFinal.toFixed(2) /*Limíta as casas decimais em (valor) */
    document.getElementById("media-final-resultado").innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculaNotaFinal(){
    let somaDasNotas = 0;

    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i]
    }

    return somaDasNotas / notas.length
}

