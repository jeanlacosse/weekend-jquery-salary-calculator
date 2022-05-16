console.log('In the script.js')

$(document).ready(onReady);

// array for salaries
let combinedSalaries = [];
// global variables/arrays should be on top of the file to know it is going to be used in the doc

function onReady() {
    console.log('we ready!')
    // console.log everything first and make sure all the connections are there before moving on. Writing the function not important until later, first need to just see that connection worked.
    $(document).on('click', '#submitInfo', submitInfo)
    $(document).on('click', '#deleteEmp', deleteEmp)
}

// get the value of input fields
function submitInfo() {
    // create the getter
    let firstName = $('#firstName').val();
    // not a bad idea to do a console.log after each input to make sure each is working
    // always copy and paste from my html to get the correct id names and variable names
    let lastName = $('#lastName').val();
    let idNumber = $('#idNumber').val();
    let jobTitle = $('#jobTitle').val();
    let annualSalary = $('#annualSalary').val();

    console.log(firstName, lastName, idNumber, jobTitle, annualSalary);


    // live solve, create object
    // will push into a global array, in many places in web dev there are lists of objects
    let newEmployee = {
        firstName: firstName,
        lastName: lastName,
        idNumber: idNumber,
        jobTitle: jobTitle,
        annualSalary: annualSalary,
    }

    // psuedo code: hypotheticalArray.push(newEmployee);

    console.log(newEmployee);
    // append to the table

    // live solve: this was put into a new function renderEmployees which apended the global array of objects of employees instead
    // .text() will only select the information between two html tags
    $('#infoBody').append(`
    <tr>
    <td class='emp grid'>${firstName}</td>
    <td class='emp grid'>${lastName}</td>
    <td class='emp grid'>${idNumber}</td>
    <td class='emp grid'>${jobTitle}</td>
    <td id='empSal' class='grid sal'>$${annualSalary}</td>
    <td>
         <button id="deleteEmp">Delete Employee</button>
    </td>
    </tr>
    `)

    // add annual salary to an array
    combinedSalaries.push(annualSalary)

    // run function to calculate monthly cost
    monthlyCost();

    // reset the values, setter
    // $('#firstName').val('');
    // $('#lastName').val('');
    // $('#idNumber').val('');
    // $('#jobTitle').val('');
    // $('#annualSalary').val('');


    // this uses class instead of id to reset all at once
    $('.inputBoxes').val('');


}


// run monthly cost on click that will loop through the array and add to variable totalCost
let monthlyCost = () => {
    // loop through purchases array
    let el = $('#monthlyCost');
    let totalCost = 0;
    for (let i = 0; i < combinedSalaries.length; i++) {
        // add the array string turned into a number, divided by 12, to totalCost
        totalCost += Number(combinedSalaries[i] / 12);
        //  empty the container and then append the new totalCost
        el.empty();
        el.append(`
        ${totalCost}
        `)
    }
    console.log('in totalCost', totalCost);

    // check if totalCost is over 20k, then add a class that will give css background color
    if (totalCost > 20000) {
        el.addClass('overBudget');
    }
}
openCost = Number($('#monthlyCost').text())
console.log(openCost);

function deleteEmp () {
    // empties the rest of the information
    $('.emp').empty();
    // removes the delete employee button
    let salaryRemove = $('#deleteEmp');
    salaryRemove.remove();
    // create varialbe for monthly cost total
    let el = $('#monthlyCost')
    // grabbing the text from these variables
    // let total = $('#monthlyCost').text();
    // console.log('in total', total)
    //  I cant get it to select the value for the employee on this line only...
    let currentSal = $(this).parent().siblings('.sal').text();
    console.log('in currentSal', currentSal);
    
    //  turning into numbers and subtracting them
    let totalCost = openCost - (Number(currentSal) / 12);
    console.log('in newMonthlyCost', totalCost);
    // append newMonthlyCost to DOM
    el.empty();
    el.append(`
    ${totalCost}
    `)
}


