function preload(){

}
function setup(){
 canvas = createCanvas(470,370);
 canvas.center();
 video = createCapture(VIDEO);
 video.hide();
 classifier = ml5.imageClassifier('MobileNet', modelLoaded);
}
function modelLoaded(){
    console.log('modelo cargado');
}
function draw(){
    image(video, 0, 0, 467, 298);
    classifier.classify(video, gotResult);
}
var resultadoprevio = '';
function gotResult(error, results){
 if(error){
     console.error(error);
 }
 else{
     if((results[0].confidence >0.5)&&(resultadoprevio != results[0].label)){
         console.log(results);
         resultadoprevio = results[0].label;
         var synth= window.speechSynthesis;
         speak_data= 'el objeto detectado es'+ results[0].label;
         var utterThis = new SpeechSynthesisUtterance(speak_data);
         synth.speak(utterThis);
         document.getElementById("objetonombre").innerHTML=results[0].label;
         document.getElementById("objetopresicion").innerHTML=results[0].confidence.toFixed(3);
     }
 }
}