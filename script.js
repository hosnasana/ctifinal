//favoerite icon

/* document.addEventListener("DOMContentLoaded", () => {
  // Get all heart icons
  const favoriteIcons = document.querySelectorAll(".favorite-icon");

  // Load favorites from localStorage
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Function to save favorites to localStorage
  function updateFavorites(songData, isFavorite, icon) {
    if (isFavorite) {
      // Remove from favorites
      const index = favorites.findIndex(
        (item) => item.title === songData.title
      );
      if (index > -1) favorites.splice(index, 1); // Remove song from favorites array
      icon.classList.remove("fa-solid", "text-danger"); // Reset to outline heart
      icon.classList.add("fa-regular"); // Add outline heart class
    } else {
      // Add to favorites
      favorites.push(songData); // Add full song data
      icon.classList.remove("fa-regular"); // Remove outline heart class
      icon.classList.add("fa-solid", "text-danger"); // Add solid red heart
    }

    // Save to localStorage
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  // Loop through each heart icon and attach event listeners
  favoriteIcons.forEach((icon) => {
    const songTitle = icon.getAttribute("data-song-title");
    const artistName = icon.closest(".song").querySelector("h3").textContent;
    const songImage = icon.closest(".song").querySelector("img").src;

    // Prepare song data
    const songData = {
      title: songTitle,
      artist: artistName,
      image: songImage,
    };

    // Set initial state of the icon based on whether the song is in favorites
    if (favorites.some((item) => item.title === songData.title)) {
      icon.classList.remove("fa-regular");
      icon.classList.add("fa-solid", "text-danger"); // Make it red if it's a favorite
    }

    // Add event listener to toggle the favorite status when the icon is clicked
    icon.addEventListener("click", () => {
      const isFavorite = favorites.some(
        (item) => item.title === songData.title
      );
      updateFavorites(songData, isFavorite, icon); // Call function to toggle favorite
    });
  });
});

//favorit iconhh

document.addEventListener("DOMContentLoaded", function () {
  const favoriteIcons = document.querySelectorAll(".favorite-icon");
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  function updateFavoriteStatus(icon, songInfo) {
    if (favorites.some((fav) => fav.title == songInfo.title)) {
      icon.classList.remove("fa-regular");
      icon.classList.add("fa-solid");
      icon.style.color = "red";
    } else {
      icon.classList.remove("fa-solid");
      icon.classList.add("fa-regular");
      icon.style.color = "";
    }
  }

  favoriteIcons.forEach((icon) => {
    const songElement = icon.closest(".song");
    const songInfo = {
      title: songElement.querySelector(".song-info h3").textContent,
      artist: songElement.querySelector(".song-info p").textContent,
      imgSrc: songElement.querySelector("img").src,
    };

    updateFavoriteStatus(icon, songInfo);

    icon.addEventListener("click", function () {
      const index = favorites.findIndex((fav) => fav.title == songInfo.title);
      if (index === -1) {
        favorites.push(songInfo);
      } else {
        favorites.splice(index, 1);
      }
      localStorage.setItem("favorites", JSON.stringify(favorites));
      updateFavoriteStatus(icon, songInfo);
    });
  });
});

//adding to favorit page
document.addEventListener("DOMContentLoaded", function () {
  const favoriteSongsContainer = document.getElementById("favorite-songs");
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  favorites.forEach((song) => {
    const songElement = document.createElement("div");
    songElement.className = "song d-flex align-items-center py-3 border-bottom";
    songElement.innerHTML = `
  <img src="${song.imgSrc}" alt="${song.artist}" class="mr-3" height="50px">
  <div class="song-info flex-grow-1">
    <h3>${song.title}</h3>
    <p>${song.artist}</p>
  </div>
  <div class="controls d-flex">
    <i class="fa-solid fa-heart favorite-icon" style="color: red;" aria-hidden="true"></i>
    <i class="fa fa-ellipsis-h mx-2"></i>
  </div>
  `;
    favoriteSongsContainer.appendChild(songElement);
  });
});
 */

//heart icon and adding to another page

// Function to toggle favorite status
function toggleFavorite(event) {
  const heartIcon = event.target;
  const songElement = heartIcon.closest(".song");
  const songTitle = songElement.querySelector(".song-info h3").textContent;
  const artistName = songElement.querySelector(".song-info p").textContent;
  const imageSrc = songElement.querySelector("img").src;

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const index = favorites.findIndex(
    (song) => song.title === songTitle && song.artist === artistName
  );

  if (index > -1) {
    // Remove from favorites
    favorites.splice(index, 1);
    heartIcon.classList.remove("fas", "text-danger");
    heartIcon.classList.add("far");
  } else {
    // Add to favorites
    favorites.push({ title: songTitle, artist: artistName, image: imageSrc });
    heartIcon.classList.remove("far");
    heartIcon.classList.add("fas", "text-danger");
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Function to initialize the playlist page
function initPlaylist() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const heartIcons = document.querySelectorAll(".favorite-icon");

  heartIcons.forEach((icon) => {
    const songElement = icon.closest(".song");
    const songTitle = songElement.querySelector(".song-info h3").textContent;
    const artistName = songElement.querySelector(".song-info p").textContent;

    if (
      favorites.some(
        (song) => song.title === songTitle && song.artist === artistName
      )
    ) {
      icon.classList.remove("far");
      icon.classList.add("fas", "text-danger");
    }

    icon.addEventListener("click", toggleFavorite);
  });
}

// Manage song deletion specific to the current page
document.addEventListener("DOMContentLoaded", function () {
  // Ensure each page has its own unique identifier
  const pageIdentifier =
    document.body.getAttribute("data-page-id") || "defaultPage";

  // Retrieve deleted songs from localStorage or initialize an empty array
  let deletedSongs = JSON.parse(localStorage.getItem("deletedSongs")) || [];

  // Function to update the UI to hide deleted songs based on localStorage
  function updateDeletedSongsUI() {
    const songElements = document.querySelectorAll(".song");
    songElements.forEach((songElement) => {
      const artist = songElement.querySelector("h3").innerText;
      const title = songElement.querySelector("p").innerText;

      // Check if this song has been deleted on the current page
      const isDeleted = deletedSongs.some(
        (song) =>
          song.page === pageIdentifier && // Check against the current page
          song.artist === artist &&
          song.title === title
      );

      // If the song is deleted, remove it from the DOM
      if (isDeleted) {
        songElement.remove();
      }
    });
  }

  // Add a click event listener to each trash icon
  const trashIcons = document.querySelectorAll(".fa-trash");
  trashIcons.forEach((icon) => {
    icon.addEventListener("click", function () {
      const songDiv = this.closest(".song");
      const artist = songDiv.querySelector("h3").innerText;
      const title = songDiv.querySelector("p").innerText;

      // Check if the song is already deleted on this page to prevent duplicates
      const isAlreadyDeleted = deletedSongs.some(
        (song) =>
          song.page === pageIdentifier &&
          song.artist === artist &&
          song.title === title
      );

      if (!isAlreadyDeleted) {
        // Add the deleted song to the deletedSongs array with the current page identifier
        deletedSongs.push({ page: pageIdentifier, artist, title });

        // Save the updated deletedSongs array back to localStorage
        localStorage.setItem("deletedSongs", JSON.stringify(deletedSongs));

        // Remove the song element from the DOM
        songDiv.remove();
      }
    });
  });

  // On page load, update the UI to hide deleted songs
  updateDeletedSongsUI();
});
