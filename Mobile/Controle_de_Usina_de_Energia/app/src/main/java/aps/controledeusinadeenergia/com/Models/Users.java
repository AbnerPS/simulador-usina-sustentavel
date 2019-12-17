package aps.controledeusinadeenergia.com.Models;

import com.google.firebase.database.DatabaseReference;

public class Users {

    public String Nome;
    public String Email;
    public String Flag;

    public Users(){} // Construtor obrigatório para fazer consultas

    public Users(String nome,String email){
        this.Nome = nome;
        this.Email = email;
    }

    // Altera o valor do campo QRCode para habilitar o login no site
    public Boolean AlterarFlag(DatabaseReference mDatabase, String userId){ // mDatabase é a referência do banco, userId é o código do usuário
        mDatabase.child("Users").child(userId).child("QRCode").setValue(1);
        return true;
    }
}
