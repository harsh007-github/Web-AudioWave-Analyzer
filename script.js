//Audio Effect or changes or modifications
const input = document.querySelector("input");
const audioElem = document.querySelector("audio");
//If facing any errors put "change" instead of input here in the event listener
input.addEventListener("input", (e) => {
  var inputFile = input.files[0];
  if (!inputFile) return;
  //Here input file is an array
  // console.log(inputFile);
  audioElem.src = URL.createObjectURL(inputFile);
  // audioElem.play();
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
});
