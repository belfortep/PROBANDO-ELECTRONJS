
const linksSection = document.querySelector('.links');
const errorMessage = document.querySelector('.error-message');
const newLinkForm = document.querySelector('.new-link-form');
const newLinkURL = document.querySelector('.new-link-url');
const newLinkButton = document.querySelector('.new-link-button');
const clearStorageButton = document.querySelector('.clear-storage');

const parser = new DOMParser();

const parserResponse = (text) => {
    return parser.parseFromString(text, 'text/html');
}

const findTitle = (nodes) => {
    return nodes.querySelector('title').innerText; //busca la etiqueta title y dame su texto
}

const storeLink = (title, url) => {
    localStorage.setItem(url, JSON.stringify({ title, url }))   //en el localstorage guardo un objeto con el nombre de la url, y tiene tanto el titulo como la url
}

const getLinks = () => {
    return Object.keys(localStorage)    //agarra todas las llaves en el localstorage, hace un map y me las devuelve como un array
        .map(key => JSON.parse(localStorage.getItem(key)))
}

const createLinkElement = (link) => {
    return `
    
        <div>
            <h3>${link.title}</h3>
            <p>
                <a href="${link.url}">${link.url}</a>
            </p>
        </div>
    `
}

const renderLinks = () => {

    const linkElements = getLinks().map(createLinkElement).join('');
    linksSection.innerHTML = linkElements;
}

const clearForm = () => {
    newLinkURL.value = '';
}

const handleError = (url, error) => {
    errorMessage.innerHTML = `

        Error in "${url}" : ${error.message}

    `.trim();
    setTimeout(() => {
        errorMessage.innerHTML = '';
    }, 7000);
}

renderLinks()

newLinkURL.addEventListener('keyup', () => {
    newLinkButton.disabled = !newLinkURL.validity.valid;
});

newLinkForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = newLinkURL.value;
    try {
        const response = await fetch(url); //para agarrar despues datos que estan en esta url
        const text = await response.text(); //obtengo el html de la url
        const html = parserResponse(text);
        const title = findTitle(html);
        storeLink(title, url);
        clearForm();
        renderLinks();
    } catch (err) {
        handleError(url, err)
    }


})

clearStorageButton.addEventListener('click', () => {
    localStorage.clear();
    linksSection.innerHTML = '';
})


