// 🔹 EVENTOS INICIALES
document.addEventListener("DOMContentLoaded", function () {
  // Evento botón principal (pantalla inicial)
  document.getElementById("calc-age-btn").addEventListener("click", function () {
    const dateInputValue = document.getElementById("date-input").value;
    calcularYMostrar(dateInputValue);
  });

  // Insertar inputs en panel izquierdo para recalcular
  const leftPanel = document.querySelector(".left-panel");
  const inputWrapper = document.createElement("div");
  inputWrapper.classList.add("input-wrapper");
  inputWrapper.innerHTML = `
    <input type="date" id="recalc-date-input" />
    <button id="recalc-btn">Volver a calcular</button>
  `;
  leftPanel.prepend(inputWrapper);

  // Evento botón "Volver a calcular"
  document.getElementById("recalc-btn").addEventListener("click", function () {
    const newDate = document.getElementById("recalc-date-input").value;
    calcularYMostrar(newDate);
  });
});

// 🔹 FUNCIÓN PRINCIPAL
function calcularYMostrar(dateInputValue) {
  const birthDate = new Date(dateInputValue);
  const today = new Date();

  if (isNaN(birthDate)) {
    alert("Por favor, introduce una fecha válida.");
    return;
  }

  // Cálculo edad
  let ageYears = today.getFullYear() - birthDate.getFullYear();
  let ageMonths = today.getMonth() - birthDate.getMonth();
  let ageDays = today.getDate() - birthDate.getDate();

  if (ageDays < 0) {
    ageMonths--;
    ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  // Mostrar edad
  document.getElementById("years").textContent = ageYears;
  document.getElementById("months").textContent = ageMonths;
  document.getElementById("days").textContent = ageDays;

  document.getElementById("res-years").textContent = ageYears;
  document.getElementById("res-months").textContent = ageMonths;
  document.getElementById("res-days").textContent = ageDays;

  // Mostrar info de generación
  const generation = getGenerationInfo(birthDate.getFullYear());
  const image = document.getElementById("generation-image");
  image.src = generation.image;
  image.alt = `Imagen de ${generation.name}`;

  // 🔸 Asegurar que la imagen esté al principio del contenedor
  const generationInfo = document.getElementById("generation-info");
  if (generationInfo && generationInfo.contains(image)) {
    generationInfo.insertBefore(image, generationInfo.firstChild);
  }

  document.getElementById("generation-name").textContent = generation.name;
  document.getElementById("generation-description").textContent = generation.description;
  document.getElementById("generation-details").textContent = generation.details;

  // Video y botón volver
  const videoWrapper = document.getElementById("video-wrapper");
  videoWrapper.innerHTML = `
    <iframe src="${generation.video}" frameborder="0" allowfullscreen></iframe>
    <button id="back-to-start" class="back-btn">Volver al inicio</button>
  `;

  // Evento botón volver al inicio
  document.getElementById("back-to-start").addEventListener("click", volverAlInicio);

  // Mostrar resultado
  document.getElementById("form-container").classList.add("hidden");
  document.getElementById("result-container").classList.remove("hidden");
  document.getElementById("final-section").style.display = "flex";
  document.getElementById("hero-text").style.display = "none";

  // Compartir
  const shareText = `¡Perteneces a ${generation.name}!`;
  const shareUrl = window.location.href;
  document.getElementById("share-facebook").href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
  document.getElementById("share-twitter").href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  document.getElementById("share-whatsapp").href = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;

  // Mostrar compartir y panel derecho
  document.getElementById("share-section").classList.remove("hidden");
  document.getElementById("right-panel").classList.remove("hidden-panel");
  document.getElementById("right-panel").classList.add("active");

  // Scroll al resultado
  document.getElementById("result-container").scrollIntoView({ behavior: "smooth", block: "start" });
}

// 🔹 INFO DE GENERACIONES
function getGenerationInfo(year) {
  if (year >= 2013) {
    return {
      name: "Para mas informacion te comparto el enlace a continuacion:",
      details: "Crecen en un mundo completamente digital...",
      video: "https://www.youtube.com/embed/6HcgjwRIx2I",
      image: "https://res.cloudinary.com/dfd8iteps/image/upload/v1752447897/Generacion_Alpha_wr4jyv.png",
    };
  } else if (year >= 1997) {
    return {
      name: "Para mas informacion te comparto el enlace a continuacion:",
      details: "Conocidos por su habilidad con la tecnología...",
      video: "https://www.youtube.com/embed/g-Vcm28ckEg",
      image: "https://res.cloudinary.com/dfd8iteps/image/upload/v1752448037/Generacion_Z_bbmvic.png",
    };
  } else if (year >= 1981) {
    return {
      name: "Para mas informacion te comparto el enlace a continuacion:",
      details: "Vivieron el paso del mundo analógico al digital...",
      video: "https://www.youtube.com/embed/B0CeknRyceY",
      image: "https://res.cloudinary.com/dfd8iteps/image/upload/v1752169950/Generacion_Y_kt6wty.png",
    };
  } else if (year >= 1965) {
    return {
      name: "Para mas informacion te comparto el enlace a continuacion:",
      details: "Crecieron con menos supervisión y mayor independencia...",
      video: "https://www.youtube.com/embed/2AfX2ZjxG-U",
      image: "https://res.cloudinary.com/dfd8iteps/image/upload/v1752169984/Generacion_X_zw6wzj.png",
    };
  } else if (year >= 1946) {
    return {
      name: "Para mas informacion te comparto el enlace a continuacion:",
      details: "Generación posterior a la Segunda Guerra Mundial...",
      video: "https://www.youtube.com/embed/7QejZ6Qg7Ww",
      image: "https://res.cloudinary.com/dfd8iteps/image/upload/v1752447950/Generacion_Baby_Boomers_j6s4jt.png",
    };
  } else {
    return {
      name: "Para mas informacion te comparto el enlace a continuacion:",
      details: "Crecieron en tiempos difíciles, con valores tradicionales...",
      video: "https://www.youtube.com/embed/9icvisV4PaU",
      image: "https://res.cloudinary.com/dfd8iteps/image/upload/v1752448285/Generacion_Silenciosa_e4qoex.png",
    };
  }
}

// 🔹 VOLVER AL INICIO Y LIMPIAR TODO
function volverAlInicio() {
  // Mostrar formulario y ocultar resultado
  document.getElementById("result-container").classList.add("hidden");
  document.getElementById("form-container").classList.remove("hidden");
  document.getElementById("hero-text").style.display = "block";

  // Limpiar inputs
  document.getElementById("date-input").value = "";
  document.getElementById("recalc-date-input").value = "";

  // Limpiar edad
  document.getElementById("years").textContent = "";
  document.getElementById("months").textContent = "";
  document.getElementById("days").textContent = "";
  document.getElementById("res-years").textContent = "";
  document.getElementById("res-months").textContent = "";
  document.getElementById("res-days").textContent = "";

  // Limpiar info de generación
  document.getElementById("generation-name").textContent = "";
  document.getElementById("generation-description").textContent = "";
  document.getElementById("generation-details").textContent = "";
  document.getElementById("generation-image").src = "";
  document.getElementById("generation-image").alt = "";

  // Limpiar video
  const videoWrapper = document.getElementById("video-wrapper");
  if (videoWrapper) {
    videoWrapper.innerHTML = "";
  }

  // Limpiar enlaces de compartir
  document.getElementById("share-facebook").href = "#";
  document.getElementById("share-twitter").href = "#";
  document.getElementById("share-whatsapp").href = "#";

  // Ocultar secciones extra
  document.getElementById("share-section").classList.add("hidden");
  document.getElementById("final-section").style.display = "none";
  document.getElementById("right-panel").classList.remove("active");

  // Volver arriba
  window.scrollTo({ top: 0, behavior: "smooth" });
}



