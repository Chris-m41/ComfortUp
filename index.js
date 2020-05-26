/*
    This code calls the Comfort Up JSON file. It then converts the JSON into an array.
    The array information is then seperated to what is necessary. The data then displays
    the last twelve items in the array. This includes the image, name and price. Finally,
    It will then display this information on the web browser.
*/

let url = 'https://comfortup.com/products.json';

var result = []
var price = []
var vendor = []
var imageSrc = []
var tags = []

//Start calling JSON to Array
const fetchPromise = fetch(url);
fetchPromise.then(response => {
    return response.json();
    }).then(data => {
    // Convert json as array
    for(var i in data)
    result.push([i, data [i]]);
    // Display the array
    console.log(result);
    
    //save data price 
    //result[0][1] is used to locate the multi-dimenstion array information
    for(var i in result[0][1]) {

        //location of price
        price.push(result[0][1][i].variants[0].price)

        //save vendor information
        vendor.push(result[0][1][i].vendor)

        //Save image src
        //If there was no image 
        if (result[0][1][i].images[0] == undefined || result.length == 0){
            imageSrc.push("No image src")
            } else { 
            // save the image src's 
            imageSrc.push(result[0][1][i].images[0].src)
        }
            // TODO:
        /*This would be the tags. Was not completed due to lack of time 
            I was trying to create another multi-dimensional array to save all the tags.
        */
       /* for(var j in result[0][1][i].tags[i]){
            if(result[0][1][i].tags[0] == undefined || result[0][1][i].tags[0] == 0){
                tags.push([i[j], "No tags"])
            } else {
                tags.push([i[j], result[0][1][i].tags])
            }
        }*/
 
    
    
    }
    //Error handling
    console.log("inside fetch: " + price)
    console.log("inside fetch: " + vendor)
    console.log("print image src's: " + imageSrc)

    //Display the items on the screen.
    main.innerHTML = prices(price,vendor,imageSrc);
  
    });
    

function prices(price,vendor,imageSrc) {

    //map vendor information
    const vendorInfo = vendor.map(value => 
    `${value}`    
    );
    //map imageSrc information 
    const imageSrcInfo = imageSrc.map(value => 
        `${value}`
    )
    //map priceInfor
    const priceInfo = price.map(value =>
        `${value}`
    )
    //Only showing the last 12 items in the array
    const sVendorInfo = vendorInfo.slice(-12,30)
    const sImageInfo = imageSrc.slice(-12,30)
    const sPriceInfo = priceInfo.slice(-12,30)
    //created to iterate over 12 times while using a map
    /*If I had more time I would have created a counter with a see more items button.
        Making it MUCH more efficient
    */
    const iterate = [0,1,2,3,4,5,6,7,8,9,10,11]

    //Full list of asked information
    //Used auto for sake of time
    const listArray = iterate.map((price,index) => 
        `
        <div class="col col-sm-auto rows">
        <li>${sVendorInfo[index]}</li>
        <li><a href="${sImageInfo[index]}"><img alt="No image" src="${sImageInfo[index]}"></a></li>
        <li>$${sPriceInfo[index]}</li>
        </div>
        `
        ).join('');
    
    return `${listArray}` //displays content on browser
}

