const btnCompra = document.querySelector('.add_compra')
const itemNome = document.querySelector('.input-item')
const formulario = document.querySelector('.formulario')
const itemValor = document.querySelector('.input-valor')
const exibirValorTotal= document.querySelector('.valor-total')




const compra =''

const ulCompra = document.querySelector('.lista')


let listaDeCompras = JSON.parse(localStorage.getItem('item')) || []


calcularTotal()




function criarCompraNaTela(compra){


        const li = document.createElement('li')
        li.classList.add('list_item')


        const div = document.createElement('div')
        div.classList.add('valor-nome')

        const p =document.createElement('p')
        p.innerHTML=`${compra.nome}`
        const pValor =document.createElement('p')
        pValor.innerHTML=`R$${compra.valor}`
    
        const bt = document.createElement('button')
        bt.classList.add('dell-compra')
        const imgBt = document.createElement('img')
        imgBt.setAttribute('src', '/img/dell.png')
        bt.append(imgBt)
    
        div.append(bt)
        div.append(pValor)
        li.append(div)
        li.append(p)
   
   
        ulCompra.append(li)
    
        bt.addEventListener('click',(e)=>{
            li.remove()
            listaDeCompras.splice(e, 1)
            atualizarLista()
            
        })
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
        valor:itemValor.value,
    }

        listaDeCompras.push(compra)
        criarCompraNaTela(compra)
        atualizarLista()
        calcularTotal()

        itemNome.value = ''
        itemValor.value = ''

    
    
}

formulario.addEventListener('submit', (event) => {

    if (itemNome.value === '' || itemValor.value === '') {
        alert('Preencha os campos corretamente');
        event.preventDefault();
        return;
    }

    if (itemValor.value < 0) {
        alert('Valor indevido');
        event.preventDefault();
        return; 
    }

    event.preventDefault()
    adicionar(); 
});


formulario.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        if (itemNome.value === '' || itemValor.value === '') {
            alert('Preencha os campos corretamente');
            event.preventDefault(); 
            return;
        }

        if (itemValor.value < 0) {
            alert('Valor indevido');
            event.preventDefault(); 
            return;
        }

    }
});




function calcularTotal() {
    let total = listaDeCompras.reduce((acc, compra) => {
        return acc + parseFloat(compra.valor) || 0; 
    }, 0);
     exibirValorTotal.textContent = `Total: R$ ${total.toFixed(2)}`; 
}
