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
let taskStorage = [];
let taskDoneCounter = 0;


//fetching elements
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
 * @returns new task object
 */

function task(text, taskID){
    return{
        text,
        taskID,
        taskCompleteStatus: false,
        setAsdone: function(textID,  checkboxID){
            const taskText = document.getElementById(textID);
            const checkBox = document.getElementById(checkboxID);
            console.log(checkBox)
            if(this.taskCompleteStatus === false){
                this.taskCompleteStatus = true;
                taskText.classList.add('taskDoneStyle')
                checkBox.classList.add('checked')
                
            } else {
                this.taskCompleteStatus = false;
                taskText.classList.remove('taskDoneStyle')
                checkBox.classList.remove('checked')
            }   
        },
        deleteTask: function(){
            const deletedElement = document.getElementById(`${this.taskID}`);
                //resets complateStatus to false.
                this.taskCompleteStatus = false;
                //remove element
                taskStorage = removeTaskFromStorage(taskStorage, `${this.taskID}`);
                //edit task done counter - 1
                trackTaskDone(this.taskCompleteStatus)
                //removes element from todo list
                deletedElement.remove();
        },
        displayTask: function(parrent, innertext, id, ){
            const displayedTask = newElement('li', 'listItem', null, id);
                parrent.appendChild(displayedTask);
                //checkBox
                const taskCheckbox = newElement('div', 'checkbox', null, `${id}_checkboxTask`, null);
                displayedTask.appendChild(taskCheckbox);
                //user input goes here
                const taskText =  newElement('p', 'taskText', innertext.toString(), `${id}_innerTextTask`,);
                displayedTask.appendChild(taskText);
                //removes parrent element
                const taskDeleteBtn = newElement('button', 'deleteBtnTask', 'X', `${id}_deleteBtnTask`);
                displayedTask.appendChild(taskDeleteBtn);

            //added functionality to task elements
            taskDeleteBtn.addEventListener('click', () => this.deleteTask());
            taskCheckbox.addEventListener('click', () => {
                this.setAsdone(`${id}_innerTextTask`, `${id}_checkboxTask`);
                trackTaskDone(this.taskCompleteStatus)
                taskCheckbox.checked = this.taskCompleteStatus
            })
            //click on text to check textbox
            taskText.addEventListener('click', () => {
                this.setAsdone(`${id}_innerTextTask`, `${id}_checkboxTask`);
                trackTaskDone(this.taskCompleteStatus)
                taskCheckbox.checked = this.taskCompleteStatus
            })
        },
       
    }
}

/**add task
 * 
 * pushes new task to taskStorage array.
 */
function addTask(userInput){
        taskStorage.push(new task(userInput, randomNumber()))
}

/*increase or decrease taskDone number */
function trackTaskDone(setAsDoneBoolen) {
    const completedTask = document.getElementById('#TaskDone');
    //adds or remove from  taskDoneCounter
    setAsDoneBoolen === true?
        taskDoneCounter++ : taskDoneCounter--;
    //prevents completedTasks to be lower then 0
    taskDoneCounter < 0 ?
        taskDoneCounter = 0 : completedTask.innerText = taskDoneCounter;
}

const randomNumberHistory = [];
/** creates a random number and checks if it allready exists and if it exists it replaces the old number, not perfect right now... */
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


/** loops through and delete one item from an array, 
 * returns new array with unmatched id:s with array.filter();
 * 
 * @param {*array takes an array }
 * @param {*indexIdValue is the value that should be removed from array}
 */
function removeTaskFromStorage(array, indexIdValue){
        //filters out the matched taskID
         return array.filter((element) => {
            if (element.taskID.toString() === indexIdValue) {
                //we hava a matching id
                console.log('match')
            } else {
                //saves unmatched ids to teh new array
                return element !== element.taskID.toString()
           }
        })
        // return array //kanske inte beh??vs... tror at jag t??nkte anv??nda den till n??got jestjs test...
}


function changeTheme(styleCSS){
    const styleLink = document.querySelector('link');
    styleLink.href = styleCSS
}