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
			$('#disconnect-button').click(function() {
				return _this.disconnect();
			});
			$('#subscribe-button').click(function() {
				return _this.subscribe();
			});
			$('#unsubscribe-button').click(function() {
				return _this.unsubscribe();
			});

			mosq.onconnect = function(rc){
				var p = document.createElement("p");
				//var topic = $('#pub-subscribe-text')[0].value;
				var topic = "cesarfreire/humidade";
				p.innerHTML = "Conectado ao Broker!";
				$("#debug2").append(p);
				mosq.subscribe(topic, 0);
				
			};
			mosq.ondisconnect = function(rc){
				var p = document.createElement("p");
				var url = "ws://mqtt.aventurismo.com.br:9001";
				
				p.innerHTML = "A conexão com o broker foi perdida";
				$("#debug2").append(p);				
				mosq.connect(url);
			};
			mosq.onmessage = function(topic, payload, qos){
				var p = document.createElement("p");
				var zero = payload[0];
				var um = payload[1];
				var dois = payload[2];
				var tres = payload[3];
				var quatro = payload[4];
				var final = "";

				
				//escreve o estado do output conforme informação recebida
				
				p.innerHTML = final.concat(zero,um,dois,tres,quatro);
				
				$("#humidade").html(p);
			};
		}
		Page.prototype.connect = function(){
			var url = "ws://mqtt.aventurismo.com.br:9001";
			mosq.connect(url);
		};
		Page.prototype.disconnect = function(){
			mosq.disconnect();
		};
		Page.prototype.subscribe = function(){
			//var topic = $('#sub-topic-text')[0].value;
			var topic = 'cesarfreire/humidade';
			mosq.subscribe(topic, 0);
		};
		Page.prototype.unsubscribe = function(){
			var topic = $('#sub-topic-text')[0].value;
			mosq.unsubscribe(topic);
		};
		
		return Page;
	})();
	$(function(){
		return Main.controller = new Main.Page;
	});
}).call(this);

