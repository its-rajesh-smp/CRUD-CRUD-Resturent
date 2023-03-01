
document.querySelector('.changeKey').addEventListener("dblclick",(e)=>{
    let a=prompt('Add Crud Link')
    if(a==""){return}
    else{
        if(confirm("Confirm To Add Key")){
            localStorage.setItem('key',a)
            location.reload()

        }
    }
    
})


let endpoint=localStorage.getItem('key');


window.addEventListener('DOMContentLoaded',()=>{
    if(localStorage.getItem('key')){
        getItem(localStorage.getItem("key"))
    }
    else{
        localStorage.setItem('key',endpoint)
    }
})




// Get Item
function getItem(endpoint){
    axios.get(`${endpoint}/resturent`)
    .then((res)=>{
        res.data.forEach(item => {
            addTolist(item)
        });
    })
    .catch((error)=>{
        console.warn(error);
    })
}





//Add Item
document.querySelector('.addBtn').addEventListener('click',(e)=>{
    e.preventDefault();
    let name=document.querySelector('.inpName').value
    let order=document.querySelector('.inpOrder').value
    let table=document.querySelector('.inpTable').value
    if(name=="" || order=="" || table=="Select Table"){
        alert('Add Input Fields');
        return
    }
    axios.post(`${endpoint}/resturent`,{
        "name":name,
        "order":order,
        "table":table
    })
    .then((res)=>{
        addTolist(res.data)
    })
    .catch((error)=>{
        console.warn(error);
    })
})





// Delete Item
document.querySelector('.table_container').addEventListener('click',(e)=>{
    e.preventDefault()
    if(e.target.classList.contains("btn-danger")){
        let target=e.target.parentElement.children[0].innerText
        
        axios.delete(`${endpoint}/resturent/${target}`)
            .then(()=>{
                e.target.parentElement.remove()
            })
            .catch((error)=>{
                console.warn(error);
            })
    }
})




















function addTolist(res){
    let newElement=document.createElement('div')
    newElement.classList.add('user')
    newElement.innerHTML=`
    <p style="display: none;">${res._id}</p>
    <p>${res.name}</p>
    <p style="font-weight: bolder; margin-left: 2px; margin-right: 2px;"> - </p>
    <p>${res.order}</p>
    <button my="asd" class="btn btn-sm btn-danger">X</button>
    `
    let table=res.table
    document.querySelector('.'+table).append(newElement)

}