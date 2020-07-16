console.log('This is code.js of postamn clone');

//Utility functions:
//1.Utility functions to get DOM elemrnt from Stirng

function getElementFromString(string) {
    let div = document.createElement('div')
    div.innerHTML = string;
    return div.firstElementChild;
}


//Initailize numeber of parameters
let addedParamsCount = 0;

//Hide the parameters box initially
let parameterBox = document.getElementById('parameterBox')
parameterBox.style.display = 'none'

//hide the user click on params hide the json box and vice-versa
let paramsRadio = document.getElementById('paramsRadio')
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none'
    parameterBox.style.display = 'block'
})

let jsonRadio = document.getElementById('jsonRadio')
jsonRadio.addEventListener('click', () => {
    parameterBox.style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block'

})


//If the user clicks on + button add more parameters

let addParam = document.getElementById('addParam')
addParam.addEventListener('click', () => {
    let params = document.getElementById('params')
    let string = `<div id="parameterBox">
            <div class="form-row my-3">
                <label for="url" class="col-sm-2 col-form-label">Paramter${addedParamsCount + 2}</label>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="parameterKey${addedParamsCount + 2}" 
                    placeholder="Enter parameter ${addedParamsCount + 2} key">
                </div>
                <div class="col-md-4">

                    <input type="text" class="form-control" id="parameterValue${addedParamsCount + 2}" 
                    placeholder="Enter parameter ${addedParamsCount + 2} value">
                </div>
                <button class="btn btn-primary deleteParam">-</button>
            </div>
        </div>`

    //convert element string to dome node
    let paramElement = getElementFromString(string)
    params.appendChild(paramElement);
    addedParamsCount++;
    //add a parameter to remove a parametr on clcking - btn
    let deleteParam = document.getElementsByClassName('deleteParam')
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {

            e.target.parentElement.remove();
        })
    }
})


//sumbit button actions

let sumbit = document.getElementById('submit')
sumbit.addEventListener('click', () => {
    //show please wait in response box ..have paitence
    document.getElementById('responsePrism').innerHTML = 'Fetching response...Please wait!'

    //fetch all the data
    let url = document.getElementById('urlField').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;



    //collect all the parameters in an object if user chose params
    if (contentType == 'params') {
        data = {};
        let i;
        for (i = 0; i < addedParamsCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data)
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }
    //log all the values in the console for debugging
    console.log(url)
    console.log(requestType)
    console.log(contentType)
    console.log(data)

    //if the type is GET,invoke the fetch api to create a post request

    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET'
        })
            .then(response => response.text())
            .then((text) => {
                // document.getElementById('responseJsonText').value = text
                document.getElementById('responsePrism').innerHTML = text
                Prism.highlightAll();

            })
    }
    else {
        fetch(url, {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: data
        })
            .then(response => response.text())
            .then((text) => {
                // document.getElementById('responseJsonText').value = text
                document.getElementById('responsePrism').innerHTML = text
                Prism.highlightAll();

            })
    }


})




