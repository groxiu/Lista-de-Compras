const adicionarTarefa = document.querySelector('.add_compra')
const textArea = document.querySelector('.formulario')
const compra =''

const ulCompra = document.querySelector('.lista')

let listaDeCompras = JSON.parse(localStorage.getItem('item')) || []


adicionarTarefa.addEventListener('click',()=>{

    const verificar = textArea.value.trim()
    if (verificar === '') {
        alert('Você deve preencher o campo')
        
    } else {
        
        adicionar(compra) 
        
       
    }
})
textArea.addEventListener('keydown', (event) => {
    
    if (event.key === 'Enter') {
       
        adicionar(compra);
    }
});



function criarCompraNaTela(compra){
    const li = document.createElement('li')
    li.classList.add('list_item')

    const p =document.createElement('p')
    p.textContent = compra

    const bt = document.createElement('button')
    const imgBt = document.createElement('img')
    imgBt.setAttribute('src', '/img/dell.png')
    bt.append(imgBt)


    li.append(p)
    li.append(bt)
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
}

function adicionar(compra){
    compra = textArea.value
    console.log(compra);
    listaDeCompras.push(compra)
    console.log(listaDeCompras)
    criarCompraNaTela(compra)
    atualizarLista()

    textArea.value = ''
}