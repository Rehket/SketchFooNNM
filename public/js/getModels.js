
function httpGetModels(targetURL)
{
    let xhr = new XMLHttpRequest(),
        method = "GET",
        url = targetURL;

    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            let models = JSON.parse(xhr.responseText);
            let selector = document.getElementById('model_selection')
            console.log(models[0]);
            for (let key in models[0]){
                let value = models[0][key];
                console.log(key + ' : ' + value);
                let opt = document.createElement('option');
                opt.setAttribute('value', value);
                let text = document.createTextNode(key);
                opt.appendChild(text);
                selector.appendChild(opt);
            }
            //selector.appendChild()
        }
    };

    xhr.send();
}