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
  function drawAndAnimateSoundBars() {
    let x = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(bufferDataArray);
    bufferDataArray.forEach((dataPoint) => {
      const soundBarHeight = dataPoint;
      context.fillStyle = "red";
      context.fillRect(
        x,
        canvas.height - soundBarHeight,
        soundBarWidth,
        soundBarWidth
      );
      x += soundBarWidth;
    });
  }
  setInterval(() => {
    drawAndAnimateSoundBars();
  }, 500);
});
