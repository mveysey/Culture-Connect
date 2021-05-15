// create a reference to elements from the HTML file
const postList = document.querySelector('#post-list');
const form = document.querySelector('#add-cafe-form');

function renderCafe(doc){

    // create elements (documents) to add to the form (the place where people enter the elements)
    let li = document.createElement('li');
    let title = document.createElement('span');
    let name = document.createElement('span');
    let post = document.createElement('span');
    let cross = document.createElement('div');

    // set the next element in the database
    li.setAttribute('data-id', doc.id);
    title.textContent = doc.data().title;
    name.textContent = doc.data().name;
    post.textContent = doc.data().post;
    cross.textContent = 'x';

    // add each element into a list (each list in this block refers to just one document from firebase)
    li.appendChild(title);
    li.appendChild(name);
    li.appendChild(post);
    li.appendChild(cross);

    //this list is the overall list that contains every single document in the database
    postList.appendChild(li);

    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        //get the document from the firebase that relates to the element to be deleted
        let id = e.target.parentElement.getAttribute('data-id');
        //delete the element
        db.collection('indigenous').doc(id).delete();
    });
}

// saving data
form.addEventListener('submit', (e) => {
    // prevents the webpage from restarting
    e.preventDefault();
    // Add an entry to the collection, take the value of each value in the form (name, culture, post)
    db.collection('indigenous').add({
        title: form.title.value,
        name: form.name.value,
        post: form.post.value,
    });
    // Reset the values of the posting form after every submission
    form.title.value = '';
    form.name.value = '';
    form.post.value= '';
});

//This references the collection used for the database and snapshot makes the database update on the frontend in real time
db.collection('indigenous').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    // This references every change someone makes in the database
    changes.forEach(change => {
        console.log(change.doc.data());
        // If someone adds something to the database, then it will show up in realtime
        if(change.type == 'added'){
            renderCafe(change.doc);
            // If someone removes an entry from the data base, then it will show up in realtime
        } else if (change.type == 'removed'){
            let li = postList.querySelector('[data-id=' + change.doc.id + ']');
            postList.removeChild(li);
        }
    });
});

function charCount(textarea){
    var max=400;
    var length=textarea.value.length;
    if( length > max)
    {
    textarea.value=textarea.value.substring(0,400);
    }
    else{
      $('#textcount').text(length);
    }
}