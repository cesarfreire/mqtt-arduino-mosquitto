var humidade = '';
var temperatura = '';

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
				//var topic1 = "cesarfreire/temperatura";
				var topic2 = "cesarfreire/humidade";
				p.innerHTML = "Conectado ao Broker!";
				$("#debug").append(p);
				//mosq.subscribe(topic1, 0);
				mosq.subscribe(topic2, 0);
			};
			mosq.ondisconnect = function(rc){
				var p = document.createElement("p");
				var url = "ws://3.88.210.36:9001";
				
				p.innerHTML = "A conexão com o broker foi perdida";
				$("#debug").append(p);				
				mosq.connect(url);
			};
			mosq.onmessage = function(topic, payload, qos){
				console.log(topic);
				if (topic == 'cesarfreire/temperatura')
					console.log('temperatura')

					var p = document.createElement("p");
					var zero = payload[0];
					var um = payload[1];
					var dois = payload[2];
					var tres = payload[3];
					var quatro = payload[4];
					//escreve o estado do output conforme informação recebida
					p.innerHTML = temperatura.concat(zero,um,dois,tres,quatro);
					$("#temperatura").html(p);

				if (topic == 'cesarfreire/humidade')
					console.log('humidade')

					var p = document.createElement("p");
					var zero = payload[0];
					var um = payload[1];
					var dois = payload[2];
					var tres = payload[3];
					var quatro = payload[4];
					//escreve o estado do output conforme informação recebida
					p.innerHTML = humidade.concat(zero,um,dois,tres,quatro);
					$("#humidade").html(p);
			};
		}
		Page.prototype.connect = function(){
			var url = "ws://3.88.210.36:9001";
			mosq.connect(url);
		};
		Page.prototype.subscribe = function(){
			var topic = 'cesarfreire/humidade';
			mosq.subscribe(topic, 0);
		};

		return Page;
	})();
	$(function(){
		return Main.controller = new Main.Page;
	});
}).call(this);