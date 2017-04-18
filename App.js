//import react and react-dom
define('App.js', ['react', 'react-dom', 'jquery', './components/teacher', './components/student'],
  function (React, ReactDOM, $, Teachers, Students) {

      //Asynchronous module defition with require
      //Using module pattern

      var MainRenderComponent = function () {
          /*
          * Load Components
          */
          //user require js to load components within the app
          var state = {};
          var _teacher = Teachers({ setStateHandler: setState });
          var _student = Students({ setStateHandler: setState });

          // Make the given changes to the state and perform any required changes
          function setState(changes) {
              Object.assign(state, changes);
              if (location.hash != "") {
                  if (location.hash == '#students') {
                      ReactDOM.render(
                        React.createElement(_student.ContactView, Object.assign({}, state, {
                            onNewContactChange: _student.updateNewContact,
                        })),
                        document.getElementById('main'));
                  }
                  else if (location.hash == '#Dashboard') {
                      ReactDOM.render(
                        React.createElement('div', { className: 'ContactView' },
                        React.createElement('h1', { className: 'ContactView-title' }, "DashBoard")
                       ), document.getElementById('main'));
                  } else {
                      ReactDOM.render(
                        React.createElement(_teacher.ContactViewTeachers, Object.assign({}, state, {
                            onNewContactChangeTeacher: _teacher.updateNewContactTeacher,
                        })),
                        document.getElementById('main'));
                  }
              }
              else {
                  ReactDOM.render(
                          React.createElement(_student.ContactView, Object.assign({}, state, {
                              onNewContactChange: _student.updateNewContact,
                          })),
                  document.getElementById('main'));
              }
          }

          // Set initial data
          setState({
              contacts: location.hash == '#students' ? _student.getStudents() : _teacher.getContactsTeacher(),
              newContact: location.hash == '#students' ? { key: "", name: "", email: "", fullName: "", comment: "" } : { key: "", name: "", email: "", subject: "", grade: "", comment: "" }
          });

          function updateNewContact(contact) {
              setState({ newContact: contact });
          }

          //Set status changes
          function updateNewContactTeacher(contact) {
              setState({ newContact: contact });
          }

          //set state when navigating from one page to another
          function navigated() {
              setState({
                  contacts: location.hash == '#students' ? _student.getStudents() : _teacher.getContactsTeacher(),
                  location: window.location.hash
              });
          }

          // Handle browser navigation events
          window.addEventListener('hashchange', navigated, false);

          // Start the app
          navigated();

      };
      return MainRenderComponent;
  });