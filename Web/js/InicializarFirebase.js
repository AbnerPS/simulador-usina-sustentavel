// Configuração do Firebase
var firebaseConfig = {
    apiKey: "AIzaSyDB6e63oQjLo01MvOucSlkOQ0q9AblstzA",
    authDomain: "controle-de-usina-de-energia.firebaseapp.com",
    databaseURL: "https://controle-de-usina-de-energia.firebaseio.com",
    projectId: "controle-de-usina-de-energia",
    storageBucket: "controle-de-usina-de-energia.appspot.com",
    messagingSenderId: "608031329940",
    appId: "1:608031329940:web:b7f698d283c78384daae81",
    measurementId: "G-T8KS27RG47"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var storage = firebase.storage();