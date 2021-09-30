/** creates a new html element and returns it.
 * 
 * @param {*htmlTagType takes a string with a html tag}  
 * @param {*addClass takes a string with the name of a class} 
 * @param {*addInnerText takes a string and add it to innerText of the new element}
 * @returns new created html element
 */

function newElement(htmlTagType, addClass, addInnerText, elementID){
    let htmlElement;

        htmlTagType !== null || undefined ? 
            htmlElement = document.createElement(htmlTagType) :
            console.log("htmlTagType needs to be a string and exiting html tag type");
        
        addClass !== null || undefined ? 
            htmlElement.classList.add(addClass) :
            htmlElement.classList.remove();
        
        addInnerText !== null || undefined ?
            htmlElement.innerText = addInnerText :
            htmlElement.innerText = htmlElement.innerText;
        
         elementID !== null || undefined ?
            htmlElement.setAttribute('id', elementID) :
            htmlElement.removeAttribute('id');

    
    return htmlElement;
}

//storage
const taskStorage = []
const trashStorage = []

//feting elements
    const taskHolder = document.querySelector('#TodoList');
    const trashTaskHolder = document.querySelector('#TrashList')
    //addTask input
    const userInput = document.querySelector('#AddTask-Input');
 
    //add task btn
    const addTaskBtn = document.querySelector('#AddTask-Btn');
        //click event to display and create a new task.
        addTaskBtn.addEventListener('click', () => {
            if (userInput.value.length > 0){
                //creates new task and stores it to taskStorage[]
                addTask(userInput.value)
                //display element to window
                let i = taskStorage.length - 1;
                taskStorage[i].displayTask(taskHolder, taskStorage[i].text, taskStorage[i].taskID)
                //resets input value
                userInput.value = '';
            } else {
                console.log('ERR: userInput is smaller then 1')
                alert('your task needs to contain atleast one or more characters')
            }
        });

    

/** Task factory function
 * 
 * @param {*text takes userInput, used for innerText in htmlElement} 
 * @param {*taskID random number for each new task} 
 * @param {*setAsDone completes a task with new styling} 
 * @param {*deleteTask removes element from window and from TaskStorage Array} taskID 
 * @returns new task object
 */
function task(text, taskID){
    return{
        text,
        taskID,
        taskCompleteStatus: false,
        setAsdone: function(){},
        deleteTask: function(){},
        displayTask: function(parrentSection, innertext, id){
            const task = newElement('li', 'listItem', null, id);
                parrentSection.appendChild(task);
                //user input goes here
                const taskText =  newElement('p', 'listItem', innertext.toString(), `${id}_innerTextTask`);
                task.appendChild(taskText);
                //removes parrent element
                const taskDeleteBtn = newElement('button', 'deleteBtn', 'delete', `${id}_deleteBtnTask`);
                task.appendChild(taskDeleteBtn);

            // taskDeleteBtn.addEventListener(() => {this.deleteTask()});
        }
    }
}

/**add task
 * 
 * pushes new task to taskStorage array.
 */
function addTask(userInput){
        taskStorage.push(new task(userInput, randomNumber())) 
        console.log(taskStorage)
}


const randomNumberHistory = [];
/** creates a random number and checks if it allready exists */
function randomNumber(){
    let number = Math.floor(Math.random() * 10);
    randomNumberHistory.push(number)
          //check through stored randomnumber
            for(let i = 0; i < randomNumberHistory; i++){
                if (number ===  randomNumberHistory[i]) {
                    
                } else { 
                    return number;
                }
            }
     
    console.log(number, randomNumberHistory)
    return number;
}

// function displayTask(where, innertext, id){
//     const task = newElement('li', 'listItem', null, id);
//     where.appendChild(task);
//     //user input goes here
//     const taskText =  newElement('p', 'listItem', innertext.toString(), `${id}_innerTextTask`);
//     task.appendChild(taskText);
//     //removes parrent element
//     const deleteBtn = newElement('button', 'deleteBtn', 'delete', `${id}_deleteBtnTask`);
//     task.appendChild(deleteBtn);

//     deleteBtn.addEventListener(()=> {this.deleteTask});
// }

/** loops through and delete one item from an array
 * 
 * @param {*array takes an array }
 * @param {*indexValue what value the removed item should contain }
 */
function removeFromArray(array, indexValue){
    array.forEach(element => {
        element === indexValue ? 
            array.splice(indexValue, 1) :
            console.log('item do not exist')
    });

    return array //vill ha det som den inte tar bort...
}