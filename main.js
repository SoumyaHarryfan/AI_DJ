song="";
scoreleftwrist = 0;
scorerightwrist = 0;
function preload(){
    song = loadSound("music.mp3");
}
leftWristx = 0;
leftWristy = 0;
rightWristx = 0;
rightWristy = 0;
function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
    if(scorerightwrist>0.2){
    circle(leftWristx,leftWristy,20);
    if(rightWristy>0 && rightWristy<=100){
        document.getElementById("speed").innerHTML="speed = 0.5x";
        song.rate(0.5);
    }
    else if(rightWristy>100 && rightWristy<=200){
        document.getElementById("speed").innerHTML="speed = 1x";
        song.rate(1);
    }
    else if(rightWristy>200 && rightWristy<=300){
        document.getElementById("speed").innerHTML="speed = 1.5x";
        song.rate(1.5);
    }
    else if(rightWristy>300 && rightWristy<=400){
        document.getElementById("speed").innerHTML="speed = 2.0x";
        song.rate(2);
    }
    else if(rightWristy>400 && rightWristy<=500){
        document.getElementById("speed").innerHTML="speed = 2.5x";
        song.rate(2.5);
    }
    Innumberleftwristy = Number(leftWristy);
    remove_decimal = floor(Innumberleftwristy);
    volume = remove_decimal/500;
    document.getElementById("volume").innerHTML="volume = "+volume;
    song.setVolume(volume);
    }
}
function play(){
    song.play();
    song.setVolume(0.5);
    song.rate(1.0);
}
function modelLoaded(){
    console.log("Posenet is initialized");
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreleftwrist = results[0].pose.keypoints[9].score;
        scorerightwrist = results[0].pose.keypoints[10].score;
        console.log("scorerightwrist = "+scorerightwrist);
        console.log("scoreleftwrist = "+scoreleftwrist);
        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        console.log("leftWristx = "+leftWristx);
        console.log("leftWristy = "+leftWristy);
        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        console.log("rightWristx = "+rightWristx);
        console.log("rightWristy = "+rightWristy);
    }
}