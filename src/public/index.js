document.addEventListener('submit', e => {
    e.preventDefault();
    let formulario = document.querySelector('#prodForm');
    let data = new FormData(formulario);
    let title = data.get('title');
    let price = data.get('price');
    let thumbnail = data.get('thumbnail');
    let req = {
        title: title,
        price: price,
        thumbnail: thumbnail
    }
    console.log(data)
    fetch('http://localhost:8080/api/productos',{
        method: 'POST',
        body: JSON.stringify(req),
        headers: {
            "Content-type": "application/json"
        }
    }).then(result => {
        return result.json();
    }).then(json => {
        console.log(json);
    })
})