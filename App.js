//import react and react-dom

var React = require('react');
var ReactDOM = require('react-dom');
var $  = require('jquery');

//user require js to load components within the app
//var Teachers = require('./teacher');


// Import routing components          
// var Router = require('react-router');
// var Route = require('react-router');
/*
 * Components
 */
 
 //declare student constructor
 var Student = function(student){
   this.name = student.name;
   this.email = student.email;
   this.fullName = student.fullName;
   this.key = student.key;
   this.comment = student.comment;
};

//declare instance of student constructor
Student.instances = {};

 //declare teacher constructor
 var Teacher = function(teacher){
   this.name = teacher.name;
   this.email = teacher.email;
   this.subject = teacher.fullName;
   this.key = teacher.key;
   this.grade = teacher.grade;
   this.comment = teacher.comment;
 };

//declare instance of teacher constructor
Teacher.instances = {};


//create contact items list
var StudentItem = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    email: React.PropTypes.string.isRequired,
    fullName: React.PropTypes.string,
    comment : React.PropTypes.string
  },

  render: function() {
    return (
        React.createElement('li', {className: 'ContactItem'},
        React.createElement('h2', {className: 'ContactItem-name'}, this.props.name),
        React.createElement('a', {className: 'ContactItem-email', href: 'mailto:'+ this.props.email}, this.props.email),
        React.createElement('div', {className: 'ContactItem-description'}, this.props.fullName),
        React.createElement('div', {className: 'ContactItem-description'}, this.props.comment),
        React.createElement('Button', {
           type: 'submit',
           className: 'btn btn-danger btn-sm',
           style : { marginRight: "10px" },
           onClick: function(e){ 
            var self = this;
             onDeleteStudent(self); 
           }.bind(this)
         },"Delete"),
        React.createElement('Button', {
           type: 'submit',
           className: 'btn btn-info btn-sm',
           onClick: function(e){ 
            var self = this;
             onUpdateStudent(self); 
           }.bind(this)
         },"Uppdate")     
      )
    );
  },
});

///////////////////////////////////Teachers/////////////////////////////////////////////////////////////
//create contact items list
var TeacherItem = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    email: React.PropTypes.string.isRequired,
    subject: React.PropTypes.string,
    grade: React.PropTypes.string,    
    comment : React.PropTypes.string
  },

  render: function() {
    return (
        React.createElement('li', {className: 'ContactItem'},
        React.createElement('h2', {className: 'ContactItem-name'}, this.props.name),
        React.createElement('a', {className: 'ContactItem-email', href: 'mailto:'+ this.props.email}, this.props.email),
        React.createElement('div', {className: 'ContactItem-description'}, this.props.subject),
        React.createElement('div', {className: 'ContactItem-description'}, this.props.gradee),
        React.createElement('div', {className: 'ContactItem-description'}, this.props.comment),
        React.createElement('Button', {
           type: 'submit',
           className: 'btn btn-danger btn-sm',
           style : { marginRight: "10px" },
           onClick: function(e){ 
            var self = this;
             onDeleteTeacher(self); 
           }.bind(this)
         },"Delete"),
        React.createElement('Button', {
           type: 'submit',
           className: 'btn btn-info btn-sm',
           onClick: function(e){ 
            var self = this;
             onUpdateTeacher(self); 
           }.bind(this)
         },"Uppdate")     
      )
    );
  },
});

//React Elements for Teacher Form
var ContactFormTeacher = React.createClass({
  propTypes: {
    value: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired
  },
  render: function() {
    var oldContact = this.props.value;
    var onChange = this.props.onChange;
    
    return (    
      React.createElement('form', {className: 'ContactForm'},
        React.createElement('h1', {type: 'text', style: {float: "left", marginRight: "455px"}}, "Teacher Details"),  
        React.createElement('input', {
          type: 'text',
          className : 'form-control',
          placeholder: 'Name (required)',
          value: this.props.value.name,
          onChange: function(e) {
            onChange(Object.assign({}, oldContact, {name: e.target.value}));
          },
        }),
        React.createElement('input', {
          type: 'email',
          className : 'form-control',
          placeholder: 'Email',
          value: this.props.value.email,
          onChange: function(e) {
            onChange(Object.assign({}, oldContact, {email: e.target.value}));
          },
        }),
        React.createElement('input', {
          placeholder: 'Subject',
          className : 'form-control',
          value: this.props.value.subject,
          onChange: function(e) {
            onChange(Object.assign({}, oldContact, {subject: e.target.value}));
          },
        }),
        React.createElement('textarea', {
          placeholder: 'Comment',
          className : 'form-control',
          value: this.props.value.comment,
          onChange: function(e) {
            onChange(Object.assign({}, oldContact, {comment: e.target.value}));
          },
        }),
        React.createElement('input', {
          placeholder: 'Grade',
          className : 'form-control',
          value: this.props.value.grade,
          onChange: function(e) {
            onChange(Object.assign({}, oldContact, {grade: e.target.value}));
          },
        }),
        React.createElement('button', {
         type: 'submit', style: {float: "left" , marginRight: "10px"},
         className: 'btn btn-success btn-sm',
         onClick: function(e){ 
          var self = this;
          onAddTeacher(self); 
        }.bind(this)
      },"Add Teacher"),
         React.createElement('button', {
         type: 'submit', style: {float: "left" , marginRight: "10px"},
         className: 'btn btn-success btn-sm',
         onClick: function(e){ 
          var self = this;
          afterUpdateTeacher(self); 
        }.bind(this)
      },"Update Teacher")    
        )     
      );
  },
});


//Create React Elements for teachers view
var ContactViewTeachers = React.createClass({
  propTypes: {
    contacts: React.PropTypes.array.isRequired,
    newContact: React.PropTypes.object.isRequired,
    onNewContactChangeTeacher: React.PropTypes.func.isRequired,
  },

  render: function() {
    var contactItemElementsTeacher = this.props.contacts.filter(function(contact) {
     return contact.email;
      })
    .map(function(contact) { 
      return React.createElement(TeacherItem, contact); 
    });

    return (
      React.createElement('div', {className: 'ContactView'},
        React.createElement(ContactFormTeacher, {
          value: this.props.newContact,
          onChange: this.props.onNewContactChangeTeacher,
        }),
        React.createElement('h1', {className: 'ContactView-title'}, "Teachers List"),
        React.createElement('ul', {className: 'ContactView-list'}, contactItemElementsTeacher)
        )
      );
  },
});


//Create React Element for the Contact Form
var ContactForm = React.createClass({
  propTypes: {
    value: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired
  },
  render: function() {
    var oldContact = this.props.value;
    var onChange = this.props.onChange;
    
    return (    
      React.createElement('form', {className: 'ContactForm'},
        React.createElement('h1', {type: 'text', style: {float: "left", marginRight: "455px"}}, "Student Details"),  
        React.createElement('input', {
          id: 'id_name',
          type: 'text',
          className : 'form-control',
          placeholder: 'Name (required)',
          value: this.props.value.name,
          onChange: function(e) {
            onChange(Object.assign({}, oldContact, {name: e.target.value}));
          },
        }),
        React.createElement('input', {
          id: 'id_email',
          type: 'email',
          className : 'form-control',
          placeholder: 'Email',
          value: this.props.value.email,
            onChange: function(e) {
            onChange(Object.assign({}, oldContact, {email: e.target.value}));
          },
        }),
        React.createElement('input', {
          id: 'id_fullName',
          placeholder: 'Full Name',
          className : 'form-control',
          value: this.props.value.fullName,
          onChange: function(e) {
            onChange(Object.assign({}, oldContact, {fullName: e.target.value}));
          },
        }),
        React.createElement('textarea', {
          id : 'id_comment',
          placeholder: 'Comment',
          className : 'form-control',
          value: this.props.value.comment,
          onChange: function(e) {
            onChange(Object.assign({}, oldContact, {comment: e.target.value}));
          },
        }),
        React.createElement('button', {
           id : 'id_addStudent',
           type: 'submit', style: {float: "left" , marginRight: "10px"},
           className: 'btn btn-success btn-sm',
           onClick: function(e){ 
            var self = this;
             onAddStudent(self); 
           }.bind(this)
         },"Add Student"),
        React.createElement('button', {
         type: 'submit', style: {float: "left" , marginRight: "10px"},
         className: 'btn btn-success btn-sm',
         onClick: function(e){ 
          var self = this;
          afterUpdateStudent(self); 
        }.bind(this)
      },"Update Student")  
         )     
    );
  },
});

//create the final render componenet with conatactItems and contactForms
var ContactView = React.createClass({
  propTypes: {
    contacts: React.PropTypes.array.isRequired,
    newContact: React.PropTypes.object.isRequired,
    onNewContactChange: React.PropTypes.func.isRequired
  },

  render: function() {
    var contactItemElements = this.props.contacts.filter(function(contact) { return contact.email; })
      .map(function(contact) { return React.createElement(StudentItem, contact); });

    return (
      React.createElement('div', {className: 'ContactView'},
        React.createElement(ContactForm, {
          value: this.props.newContact,
          onChange: this.props.onNewContactChange
        }),
        React.createElement('h1', {className: 'ContactView-title'}, "Students List"),
        React.createElement('ul', {className: 'ContactView-list'}, contactItemElements)
      )
    );
  },
});

function updateNewContact(contact) {
     setState({ newContact: contact });
}

//Function to add students
function onAddStudent(self){
   var obj = self.props.value, error = false, i = 1;   
   var newKey = obj.name + '001';
   try {
      var studentsObj ={
        key : obj.name + '001',
        name : obj.name,
        fullName : obj.fullName,
        email : obj.email,
        comment : obj.comment
    }; 

    //Writing the resulting string as the value of the key "studentsObj" to Local Storage:
    Student.instances[newKey] = studentsObj;   
    localStorage.students = JSON.stringify(Student.instances);
     } catch (e) {
        alert("Error when writing to Local Storage\n" + e);
        error = true;
    }
    if (error) alert("User "+ obj.name +" not saved.");
    setState(studentsObj);
    window.location.reload();
}

//Function to delete Student
function onDeleteStudent(obj){
  var key = obj.props.name +'001';
   if (Student.instances[key]) {
        alert("Student " + key + " deleted");
        delete Student.instances[key];
        localStorage.students = JSON.stringify(Student.instances);
        window.location.reload();
    } else {
        alert("There is no Student with Id " + key + " in the database!");
    }
}

//Function to Update student
function onUpdateStudent(obj){
    $('#id_name').val(obj.props.name);
    $('#id_email').val(obj.props.email);
    $('#id_fullName').val(obj.props.fullName);
    $('#id_comment').val(obj.props.comment);    
}

//write updated teacher data to localstorage
function afterUpdateTeacher(obj){
     var teachers = JSON.parse(localStorage.teachers); 
     var name = obj.props.name + '001';
     for (var i = 0; i < teachers.length; i++) {
      if(name === teachers[i].key){  //look for match with name
       teachers[i].name == obj.name;
       teachers[i].fullName == obj.fullName;
         //add two
       break;  //exit loop since you found the teacher
      }
     }
     localStorage.setItem("name", JSON.stringify(teachers));  //put the object back
}

//write updated student data to localstorage
function afterUpdateStudent(obj){
     var students = JSON.parse(localStorage.students); 
     var name = obj.props.name + '001';
     for (var i = 0; i < students.length; i++) {
      if(name === students[i].key){  //look for match with name
       students[i].name == obj.name;
       students[i].fullName == obj.fullName;
       
       break;  //exit loop since you found the teacher
      }
     }
     localStorage.setItem("name", JSON.stringify(students));  //put the object back
}
//Set status changes
function updateNewContactTeacher(contact) {
    setState({ newContact: contact });
}

//Function to add teachers
function onAddTeacher(self){
 var obj = self.props.value, error = false, i = 1;   
 var newKey = obj.name + '001';
 try {
  //create teacher object to save
  var teacherObj ={
    key : obj.name + '001',
    name : obj.name,
    grade : obj.grade,
    subject : obj.subject,
    email : obj.email,
    comment : obj.comment
  }; 

    //Writing the resulting string as the value of the key "teacherObj" to Local Storage:
    Teacher.instances[newKey] = teacherObj;   
    localStorage.teachers = JSON.stringify(Teacher.instances);
  } catch (e) {
    alert("Error when writing to Local Storage\n" + e);
    error = true;
  }
  if (error) alert("User "+ obj.name +" not saved.");
  //Refresh state
  setState(teacherObj);
  window.location.reload();
}

//Function to Delete Teachers
function onDeleteTeacher(obj){
  var key = obj.props.name +'001';
  if (Teacher.instances[key]) {
    alert("Student " + key + " deleted");
    delete Teacher.instances[key];
    localStorage.teachers = JSON.stringify(Teacher.instances);
    window.location.reload();
  } else {
    alert("There is no Teacher with Id " + key + " in the database!");
  }
}

var state = {};
var stateTeacher = {};

// Set initial data
  setState({
      contacts: location.hash == '#students' ? getContacts() : getContactsTeacher(),
      newContact: location.hash == '#students' ? {name: "", email: "", fullName: "", comment:""} : {name: "", email: "", subject: "", grade:"",comment:""}    
    }); 

   // setStateTeacher({
   //  contactsTeacher: getContactsTeacher(),
   //  newContactTeacher: {name: "", email: "", subject: "", grade:"",comment:""}      
   //  });

function onUpdateTeacher(obj){
  var key = obj.props.key;
}

function getContactsTeacher(){
 var i = 0,
 key = "",
 keys = [],
 teacherTableString = "",
 teacherTbl = {},
 teacherArr = [];
 try {
  if (localStorage.teachers) {
    teacherTableString = localStorage.teachers;
  }
} catch (e) {
  alert("Error when reading from Local Storage\n" + e);
}

if (teacherTableString) {
        //Converting the student table string into a corresponding map student 
        //with student rows as elements, with the help of the built-in function JSON.parse
        teacherTbl = JSON.parse(teacherTableString);
        keys = Object.keys(teacherTbl);
        //alert(keys.length + " Users loaded.");       
        for (i = 0; i < keys.length; i++) {
          key = keys[i];
          Teacher.instances[key] = convertRow2ObjTeacher(teacherTbl[key]);
          teacherArr.push(convertRow2ObjTeacher(teacherTbl[key]));
        }    
        return teacherArr;   
      }
      else
      {
       return [{key: '0001', name:"Suzanne Fiona", email : "fio.july4@gmail.com", subject: "Science & Technology", grade: "Grade 5", comment :""}];
     }

   }

function getContacts(){
   var i = 0,
        key = "",
        keys = [],
        studentTableString = "",
        studentTbl = {},
        studentArr = [];
    try {
        if (localStorage.students) {
            studentTableString = localStorage.students;
        }
    } catch (e) {
        alert("Error when reading from Local Storage\n" + e);
    }

    if (studentTableString) {
        //Converting the student table string into a corresponding map student 
        //with student rows as elements, with the help of the built-in function JSON.parse
        studentTbl = JSON.parse(studentTableString);
        keys = Object.keys(studentTbl);
        //alert(keys.length + " Users loaded.");       
        for (i = 0; i < keys.length; i++) {
            key = keys[i];
            Student.instances[key] = convertRow2Obj(studentTbl[key]);
            studentArr.push(convertRow2Obj(studentTbl[key]));
        }    
         return studentArr;   
    }
    else
    {
     return [{key: '0001', name:"Suzanne Fiona", email : "fio.july4@gmail.com", fullName: "Suzanne Fiona Fernando", comment: "Hello"}];
    }
    
}

function convertRow2ObjTeacher(teacherItm) {
    var teacher = new Teacher(teacherItm);
    return teacher;
};
function convertRow2Obj(studentItm) {
    var student = new Student(studentItm);
    return student;
};

// Make the given changes to the state and perform any required housekeeping
function setState(changes) {  
     Object.assign(state, changes); 
    if(location.hash != ""){
        if(location.hash == '#students'){    
            ReactDOM.render(
              React.createElement(ContactView, Object.assign({}, state, {
                //onNewContactChange: updateNewContact,
              })),
              document.getElementById('main'));
        }
        else if(location.hash == '#Dashboard'){ 
          ReactDOM.render(
            React.createElement('div', {className: 'ContactView'},         
            React.createElement('h1', {className: 'ContactView-title'}, "DashBoard")
           ),document.getElementById('main'));
        } else{
          ReactDOM.render(
            React.createElement(ContactViewTeachers, Object.assign({}, state, {
              //onNewContactChangeTeacher : updateNewContactTeacher,
            })),
            document.getElementById('main'));
        }
    }
    else
    {
      ReactDOM.render(
        React.createElement(Teachers.ContactView, Object.assign({}, Teachers.state, {
          onNewContactChange: Teachers.updateNewContact,
        })),
     document.getElementById('main'));
    }
  } 


 function navigated() {
  setState({location: window.location.hash});
}

// Handle browser navigation events
window.addEventListener('hashchange', navigated, false);

// Start the app
navigated();