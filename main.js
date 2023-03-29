const myForm = document.querySelector('#my-form');
const amountInput = document.querySelector('#amount');
const descriptionInput = document.querySelector('#Description');
const categoryInput=document.querySelector('category');
const expenseList = document.querySelector('#expense');

myForm.addEventListener('submit', onSubmit);
var desc=descriptionInput.value;

function onSubmit(e){
    e.preventDefault();
    var amount=amountInput.value
    var Description=descriptionInput.value

    var hdgdg=document.getElementById('category')
    var category=hdgdg.options[hdgdg.selectedIndex].text;




    let obj={
      amount,
      Description,
      category
    };

    axios.post("http://localhost:5000/admin/add-expense",obj)
    .then((response)=>{
      console.log(response)
      showNewUserOnScreen(response.data.newExpenseDetail)  
    })
    .catch((err)=>{
      document.body.innerHTML=document.body.innerHTML+"<h4>Something went wrong</h4>"
      console.log(err);
    })
}

window.addEventListener("DOMContentLoaded", () =>{
    
  axios.get("http://localhost:5000/admin/get-expenses")
  .then((response)=>{
    console.log(response);
    for(var i=0;i<response.data.allExpenses.length;i++){
      showNewUserOnScreen(response.data.allExpenses[i]);
    }
  })
  .catch((err)=>{
    console.log(err);
  })
})



function showNewUserOnScreen(user){
  document.getElementById('amount').value='';
  document.getElementById('Description').value='';
  // document.getElementById('category').options[document.getElementById('category').selectedIndex].text=""; 

    const parentNode=document.getElementById('expense');
    const childHTML = `<li id=${user.id}> ${user.amount} - ${user.Description}-${user.category}
                                          <button onclick=deleteUser('${user.id}')> Delete Expense </button>
                                          <button onclick=editUserDetails('${user.id}','${user.amount}','${user.Description}','${user.category}')>Edit Expense </button>
                                       </li>`
    parentNode.innerHTML=parentNode.innerHTML+childHTML;
}

  
function editUserDetails(id,amount, Description, category){
    document.getElementById('amount').value = amount;
    document.getElementById('Description').value = Description;
    
    document.getElementById('category').options[document.getElementById('category').selectedIndex].text=category;
    console.log(document.getElementById('category').options[document.getElementById('category').selectedIndex].text)
    deleteUser(id);
}
  

function deleteUser(id){
    axios.delete(`http://localhost:5000/admin/delete-expense/${id}`)
    .then((response)=>{  
      console.log(response);  
      removeUserFromScreen(id)
    })
    .catch((err)=>{
      console.log(err);
    })
}
  

function removeUserFromScreen(id){
  const parentNode = document.getElementById('expense');
  const childNodeToBeDeleted = document.getElementById(id);
  if(childNodeToBeDeleted){
    parentNode.removeChild(childNodeToBeDeleted);
  }  
}