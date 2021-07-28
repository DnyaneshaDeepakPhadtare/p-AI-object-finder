
status="";
objects={};


function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
video=createCapture(VIDEO);
video.hide();
video.size(480,300);
}

function draw(){
    image(video,0,0,480,380);

    if(status!=""){            
        objectDetector.detect(video,gotResult);

        for(i=0;i<=objects.length;i++){
            document.getElementById("status").innerHTML="Status:Objects Detected";

           
            fill("#ff0000");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+"  "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);


            if(objects[i].label==object_name){
                video.stop();
                document.getElementById("object_status").innerHTML=object_name+"Found";
               synth=window.speechSynthesis;
               utterThis=new SpeechSynthesisUtterance(object_name+"found");
               synth.speak(utterThis);
            } 
            else{
            document.getElementById("object_status").innerHTML=object_name+"not found";  
            }

        }
    }
}

function gotResult(error,result){
    if(error){
        console.error(error);
    }

    else{
        console.log(result);
        objects=result;
    }
}


function start(){
    object_detector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHtml="Status:Detecting Objects";
    object_name=document.getElementById("object_name").value;
}

function modelLoaded(){
    console.log("model loaded");
    status=true;
    
}

