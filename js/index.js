let locationsJsonPath  =  "../db/locations.json";

let minimizeBtn = document.querySelector(".minimize-btn"),
    infoSectionContainer = document.querySelector(".info-container"),
    pageTitle = document.querySelector(".page-title"),
    infoSectionContentWrapper = document.querySelector(".info-container__content"),
    minimizeBtnIcon = document.querySelector(".bx");

async function fetchLocations() {
  const locationsDbRes = await fetch(locationsJsonPath);
  const locationsObjs = await locationsDbRes.json();

  locationsObjs.forEach((area) => {
    createAreaPopupEl(area);

    let svgArea = document.getElementById(area.id);
    let areaPopup = document.getElementById(`${area.id}-popup`);

    svgArea.addEventListener("mousemove", (eventObj) => {
      areaPopup.style.left = (eventObj.offsetX + 10) + 'px';
      areaPopup.style.top = (eventObj.offsetY - 80) + 'px';
      areaPopup.classList.remove("hidden")
      areaPopup.classList.add("shown-popup")
    });

    svgArea.addEventListener("mouseout", () => {
      areaPopup.classList.add("hidden")
      areaPopup.classList.remove("shown-popup")
    });

    svgArea.addEventListener("click", () => {
      let infoSectionWrapper = document.querySelector(".info-container__content");
      let infoSectionDesc = document.querySelector(".info-container__desc");

      if (infoSectionContentWrapper.classList.contains("hidden")) {
        showInfoSectionContent();
      }

      pageTitle.textContent = area.name;
      infoSectionDesc.textContent = area.description;

      if (document.getElementById("info-container-img")) {
        document.getElementById("info-container-img").remove();
      }

      imageElement = document.createElement("img")
      imageElement.src = area.imagePath;
      imageElement.alt = area.name;
      imageElement.setAttribute("id", "info-container-img");
      infoSectionWrapper.insertBefore(imageElement, infoSectionDesc);
    });
  })
}

function createAreaPopupEl(area) {
  // Create element first
  let newPopupEl = document.createElement("div");
  newPopupEl.classList.add("info-popup", "hidden");
  newPopupEl.setAttribute("id", `${area.id}-popup`);

  let popupImg = document.createElement("img");
  popupImg.src = area.imagePath;
  popupImg.alt = area.name;
  popupImg.classList.add("info-popup__img");

  let popupTitle = document.createElement("h3");
  popupTitle.classList.add("h6-max", "h8-min", "info-popup__title");
  popupTitle.textContent = area.name;

  newPopupEl.appendChild(popupImg);
  newPopupEl.appendChild(popupTitle);

  document.getElementsByTagName("main")[0].appendChild(newPopupEl);
}

function toggleInfoSection() {
  infoSectionContentWrapper.classList.contains("hidden")
    ? showInfoSectionContent()
    : hideInfoSectionContent();
}

function showInfoSectionContent() {
  infoSectionContentWrapper.classList.remove("hidden");
  pageTitle.classList.remove("hidden");
  minimizeBtnIcon.classList.add("bxs-chevrons-left");
  minimizeBtnIcon.classList.remove("bxs-chevrons-right");
}

function hideInfoSectionContent() {
  infoSectionContentWrapper.classList.add("hidden");
  pageTitle.classList.add("hidden");
  minimizeBtnIcon.classList.remove("bxs-chevrons-left");
  minimizeBtnIcon.classList.add("bxs-chevrons-right");
}

minimizeBtn.addEventListener("click", toggleInfoSection);

fetchLocations();