
const inputEl = document.querySelector("#input-el");
const inputBtn = document.querySelector("#input-btn");
const ulEl = document.querySelector("#ulel");
const delBtn = document.querySelector("#delete-btn");
const tabBtn = document.querySelector("#tab-btn");
let myLeadsArr = [];
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeadsArr"));

if(leadsFromLocalStorage)
{
    myLeadsArr = leadsFromLocalStorage;
    render(myLeadsArr);
}

function render(leads)
{
    let listItems = "";
    for(let i=0;i<leads.length;i++)
    {
        listItems+=`<li>
        <a href='http://${leads[i]}' target='_blank'> ${leads[i]} </a>
        </li>`;
    }
    ulEl.innerHTML=listItems;
}

inputBtn.addEventListener("click",function()
{
    
        if(inputEl.value.length>0)
        {
            myLeadsArr.push(inputEl.value);
            inputEl.value="";
            localStorage.setItem("myLeadsArr",JSON.stringify(myLeadsArr));
            render(myLeadsArr)
        }
    //console.log(myLeadsArr);
    
})
delBtn.addEventListener("click",function()
{
    localStorage.clear();
    myLeadsArr=[];
    render(myLeadsArr);
})
tabBtn.addEventListener("click",function()
{
    
    chrome.tabs.query({active:true,currentWindow:true},function(tabs)
    {
        myLeadsArr.push(tabs[0].url);
        localStorage.setItem("myLeadsArr",JSON.stringify(myLeadsArr));
        render(myLeadsArr);
    })
    
})

