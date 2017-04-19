define('model.teacher.js', ['react', 'react-dom', 'jquery'],
  function (React, ReactDOM, $) {
      //Asynchronous module defition with require
      //Using module pattern
      var Teacher = function (teacher) {
              var self = this;
              //declare teacher constructor
              self.name = teacher.name;
              self.email = teacher.email;
              self.fullName = teacher.fullName;
              self.key = teacher.key;
              self.comment = teacher.comment;  
              return self;
      };
      //use prototype to add an update method to the teacher 
      Teacher.prototype.update = function (data) {
	        this.name(data ? data.name : null);
	        this.email(data ? data.email : null);
	        this.fullName(data ? data.fullName : null);
	        this.key(data ? data.key : null);
	        this.comment(data ? data.comment : null);
	    };
      return Teacher;
});