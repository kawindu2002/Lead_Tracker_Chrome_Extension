
let inputBtn = document.querySelector("#input-btn");
const inputEl = document.querySelector("#input-el")
const ulEl = document.getElementById("ul-el")

let myLeads = []

// localStorage.clear();

let leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
if (leadsFromLocalStorage) {
        myLeads = leadsFromLocalStorage;
        renderLeads();
}


inputBtn.addEventListener("click",function(){
        if (inputEl.value == null || inputEl.value === ""){
                alert("Please enter link");
        }else{
                myLeads.push(inputEl.value);
                inputEl.value = "";
                
                localStorage.setItem("myLeads", JSON.stringify(myLeads));
                renderLeads();
                
                console.log(localStorage.getItem("myLeads"));
        }

});

function renderLeads(){
        let listItems = "";
        
        for (let i = 0; i < myLeads.length; i++) {
                listItems +=  `
                                    <li>
                                        <a target='_blank' href='${myLeads[i]}'>
                                            ${myLeads[i]}
                                        </a>
                                    </li>
                                `
                
        }
        
        ulEl.innerHTML = listItems;
        
}
