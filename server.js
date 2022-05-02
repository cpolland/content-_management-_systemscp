const db = require('./connection');
const inquirer = require('inquirer');

db.connect(function(){startPrompt()})

const startPrompt = () => {
    inquirer.prompt([
        {
       name: 'picks',
       type: 'list',
       message: 'Choose from the options provided below.',
       choices: ['view all departments', 
                 'view all roles', 
                 'view all employees', 
                 'add a department', 
                 'add a role', 
                 'add an employee', 
                 'update an employee role'

                ]
        }
    ]).then(function(response){
        switch (response.picks) {
            case "view all departments":
                viewAllDepartments()
                
                break;
            case "view all roles":
                viewAllRoles()
                
                break;
            case "view all employees":
                    viewAllEmployees()
                    
                break;
            case "add a department":
                    addDepartment()
                    
                break;
            case "add a role":
                    addRole()
                    
            break;
            case "add an employee":
                addEmployee()
                
                break;
            case "update an employee role":
                    updateRole()
                    
            break;
                default:db.end();
                break;
        }
    })
}

function viewAllDepartments(){
    db.query("SELECT * FROM department",(err,res)=> {
        if(err) throw err
        console.table(res)
        startPrompt()
    })
}

function viewAllRoles(){
    db.query("SELECT * FROM role",(err,res)=> {
        if(err) throw err
        console.table(res)
        startPrompt()
    })

}

function viewAllEmployees(){
    db.query("SELECT * FROM employee",(err,res)=> {
        if(err) throw err
        console.table(res)
        startPrompt()
    })
}

function addDepartment(){
    db.query('SELECT * FROM department',(err,res )=> {
        if(err) throw err
        inquirer.prompt([
        {
            type: "input",
            name: "newDepartment",
            message: "What is the name of the new department?",
            choices: res.map(department => department.department_name)
        }
        ]).then(response => {
            const departmentName = res.find(department => department.department_name === response.newDepartment)
            db.query('INSERT INTO department SET ?',{
                department_name: response.newDepartment,
                
            })
            console.log("New new department added.")
            startPrompt()
        })
    })
}

function addEmployee(){
    db.query('SELECT * FROM role',(err,res )=> {
        if(err) throw err
        inquirer.prompt([
           {
               type: "input",
               name: "firstName",
               message: "What is the new employee's first name?"
           } ,
      
            {
                type: "input",
                name: "lastName",
                message: "What is the new employee's last name?"
            },
        {
            type: "list",
            name: "roleTitle",
            message: "What is the role for the new employee?",
            choices: res.map(role => role.title)
        }
        // {
        //     type: "list",
        //     name: "managerId",
        //     message: "What is the manager's ID?",
        //     choices: ["hello"]
        // }
        ]).then(response => {
            const emplyeeRole = res.find(role => role.title === response.roleTitle)
            db.query('INSERT INTO employee SET ?',{
                first_name: response.firstName,
                last_name: response.lastName,
                role_id: emplyeeRole.id,
            })
            console.log("New Employee added.")
            startPrompt()
        })
    })
}