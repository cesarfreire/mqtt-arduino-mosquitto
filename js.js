window.onload = mqtt_client;

function mqtt_client() {
    console.log('teste')
    mosq = new Mosquitto();

    // conecta ao broker
    var broker = "ws://3.88.210.36:9001";
	mosq.connect(broker);

    // inscreve no topico
    var topico = 'cesarfreire/temperatura';
    mosq.subscribe(topico, 0);

    mosq.onconnect = function(rc){
        var p = document.createElement("p");
        p.innerHTML = "Conectado ao Broker!";
    }

    mosq.ondisconnect = function(rc){
        var p = document.createElement("p");
		var url = "ws://3.88.210.36:9001";
				
		p.innerHTML = "A conexão com o broker foi perdida";
		$("#debug").append(p);				
		mosq.connect(url);
    }

    mosq.onmessage = function(topic, payload, qos){
        //console.log(topic);
        if (topic == 'cesarfreire/temperatura')
            //console.log('temperatura')
            console.log(payload)
            //console.log(typeof payload)
            //var p = document.createElement("p");
            //var zero = payload[0];
            //var um = payload[1];
            //var dois = payload[2];
            //var tres = payload[3];
            //var quatro = payload[4];
            //escreve o estado do output conforme informação recebida
            //p.innerHTML = temperatura.concat(zero,um,dois,tres,quatro);
            //$("#temperatura").html(p);
    };
}