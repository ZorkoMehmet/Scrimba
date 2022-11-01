let products = []

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("products") )
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    products = leadsFromLocalStorage
    render(products)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        products.push(tabs[0].url)
        localStorage.setItem("products", JSON.stringify(products) )
        render(products)
    })
})

let url = "https://www.amazon.ca/Sponge-Bottle-Brush-Pack-Blue/dp/B07DQQFP63/ref=pd_day0fbt_img_sccl_2/135-2216868-0547034?pd_rd_w=hioy6&content-id=amzn1.sym.2788fe34-0865-4f82-b5fb-522b9cf2f5fd&pf_rd_p=2788fe34-0865-4f82-b5fb-522b9cf2f5fd&pf_rd_r=02HTF0WGY43Y894PN7W1&pd_rd_wg=oUKN6&pd_rd_r=b08549df-cf72-4e5d-84dd-695c9bf3dd48&pd_rd_i=B07DQQFP63&psc=1"
console.log(url.split('/')[5]); 

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    products = []
    render(products)
})

inputBtn.addEventListener("click", function() {
    products.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("products", JSON.stringify(products) )
    render(products)
})