/** creates a new html element and returns it.
 * 
 * @param {*htmlTagType takes a string with a html tag}  
 * @param {*addClass takes a string with the name of a class} 
 * @param {*addInnerText takes a string and add it to innerText of the new element}
 * @returns new created html element
 */

function newElement(htmlTagType, addClass, addInnerText, elementID, inputType){
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

        inputType !== null || undefined ?
            htmlElement.setAttribute('type', inputType) :
            htmlElement.removeAttribute('type');

    
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
 * @param {*deleteTask removes element from window and from TaskStorage Array}
 * @param {*DisplayTask displays task at parrent element}
 * @param {*displayAtTrash displays task to trash section}
 * @returns new task object
 */
function task(text, taskID){
    return{
        text,
        taskID,
        taskCompleteStatus: false,
        setAsdone: function(textID){
            const taskText = document.getElementById(textID);
            if(this.taskCompleteStatus === false){
                this.taskCompleteStatus = true;
                taskText.classList.add('taskDoneStyle')
            } else {
                this.taskCompleteStatus = false;
                taskText.classList.remove('taskDoneStyle')
            }   
        },
        deleteTask: function(){
            //resets complateStatus to false.
            this.taskCompleteStatus = false;
            //remove element
            const deletedElement = document.getElementById(`${this.taskID}`);
            deletedElement.remove();
            //display att trashcan
            this.displayAtTrash(trashTaskHolder, this.text, this.taskID)
        },
        displayTask: function(parrent, innertext, id){
            const task = newElement('li', 'listItem', null, id);
                parrent.appendChild(task);
                //checkBox
                const taskCheckbox = newElement('input', 'listItem', null, `${id}_checkboxTask`, 'checkbox');
                task.appendChild(taskCheckbox);
                //user input goes here
                const taskText =  newElement('p', 'listItem', innertext.toString(), `${id}_innerTextTask`,);
                task.appendChild(taskText);
                //removes parrent element
                const taskDeleteBtn = newElement('button', 'deleteBtn', 'delete', `${id}_deleteBtnTask`);
                task.appendChild(taskDeleteBtn);

            //added functionality to elements
            taskDeleteBtn.addEventListener('click', () => this.deleteTask());
            taskCheckbox.addEventListener('click', () => {
                this.setAsdone(`${id}_innerTextTask`);

            })
        },
        displayAtTrash: function(parrent, innertext, id){
            const task = newElement('li', 'listItem', null, id);
            parrent.appendChild(task);
                //user input goes here
                const taskText =  newElement('p', 'listItem', innertext.toString(), `${id}_innerTextTask`);
                task.appendChild(taskText);
                //unde deletet from trash can
                const taskDeleteUndoBtn = newElement('button', 'deleteBtn', 'undo', `${id}_deleteBtnUndoTask`);
                task.appendChild(taskDeleteUndoBtn);
                //delete it from storage and window
                const taskTrashBtn = newElement('button', 'deleteBtn', 'trash', `${id}_deleteBtnTask`);
                task.appendChild(taskTrashBtn);

            taskDeleteUndoBtn.addEventListener('click', () => {
                //moves task back to todoList from trash can
                this.displayTask(taskHolder, innertext, id)
                task.remove();
            });

            //removes from taskStorage and from window
             taskTrashBtn.addEventListener('click', () => {
                 removeTaskFromStorage(taskStorage, `${this.taskID}`);
                 task.remove()
            })
        }
    }
}

/**add task
 * 
 * pushes new task to taskStorage array.
 */
function addTask(userInput){
        taskStorage.push(new task(userInput, randomNumber())) 
}


const randomNumberHistory = [];
/** creates a random number and checks if it allready exists and if it exists it replaces the old number, not perfect... */
function randomNumber(){
    let number = Math.floor(Math.random() * 10);
        //checks if it allready exists
        for (let index = 0; index < randomNumberHistory.length; index++) {
            if (number === randomNumberHistory[index]) { 
                number = Math.floor(Math.random(10) * 1000) //needs to become better..
                randomNumberHistory.push(number)
                console.log('pushed')
                return number
            }
        }
    
    randomNumberHistory.push(number)
    return number
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
function removeTaskFromStorage(array, indexValue){
    array.forEach(element => {
        element.taskID.toString() === indexValue ? 
            array.splice(element, 1) :
            console.log('not a match')
    });

    return array //vill ha det som den inte tar bort...
}