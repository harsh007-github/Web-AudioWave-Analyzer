const input = document.querySelector("input");
input.addEventListener("change", (e) => {
    const inputFile = input.files;
    console.log(inputFile); 
});