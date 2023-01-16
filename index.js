



let pickedColors =  JSON.parse(localStorage.getItem("picked-colors") || "[]");

let colorList = document.querySelector(".all-colors");
let clearAll = document.querySelector(".clear-all");
console.log(colorList,clearAll);


const copyColor = (elem)=>{
    console.log(elem);
    navigator.clipboard.writeText(elem.dataset.color);

    elem.innerText = "Copied" ;

    setTimeout(() => {
        elem.innerText = elem.dataset.color;
    }, 1000);
}







const showColors = () =>{
    if(!pickedColors.length) return;// Returning if there are no picked colors
    colorList.innerHTML = pickedColors.map((color)=>(
        `
        <li class="color">
                    <span class="rect" style="background: ${color}; border: 1px solid ${color == "#ffffff" ? "#ccc" : color}"></span>
                    <span class="value" data-color="${color}">${color}</span>
                </li>
        `
    )).join(""); //Generating li for the picked color and  adding it to the colorList

    document.querySelector(".picked-color").classList.remove("hide")


    // Add a cick event listener to to each color element to copy the code 
    document.querySelectorAll(".color").forEach( li =>{
        li.addEventListener("click", e=>copyColor(e.currentTarget.lastElementChild));
    })

    // console.log(liTag);

}
showColors();

const activateEyeDropper = () =>{
    document.body.style.display = "none";
   setTimeout(async() => {
    try {
        const eyeDropper = new EyeDropper();

        const {sRGBHex} = await eyeDropper.open();

        navigator.clipboard.writeText(sRGBHex);

        //Adding the color to the list if it doesn't already exist
        if(!pickedColors.includes(sRGBHex)){
            pickedColors.push(sRGBHex);

            localStorage.setItem("picked-colors",JSON.stringify(pickedColors));
    
            showColors();
        }

        console.log(pickedColors);
        
    } catch (error) {
        console.log("Failed to copy the color code!");
        
    }
    document.body.style.display = "block";
    
   }, 10);
}

// Clearing all piced colors and updating localstorage
const clearAllColors = () =>{
    pickedColors.length = 0;
    localStorage.setItem("picked-colors",JSON.stringify(pickedColors));
    document.querySelector(".picked-color").classList.add("hide")
}


clearAll.addEventListener("click",clearAllColors);


window.onload=function(){

    let colorPickerBtn = document.getElementById('color-picker');
    console.log(colorPickerBtn);
    colorPickerBtn.addEventListener("click",activateEyeDropper);
}


