const input = document.getElementById('category')


const data = {


}

for(let i = 0; i < localStorage.length; i++){
    let lKey = localStorage.key(i)
    data[lKey] = {}
    data[lKey] = localStorage.getItem(lKey)
}

// console.log(data)



let members = []
let lengthOfLocal = localStorage.length
let localKey = []

for(let i = 0; i < lengthOfLocal; i++){
    localKey.push(localStorage.key(i))
}
// console.log(localKey)


document.getElementById('create').addEventListener('click', (e) => {
    e.preventDefault();
    const dropdonw = document.getElementById('size').value
    
    let status = false
    localKey.forEach((e)=>{
        if(e == input.value){
            status = true
        }
    })


    if(status){
        alert("category already exists!")
    }else{

        // console.log(localStorage.length);
    

        if(parseInt(dropdonw) === 0){
    
            alert('please chouse contributers!')
    
        }else if(input.value !== "" ){
    
            let status = true
    
            for(let i = 0; i < dropdonw; i++){
                let member = document.getElementById(`member${i}`)
                    if(member.value == ''){
                        status = false
                    }
            }
    
            if(status){
                for(let i = 0; i < dropdonw; i++){
                    let member = document.getElementById(`member${i}`)
                    data[input.value] = {}
                    members.push(member.value)
                }
            }else{
                alert("please enter contributers name")
            }
    
            members.forEach((mem)=>{
                data[input.value][mem] = { }
            })
    
            localStorage.setItem(input.value , JSON.stringify(data[input.value]))
    
            members = []
            // console.log(data)
            alert("category created succesfully!")
            window.location.reload();
        }else{
    
            alert("You can't give category name as a empty!")
    
        }
    
    }



})


document.getElementById('size').addEventListener('change', function () {
    let value = parseInt(this.value)
    let inputContainer = document.getElementById('showInput')


    inputContainer.innerHTML = ''
    
    if(input.value !== ""){
        for(let i = 0; i < value; i++){
            let input = document.createElement('input')
            input.type = 'text'
            input.id = `member${i}`
            inputContainer.appendChild(input)
        }
    }else{
        this.getAttribute = 'desabled'
    }
})


for(const key in data){
    document.getElementById('tableDropdown').innerHTML += `
    <option value = '${key}'>${key}</option>
    `
    document.getElementById('category-f').innerHTML += `
    <option value = '${key}'>${key}</option>
    `
}

document.getElementById('category-f').addEventListener('change' , (e)=>{
    const memberDropdown = document.getElementById('member-f')
    memberDropdown.innerHTML = ''
    for(const key in data){
        if(e.target.value == key){
            let memberFromObj = ( JSON.parse(data[key]))
            for(const localKey in memberFromObj){
                memberDropdown.innerHTML += `
                <option value = '${localKey}'>${localKey}</option>
                `
            }
        }
    }

    if(e.target.value == "selectCategory"){
        memberDropdown.innerHTML += `
            <option value = 'selectCategory'>Select Category</option>
            `
    }

})


document.getElementById('tableDropdown').addEventListener('change' , function (e){
    
    let key = e.target.value
    for(const objKey in data){
        if(objKey == key){
            let value = data[key]
            showTable(key,value)
        }
    }
})


function showTable (key, value) {

    // console.log(key)
    // console.log(value)
    let tableArea = document.getElementById('showTable')

    tableArea.innerHTML = ''
    let table = document.createElement('table')

    let obj = JSON.parse(value)
    // console.log(obj)
    
    
    tableArea.innerHTML += `<h2>${key}</h2>`

    let tableRow = document.createElement('tr')

    for(const key in obj){
        let th = document.createElement('th')
        th.innerHTML = key
        tableRow.appendChild(th)
    }
    
    table.appendChild(tableRow)
    tableArea.appendChild(table)
}



document.getElementById('form2').addEventListener('submit' , function(e){
    e.preventDefault();

    let categoryName = document.getElementById('category-f').value
    let memberName = document.getElementById('member-f').value
    let amount = document.getElementById('amount').value
    
    for(const key in data){
        if(categoryName == key){
            let str = JSON.parse(data[categoryName])
            for(const key2 in str){
                if(key2 == memberName){
                    let fetchedMember = memberName
                    let currentDate = Date.now();
                    let dateInMicro = currentDate.toString()

                    let category = JSON.parse(data[categoryName])
                    let member = category[fetchedMember]
                    member[dateInMicro] = amount

                    category[fetchedMember] = member

                    data[categoryName] = JSON.stringify(category)

                    localStorage.setItem(categoryName , JSON.stringify(category))
                }
                if(key2 !== memberName){
                    let fetchedMember = key2
                    let currentDate = Date.now();
                    let dateInMicro = currentDate.toString()

                    let category = JSON.parse(data[categoryName])
                    let member = category[fetchedMember]
                    member[dateInMicro] = 0

                    category[fetchedMember] = member

                    data[categoryName] = JSON.stringify(category)

                    localStorage.setItem(categoryName , JSON.stringify(category))
                }
            }

        }
    }

    alert(JSON.stringify(data));
    
})