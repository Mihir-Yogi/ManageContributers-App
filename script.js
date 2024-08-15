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
    const size = document.getElementById('size').value
    
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
    

        if(parseInt(size) === 0){
    
            alert('please chouse contributers!')
    
        }else if(input.value !== "" ){
    
            let status = true
    
            for(let i = 0; i < size; i++){
                let member = document.getElementById(`member${i}`)
                    if(member.value == ''){
                        status = false
                    }
            }
    
            if(status){
                for(let i = 0; i < size; i++){
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
            const cardBody = document.getElementById('cardBody')
            cardBody.style.display = 'block'
            document.getElementById('message').innerHTML = 'Category Created Successfully!'
            setTimeout(()=>{
                document.getElementById('cancleBtn').addEventListener('click' ,()=>{
                    cardBody.style.display = 'none';
                })
                cardBody.style.display = 'none'; 
            },5000)
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
            input.placeholder = `${i+1} MemberName`
            inputContainer.appendChild(input)
        }
    }else{
        this.getAttribute = 'desabled'
    }
})



document.getElementById('category-f').addEventListener('change' , (e)=>{
    const memberDropdown = document.getElementById('member-f')
    memberDropdown.innerHTML = ''
    for(const key in data){
        if(e.target.value == key){
            let memberFromObj = ( JSON.parse(data[key]))
            addCategory(memberFromObj,memberDropdown)
        }
    }

    if(e.target.value == "selectCategory"){
        memberDropdown.innerHTML += `
            <option value = 'selectCategory'>Select Category</option>
            `
    }

})

const tableDropdown = document.getElementById('tableDropdown')
addCategory(data,tableDropdown)

tableDropdown.addEventListener('change' , function (e){
    
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
    let tbody = document.createElement('tbody')

    let obj = JSON.parse(value)
    // console.log(obj)
    
    
    tableArea.innerHTML += `<h2>${key}</h2>`

    let tableRow = document.createElement('tr')
    let thead = document.createElement('thead')

    tableRow.innerHTML = '<th>Date</th>'
    let memberCount = 0
    let sums = {}
    for(const key in obj){
        let th = document.createElement('th')
        th.innerHTML = key
        tableRow.appendChild(th)
        memberCount++
        sums[key] = 0
    }

    thead.appendChild(tableRow)
    table.appendChild(thead)

    let allDates = new Set();
    for (const name in obj) {
        for (const timestamp in obj[name]) {
            allDates.add(Number(timestamp));
        }
    }

    let sortedDates = Array.from(allDates)
    for(const dateInMili of sortedDates){
        let tr = document.createElement('tr')
        let date = new Date(dateInMili);
        let newDate = date.toLocaleString();

        let dateCell = document.createElement('td')
        dateCell.innerHTML = newDate
        tr.appendChild(dateCell)
        

        for(const name in obj){
            let td = document.createElement('td')
            let value = obj[name][dateInMili] !== undefined ? obj[name][dateInMili] : 0;
            let numericValue = Number(value)
            td.innerHTML = numericValue !== 0 ? value : '-' ;
            tr.appendChild(td)

            sums[name] += numericValue;
        }

        tbody.appendChild(tr)
        table.appendChild(tbody)
    }

    let footer = document.createElement('tfoot')
    let totalRow = document.createElement('tr')

    let totalLableCell = document.createElement('td');

    totalLableCell.innerHTML = 'Total'
    totalRow.appendChild(totalLableCell)

    // console.log(memberCount)
    let total = 0
    let equalShere = 0 
    for(const name in sums){
        let td = document.createElement('td')
        let sum = sums[name]
        td.innerHTML = sum 
        total += sum 
        equalShere += sum / memberCount
        totalRow.appendChild(td)
    }

    
    footer.appendChild(totalRow)
    table.appendChild(footer)
    // console.log(equalShere);
    // console.log(total);


    //balance caluculation

    let balance = {}
    let balanceNotice = document.createElement('div')

    for(const name in sums){
        balance[name] = sums[name] - equalShere
    }

    for(const name in balance){
        if(balance[name] < 0){
            for(const otherName in balance){
                if(balance[otherName] > 0){
                    let amountToPay = Math.min(balance[otherName] , -balance[name])
                    balance[name] += amountToPay
                    balance[otherName] -= amountToPay

                    let notice = document.createElement('p')
                    notice.innerHTML = `${name} need to pay ₹${amountToPay.toFixed(2)} to ${otherName}`

                    balanceNotice.appendChild(notice)

                    if(balance[otherName] >= 0 ) break;
                }
            }
        }
    }

    tableArea.appendChild(table)
    tableArea.appendChild(balanceNotice)
}   

const categoryF = document.getElementById('category-f')
addCategory(data,categoryF)

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

            const cardBody = document.getElementById('cardBody')
            cardBody.style.display = 'block'
            document.getElementById('message').innerHTML = 'Record Saved!'
            setTimeout(()=>{
                document.getElementById('cancleBtn').addEventListener(()=>{
                    cardBody.style.display = 'none';
                })
                cardBody.style.display = 'none'; 
            },5000)

        }
    }

})



let deleteCategory = document.getElementById('deleteCat')

addCategory(data,deleteCategory)

document.getElementById('delete_btn').addEventListener('click',function (e) {
    e.preventDefault()

    let deleteCategoryName = document.getElementById('deleteCat').value 

    if(data.hasOwnProperty(deleteCategoryName)){
        delete data[deleteCategoryName]
        localStorage.removeItem(deleteCategoryName)
        window.location.reload()
        console.log(data[deleteCategoryName]);
    }
})


function addCategory (obj,section){
    for(const name in obj){
        section.innerHTML += `
        <option value = "${name}"> ${name} </option>
        `
    }
}
