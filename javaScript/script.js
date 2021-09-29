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

//storage
const taskStorage = []
const trashStorage = []

//feting elements
    const taskHolder = document.querySelector('#TodoList');
    const trashTaskHolder = document.querySelector('#TrashList')
    //addTask input
    const userInput = document.querySelector('#AddTask-Input').value;
    //add task btn
    const addTaskBtn = document.querySelector('#AddTask-Btn');
        //click event to display and create a new task.
        addTaskBtn.addEventListener('click', () => {
            //creates new task and stores it to taskStorage[]
            addTask(userInput)
            //display elemnt to window
            let i = taskStorage.length;
            displayTask(taskHolder, taskStorage[i].text, taskStorage[i].id)
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
    }
}

/**add task
 * 
 * pushes new task to taskStorage array.
 */
function addTask(userInput){
    userInput.length < 1 ?
        taskStorage.push(new task(userInput)) :
        console.log('userInput is smaller then one');
}

const randomNumberHistory = [];

/** creates a random number and checks if it allready exists */
function randomNumber(){
    let number;
    let allreadyExist = false;

        do {
          number = Math.floor(Math.random() * 10)
          //check through stored randomnumber
            for(let i = 0; i < randomNumberHistory; i++){
                if (number ===  randomNumberHistory[i]) {
                    allreadyExist = true;
                } else { 
                    randomNumberHistory.push(number)
                    return number;
                }
            }
        } while(allreadyExist === true);
}

function displayTask(where, innertext, id){

}

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