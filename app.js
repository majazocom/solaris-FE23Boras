// SOLSYSTEMETS API
const API_URL = "https://majazocom.github.io/Data/solaris.json";
// SVG-API
const SVGAPI_URL = "https://majazocom.github.io/Data/solarissvgs.json";
// global variabel för våra himlakroppar
let solarSystem = [];
// global variabel för svg:erna
let solarSystemSVGs = [];
// html-elementet där vårt solsystem ska ligga
const solarSystemContainer = document.querySelector(".solarsystem-container");

async function getSolarSystem() {
    // här hämtar vi solsytemet från API:et
    let resp = await fetch(API_URL);
    // stoppar in svaret i variabeln solarSystem
    solarSystem = await resp.json();
    // hämta våra svg:s
    let svgresp = await fetch(SVGAPI_URL);
    // stoppa in svaret i variabeln solarSystemSVGs
    solarSystemSVGs = await svgresp.json();
    // skapa gränssnitt så vi kan se våra himlakroppar
    renderSolarSystemToUI();
};

function renderSolarSystemToUI() {
    // gå igenom alla himlakroppar i listan
    solarSystem.forEach(body => {
        // för varje himlakropp ska vi skapa ett nytt html-element åt den så vi kan se den!
        // nya elementet (som just nu bara finns i js)
        let bodyEl = document.createElement('section');
        // lägg in nya elementet i vår befintliga html
        solarSystemContainer.appendChild(bodyEl);
        // hitta tillhörande svg till himlakroppen
        let svgObj = solarSystemSVGs[body.id];
        // lägga in tillhörande svg i det nya elementet
        bodyEl.innerHTML = `${svgObj.path}`;
        // lägga på en eventlyssnare på varje himlakropps yttersta html-element
        bodyEl.addEventListener("click", () => {
            openOverlay(body);
        });
    });
};

function openOverlay(body) {
    // ta fram planetens svg-objekt i listan över svg:er
    let svgObj = solarSystemSVGs[body.id];
    // ta fram enbart svg-koden för overlay till planeten
    let svgCode = svgObj.overlaypath;
    // få tag på overlay-elementeti UI't
    let overlayEl = document.querySelector(".solarsystem-overlay");
    // visa vår overlay mha display-propertyn i css
    overlayEl.style.display = "block";
    // lägga in svg:n i overlayen
    overlayEl.innerHTML = `
    
    ${svgCode}
    <section class="${body.name}">
        <h1>${body.name}</h1>
        <h2>${body.latinName}</h2>
        <section class="body-info-container">
            <p class="body-type">${body.type}</p>
        </section>
    </section>
    
    `;
    // dölja main-vyn
    solarSystemContainer.style.display = "none";
    // skapa knapp-element
    let closeBtn = document.createElement("button");
    closeBtn.innerHTML = "x";
    closeBtn.addEventListener("click", () => {
        // dölja overlay
        overlayEl.style.display = "none";
        // visa main-vyn
        solarSystemContainer.style.display = "flex";
    });
    overlayEl.appendChild(closeBtn);
};

window.addEventListener("load", getSolarSystem);