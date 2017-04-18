define('teacher.js', ['react', 'react-dom', 'jquery'],
function (React, ReactDOM, $) {

    //Asynchronous module defition with require
    //Using module pattern

    var TeacherComponent = function (options) {

        //create pointer to app.js
        //declare teacher constructor
        var Teacher = function (teacher) {
            this.name = teacher.name;
            this.email = teacher.email;
            this.subject = teacher.fullName;
            this.key = teacher.key;
            this.grade = teacher.grade;
            this.comment = teacher.comment;
        },

        //React Elements for Teacher Form
        ContactFormTeacher = React.createClass({
            propTypes: {
                value: React.PropTypes.object.isRequired,
                onChange: React.PropTypes.func.isRequired
            },
            render: function () {
                var oldContact = this.props.value;
                var onChange = this.props.onChange;

                return (
                 React.createElement('form', { className: 'ContactForm' },
                  React.createElement('h1', { type: 'text', style: { float: "left", marginRight: "455px" } }, "Teacher Details"),
                  React.createElement('input', {
                      id: 'id_teacher_name',
                      type: 'text',
                      className: 'form-control',
                      placeholder: 'Name (required)',
                      value: this.props.value.name,
                      onChange: function (e) {
                          onChange(Object.assign({}, oldContact, { name: e.target.value }));
                      },
                  }),
                  React.createElement('input', {
                      id: 'id_teacher_email',
                      type: 'email',
                      className: 'form-control',
                      placeholder: 'Email',
                      value: this.props.value.email,
                      onChange: function (e) {
                          onChange(Object.assign({}, oldContact, { email: e.target.value }));
                      },
                  }),
                  React.createElement('input', {
                      id: 'id_teacher_subject',
                      placeholder: 'Subject',
                      className: 'form-control',
                      value: this.props.value.subject,
                      onChange: function (e) {
                          onChange(Object.assign({}, oldContact, { subject: e.target.value }));
                      },
                  }),
                  React.createElement('textarea', {
                      id: 'id_teacher_comment',
                      placeholder: 'Comment',
                      className: 'form-control',
                      value: this.props.value.comment,
                      onChange: function (e) {
                          onChange(Object.assign({}, oldContact, { comment: e.target.value }));
                      },
                  }),
                  React.createElement('input', {
                      id: 'id_teacher_grade',
                      placeholder: 'Grade',
                      className: 'form-control',
                      value: this.props.value.grade,
                      onChange: function (e) {
                          onChange(Object.assign({}, oldContact, { grade: e.target.value }));
                      },
                  }),
                  React.createElement('button', {
                      type: 'submit', style: { float: "left", marginRight: "10px" },
                      className: 'btn btn-success btn-sm',
                      onClick: function (e) {
                          var self = this;
                          onAddTeacher(self);
                      }.bind(this)
                  }, "Add Teacher"),
                  React.createElement('button', {
                      type: 'submit', style: { float: "left", marginRight: "10px" },
                      className: 'btn btn-success btn-sm',
                      onClick: function (e) {
                          var self = this;
                          afterUpdateTeacher(self);
                      }.bind(this)
                  }, "Update Teacher")
                  )
                 );
            },
        }),

        setStateHandler = options ? options.setStateHandler : null,

        //Create React Elements for teachers view
        ContactViewTeachers = React.createClass({
            propTypes: {
                contacts: React.PropTypes.array.isRequired,
                newContact: React.PropTypes.object.isRequired,
                onNewContactChangeTeacher: React.PropTypes.func.isRequired,
            },

            render: function () {
                var contactItemElementsTeacher = this.props.contacts.filter(function (contact) {
                    return contact.email;
                })
                .map(function (contact) {
                    return React.createElement(TeacherItem, contact);
                });

                return (
                 React.createElement('div', { className: 'ContactView' },
                  React.createElement(ContactFormTeacher, {
                      value: this.props.newContact,
                      onChange: this.props.onNewContactChangeTeacher,
                  }),
                  React.createElement('h1', { className: 'ContactView-title' }, "Teachers List"),
                  React.createElement('ul', { className: 'ContactView-list' }, contactItemElementsTeacher)
                  )
                 );
            },
        });

        Teacher.instances = {};

        //create contact items list
        var TeacherItem = React.createClass({
            propTypes: {
                name: React.PropTypes.string.isRequired,
                email: React.PropTypes.string.isRequired,
                subject: React.PropTypes.string,
                grade: React.PropTypes.string,
                comment: React.PropTypes.string
            },
            //render function to show the list items
            render: function () {
                return (
                 React.createElement('li', { className: 'ContactItem' },
                  React.createElement('h2', { className: 'ContactItem-name' }, this.props.name),
                  React.createElement('a', { className: 'ContactItem-email', href: 'mailto:' + this.props.email }, this.props.email),
                  React.createElement('div', { className: 'ContactItem-description' }, this.props.subject),
                  React.createElement('div', { className: 'ContactItem-description' }, this.props.gradee),
                  React.createElement('div', { className: 'ContactItem-description' }, this.props.comment),
                  React.createElement('Button', {
                      type: 'submit',
                      className: 'btn btn-danger btn-sm',
                      style: { marginRight: "10px" },
                      onClick: function (e) {
                          var self = this;
                          onDeleteTeacher(self);
                      }.bind(this)
                  }, "Delete"),
                  React.createElement('Button', {
                      type: 'submit',
                      className: 'btn btn-info btn-sm',
                      onClick: function (e) {
                          var self = this;
                          onUpdateTeacher(self);
                      }.bind(this)
                  }, "Uppdate")
                  )
                 );
            },
        });

        //-------------------------------------------------------------------------Javascript Functions-------------------------------------------------------------------------------------------------  

        function convertRow2ObjTeacher(teacherItm) {
            //convert row object to teacher instance
            var teacher = new Teacher(teacherItm);
            return teacher;
        }
        function updateNewContactTeacher(contact) {
            //update state of teachers
            setState({ newContact: contact });
        }
        function onAddTeacher(self) {
            //Function to add teachers
            var obj = self.props.value, error = false, i = 1;
            var newKey = obj.name + '001';
            try {
                //create teacher object to save
                var teacherObj = {
                    key: obj.name + '001',
                    name: obj.name,
                    grade: obj.grade,
                    subject: obj.subject,
                    email: obj.email,
                    comment: obj.comment
                };
                //Writing the resulting string as the value of the key "teacherObj" to Local Storage:
                Teacher.instances[newKey] = teacherObj;
                localStorage.teachers = JSON.stringify(Teacher.instances);
            } catch (e) {
                alert("Error when writing to Local Storage\n" + e);
                error = true;
            }
            if (error) alert("User " + obj.name + " not saved.");
            //Refresh state
            if (setStateHandler) {
                setStateHandler(teacherObj);
            }
            window.location.reload();
        }

        function afterUpdateTeacher(obj) {
            //write updated teacher data to localstorage
            var teachers = JSON.parse(localStorage.teachers);
            var name = obj.props.name + '001';
            for (var i = 0; i < teachers.length; i++) {
                if (name === teachers[i].key) {  //look for match with name
                    teachers[i].name == obj.name;
                    teachers[i].fullName == obj.fullName;
                    //add two
                    break;  //exit loop since you found the teacher
                }
            }
            localStorage.setItem("name", JSON.stringify(teachers));  //put the object back
        }

        function onUpdateTeacher(obj) {
            //update teachers with existing data
            $('#id_teacher_name').val(obj.props.name);
            $('#id_teacher_email').val(obj.props.email);
            $('#id_teacher_subject').val(obj.props.subject);
            $('#id_teacher_comment').val(obj.props.comment);
        }

        function onDeleteTeacher(obj) {
            //Function to Delete Teachers
            var key = obj.props.name + '001';
            if (Teacher.instances[key]) {
                alert("Teacher " + key + " deleted");
                delete Teacher.instances[key];
                localStorage.teachers = JSON.stringify(Teacher.instances);
                window.location.reload();
            } else {
                alert("There is no Teacher with Id " + key + " in the database!");
            }
        }

        function getContactsTeacher() {
            //get Teachers from LocalStorage
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
            else {
                return [{ key: '0001', name: "Suzanne Fiona", email: "fio.july4@gmail.com", subject: "Science & Technology", grade: "Grade 5", comment: "" }];
            }

        }


        return {
            getContactsTeacher: getContactsTeacher,
            onUpdateTeacher: onUpdateTeacher,
            onAddTeacher: onAddTeacher,
            Teacher: Teacher,
            afterUpdateTeacher: afterUpdateTeacher,
            ContactViewTeachers: ContactViewTeachers,
            ContactFormTeacher: ContactFormTeacher,
            updateNewContactTeacher: updateNewContactTeacher
        };
    };

    return TeacherComponent;
});