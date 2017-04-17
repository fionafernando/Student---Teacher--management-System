  define('teacher.js',['react', 'react-dom','./student'],
    function(React, ReactDOM, Student){

 var TeacherComponent = function(){

 //declare student constructor
 var Teacher = function(teacher){
   this.name = teacher.name;
   this.email = teacher.email;
   this.subject = teacher.fullName;
   this.key = teacher.key;
   this.grade = teacher.grade;
   this.comment = teacher.comment;
 };

//declare instance of student constructor
Teacher.instances = {};

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
        React.createElement('h1', {type: 'text', style: {float: "left", marginRight: "455px"}}, "Add Teachers"),  
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
          onAddStudent(self); 
        }.bind(this)
      },"Add Teacher")   
        )     
      );
  },
});


function convertRow2Obj(teacherItm) {
  var teacher = new Teacher(teacherItm);
  return teacher;
};


var ContactViewTeachers = React.createClass({
  propTypes: {
    contactsTeacher: React.PropTypes.array.isRequired,
    newContactTeacher: React.PropTypes.object.isRequired,
    onNewContactChangeTeacher: React.PropTypes.func.isRequired,
  },

  render: function() {
    var contactItemElementsTeacher = this.props.contactsTeacher
    .filter(function(contact) { return contact.email; })
    .map(function(contact) { return React.createElement(ContactItem, contact); });

    return (
      React.createElement('div', {className: 'ContactView'},
        React.createElement(ContactForm, {
          value: this.props.newContactTeacher,
          onChange: this.props.onNewContactChangeTeacher,
        }),
        React.createElement('h1', {className: 'ContactView-title'}, "Teachers"),
        React.createElement('ul', {className: 'ContactView-list'}, contactItemElementsTeacher)
        )
      );
  },
});


function updateNewContactTeacher(contact) {
 setState({ newContact: contact });
}

function onAddTeacher(self){
 var obj = self.props.value, error = false, i = 1;   
 var newKey = obj.name + '001';
 try {
  var teacherObj ={
    key : obj.name + '001',
    name : obj.name,
    grade : obj.grade,
    subject : obj.subject,
    email : obj.email,
    comment : obj.comment
  }; 

    //Writing the resulting string as the value of the key "studentsObj" to Local Storage:
    Teacher.instances[newKey] = teacherObj;   
    localStorage.teachers = JSON.stringify(Teacher.instances);
  } catch (e) {
    alert("Error when writing to Local Storage\n" + e);
    error = true;
  }
  if (error) alert("User "+ obj.name +" not saved.");
  setState(teacherObj);
  window.location.reload();
}

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
// Set initial data
setState({
  contacts:getContacts(),
  newContact: {name: "", email: "", fullName: "", comment:""},
});

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
          Teacher.instances[key] = convertRow2Obj(teacherTbl[key]);
          studentArr.push(convertRow2Obj(teacherTbl[key]));
        }    
        return teacherArr;   
      }
      else
      {
       return [{key: '0001', name:"Suzanne Fiona", email : "fio.july4@gmail.com", subject: "Science & Technology", grade: "Grade 5", comment :""}];
     }

   }

   return {
    getContacts: getContacts,
    onUpdateTeacher:onUpdateTeacher,
    ContactViewTeachers :ContactViewTeachers,
    ContactForm:ContactForm,
    onAddTeacher:onAddTeacher,
    updateNewContactTeacher:updateNewContactTeacher
   };
 };

 return TeacherComponent;
});