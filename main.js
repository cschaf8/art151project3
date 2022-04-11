

getImg();

function getImg(){
    const flares = [];

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: "https://api.nasa.gov/DONKI/FLR?startDate=2022-01-01&api_key=ehutr8kiOjupjGqjr1gKTfgCgcFK9clmMe8Z10OQ",
        async: false,
        crossDomain: true,

        complete: function(data){
            stuff = data.responseJSON;
            console.log(stuff)

            length = data.responseJSON.length
            //console.log(length)

            for(i = 0; i<length; i++){
                id = data.responseJSON.at(i).classType;
                flares[i] = id;
                console.log(id)
            }

        }


    });

    console.log(flares);
    a = 1;
    b = 10;
    c = 100;
    m = 1000;
    x = 10000;

}