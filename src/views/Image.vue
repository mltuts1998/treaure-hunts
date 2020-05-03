<template>
	<div class="game" :style="[{'background': black}, {'color': white}]">
	<div style="text-align:center;position:fixed;width:100%;z-index:15;">
		<div class="flipTimer" id="demo" ref="aaba">
</div>
	</div>
  <div class="row">
    <div class="col">
      <div class="card" :style="{'background': lblack}">
        <div class="card-image">
          <div class="camera" ref="camera">
          		<video id="video" autoplay></video>
				<canvas id="canvas"></canvas>
          </div>
        </div>
        <div class="card-content" style="position:relative;">
        	<h5 style="font-weight:bolder;">HINT: </h5>
          <p>{{ value }}</p>
          <!-- <p class="ada">
          	<input type="" name="" v-model="texts">
          	<i class="material-icons">send</i>
          </p> -->
        </div>
        <div class="card-action">
          <h6 @click="tukur=false">SCAN IMAGE</h6>
          <a class="btn-floating btn-large waves-effect waves-light red alas" id="snap"><i title="scan" class="material-icons" @click="aam()"
          	>camera</i></a>
          	  <img src="https://miro.medium.com/max/1424/1*sHmqYIYMV_C3TUhucHrT4w.png" 
          	  @click="alla()" >	

        </div>
      </div>
    </div>
  </div>

  <div>
  	<a class="btn-floating btn-large waves-effect waves-light red alas" id="snap" 
  		style="position:fixed;top: 10px;right:10px;z-index:15;"><i title="Night Mode" class="z-depth-6 material-icons"
  		@click="modes()"
          	>{{ modawa }}</i></a>

    <a class="btn-floating btn-large aba waves-effect waves-light red alas" id="snap" 
  		style="position:fixed;top: 10px;right:10px;z-index:16;"><i title="Log Out" class="z-depth-6 material-icons"
  		@click="logout()" 
          	>lock</i></a>
          	<div> <p style="position:fixed;top: 50px;left:50px;z-index:15;">
      <label>
        <input type="checkbox" class="filled-in" checked="checked" v-model="tin" />
        <span></span>
      </label>
    </p></div>



    <a class="btn-floating btn-large waves-effect waves-light red alas" id="snap" 
  		style="position:fixed;top: 100px;left:10px;z-index:15;"><i title="Log Out" class="z-depth-6 material-icons"
  		@click="seens()" 
          	>account_circle</i></a>
          	<div> <p style="position:fixed;top: 140px;left:50px;z-index:14;">
      <label>
        <input type="checkbox" class="filled-in" checked="checked" v-model="b" />
        <span></span>
      </label>
    </p></div>


          	<a class="btn-floating btn-small waves-effect waves-light red alas" id="snap" 
  		style="position:fixed;bottom: 10px;right:10px;z-index:15;"><i title="Home Page" class="z-depth-6 material-icons"
  		@click="$router.push('/')"
          	>home</i></a>
  </div>
  <img src="../assets/hayie.png" :class="[{'alam': tukur},{'imagica': !tukur}]">

	</div>
</template>
<script type="text/javascript">
import axios from 'axios';
import Tesseract from 'tesseract.js';
 
 		export default{
 			data(){
 				return{
 					texts:"",
 					mode:"day",
 					black: "white",
 					lblack: "white",
 					white: "black",
 					modawa: "airline_seat_individual_suite",
 					hints:[
 					],
 					solution:[
 					],
 					tin:false,
 					b: true,
 					tukur: true,

  	time: new Date("2020-1-1")

 				}
 			}
			,
			computed:{
				value: function(){
					let a = localStorage.getItem("id")
					return this.solution[a]
				},
			},
			methods: {

				hour: function(){
					return Math.floor(+new Date().getTime() - +localStorage.getItem("time1"));	
				},
				alla(){
						let text = prompt("Type The Hint If You Find A problem");
						if(localStorage.getItem("id") == 5){
								this.$router.push("/dash");
						}
						console.log(this.hints)
						if(text.toLowerCase() == this.hints[localStorage.getItem("id")].toLowerCase()){
							localStorage.setItem("id", (Number(localStorage.getItem("id"))+1))
							let ap = +localStorage.getItem("time1")/6000;
							axios.patch("https://myaccount-f95bf.firebaseio.com/credentials/"+localStorage.getItem("key")+".json", {
								"key": localStorage.getItem("id"),
								"time": ap
							}).then((req)=>{
		      						console.log(req)
		      					})	

							location.reload();		
						}
				},
				logout: function(){
					if(this.tin){
						localStorage.clear()
						this.$router.push("/")
					}
				},
				seens: function(){
						axios.patch("https://myaccount-f95bf.firebaseio.com/credentials/"+localStorage.getItem("key")+".json", {
								"seen": this.b
							}).then((req)=>{
		      						console.log(req)
		      					})
						},
				aam: function(){
					// Elements for taking the snapshot
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var video = document.getElementById('video');
console.log(this.$refs.camera.style)
// Trigger photo take
document.getElementById("snap").addEventListener("click", function() {
	context.drawImage(video, 0, 0, 150, 100);
			Tesseract.recognize(
				canvas.toDataURL("image/jpeg",1.0),
		  'eng',
		  // { logger: m => console.log() }
		).then(({ data: { text } }) => {
		  			if(+localStorage.getItem("id") == 5){
  							localStorage.clear()
	 						this.$router.push("/dash");
	 						clearInterval(this)
	 							
						}
						else if(text.toLowerCase() == this.hints[localStorage.getItem("id")].toLowerCase()){
							localStorage.setItem("id", (Number(localStorage.getItem("id"))+1))
							 location.reload();
						}

		}).catch(err=>console.log(err))

		});
				},
				modes: function(){
						if(this.mode == "day"){
							this.mode="dark",
		 					this.black= "#100E17",
		 					this.lblack= "#17141D",
		 					this.white= "white",
		 					this.modawa = "wb_sunny"
						}else{
							this.mode="day",
		 					this.black= "white",
		 					this.lblack= "white",
		 					this.white= "black",
		 					this.modawa= "airline_seat_individual_suite"
						}
				}
			},
			created(){

				if(+localStorage.getItem("id") == 5){
						this.$router.push("/dash")
				}
				axios.get("https://myaccount-f95bf.firebaseio.com/hints.json/").then((req)=>{
    				let data = req.data
    				for(let key in data){
    					this.solution.push(data[key].hints)  					
    				   	this.hints.push(data[key].solution)
    				}
    			})
				if(!localStorage.getItem("time1")){
					localStorage.setItem("time1", 0)
				}
				var d = new Date(+(new Date("2000-1-1").getTime()) + +localStorage.getItem("time1")) 
			setInterval(myTimer, 1000);
			function myTimer() {
			  d = new Date(+d.getTime() + 1000);
			  localStorage.setItem("time1", +localStorage.getItem("time1")+1000)
			  console.log(d)
			  this.time  = d;
			  var t = d.toLocaleTimeString();
			  document.getElementById("demo").innerHTML = t;
			  if(t.split(":")[0] == "1" && t.split(":")[1] == "30"){
			  		clearInterval(this);
			  		this.$router.push("/")
			  }
			  	

			}

			},
			mounted(){
				var video = document.getElementById('video');

// Get access to the camera!
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    let constraints = { video: true , facingMode:"environment"};
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        //video.src = window.URL.createObjectURL(stream);
        video.srcObject = stream;
        video.play();
    });
}
			}
		}
	
</script>

<style scoped>

	#demo{
		background: rgba(0, 0, 0, .4);
	}
	.game{
		height: 100vh;
	}

	.alam{
		position: absolute;
		background: transparent;
		top: 100px;
		width: 500px;
		z-index: 30;
		transform: scale(0);

	}

	.imagica{
		position: absolute;
		top: 100px;
		width: 300px;
		animation: 3s slides linear ;
		z-index: 37;
		transform: scale(0);
	}

	@keyframes slides{
		from{
			transform: translateX(600%) scale(.8);
			
		}
		to{
			transform: translateX(-200%) scale(2) translateY(300px);
		}
	}


	.aba{
		position: absolute;
		top: 10px;
		left: 10px;
	}
	.row > *{
		width: 100%;
		height: 100vh;
		text-transform: capitalize;
		font-family: ubuntu;
	}
	.card{
		width: 40%;
		text-align: center;
		margin: 100px auto;
	}

	.card-image{
		margin: auto;
		width: 100%!important;
		text-align: center;
		position: relative;
		top: 10px;
	}
	p{
		text-align: justify;
		font-weight: bold;
	}

	.card-action > img{
		position:absolute;
		width:10%;
		left: 5px;
		margin:auto;
		bottom: 5px;
	}
	
	.card-image{
		height: 300px;
	}
	.camera{
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: white;
	}

	video, canvas{
		position: absolute;
		top:0;
		left:0;
		width: 100%!important;
		height: 100%!important;
		    object-fit: cover;
	}

	canvas{
		width: 50%!important;
		height: 50%!important;	
	}

	video{
		z-index:12;
	}
	canvas{
		z-index: 13;
	}
	.alas{
		position: absolute;
		right: 5px;
		bottom:5px;
	}

	@media (max-width:1200px){
		.card{
			width: 60%;
		}
	}
	@media (max-width:700px){
		.card{
			width: 80%;
		}

		#demo{
			font-size: 60px;
		}
	}

	@media (max-width:400px){
		.card{
			width: 90%;
		}
	}
</style>