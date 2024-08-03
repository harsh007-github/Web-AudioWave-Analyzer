//Audio Effect or changes or modifications
const input = document.querySelector("input");
const audioElem = document.querySelector("audio");
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//If facing any errors put "change" instead of input here in the event listener
input.addEventListener("input", (e) => {
  var inputFile = input.files[0];
  if (!inputFile) return;
  //Here input file is an array
  // console.log(inputFile);
  audioElem.src = URL.createObjectURL(inputFile);
  audioElem.play();
  //Create audio context where all the work on audio will be done
  const audioContext = new AudioContext();
  //source -> analyser -> destination

  //audio source node
  const audioSource = audioContext.createMediaElementSource(audioElem);
  //Analyser
  const analyser = audioContext.createAnalyser();
  audioSource.connect(analyser);

  //Destination node
  analyser.connect(audioContext.destination); // Speaker
  analyser.fftSize = 512; //Determines the count of sound bars
  const bufferDataLength = analyser.frequencyBinCount; // Actual number of sound bars
  const bufferDataArray = new Uint8Array(bufferDataLength);
  // console.log(bufferDataArray);

  const soundBarWidth = canvas.width / bufferDataLength; // Width of eachsound bar
  //Main part where soundbars are created and animated
  let x = 0;
  function drawAndAnimateSoundBars() {
    x = 0;
    //Clearing canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    analyser.getByteFrequencyData(bufferDataArray);
    bufferDataArray.forEach((dataPoint) => {
      const soundBarHeight = dataPoint;
      const baseDarkValue = 30; // Darker base value
      const scaleFactor = 3; // Higher scale factor to keep values lower
      const red = ((soundBarHeight * 2) % 100) / scaleFactor + baseDarkValue;
      const green = ((soundBarHeight * 5) % 120) / scaleFactor + baseDarkValue;
      const blue = ((soundBarHeight * 7) % 180) / scaleFactor + baseDarkValue;


      context.fillStyle = `rgb(${red}, ${green}, ${blue})`;
      context.fillRect(
        x,
        canvas.height - soundBarHeight,
        soundBarWidth,
        soundBarHeight
      );
      x += soundBarWidth;
    });
    if(!audioElem.ended) requestAnimationFrame(drawAndAnimateSoundBars);
  }
    drawAndAnimateSoundBars();
});
