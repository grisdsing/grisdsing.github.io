var swiper = new Swiper(".mySwiper-1", {
    spaceBetween: 30,
    slidesPreview:1,
    loop: true,
    pagination: {
       el: ".swiper-pagination",
       clickable: true,
    },
            
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
        
});

var swiper = new Swiper(".mySwiper-2", {
    spaceBetween: 20,
    slidesPreview:3,
    loop: true,
    loopFIllGroupWithBlank:true,  
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints : {
        0: {
            slidesPreview: 1,
        }, 
        520: {
            slidesPreview: 2,
        }, 
        950: {
            slidesPreview: 2,
        }
    }
        
});

let tabInputs = document.querySelectorAll(".tabInput");

tabInputs.forEach(function(input ){
    input.addEventListener('change', function (){
        let id = input.ariaValueMax;
        let thisSwiper = document.getElementById('swiper' + id);
        thisSwiper.swiper.update(); 
    })
});

document.addEventListener("DOMContentLoaded", () => {

const audio = document.getElementById("audio");
const playPause = document.getElementById("play")

playPause.addEventListener("click", () => {
  if (audio.paused || audio.ended) {
    playPause.querySelector(".pause-btn").classList.remove("hide");
    playPause.querySelector(".play-btn").classList.add("hide");
    audio.play();
  } else {
    audio.pause();
    playPause.querySelector(".pause-btn").classList.add("hide");
    playPause.querySelector(".play-btn").classList.remove("hide");
  }
});

const progressBar = document.getElementById("progressBar")
const currentTimeEl = document.querySelector(".start");
const durationEl = document.querySelector(".end");



  // Verificación de seguridad
  if (!currentTimeEl || !durationEl || !progressBar) {
    console.error("❌ Algunos elementos no se encontraron.");
    return;
  }

  console.log("✅ Elementos encontrados correctamente.");

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  }

  // Evento cuando los metadatos están cargados
  audio.addEventListener("loadedmetadata", () => {
    durationEl.textContent = formatTime(audio.duration); // Actualiza la duración total
    progressBar.max = Math.floor(audio.duration); // Establece el máximo de la barra
  });

  // Actualizar tiempo y barra mientras el audio se reproduce
  audio.addEventListener("timeupdate", () => {
    const currentTime = audio.currentTime;
    progressBar.value = Math.floor(currentTime); // Actualiza la barra de progreso
    currentTimeEl.textContent = formatTime(currentTime); // Actualiza el tiempo transcurrido
  });

  // Permitir que el usuario cambie la posición del audio
  progressBar.addEventListener("input", () => {
    audio.currentTime = progressBar.value; // Cambia la posición del audio
  });
});