// global variables
const flaresVal = [];
const flaresNum = [];
let offset = 0;
let x = 0;
let device;
let pixelD = 1;
let strength = 100;
a = 50;

// functions for launchpad
if(navigator.requestMIDIAccess){
    navigator.requestMIDIAccess().then(success,failure);
}

function failure(){
    console.log("could not connect to midi");
}

function updateDevice(event){
    //console.log(event);
}

function success(midiAccess){
    //console.log(midiAccess);
    midiAccess.addEventListener('statechange',updateDevice)

    const inputs = midiAccess.inputs;
    //console.log(inputs);

    for(var output of midiAccess.outputs.values()){
        device = output;
        console.log("output device: ", device);
    }

    inputs.forEach((input)=>{
        //console.log(input);
        input.addEventListener('midimessage',handleInput);
    });
}

function handleInput(input){
    //console.log(input);

    const command = input.data[0];
    const note = input.data[1];
    const velocity = input.data[2];

    //console.log(command);
    //console.log(note);
    //console.log(velocity);

    switch(command){
        case 144:
        if(velocity > 0){
            noteOn(note);
        } else {
            noteOff(note);
        }
        break;

    }
}

function colorM(key,clr){
    device && device.send([0x90,key,clr]); // note on
}

// color each button on launchpad according
// to solar flare class
function colorAll(){
    for(i = 0; i < 64; i++){
       if(flaresVal[i]==10){
            colorM((i+36),12);
        } 
       if(flaresVal[i]==100){
            colorM((i+36),13);  
        }
        if(flaresVal[i]==1000){
            colorM((i+36),84);  
        }
        if(flaresVal[i]==10000){
            colorM((i+36),5);  
        }
        
    } 
}

// function for displaying noise according
// to solar flare class number
var abc = 0;
function noteOn(note){
    //console.log(`note:${note} //on`)

    x = flaresNum[(note-36)] * 25;
    console.log("x: ",x);

    console.log(flaresVal[(note-36)]);
    if(flaresVal[(note-36)]==10){
        pixelD = 0.01;
        strength = 75;
        //x=25;
        setup();
        draw();
    } 
    if(flaresVal[(note-36)]==100){
        pixelD = 0.05;
        strength = 95;
        //x=75;
        setup();
        draw();
    }
    if(flaresVal[(note-36)]==1000){ 
        pixelD = 0.25;
        strength = 125;
        //x=125; 
        setup();
        draw();
    }
    if(flaresVal[(note-36)]==10000){
        pixelD = 0.75;
        strength = 255;
        //x=1; 
        setup();
        draw(); 
    }

}

function noteOff(note){
    //console.log(`note:${note} //off`)

    // testing midi color
    colorAll();
}

getImg();

// function to get api data on solar flares
function getImg(){

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: "https://api.nasa.gov/DONKI/FLR?startDate=2022-01-01&api_key=ehutr8kiOjupjGqjr1gKTfgCgcFK9clmMe8Z10OQ",
        async: false,
        crossDomain: true,

        complete: function(data){
            stuff = data.responseJSON;
            //console.log(stuff)

            length = data.responseJSON.length
            offset = length - 64;

            //console.log(length)

            for(i = offset; i<length; i++){
                classif = data.responseJSON.at(i).classType;
                //console.log(classif);
                flaresNum[i-offset] = classif.substring(1);
                console.log(flaresNum[i-offset]);
                //flaresVal[i] = id;

                if(classif[0]=='A'){
                    flaresVal[i-offset] = 1;
                }
                if(classif[0]=='B'){
                    flaresVal[i-offset] = 10;
                }
                if(classif[0]=='C'){
                    flaresVal[i-offset] = 100;
                }
                if(classif[0]=='M'){
                    flaresVal[i-offset] = 1000;
                }
                if(classif[0]=='X'){
                    flaresVal[i-offset] = 10000;
                }
               // console.log(classif)
               // console.log(classif[0])
            }

        }


    });

    //console.log(flaresVal);
    //console.log(flaresNum);
    console.log("offset: ",offset);

}

// p5 stuff
function setup() {
    createCanvas(displayWidth, displayHeight);
    pixelDensity(pixelD);
}


function draw() {
    loadPixels(); 
    for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; j++) {
            var idx = (i + j * width) * 4; 
            pixels[idx+0] = 255-x;//random(x);//250;
            pixels[idx+1] = random(255);//random((255-x),x);
            pixels[idx+2] = x;
            pixels[idx+3] = strength; 
        }
    }
    updatePixels();
}