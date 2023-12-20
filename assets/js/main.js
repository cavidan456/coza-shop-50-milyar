const product = document.getElementById("product");//get mentiqi
const product2 = document.getElementById("product2");// search by name
const product3 = document.getElementById("product3");// sort metodu
const more = document.getElementById("btn-more")
const sirala = document.getElementById("btn-sort")// sirala butonu
const axtar = document.getElementById("btn-search")
const seaInp = document.getElementById("inp-search")



let page = 1
let limit = 16

async function getProduct() {
    // axtar.style.display = "none";
    let skip = (page - 1) * limit;
    const response = await axios.get(`https://655dd2b79f1e1093c599f093.mockapi.io/products?page=${page}&limit=${limit}&skip=${skip}`);
    const data = response.data;
    db = data
    db.forEach(item => {
        const box = document.createElement('div');
        box.className = '.col-12 col-sm-12 col-md-6 col-lg-6 col-xl-3';
        box.innerHTML = `<img src="${item.image}" alt="">
                <p>${item.title}</p>
                <p>${item.price} TL</p>
                <button  class="btn btn-primary" onclick="addToBasket(${item.id})">add to basket</button>
            `;
        product.appendChild(box);
    });
    page++;
}
getProduct()

function addToBasket(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    cart.push(db.find((item)=> item.id == id))
    localStorage.setItem("cart", JSON.stringify(cart))
}

more.addEventListener("click" , getProduct)


//search by name
function searchName() {
    product2.innerHTML = " "
    product.style.display = "none"
    product2.style.display = "flex"
    axios.get(`https://655dd2b79f1e1093c599f093.mockapi.io/products?title=${seaInp.value}`)
    .then((res)=>{
        db = res.data
        db.forEach(item =>{
            let box2 = document.createElement("div")
            box2.className = ".col-12 col-sm-12 col-md-6 col-lg-6 col-xl-3"
            box2.innerHTML = `<img src="${item.image}" alt="">
            <p>${item.title}</p>
            <p>${item.price} TL</p>
            `;
            product2.appendChild(box2)
        })
    })
}

axtar.addEventListener("click", searchName)

// sort motodu

function siralama() {
    product.innerHTML =' '
    axios.get("https://655dd2b79f1e1093c599f093.mockapi.io/products")
    .then((res)=>{
        db = res.data
        let databaza = db.sort((item,items)=>item.price - items.price)
        console.log(databaza);
        databaza.forEach(item =>{
        const box3 = document.createElement('div');
        box3.className = '.col-12 col-sm-12 col-md-6 col-lg-6 col-xl-3';
        box3.innerHTML = `<img src="${item.image}" alt="">
                <p>${item.title}</p>
                <p>${item.price} TL</p>
                <button  class="btn btn-primary" onclick="addToBasket(${item.id})">add to basket</button>
            `;
            product3.appendChild(box3)
        })
    })
}


sirala.addEventListener("click" , siralama)
