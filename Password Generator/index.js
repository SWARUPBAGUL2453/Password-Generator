const inputSlider = document.querySelector("[data-lengthSlider]")
const lengthDisplay = document.querySelector("[data-lengthNumber]")
const passwordDisplay = document.querySelector("[data-passwordDisplay]")
const copyBtn = document.querySelector("[data-copy]")
const copyMsg = document.querySelector("[data-copyMsg]")
const uppercaseCheck = document.querySelector("#uppercase")
const lowercaseCheck = document.querySelector("#lowercase")
const symbolsCheck = document.querySelector("#symbols")
const numbersCheck = document.querySelector("#numbers")
const allCheckBox = document.querySelectorAll("input[type=checkbox]")
const indicator = document.querySelector("[data-indicator]")
const generateBtn = document.querySelector(".generateButton")

const symbols = "!@#$)%^]&*}(,.?/[}\+';:`~"


// console.log(symbols.length)
let password = ""
let passwordLength = 10
let checkCount = 0
setIndicator("#ccc")
handleSlider()

function handleSlider() {
    inputSlider.value = passwordLength
    lengthDisplay.innerText = passwordLength

    const min = inputSlider.min
    const max = inputSlider.max
    inputSlider.style.backgroundSize = ((passwordLength - min)*100/(max-min)) + "%  100%"

    console.log(min)
    console.log(max)
    console.log(inputSlider)

}

function setIndicator(color) {
    indicator.style.backgroundColor = color
    indicator.style.boxShadow = " 0px 0px 12px 1px " + color 

}

function getRndInteger(min, max) {
    return Math.floor((Math.random() * ((max) - min)) + min)
}

function generateRandomNumber() {
    return getRndInteger(0, 9)
}

function generateUpperCase() {
    return String.fromCharCode(getRndInteger(65, 91))
}
function generateLowerCase() {
    return String.fromCharCode(getRndInteger(97, 123))
}
function generateSymbols() {
    const ranNum = getRndInteger(0, symbols.length)
    return symbols.charAt(ranNum)
}
function calcStrength() {
    let hasUpper = false
    let hasLower = false
    let hasNum = false
    let hasSym = false

    if (uppercaseCheck.checked) hasUpper = true
    if (lowercaseCheck.checked) hasLower = true
    if (numbersCheck.checked) hasNum = true
    if (symbolsCheck.checked) hasSym = true

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator("#0f0")
    }
    else if ((hasUpper || hasLower) && (hasNum || hasSym) && passwordLength >= 6) {
        setIndicator("#ff0")
    }
    else {
        setIndicator("#f00")
    }
}
async function copyContent() {

    try {
        await navigator.clipboard.writeText(passwordDisplay.value)
        copyMsg.innerText = "copied"
    }
    catch (e) {
        copyMsg.innerText = "Failed"
    }

    copyMsg.classList.add("active")

    setTimeout(() => {
        copyMsg.classList.remove("active")

    }, 2000)

}

inputSlider.addEventListener("input", (e) => {
    passwordLength = e.target.value
    handleSlider()
})

copyBtn.addEventListener("click", () => {
    if (passwordDisplay.value) {
        copyContent()
    }
})

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener("change", handleCheckBoxChange)
})

function handleCheckBoxChange() {
    checkCount = 0
    allCheckBox.forEach((checkbox) => {
        if (checkbox.checked)
            checkCount++
    })
    // special condition
    if (passwordLength < checkCount) {
        passwordLength = checkCount
        handleSlider()
    }
}

function shufflePassword(array) {
    // fisher yates method 

    for (let i = array.length - 1; i > 0; i--) {
        1.23

        let j = Math.floor(Math.random() * (i + 1))
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    let str = ""
    array.forEach((el) => (str += el))
    return str
}

generateBtn.addEventListener('click', () => {
    // none of the checkbox are selected

    if (checkCount == 0)
        return

    if (passwordLength < checkCount) {
        passwordLength = checkCount
        handleSlider()
    }

    // lets start journey to find new password

    // remove old password
    console.log("helllo")

    password = ""

    // let put stuff mention by checkbox 

    let funcArr = []

    if (uppercaseCheck.checked)
        funcArr.push(generateUpperCase)

    if (lowercaseCheck.checked)
        funcArr.push(generateLowerCase)

    if (numbersCheck.checked)
        funcArr.push(generateRandomNumber)

    if (symbolsCheck.checked)
        funcArr.push(generateSymbols)


    // compulsory addition 

    for (let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]()
    }
    console.log("compulsory addition done")

    // remaining addition 

    for (let i = 0; i < passwordLength - funcArr.length; i++) {
        let randIndex = getRndInteger(0, funcArr.length)
        console.log("randIndex" + randIndex)
        password += funcArr[randIndex]()
    }

    console.log("Remaining adddition done")

    // shuffle password 
    password = shufflePassword(Array.from(password))
    console.log("Shuffling done")

    // show on ui 
    passwordDisplay.value = password
    console.log("UI adddition done")

    // calculate strength 
    calcStrength()

})



