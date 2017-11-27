/*
httpGetModels makes a get request to the neural network manager to for the models available.
One important note is that cors has to be enabled for the address the get request is being sent to.

Model Data format is a JSON object {
    "name": "The name of the model",
    "target": "the target model used in pix2pix",
    "description": "Description on the model."

* */
function httpGetModels(targetURL)
{
    let xhr = new XMLHttpRequest(),
        method = "GET";

    xhr.open('GET', targetURL, true);
    xhr.onreadystatechange = function () {

        // When the request is complete and if it was a success, get the models and...

        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {

            // ...Parse the response into a json object.
            let models = JSON.parse(xhr.responseText);
            // Get the selector in the document.
            let selector = document.getElementById('model_selection');
            // console.log(models);

            // Build the selector using the names and targets of the models.
            let index = 0;
            for (index; index <models.length; index ++ ){
                let model = models[index];
                // console.log('Call ' + model['name'] + ' : ' + model['target']);
                let opt = document.createElement('option');
                opt.setAttribute('value', model['target']);
                let text = document.createTextNode(model['name']);
                opt.appendChild(text);
                selector.appendChild(opt);
            }

        }
    };

    xhr.send();
}