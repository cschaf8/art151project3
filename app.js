//console.log(navigator);

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

function noteOn(note){
    console.log(`note:${note} //on`)
    if(note>51 && note<68){
        document.getElementById("test").style.color = "red"
    }
    if(note>35 && note<52){
        document.getElementById("test2").style.color = "yellow"
    }
    if(note>83 && note<100){
        document.getElementById("test3").style.color = "lawngreen"
    }
    if(note>67 && note<84){
        document.getElementById("test4").style.color = "blue"
    }

}

function noteOff(note){
    console.log(`note:${note} //off`)
    if(note>51 && note<68){
        document.getElementById("test").style.color = "black"
    }
    if(note>35 && note<52){
        document.getElementById("test2").style.color = "black"
    }
    if(note>83 && note<100){
        document.getElementById("test3").style.color = "black"
    }
    if(note>67 && note<84){
        document.getElementById("test4").style.color = "black"
    }
}

