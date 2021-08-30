document.getElementById("wrapSecond").style.display = 'none'

const make = document.forms['firstStep']['make']
const model = document.forms['firstStep']['model']
const year = document.forms['firstStep']['year']
const confirmChekbox = document.forms['firstStep']['isClean']
const email = document.forms['firstStep']['email']
const date = document.forms['secondStep']['date']
const time = document.forms['secondStep']['time']
const firstForm = document.getElementById('formToFirstStep')
const secondForm = document.getElementById('formToSecondStep')

const models = ["Acura", "Alfa Romeo", "AM General", "AMC", "Aston Martin", "Audi", "Bentley", "BMW", "Bricklin", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Daewoo", "Datsun", "Dodge", "Eagle", "Ferrari", "Fiat", "Ford", "Geo", "GMC", "Honda", "HUMMER", "Hyundai", "Infiniti", "Isuzu", "Jaguar", "Jeep", "Kia", "Land Rover", "Lexus", "Lincoln", "Lamborghini", "Lotus", "Maserati", "Mazda", "Mercedes-Benz", "Mercury", "MG", "MINI", "Mitsubishi", "Nissan", "Oldsmobile", "Plymouth", "Pontiac", "Porsche", "RAM", "Renault", "Rolls Royce", "Saab", "Saturn", "Scion", "Shelby", "Smart", "Subaru", "Suzuki", "Toyota", "Triumph", "Volkswagen", "Volvo"];

for (let i = 0; i < models.length; i++) {
    const newElem = document.createElement("option");
    newElem.setAttribute('value', models[i])
    newElem.text = models[i]
    make.appendChild(newElem)
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

firstForm.addEventListener('submit', function (event) {
    event.preventDefault()
    let error = []
    if (!validateEmail(email.value)) {
        email.setCustomValidity("Email addres is invalid!");
        email.value = ""
        error.push(0)
    } else {
        email.setCustomValidity("");
    }
    if (year.value && year.validity.typeMismatch) {
        year.setCustomValidity("Invalid year!");
        error.push(1)
    } else {
        year.setCustomValidity("");
    }
    if (make.value && make.validity.typeMismatch) {
        make.setCustomValidity("Invalid make!");
        error.push(2)
    } else {
        make.setCustomValidity("");
    }
    if (model.value && model.validity.typeMismatch) {
        model.setCustomValidity("Invalid model!");
        error.push(3)
    } else {
        model.setCustomValidity("");
    }
    if (error.length === 0) {
        document.getElementById("wrapFirst").style.display = 'none'
        document.getElementById("wrapSecond").style.display = 'block'
    }
    delete error
});
secondForm.addEventListener('submit', function (event) {
    event.preventDefault()
    let error = []

    if (date.validity.typeMismatch) {
        date.setCustomValidity("Invalid date!");
        error.push(0)
    } else {
        date.setCustomValidity("");
    }
    if (time.validity.typeMismatch) {
        time.setCustomValidity("invalid time!")
        error.push(1)
    } else {
        time.setCustomValidity("")
    }
    if (error.length === 0) {
        document.body.style["z-index"] = 10
        axios.get('https://api.db-ip.com/v2/free/self')
            .then(ip => axios.post('https://sheetdb.io/api/v1/3nxs2ldj7lwl6', {
                "data": {
                    "make": make.value,
                    "model": model.value,
                    "year": year.value,
                    "email": email.value,
                    "isCleanTitle": confirmChekbox.value,
                    "date": date.value,
                    "time": time.value,
                    "userAgent": navigator.userAgent,
                    "ip": ip.data,
                    "paymentsToYear": +new Date()
                }
            }))
            .then(response => {
                alert(response.data.created)
            }).catch(e => alert(`${e.name}::${e.message}`))
        document.body.style["z-index"] = 0
    } else {
        alert("bad request")
    }
})
function toFirstStep() {
    document.getElementById("wrapFirst").style.display = 'block'
    document.getElementById("wrapSecond").style.display = 'none'
}
function toSecondStep() {
    document.getElementById("wrapFirst").style.display = 'none'
    document.getElementById("wrapSecond").style.display = 'block'
}
