const links = [
  {
    title: "מפה מצטברת -  4390 נקודות",
    url: "https://bishvilyael.github.io/Map_Full/",
  },
  {
    title:"מפה חודשית - ניתן לבחור חודש בכותרת המפה",
    url: "https://bishvilyael.github.io/Map_Partial/",
  },
  {
    title: "מפה מצטברת Google Maps",
    url: "https://www.google.com/maps/d/edit?mid=1ZV3wyw_U2qiEHsuJ9LmLKnY8BGG57NU&usp=sharing",
  },
  {
    title: "קישור לאתר - בשביל יעל",
    url: "https://www.beshvilyael.com/",
  },
];

const linksContainer = document.getElementById("linksContainer");
const videosPanel = document.getElementById("videosPanel");
const videoGroupsContainer = document.getElementById("videoGroupsContainer");
const videoPlayer = document.getElementById("videoPlayer");
const youtubeFrame = document.getElementById("youtubeFrame");

links.forEach((item) => {
  const link = document.createElement("a");
  link.className = "link-button";
  link.href = item.url;
  link.textContent = item.title;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  linksContainer.appendChild(link);
});

/* עדכון אוטומטי של מספר הנקודות */
fetch("points-summary.json")
  .then((response) => response.json())
  .then((summary) => {
    const firstLink = linksContainer.querySelector("a.link-button");

    if (firstLink && summary.totalPoints) {
      firstLink.textContent =
        `מפה מצטברת - ${summary.totalPoints} נקודות`;
    }
  })
  .catch((err) => {
    console.error("Failed to load points-summary.json", err);
  });

const videosButton = document.createElement("button");
videosButton.className = "link-button";
videosButton.textContent = "סרטונים";
linksContainer.appendChild(videosButton);

videosButton.addEventListener("click", () => {
  videosPanel.classList.toggle("hidden");
});

const isMobile = window.matchMedia("(max-width: 768px)").matches;

const selectedGroup = videoGroups.find((group) =>
  isMobile ? group.type === "mobile" : group.type === "desktop",
);

if (selectedGroup) {
  const groupBox = document.createElement("div");
  groupBox.className = "video-group";

  const select = document.createElement("select");
  select.className = "video-select";

  const defaultOption = document.createElement("option");
  defaultOption.textContent = "בחר סרטון";
  defaultOption.value = "";
  select.appendChild(defaultOption);

  selectedGroup.videos.forEach((video) => {
    const option = document.createElement("option");
    option.textContent = video.title;
    option.value = video.id;
    select.appendChild(option);
  });

  select.addEventListener("change", () => {
    if (!select.value) return;

    const selectedVideo = selectedGroup.videos.find(
      (video) => video.id === select.value,
    );
    if (!selectedVideo) return;

    youtubeFrame.src = `https://www.youtube.com/embed/${selectedVideo.id}`;
    videoPlayer.classList.remove("hidden");
  });

  groupBox.appendChild(select);
  videoGroupsContainer.appendChild(groupBox);
}