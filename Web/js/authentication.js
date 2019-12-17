// Variáveis
var displayName;
var email;
var emailVerified;
var photoURL;
var isAnonymous;
var uid;
var providerData;
var qrcode;

function modal() {
  // Pega o modal
  var modal = document.getElementById("modal");

  // Pega o elemento <span> que fecha o modal
  var span = document.getElementsByClassName("close")[0];

  // Quando o usuário clicar no botão, abra o modal
  modal.style.display = "block";

  // Quando o usuário clicar em <span> (x), feche o modal
  span.onclick = function () {
    modal.style.display = "none";
    firebase.auth().signOut(); // desloga para habilitar botão entrar
    document.getElementById('quickstart-sign-in').disabled = false;
  }

  // Quando o usuário clicar em qualquer lugar fora do modal, feche-o
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      firebase.auth().signOut(); // desloga para habilitar botão entrar
      document.getElementById('quickstart-sign-in').disabled = false;
    }
  }

  // Apaga elemento qrcode
  pre = document.getElementById("pre");
  if (pre.childNodes.length != 0) {//se não existir elemento qrcode (o qrcode) ele não faz nada.
    elem = pre.childNodes[pre.childNodes.length - 1];
    elem.remove(true);//remove o elemento
  }
  //Cria novamente
  elem = document.createElement("qrcode");
  elem.id = ("qrcode"); //definimos atributo(s) do elemento
  pre.appendChild(elem); //adicionamos o elemento com o texto na div corpo


  //Exibe o QRCODE
  qrcode = new QRCode(document.getElementById('qrcode'), {
    text: uid,
    width: 250,
    height: 250,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  })

  firebase.database().ref("Users/" + uid + "/QRCode").on('value', function (snapshot) { // ouvinte no campo QRCode do usuário
    if (snapshot.val() === 1) { // se o aplicativo deixar como 1 ele muda para 0, preenche o email e vai para o dashboard
      firebase.database().ref("Users/" + uid + "/QRCode").set(0)
      window.open('dashboard.html', '_self');
    }
  })
}

// Lida com o clique do botão de login.
function toggleSignIn() {
  if (firebase.auth().currentUser) { // se ja estiver logado
    firebase.auth().signOut(); // desloga para habilitar botão entrar
  } else {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (email.length < 10) {
      alert('O E-mail deve ter no mínimo 10 caracteres!');
      return;
    }
    if (password.length < 8) {
      alert('A senha deve ter no mínimo 8 caracteres!');
      return;
    }

    // Login com E-mail e senha
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') { // Se a senha estiver inválida
        alert('Senha inválida, por favor tente novamente!');
      } else if (errorMessage == 'There is no user record corresponding to this identifier. The user may have been deleted.') {
        alert('Esse usuário não está cadastrado, por favor, realize o cadastro!')
      } else { // mostra outro erro
        alert(errorMessage);
      }
      document.getElementById('quickstart-sign-in').disabled = false;
    });

    // Escutando alterações de estado de autenticação.
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) { // Se estiver logado.
        displayName = user.displayName;
        email = user.email;
        emailVerified = user.emailVerified;
        photoURL = user.photoURL;
        isAnonymous = user.isAnonymous;
        uid = user.uid;
        providerData = user.providerData;

        //Escreve no Realtime Database
        writeUserData(uid, displayName, email, photoURL)
        modal()
      }
    });

  }
  document.getElementById('quickstart-sign-in').disabled = true;
}

function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('Users/' + userId).set({
    username: name,
    email: email,
    senha: password,
    imageUrl: 0,
    QRCode: 0
  });
}

function sendPasswordReset() {
  var email = document.getElementById('email').value;
  if (email.length < 10) {
    alert('O E-mail deve ter no mínimo 10 caracteres!');
    return;
  }
  firebase.auth().sendPasswordResetEmail(email).then(function () {
    alert('E-mail para troca de senha enviado!');
  }).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/invalid-email') {
      alert(errorMessage);
    } else if (errorCode == 'auth/user-not-found') {
      alert(errorMessage);
    }
  });
}

function initApp() {
  // Escutando alterações de estado de autenticação.
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) { // Se estiver logado.

    }
  });

  document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
  document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
}

window.onload = function () {
  initApp(); // Inicia o Firebase
};