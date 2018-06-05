//

$(document).ready(function() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(user);
    } else {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    }
  });
});
