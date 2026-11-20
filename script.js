// Yatra Guide script for destinations, budget calculator, and contact form

// Approximate daily cost per person in INR
const places = [
  {
    name: "Golden Temple",
    city: "Amritsar, Punjab",
    type: "religious",
    cost: 1500,
    image: "images/goldentemple.jpg",
    info: "Sri Harmandir Sahib, langar hall and Jallianwala Bagh are close by."
  },
  {
    name: "Rock Garden",
    city: "Chandigarh",
    type: "heritage",
    cost: 1800,
    image: "images/ROCK GARDEN - CHANDIGARH.jpg",
    info: "Sculpture garden made from waste material by Nek Chand."
  },
  {
    name: "Manali",
    city: "Himachal Pradesh",
    type: "hills",
    cost: 3000,
    image: ".jpg",
    info: "Solang Valley, Hadimba Temple and the Mall Road."
  },
  {
    name: "Shimla",
    city: "Himachal Pradesh",
    type: "hills",
    cost: 2800,
    image: "images/Shimla📍.jpg",
    info: "Old British hill station with the Ridge and Kufri nearby."
  },
  {
    name: "Jaipur",
    city: "Rajasthan",
    type: "heritage",
    cost: 2500,
    image: "images/Jaisalmer Fort - Living Fort Jaisalmer in Golden City.jpg",
    info: "Amer Fort, City Palace, Hawa Mahal and Johari Bazaar."
  },
  {
    name: "Agra",
    city: "Uttar Pradesh",
    type: "heritage",
    cost: 2200,
    image: "images/Historia de las 5 mayores cúpulas del mundo.jpg",
    info: "Taj Mahal, Agra Fort and Fatehpur Sikri."
  },
  {
    name: "Rishikesh",
    city: "Uttarakhand",
    type: "religious",
    cost: 2000,
    image: "images/sunrise Rishikesh.jpg",
    info: "Ganga aarti, Laxman Jhula and river rafting."
  },
  {
    name: "Goa",
    city: "Goa",
    type: "beach",
    cost: 3500,
    image: "images/Arambol Beach, Goa.jpg",
    info: "Baga and Calangute beaches, old churches and Fort Aguada."
  }
];

// --- Destinations filter & search ---
let activeCategory = "all";

function renderDestinations() {
  const container = document.getElementById("placeList");
  const query = document.getElementById("searchBox").value.trim().toLowerCase();
  const countLabel = document.getElementById("countText");

  const filtered = places.filter((item) => {
    const matchesType = activeCategory === "all" || item.type === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(query) ||
      item.city.toLowerCase().includes(query);
    return matchesType && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = "<p>No place found. Try another word or filter.</p>";
    countLabel.innerText = "Showing 0 place(s)";
    return;
  }

  let markup = "";
  filtered.forEach((p) => {
    markup += `
      <div class="polaroid">
        <div class="photo-wrap">
          <img src="${p.image}" alt="${p.name}">
          <span class="badge ${p.type}">${p.type}</span>
        </div>
        <div class="caption">
          <h3>${p.name}</h3>
          <p class="city">${p.city}</p>
          <p class="info">${p.info}</p>
          <p class="cost">About Rs. ${p.cost} per person per day</p>
        </div>
      </div>
    `;
  });

  container.innerHTML = markup;
  countLabel.innerText = `Showing ${filtered.length} place(s)`;
}

const placeListEl = document.getElementById("placeList");
if (placeListEl) {
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      activeCategory = btn.dataset.type;
      renderDestinations();
    });
  });

  document.getElementById("searchBox").addEventListener("input", renderDestinations);
  renderDestinations();
}

// --- Budget calculator ---
const budgetForm = document.getElementById("budgetForm");
if (budgetForm) {
  const placeDropdown = document.getElementById("placeSelect");

  places.forEach((place, idx) => {
    const opt = document.createElement("option");
    opt.value = idx;
    opt.textContent = `${place.name} (${place.city})`;
    placeDropdown.appendChild(opt);
  });

  budgetForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const selectedPlace = places[placeDropdown.value];
    const numDays = Number(document.getElementById("days").value);
    const numPeople = Number(document.getElementById("people").value);
    const styleFactor = Number(document.getElementById("style").value);
    const output = document.getElementById("result");

    if (numDays < 1 || numPeople < 1) {
      output.style.display = "block";
      output.innerHTML = "<p>Please enter at least 1 day and 1 person.</p>";
      return;
    }

    const totalCost = selectedPlace.cost * numDays * numPeople * styleFactor;
    const costPerPerson = Math.round(totalCost / numPeople);

    output.style.display = "block";
    output.innerHTML = `
      <h3>Estimate for ${selectedPlace.name}</h3>
      <p>${numDays} day(s), ${numPeople} person(s)</p>
      <p class="big-amount">Rs. ${totalCost.toLocaleString("en-IN")}</p>
      <p>That is about Rs. ${costPerPerson.toLocaleString("en-IN")} per person.</p>
      <p><small>This is only an estimate. Train or flight tickets are not included.</small></p>
    `;
  });
}

// --- Contact form check ---
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const fullName = document.getElementById("name").value.trim();
    const userEmail = document.getElementById("email").value.trim();
    const mobile = document.getElementById("phone").value.trim();
    const userMsg = document.getElementById("message").value.trim();

    const nameErr = document.getElementById("nameError");
    const emailErr = document.getElementById("emailError");
    const phoneErr = document.getElementById("phoneError");
    const msgErr = document.getElementById("messageError");
    const successEl = document.getElementById("successMsg");

    nameErr.innerText = "";
    emailErr.innerText = "";
    phoneErr.innerText = "";
    msgErr.innerText = "";
    successEl.innerText = "";

    let isFormValid = true;

    if (fullName.length < 3) {
      nameErr.innerText = "Name must be at least 3 characters.";
      isFormValid = false;
    }

    const atPos = userEmail.indexOf("@");
    const dotPos = userEmail.lastIndexOf(".");
    if (atPos < 1 || dotPos < atPos + 2 || dotPos === userEmail.length - 1) {
      emailErr.innerText = "Enter a valid email like name@example.com";
      isFormValid = false;
    }

    const mobileRegex = /^[6-9][0-9]{9}$/;
    if (!mobileRegex.test(mobile)) {
      phoneErr.innerText = "Enter a 10 digit mobile number.";
      isFormValid = false;
    }

    if (userMsg.length < 10) {
      msgErr.innerText = "Message must be at least 10 characters.";
      isFormValid = false;
    }

    if (isFormValid) {
      successEl.innerText = `Thank you, ${fullName}! Your message has been received.`;
      contactForm.reset();
    }
  });
}