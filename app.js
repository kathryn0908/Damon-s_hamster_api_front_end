const form = document.getElementById('create-form');
const updateForm = document.getElementById('update-form');
const editName = document.getElementById('edit-name')
const editAge = document.getElementById('edit-age')
const editId = document.getElementById('edit-id')

hamstersURL = 'http://localhost:3000/hamsters'

fetch(hamstersURL)
    .then(parseJSON)
    .then(displayHamsters)

function displayHamsters(hamsters){
    hamsters.forEach(hamster => {
        showHamster(hamster);
    });
}

function showHamster(hamster){
    let hamsterName = document.createElement('h1');
    hamsterName.textContent = hamster.name;
    
    let hamsterAge = document.createElement('p');
    hamsterAge.textContent = hamster.age;

    let deleteButton = document.createElement('button')
    deleteButton.textContent = "Delete"

    let updateButton = document.createElement('button')
    updateButton.textContent = "Update"

    updateButton.addEventListener('click', ()=>{
        editName.value = hamster.name;
        editAge.value = hamster.age;
        editId.value = hamster.id;
    })

    deleteButton.addEventListener('click', ()=>{
        hamsterName.remove();
        hamsterAge.remove();
        console.log('hamster.id: ', hamster.id);
        

        fetch(`${hamstersURL}/${hamster.id}`, {
            method: 'DELETE',
            headers: {'content-type': 'application/json'}
        })
    })

    document.body.append(hamsterName, hamsterAge, deleteButton, updateButton);

}

form.addEventListener('submit', ()=>{
    event.preventDefault();

    // can use form instead of event.target, 
    //but event.target is more specific to the event listener
    const formData = new FormData(event.target);
    const hamster = {
                        name: formData.get('name'),
                        age: formData.get('age')
                    }
    showHamster(hamster);
    saveNewHamsterToDB(hamster);
});

updateForm.addEventListener('submit', ()=>{
    event.preventDefault();

    const formData = new FormData(event.target);
    const id = formData.get('id')
    const hamster = {
                        name: formData.get('name'),
                        age: formData.get('age')
                    }
    
    updateForm.reset();
    showHamster(hamster);
    updateNewHamsterToDB(hamster, id);
});

function saveNewHamsterToDB(hamster){
    fetch(hamstersURL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(hamster)})
}

function updateNewHamsterToDB(hamster, id){
    fetch(hamstersURL+ "/"+id, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(hamster)})
}

function parseJSON(response){
return response.json()
}

