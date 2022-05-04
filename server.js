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
                 'update an employee role',
                 

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
            db.query('INSERT INTO department SET ?',{
                department_name: response.newDepartment,
                
            })
            console.log("New new department added.")
            startPrompt()
        })
    })
}

function addRole(){
    db.query('SELECT * FROM role',(err,res )=> {
        if(err) throw err
        inquirer.prompt([
        {
            type: "input",
            name: "newRole",
            message: "What is the title name of the new role?",
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of the new role?"
        } ,
   
         {
             type: "input",
             name: "roleId",
             message: "What is the department ID of the new role?"
         },

        ]).then(response => {
            db.query('INSERT INTO role SET ?',{
                title: response.newRole,
                salary: response.salary,
                id: response.roleId,
            })
            console.log("New role has been added.")
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

function updateRole (){
    db.query('SELECT * FROM employee',(err,res )=> {
        if(err) throw err
        inquirer.prompt([
        {
            type: "list",
            name: "employeeUpdate",
            message: "Who is the employee you want to update?",
            choices: res.map(employee => employee.last_name + ',' + employee.first_name)
        },
       
        ]).then(response => {
            db.query('SELECT * FROM role',(err,res )=> {
                if(err) throw err
                inquirer.prompt([
                {
                    type: "list",
                    name: "newRole",
                    message: "What is the new role you wish to asign to the employee?",
                    choices: res.map(role => role.title)
                },
               
                ]).then(response => {
                    db.query('REPLACE INTO employee (pk_id, role_id) VALUES (newRole)')
                    })
                    console.log("Epmloyee's new role updated.")
                    
                })
            
        })
    })
}