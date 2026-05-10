const links = [
  {
    title: "מפה מצטברת -  4343 נקודות",
    url: "https://bishvilyael.github.io/FullMap_J_Split/",
  },
  {
    title:"מפה חודשית - ניתן לבחור חודש בכותרת המפה",
    url: "https://bishvilyael.github.io/PartialMap_Multi/",
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
