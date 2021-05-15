const recipeList = document.querySelector('#post-list');
const form = document.querySelector('#add-chinese-recipes');

//create element and render cafe
function renderCafe(doc){
    let li = document.createElement('li');
    // let image = document.createElement('img');
    // image.style.width = "960px";
    // image.style.height = "30px";
    // image.src = "test.jpg";
    let name = document.createElement('span');
    let recipe = document.createElement('span');
    let url = document.createElement('span');
    //let time = document.createElement('time');

    li.setAttribute('data-id',doc.id); //set the attribute
    name.textContent = doc.data().name; 
    recipe.textContent = doc.data().recipe;
    url.textContent = doc.data().url;
    //time.textContent = dateTime;

    // li.appendChild(image);
    li.appendChild(name);
    li.appendChild(recipe);
    li.appendChild(url);
    //li.appendChild(time);

    //append to overall list that contains every single document in the database
    recipeList.appendChild(li); 

}

//saving data
//get values and add to recipes collection
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('kenyan').add({ 
        name: form.name.value,
        recipe: form.recipe.value,
        url: form.url.value
    });
    form.name.value = '';
    form.recipe.value = '';
    form.url.value = '';

})

//real-time listener
db.collection('kenyan').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            renderCafe(change.doc);
        } 
    })
})