/*
httpGetModels makes a get request to the neural network manager to for the models available.
One important note is that cors has to be enabled for the address the get request is being sent to.
* */
function httpGetModels(targetURL)
{
    let xhr = new XMLHttpRequest(),
        method = "GET",
        url = targetURL;

    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        // When the request is complete and if it was a success, get the models and
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            // Parse the response into a json object.
            let models = JSON.parse(xhr.responseText);
            // Get the selector in the document
            let selector = document.getElementById('model_selection');
            console.log(models[0]);
            // Split the keys and values. Use the keys as the text for the selector and
            // use the json value at the selector value.
            for (let key in models[0]){
                let value = models[0][key];
                console.log(key + ' : ' + value);
                let opt = document.createElement('option');
                opt.setAttribute('value', value);
                let text = document.createTextNode(key);
                opt.appendChild(text);
                selector.appendChild(opt);
            }

        }
    };

    xhr.send();
}