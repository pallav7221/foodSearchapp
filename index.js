let container = document.querySelector("#selectOpt");
let category = JSON.parse(localStorage.getItem("category")) || [];
// console.log(category)
let arr = [];
async function fetchApi() {
    try {
        await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
            .then(res => {
                return res.json();
            }).then(data => {
                console.log(data.meals);
                store(data.meals);

            })
    }
    catch (err) {
        console.log(err);
    }

}
if (category.length !== 0) {
    select(category)
}
else {
    fetchApi()
}


function store(data) {
    for (var i = 0; i < data.length; i++) {
        arr.push(data[i].strCategory)
    }
    localStorage.setItem("category", JSON.stringify(arr));
    select(arr);
}

function select(foodCategory) {
    foodCategory.forEach(element => {
        let categoryOption = document.createElement("option")
        categoryOption.innerText = element;
        container.append(categoryOption)
    });

}

function displayFood(food) {
    console.log(food);
    document.querySelector("#foodItems").innerHTML = "";

    food.forEach(item => {

        let box = document.createElement("div");
        let image = document.createElement("img");
        image.src = item.strMealThumb;

        let name = document.createElement("p");
        name.innerText = item.strMeal;

        box.append(image, name);
        document.querySelector("#foodItems").append(box);
    })

}

async function fetchFood(foodCategory) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${foodCategory}`);
    let data = await response.json();
    // console.log(data.meals)
    displayFood(data.meals)
}
function searchFood() {
    var foodCategory = document.querySelector("#selectOpt").value;
    if (foodCategory == "Choose Category") {
        alert("choose category")
    }
    else {
        fetchFood(foodCategory);
    }
    console.log(foodCategory)

}
