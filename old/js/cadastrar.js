// Cria cadastro
function CadastroFirebase() {

    let cademail = document.getElementById('cademail').value;
    let cadpassword = document.getElementById('cadpassword').value;
    let cadcargo = document.getElementById('cadcargo').value;

    if (cademail.length < 10) {
        alert('O E-mail deve ter no mínimo 10 caracteres!');
        return;
    }
    if (cadpassword.length < 8) {
        alert('A senha deve ter no mínimo 8 caracteres!');
        return;
    }
    // Cadastro
    firebase.auth().createUserWithEmailAndPassword(cademail, cadpassword).catch(function (error) {
        let errorCode = error.code;
        let errorMessage = error.message;

        if (errorCode === 'auth/wrong-password') { // Se a senha estiver inválida
            alert('Senha inválida, por favor tente novamente!');
        } else if (errorMessage == 'There is no user record corresponding to this identifier. The user may have been deleted.') {
            alert('Esse usuário não está cadastrado, por favor, realize o cadastro!')
        } else { // mostra outro erro
            alert(errorMessage);
        }
        console.log(error);
    });

    // Convertendo para Base64
    let emBase64 = btoa(cademail);

    // Voltando para string
    //let deBase64 = atob(emBase64);
    //console.log("Descriptografado: " + deBase64);

    //gravando no banco
    writeUserData(emBase64, cadcargo)
}

function writeUserData(emailbase64, cadcargo) {
    firebase.database().ref('Cargos/' + emailbase64).set({
        cargo: cadcargo
    });
    alert("Cadastrado com sucesso! Efetue o Login novamente por favor")
    firebase.auth().signOut();
    window.open('index.html', '_self');
}