			var canvas;
            var c;
            
            var mouse = {
                x:undefined,
                y:undefined
            };

            var rainDrops = [];
            
            //basics of startup
            $(document).ready(function () {
                //get me some canvas and context
                canvas = document.getElementById('myCanvas');
                c = canvas.getContext('2d');

                createDrops();

                setInterval(animate, 10);
        
            });

            function animate(e){
                c.fillRect(0,0, canvas.width, canvas.height);
                c.fillStyle = '#02111C';
                c.fill();

                createDrops();

                for (var i = 0; i < rainDrops.length; i++){
            		rainDrops[i].draw();
            		rainDrops[i].update();
            		if (rainDrops[i].y > canvas.height) rainDrops.splice(i, 1);
            	}
            	
            }

            function RainDrop(){
            	this.x = getRandomInt(0, canvas.width);
            	this.y = getRandomFloat(-100, 0);


            	this.draw = function(){
            		c.beginPath();
                    c.moveTo(this.x, this.y);
                    c.lineTo(this.x, this.y-5);
                    c.strokeStyle = '#71D1FF';
                    c.lineWidth = .08;
                    c.stroke();
            	}

           		this.update = function(){
           			this.y+=1;
           		}

            }

            function createDrops(){
            	for (var i = 0; i < 10; i++){
            		var drop = new RainDrop();
            		rainDrops.push(drop);
            	}
            }





            //randomness
            function getRandomInt(min, max){
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            
            function getRandomFloat(min, max){
                return Math.random() * (max - min) + min;
            }

            function getMouse(e){
                mouse.x = e.pageX || e.targetTouches[0].pageX;
                mouse.y = e.pageY || e.targetTouches[0].pageY;
            }