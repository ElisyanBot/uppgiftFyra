/** creates a new html element and returns it.
 * 
 * @param {*htmlTagType takes a string with a html tag}  
 * @param {*addClass takes a string with the name of a class} 
 * @param {*addInnerText takes a string and add it to innerText of the new element}
 * @returns new created html element
 */

function newElement(htmlTagType, addClass, addInnerText){
    let htmlElement;

        htmlTagType !== null || undefined ? 
            htmlElement = document.createElement(htmlTagType) :
            console.log("htmlTagType needs to be a string and exiting html tag type");
        
        addClass !== null || undefined ? 
            htmlElement.classList.add(addClass) :
            htmlElement.classList.remove();
        
        addInnerText !== null || undefined ?
            htmlElement.innerText = addInnerText :
            htmlElement.innerText.remove();
    
    return htmlElement;
}

//todo list body
const taskHolder = document.querySelector('#TodoList');
//addTask input
const userInput = document.querySelector('#AddTask-Input').value;
//add task btn
const addTaskBtn = document.querySelector('#AddTask-Btn');
    addTaskBtn.addEventListener('click', () => addTask());


const TaskStorage = []
const trashStorage = []

/*
    test: userInput.length needs to be longer then zero
*/

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
    }
}

/**add task
 * 
 * pushes new task to taskStorage array.
 */
function addTask(){
    userInput.length < 1 ?
        TaskStorage.push(new task(userInput)) :
        console.log('userInput is smaller then one')
}

const randomNumberMemory = [];

function randomNumber(){
    let number;
        //creates an number //own function?
        //check if it's in randomNumberMemory
        //if exist redo
        //else return number
    return number
}

function displayTask(where, innertext, id){}