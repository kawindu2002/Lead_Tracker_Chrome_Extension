
let inputBtn = document.querySelector("#input-btn");
const inputEl = document.querySelector("#input-el")
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")

let myLeads = []

tabBtn.addEventListener("click", function(){
    
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                myLeads.push(tabs[0].url)
                localStorage.setItem("myLeads", JSON.stringify(myLeads) )
                render(myLeads)
        })
})

// localStorage.clear();

let leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
if (leadsFromLocalStorage) {
        myLeads = leadsFromLocalStorage;
        render(myLeads);
}

inputBtn.addEventListener("click",function(){
        if (inputEl.value == null || inputEl.value === ""){
                callAlert("Can not accept empty data!");
        }else{
                myLeads.push(inputEl.value);
                inputEl.value = "";
                
                localStorage.setItem("myLeads", JSON.stringify(myLeads));
                render(myLeads);
                
                console.log(localStorage.getItem("myLeads"));
        }

});

deleteBtn.addEventListener("dblclick", function() {
        if (!myLeads || myLeads.length === 0){
                callAlert("No data to delete!");
        }else{
                localStorage.clear()
                myLeads = []
                render(myLeads);
        }
});


function render(arr){
        let listItems = "";
        
        for (let i = 0; i < arr.length; i++) {
                listItems +=  `
                                    <li>
                                        <a target='_blank' href='${arr[i]}'>
                                            ${arr[i]}
                                        </a>
                                    </li>
                                `
                
        }
        
        ulEl.innerHTML = listItems;
        
}

function callAlert(msg){
        Swal.fire({
                title: "Oops!",
                text: msg,
                icon: "error",
                background: "#fff0f0",
                color: "#b91c1c",
                iconColor: "#ef4444",
                confirmButtonText: "Try Again",
                confirmButtonColor: "#ef4444",
                customClass: {
                        popup: 'rounded-alert',
                        title: 'alert-title',
                        confirmButton: 'alert-button'
                }
        });
}