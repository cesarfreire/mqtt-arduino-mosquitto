var humidade = '';
var temperatura = '';

(function() {
	window.Main = {};
	Main.Page = (function() {
		var mosq = null;
		function Page() {
			var _this = this;
			mosq = new Mosquitto();
			window.onload = function() {
				return _this.connect();
			};

			mosq.onconnect = function(rc){
				var p = document.createElement("p");
				var topic1 = "cesarfreire/temperatura";
				//var topic2 = "cesarfreire/humidade";
				p.innerHTML = "Conectado ao Broker!";
				$("#debug").append(p);
				mosq.subscribe(topic1, 0);
				//mosq.subscribe(topic2, 0);
			};
			mosq.ondisconnect = function(rc){
				var p = document.createElement("p");
				var url = "ws://3.88.210.36:9001";
				
				p.innerHTML = "A conexão com o broker foi perdida";
				$("#debug").append(p);				
				mosq.connect(url);
			};
			mosq.onmessage = function(topic, payload, qos){
				var p = document.createElement("p");
				var barra_progresso = document.getElementById("barra_progresso")
				//escreve o estado do output conforme informação recebida
				var barra_value = payload[0] + payload[1];
				p.innerHTML = payload;
				barra_progresso.setAttribute("aria-valuenow", barra_value);
				barra_progresso.value = barra_value + "%";
				$("#temperatura").html(p);	
			};
		}
		Page.prototype.connect = function(){
			var url = "ws://3.88.210.36:9001";
			mosq.connect(url);
		};
		Page.prototype.subscribe = function(){
			var topic1 = 'cesarfreire/temperatura';
			//var topic2 = 'cesarfreire/humidade';
			mosq.subscribe(topic1, 0);
			//mosq.subscribe(topic2, 0);
		};

		return Page;
	})();
	$(function(){
		return Main.controller = new Main.Page;
	});
}).call(this);
