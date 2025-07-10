// Evento para botón principal (pantalla inicial)
document.getElementById("calc-age-btn").addEventListener("click", function () {
  const dateInputValue = document.getElementById("date-input").value;
  calcularYMostrar(dateInputValue);
});

// ✅ Evento para recalcular desde el panel de resultados
document.addEventListener("DOMContentLoaded", function () {
  // Creamos input y botón dentro de la izquierda (si no existen)
  const leftPanel = document.querySelector(".left-panel");
  const inputWrapper = document.createElement("div");
  inputWrapper.classList.add("input-wrapper");
  inputWrapper.innerHTML = `
    <input type="date" id="recalc-date-input" />
    <button id="recalc-btn">Volver a calcular</button>
  `;
  leftPanel.prepend(inputWrapper); // Agrega al principio

  // Evento del botón de recálculo
  document.getElementById("recalc-btn").addEventListener("click", function () {
    const newDate = document.getElementById("recalc-date-input").value;
    calcularYMostrar(newDate);
  });
});

// 👉 Función para cálculo de edad + renderizado
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

  // Mostrar en contenedor inicial
  document.getElementById("years").textContent = ageYears;
  document.getElementById("months").textContent = ageMonths;
  document.getElementById("days").textContent = ageDays;

  // Mostrar en contenedor post-cálculo (si existe)
  const resYears = document.getElementById("res-years");
  if (resYears) {
    resYears.textContent = ageYears;
    document.getElementById("res-months").textContent = ageMonths;
    document.getElementById("res-days").textContent = ageDays;
  }

  const generationInfo = getGenerationInfo(birthDate.getFullYear());

  document.getElementById("generation-name").textContent = generationInfo.name;
  document.getElementById("generation-description").textContent = generationInfo.description;
  document.getElementById("generation-details").textContent = generationInfo.details;
  document.getElementById("generation-image").src = generationInfo.image;
  document.getElementById("generation-image").alt = `Imagen de ${generationInfo.name}`;

  // Video + botón volver al inicio
  const videoWrapper = document.getElementById("video-wrapper");
  videoWrapper.innerHTML = `
    <iframe 
      src="${generationInfo.video}" 
      frameborder="0" 
      allowfullscreen>
    </iframe>
    <button id="back-to-start" class="back-btn">Volver al inicio</button>
  `;

  // Evento del botón volver al inicio
  document.getElementById("back-to-start").addEventListener("click", () => {
    document.getElementById("result-container").classList.add("hidden");
    document.getElementById("form-container").classList.remove("hidden");
    document.getElementById("date-input").value = "";
    document.getElementById("recalc-date-input").value = "";

    // Volver al tope de la página
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Mostrar resultado y ocultar formulario inicial
  document.getElementById("form-container").classList.add("hidden");
  document.getElementById("result-container").classList.remove("hidden");

  const rightPanel = document.getElementById("right-panel");
  rightPanel.classList.remove("hidden-panel");
  rightPanel.classList.add("active");
}

// 👉 Info de generaciones
function getGenerationInfo(year) {
  if (year >= 2013) {
    return {
      name: "[2013-Presente] - Generación Alpha",
      description:"Nacidos en la era de la inteligencia artificial.",
      details:"Rodeados de IA, tablets y redes sociales desde pequeños.",
      video: "https://www.youtube.com/embed/6HcgjwRIx2I",
      image: "https://res.cloudinary.com/dfd8iteps/image/upload/v1752094888/Generacion_Alpha_rrbyci.png",
    };
  } else if (year >= 1997) {
    return {
      name: "[1997-2012] - Generación Z",
      description:"Nativos digitales.Conectados y creativos.",
      details:"Valoran la diversidad y la autoeducación.",
      video: "https://www.youtube.com/embed/g-Vcm28ckEg",
      image: "https://res.cloudinary.com/dfd8iteps/image/upload/v1752094922/Generacion_Z_dqgjy8.png",
    };
  } else if (year >= 1981) {
    return {
      video: "https://www.youtube.com/embed/B0CeknRyceY",
      image: "https://res.cloudinary.com/dfd8iteps/image/upload/v1752169950/Generacion_Y_kt6wty.png",
    };
  } else if (year >= 1965) {
    return {
      video: "https://www.youtube.com/embed/2AfX2ZjxG-U",
      image: "https://res.cloudinary.com/dfd8iteps/image/upload/v1752169984/Generacion_X_zw6wzj.png",
    };
  } else if (year >= 1946) {
    return {
      name: "[1946-1964] -Generación Baby Boomers",
      description: "Optimistas y trabajadores.",
      details: "Nacieron tras la guerra.Disciplinados y comprometidos.",
      video: "https://www.youtube.com/embed/7QejZ6Qg7Ww",
      image: "img/boomers.png",
    };
  } else {
    return {
      name:"[1928-1945] - Generación Silenciosa",
      description:"Prudentes, trabajadores y resilientes.",
      details:"Crecieron en la Gran Depresión y la Segunda Guerra Mundial.",
      video: "https://www.youtube.com/embed/9icvisV4PaU",
      image: "img/silenciosa.png",
    };
  }
}

