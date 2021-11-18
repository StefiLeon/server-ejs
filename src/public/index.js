document.addEventListener('submit', e => {
    e.preventDefault();
    let formulario = document.querySelector('#prodForm');
    let data = new FormData(formulario);
    console.log(data)
    fetch('http://localhost:8080/api/productos',{
    method: 'POST',
    body: data
    }).then(result => {
        return result.json();
    }).then(json => {
        console.log(json);
    })
})