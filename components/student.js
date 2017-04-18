define('student.js',['react', 'react-dom','jquery'],
    function(React, ReactDOM, $){
//Asynchronous module defition with require
//Using module pattern
var StudentComponent = function(){
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


//---------------------------------------------------------------------------Javascript Functions -------------------------------------------

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
    function updateNewContact(contact) {
        //_main.setState({ newContact: contact });
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
        //_main.setState(studentsObj);
        window.location.reload();
    }
  
    //Function to Update student
    function onUpdateStudent(obj){
        $('#id_name').val(obj.props.name);
        $('#id_email').val(obj.props.email);
        $('#id_fullName').val(obj.props.fullName);
        $('#id_comment').val(obj.props.comment);    
    }

    //write updated student data to localstorage
    function afterUpdateStudent(obj){
      var stuObj = obj.props.value;
      var key = stuObj.name + '001';
      //students object with a list of students
      var studentsList = JSON.parse(localStorage.students);   
          var student = studentsList[key];
           student.name == stuObj.name;
           student.fullName == stuObj.fullName;
           student.email == stuObj.email;
           localStorage.setItem(key, JSON.stringify(studentsList));  //put the object back
           window.location.reload();
    }

function convertRow2Obj(studentItm) {
      var student = new Student(studentItm);
      return student;
};

//get Students From local storage
function getStudents(){
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
//---------------------------------------------------------------------------Helper Functions -------------------------------------------
    return {
        onAddStudent:onAddStudent,
        getStudents:getStudents,
        onDeleteStudent:onDeleteStudent,
        Student:Student,
        onUpdateStudent:onUpdateStudent,
        ContactView:ContactView,
        ContactForm:ContactForm
    };
};
 return StudentComponent;
});
