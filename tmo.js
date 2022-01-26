(function() {
	window.Main = {};
	Main.Page = (function() {
		var mosq = null;
		function Page() {
			var _this = this;
			mosq = new Mosquitto();
			$('#connect-button').click(function() {
				return _this.connect();
			});
			$('#subscribe-button').click(function() {
				return _this.subscribe();
			});

			mosq.onconnect = function(rc){
				var p = document.createElement("p");
				var topic = "cesarfreire/temperatura";
				p.innerHTML = "Conectado ao Broker!";
				$("#debug").append(p);
				mosq.subscribe(topic, 0);
				mosq.subscribe('cesarfreire/humidade', 0);
			};
			mosq.ondisconnect = function(rc){
				var p = document.createElement("p");
				var url = "ws://mqtt.aventurismo.com.br:9001";
				
				p.innerHTML = "A conexão com o broker foi perdida";
				$("#debug").append(p);				
				mosq.connect(url);
			};
			mosq.onmessage = function(topic, payload, qos){

				if (topic === 'cesarfreire/temperatura')
					var p = document.createElement("p");
					var zero = payload[0];
					var um = payload[1];
					var dois = payload[2];
					var tres = payload[3];
					var quatro = payload[4];
					var final = "";

					//escreve o estado do output conforme informação recebida
					p.innerHTML = final.concat(zero,um,dois,tres,quatro);
					$("#temperatura").html(p);
				
				if (topic === 'cesarfreire/humidade')
					var p = document.createElement("p");
					var dez = payload[0];
					p.innerHTML = dez;
					$("#humidade").html(p);
			};
		}
		Page.prototype.connect = function(){
			var url = "ws://mqtt.aventurismo.com.br:9001";
			mosq.connect(url);
		};
		Page.prototype.subscribe = function(){
			var topic = 'cesarfreire/temperatura';
			mosq.subscribe(topic, 0);
		};

		return Page;
	})();
	$(function(){
		return Main.controller = new Main.Page;
	});
}).call(this);