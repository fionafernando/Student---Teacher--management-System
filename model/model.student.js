define('model.student.js', ['react', 'react-dom', 'jquery'],
  function (React, ReactDOM, $) {
      //Asynchronous module defition with require
      //Using module pattern
      var Student = function (student) {
              var self = this;
              //declare student constructor
              self.name = student.name;
              self.email = student.email;
              self.fullName = student.fullName;
              self.key = student.key;
              self.comment = student.comment;  
              return self;
      };
      //use prototype to add an update method to the Student 
      Student.prototype.update = function (data) {
	        this.name(data ? data.name : null);
	        this.email(data ? data.email : null);
	        this.fullName(data ? data.fullName : null);
	        this.key(data ? data.key : null);
	        this.comment(data ? data.comment : null);
	    };
      return Student;
});