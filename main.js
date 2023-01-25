prediction1="";

Webcam.set({
    width:350,
    height:350,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function takesnapshot(){
     Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_img" src="'+data_uri+'"/>';
     });
}

console.log("ml5 Version-", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/6vmm2PdcZ/model.json", modelLoaded );

function modelLoaded(){
    console.log("Model loaded");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1="The first prediction is "+ prediction1;
    var utterThis= new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}
function check(){
    img = document.getElementById('captured_img');
    classifier.classify(img, gotResult);
   }
   
   function gotResult(error,results){
       if(error){
           console.error(error);
       } else{
           console.log(results);
           document.getElementById('result_gesture_name1').innerHTML=results[0].label;
           prediction1=results[0].label;
           speak();
           if(results[0].label == "THUMBS UP"){
               document.getElementById('gesture1').innerHTML="&#128077;";
           } 
           else if(results[0].label == "THUMBS DOWN"){
               document.getElementById('gesture1').innerHTML="&#128078;";
           }
            else if(results[0].label == "VICTORY"){
               document.getElementById('gesture1').innerHTML="&#9996;";
           }
           else if(results[0].label == "ROCKING"){
               document.getElementById('gesture1').innerHTML="&#129304;";
           }
           else if(results[0].label == "CLAPPING"){
               document.getElementById('gesture1').innerHTML="&#128079;";
           }
           else if(results[0].label == "AMAZING") {
               document.getElementById('gesture1').innerHTML="&#128076;";
           }
       }
   }