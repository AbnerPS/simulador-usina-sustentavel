package aps.controledeusinadeenergia.com;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import co.infinum.goldfinger.Goldfinger;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;
import com.google.firebase.auth.FirebaseAuth;

public class FingerPrintActivity extends AppCompatActivity {

    // autenticar com impressão digital
    private Goldfinger goldfinger;
    private Button btn_autenticar,btn_cancelar;
    private FirebaseAuth mAuth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_finger_print);
        fetchViews();
        initListeners();
        goldfinger = new Goldfinger.Builder(this).setLogEnabled(BuildConfig.DEBUG).build(); // cria o Goldfinder para autenticar
        // instância para autenticar com firebase
        mAuth = FirebaseAuth.getInstance();
    }

    // Após oncreate
    @Override
    protected void onStart() {
        super.onStart();

        // Verifica se o dispositivo tem o hardware necessário
        if (goldfinger.hasFingerprintHardware()
                && goldfinger.hasEnrolledFingerprint()) {
            btn_autenticar.setEnabled(true);
        } else { // se não tiver o hardware necessário ele avisa
            btn_autenticar.setEnabled(false); // desabilita o botão de autenticar
            Toast.makeText(this, "Impressão digital não está disponível. O dispositivo deve ter sensor de impressão digital, tela de bloqueio ativado e pelo menos 1 impressão digital registrada.",
                    Toast.LENGTH_LONG).show();
            startActivity(new Intent(this, DashboardActivity.class));
        }
    }

    // Ao parar o aplicativo
    @Override
    protected void onStop() {
        super.onStop();
        goldfinger.cancel(); // para a solicitação de digital
    }

    // inicia o ouvinte de autenticação
    private void authenticateUserFingerprint() {


        goldfinger.authenticate(new Goldfinger.Callback() {
            @Override
            public void onError(@NonNull Exception e) {
                onGoldfingerError();
            }// caso ocorra erro na autenticação

            @Override
            public void onResult(@NonNull Goldfinger.Result result) {
                onGoldfingerResult(result);
            }//Quando obter retorno
        });
    }

    private void fetchViews() {
        btn_autenticar = findViewById(R.id.btn_autenticar);
        btn_cancelar = findViewById(R.id.btn_cancelar);
    }

    private void initListeners() {
        btn_autenticar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                authenticateUserFingerprint(); // inicia o ouvinte de autenticação
            }
        });

        btn_cancelar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                goldfinger.cancel();
                signOut();
                finish();
            }
        });
    }

    // Quando ocorrer um erro
    private void onGoldfingerError() {
        btn_cancelar.setEnabled(false);// desabilita o cancelar
        Toast.makeText(this, "Erro com biometria.",
                Toast.LENGTH_SHORT).show();
    }

    //Quando obter retorno
    private void onGoldfingerResult(Goldfinger.Result result) {
        Toast.makeText(this, ""+result.reason(),
                Toast.LENGTH_SHORT).show();
        Goldfinger.Type type = result.type(); // pega o type do goldfinger para validar se deu certo

        if (type == Goldfinger.Type.SUCCESS) { // se a autenticação foi feita
            btn_cancelar.setEnabled(false); // desabilita o cancelar
            Toast.makeText(this, "Sucesso!",
                    Toast.LENGTH_SHORT).show();
            startActivity(new Intent(this, DashboardActivity.class));
        } else if (type == Goldfinger.Type.INFO) { // enquanto está em espera pela autenticação
            Toast.makeText(this, "Status:"+result.reason(),
                    Toast.LENGTH_SHORT).show();
        } else if (type == Goldfinger.Type.ERROR) { // se a autenticação for recusada
            btn_cancelar.setEnabled(false); //desabilita o cancelar
            Toast.makeText(this, "Erro!",
                    Toast.LENGTH_SHORT).show();
        }
    }

    // Desloga o usuário
    private void signOut() {
        mAuth.signOut();
    }
}