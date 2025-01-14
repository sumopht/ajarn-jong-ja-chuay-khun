const removeProfessor = () => {
    const professor = document.getElementsByClassName('ajarn-jong-ja-chuay-khun');
    for (elm of professor) {
        if (elm) elm.remove();
    }
    
}

const getQuote1 = () => {
    n = Math.floor(Math.random() * quote1.length);
    return quote1[n]
}

const getQuote2 = () => {
    n = Math.floor(Math.random() * quote2.length);
    return quote2[n]
}

const getQuote3 = () => {
    n = Math.floor(Math.random() * quote3.length);
    return quote3[n]
}

const awakeProfessor = (professorId) => {
    const now = new Date().getTime();
    let callProfessor = true;
    chrome.storage.sync.get("lastPopUp", function (result) {
        let lastPopUp = result.lastPopUp;
        //console.log("got " + result.lastPopUp+ " diff =  " + String(now-lastPopUp));
        if (now - lastPopUp < 3600000) {
            //console.log("not waking prof") // 3600000ms = 1 hour
        }
        else {
            chrome.storage.sync.set({ lastPopUp: new Date().getTime() });
            chrome.storage.sync.get(professorId, (data) => {
                let bond = data[professorId];
                setBond(professorId, bond + 1);
            });
            createProfessor(professorId);
            setTimeout(removeProfessor, 5569, professorId);
        }
        
    });

    
}

const createProfessor = (professorId) => { 
    let container = document.createElement('div');
    let figure = document.createElement('img');
    let h1 = document.createElement('H1');

    
    h1.style['position'] = 'absolute';
    h1.style['width'] = '90%';
    h1.style['top'] = '76.9%';
    h1.style['left'] = '50%';
    h1.style['transform'] = 'translate(-50%, -50%)';
    h1.style['color'] = '#c9c91c';
    h1.style['font-size'] = '25px';
    h1.style['font-style'] = 'italic';
    h1.style['font-family'] = 'sans-serif';
    h1.style['-webkit-text-stroke'] = '1px black';
    h1.classList.add("ajarn-jong-ja-chuay-khun");

    // console.log(professorId)
    figure['src'] = chrome.extension.getURL(professors[professorId]['imgPath']);
    figure.style['height'] = '269px';
    figure.classList.add("ajarn-jong-ja-chuay-khun");
    chrome.storage.sync.get(professorId, (data) => {
        let bond = data[professorId];
        figure.style['filter'] = `brightness(${100+3*Math.random()*bond}%)saturate(${100+3*Math.random()*bond}%)contrast(${100+3*Math.random()*bond}%)`
        if(bond >= 70) h1.innerText = getQuote3();
        else if(bond >= 40) h1.innerText = getQuote2();
        else h1.innerText = getQuote1();
    });

    container.style['position'] = 'fixed';
    container.style['top'] = '6%';
    container.style['right'] = '9%';
    container.style['text-align'] = 'center';
    container.style['color'] = 'white';
    container.style['z-index'] = 6969;
    container.classList.add("ajarn-jong-ja-chuay-khun");
    container.classList.add("ajarn-walks-in");
    container.appendChild(figure);
    container.appendChild(h1);

    document.body.appendChild(container);
}