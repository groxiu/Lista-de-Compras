const btnCompra = document.querySelector('.add_compra')
const itemNome = document.querySelector('.input-item')
const formulario = document.querySelector('.formulario')
const itemValor = document.querySelector('.input-valor')
const exibirValorTotal= document.querySelector('.valor-total')
const itemQuantidade = document.querySelector('.quantidade')


const compra =''
const ulCompra = document.querySelector('.lista')
let listaDeCompras = JSON.parse(localStorage.getItem('item')) || []


calcularTotal()


function criarCompraNaTela(compra) {
  
    const li = document.createElement('li');
    li.classList.add('list_item');

    const div = document.createElement('div');
    div.classList.add('valor-nome');


   
    const p = document.createElement('p');
    p.innerHTML = `${compra.nome}`;

    const pQuantidade = document.createElement('p')
    pQuantidade.classList.add('p-quantidade')
    pQuantidade.innerHTML=`${compra.quantidade}x`
    
    const pValor = document.createElement('p');
    pValor.innerHTML = `R$${compra.valor}`;


    const bt = document.createElement('button');
    bt.classList.add('dell-compra');
    const imgBt = document.createElement('img');
    imgBt.setAttribute('src', '/img/dell.png');
    imgBt.classList.add('img-dell')
    bt.append(imgBt);

    //imagem para editar quantidade
    const imgEdit = document.createElement('img')
    imgEdit.setAttribute('src', 'img/edit.png')
    imgEdit.classList.add('img-edit')

    const divNomeQuantidade = document.createElement('div')
   
    divNomeQuantidade.classList.add('nome-quantidade')
    divNomeQuantidade.append(p)
    divNomeQuantidade.append(pQuantidade)
    divNomeQuantidade.append(imgEdit)

 

    div.append(bt);
    div.append(pValor);
    
    li.append(div);
    li.append(divNomeQuantidade)
    

   
    ulCompra.append(li);

   //funçao botao deletar
    bt.addEventListener('click', (e) => {
        li.remove();
        listaDeCompras.splice(e, 1);
        atualizarLista();
    });

    
//função botão edit
imgEdit.addEventListener('click', (event) => {
    
    const selectQuantidade = document.createElement('select');
    selectQuantidade.classList.add('select-editar-quantidade');

    // Opções de quantidade de 1 a 10
    for (let i = 1; i <= 10; i++) {
        const option = document.createElement('option');
        option.value = i
        option.textContent = i
        if (i == compra.quantidade) {
            option.selected = true
        }
        selectQuantidade.appendChild(option);
    }

    
    const btnSalvar = document.createElement('button')
    btnSalvar.textContent = 'Salvar'
    btnSalvar.classList.add('btn-salvar-quantidade')

   
    pQuantidade.replaceWith(selectQuantidade);
    imgEdit.replaceWith(btnSalvar);

    
    btnSalvar.addEventListener('click', () => {
      
        const novaQuantidade = selectQuantidade.value;
        const valorUnitario = compra.valor / compra.quantidade;
        compra.quantidade = novaQuantidade;
        compra.valor = valorUnitario * compra.quantidade; 

       
        atualizarLista();
        ulCompra.innerHTML = '';
        listaDeCompras.forEach(compra => criarCompraNaTela(compra));
        
      
        pQuantidade.textContent = `${compra.quantidade}x`;
        selectQuantidade.replaceWith(pQuantidade);
        btnSalvar.replaceWith(imgEdit);
    });
});






}

       
listaDeCompras.forEach(compra => {
    criarCompraNaTela(compra)
    
});


function atualizarLista(){
    localStorage.setItem('item', JSON.stringify(listaDeCompras))
    calcularTotal()
 
}

function adicionar(compra){

    compra ={
        nome: itemNome.value,
        valor:itemValor.value*itemQuantidade.value,
        quantidade: itemQuantidade.value,
    }

        listaDeCompras.push(compra)
        criarCompraNaTela(compra)
        atualizarLista()
        calcularTotal()

        itemNome.value = ''
        itemValor.value = ''
        itemQuantidade.value = 1

    
    
}

function validarCampos() {
    if (itemNome.value === '' || itemValor.value === '') {
        alert('Preencha os campos corretamente');
        return false;
    }

    if (itemValor.value < 0) {
        alert('Valor indevido');
        return false;
    }

    return true;
}

formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    if (validarCampos()) {
        adicionar();
    }
});

formulario.addEventListener('keypress', (event) => {
    
    if (event.key === 'Enter') {
        event.preventDefault();
        if (validarCampos()) {
            adicionar();
        }
    }
});



function calcularTotal() {
    let total = listaDeCompras.reduce((acc, compra) => {
        return acc + parseFloat(compra.valor) || 0; 
    }, 0);
     exibirValorTotal.textContent = `Total: R$ ${total.toFixed(2)}`; 
}