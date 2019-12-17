function Consumidor(tag) {
	this.tag = tag;
	this.habitantes = 40000;
	var status = "Desligado";
	var tempoperacao;
	var tensao;
	var energiagb1;
	var energiagb2;
	var energiabiogas;
	var energiaag1;
	var energiaag2;
	var energiaeolica;
	var energiasolar;
	var mediaenergia;
	var totalenergia;
	this.Ligar = Ligar;

	function getDados() {
		// Gerando variação de de tensão
		min = Math.ceil(379);
		max = Math.floor(382);
		tensao = Math.floor(Math.random() * (max - min)) + min; // gera valor de tensão atual
		document.getElementById('tensao' + tag).innerHTML = tensao;
		//=====================================================================================================================
		firebase.database().ref("Geradores/" + gb1.tag + "/energiaproduzida").on('value', function (snapshot) {
			energiagb1 = snapshot.val();
		});

		firebase.database().ref("Geradores/" + gb2.tag + "/energiaproduzida").on('value', function (snapshot) {
			energiagb2 = snapshot.val();
		});

		energiabiogas = parseInt(energiagb1) + parseInt(energiagb2);
		document.getElementById('energiabiogas').innerHTML = energiabiogas;
		//=====================================================================================================================
		firebase.database().ref("Geradores/" + ag1.tag + "/energiaproduzida").on('value', function (snapshot) {
			energiaag1 = snapshot.val();
		});

		firebase.database().ref("Geradores/" + ag2.tag + "/energiaproduzida").on('value', function (snapshot) {
			energiaag2 = snapshot.val();
		});

		energiaeolica = parseInt(energiaag1) + parseInt(energiaag2);
		document.getElementById('energiaeolica').innerHTML = energiaeolica;
		//=====================================================================================================================
		firebase.database().ref("Geradores/" + mfv.tag + "/energiaproduzida").on('value', function (snapshot) {
			energiasolar = snapshot.val();
		});

		document.getElementById('energiasolar').innerHTML = energiasolar;
		//=====================================================================================================================
		totalenergia = parseInt(energiabiogas) + parseInt(energiaeolica) + parseInt(energiasolar);
		document.getElementById('totalenergia').innerHTML = totalenergia;
		//=====================================================================================================================
		mediaenergia = totalenergia / tempoperacao;
		document.getElementById('mediaenergia').innerHTML = mediaenergia.toFixed(2);
	}

	function Ligar(tempo) {
		if (tempo > 0) {
			status = "Ligado"
			document.getElementById('status' + tag).innerHTML = status;
			document.getElementById("img" + tag).src = "images/skyline color.png";
			tempoperacao = tempo;
			var intervalo = setInterval(function () {
				tempo = --tempo;
				document.getElementById('tempo').value = tempo + " s";
				if (tempo <= 0) {
					clearInterval(intervalo);
					status = "Desligado"
					document.getElementById('status' + tag).innerHTML = status;
					document.getElementById("img" + tag).src = "images/skyline.png";
					document.getElementById('tempo').value = tempo + " horas";
					getDados();
					//Armagena os dados no Realime Database
					firebase.database().ref("Consumidor/" + tag).set({
						tag: tag,
						tensao: tensao,
						energiabiogas: energiabiogas,
						energiaeolica: energiaeolica,
						energiasolar: energiasolar,
						totalenergia: totalenergia,
						mediaenergia: mediaenergia.toFixed(2)
					});

				} else {
					getDados();
				}
			}, 1000);
		} else {
			alert("Valor de tempo invalido");
		}
	}
}