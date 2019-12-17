package aps.controledeusinadeenergia.com;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import aps.controledeusinadeenergia.com.Models.Users;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;

public class DashboardActivity extends AppCompatActivity {

    Button btn;
    TextView textView;
    final Activity activity = this;
    private DatabaseReference mDatabase;// Realtime Database
    private FirebaseUser currentUser; // Verifica se já existe um usuário logado, null = não

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dashboard);
        mDatabase = FirebaseDatabase.getInstance().getReference(); // instância para banco
        currentUser = FirebaseAuth.getInstance().getCurrentUser();
        componentesDaTela(); // Inicia objetos da tela
        eventoButton(); // Habilita start do botão Scan

    }

    private void eventoButton() {
        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                IntentIntegrator intentIntegrator = new IntentIntegrator(activity);
                intentIntegrator.setDesiredBarcodeFormats(IntentIntegrator.QR_CODE_TYPES);
                intentIntegrator.setPrompt("SCAN");
                intentIntegrator.setCameraId(0);
                intentIntegrator.initiateScan();
            }
        });
    }

    private void componentesDaTela() {
        btn = (Button) findViewById(R.id.button);
        textView = (TextView) findViewById(R.id.txtdashboard);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        IntentResult intentResult = IntentIntegrator.parseActivityResult(requestCode, resultCode, data);

        if(intentResult != null){
            if (intentResult.getContents() !=  null){// se retornar algo
                if (intentResult.getContents().equals(currentUser.getUid())) {
                    mDatabase.child("Users").child(currentUser.getUid()).child("QRCode").setValue(1);//alert(intentResult.getContents()); intentResult.getContents() -> texgo capturado do QRCode
                }
                alert("Autenticado!");
            }else{
                alert("Scan cancelado");
            }
        }else{
            super.onActivityResult(requestCode, resultCode, data);
        }
    }

    private void alert(String msg){
        Toast.makeText(getApplicationContext(), msg, Toast.LENGTH_LONG).show();
    }
}