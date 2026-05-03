const links = [
  {
    title: "מפה מצטברת מתחילת המיזם - 4297 נקודות במפה",
    url: "https://bishvilyael.github.io/FullMap_J_Split/"
  },
  {
    title: "מפה חדשית - ניתן להחליף חודש בתוך המפה",
    url: "https://bishvilyael.github.io/PartialMap_Multi/"
  },
  {
    title: "מפה מצטברת Google Maps",
    url: "https://www.google.com/maps/d/edit?mid=1ZV3wyw_U2qiEHsuJ9LmLKnY8BGG57NU&usp=sharing"
  },
  {
    title: "קישור לאתר - בשביל יעל",
    url: "https://www.beshvilyael.com/"
  }
];

const linksContainer = document.getElementById("linksContainer");
const videosPanel = document.getElementById("videosPanel");
const videoGroupsContainer = document.getElementById("videoGroupsContainer");
const videoPlayer = document.getElementById("videoPlayer");
const videoTitle = document.getElementById("videoTitle");
const youtubeFrame = document.getElementById("youtubeFrame");

links.forEach(item => {
  const link = document.createElement("a");

  link.className = "link-button";
  link.href = item.url;
  link.textContent = item.title;
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  linksContainer.appendChild(link);
});

/* כפתור סרטונים */
const videosButton = document.createElement("button");
videosButton.className = "link-button";
videosButton.textContent = "סרטונים";
linksContainer.appendChild(videosButton);

videosButton.addEventListener("click", () => {
  videosPanel.classList.toggle("hidden");
});

/* זיהוי מחשב / נייד */
const isMobile = window.matchMedia("(max-width: 768px)").matches;

/* הצגת רשימה אחת בלבד לפי סוג התצוגה */
const filteredGroups = videoGroups.filter(group => {
  if (isMobile && group.title.includes("נייד")) return true;
  if (!isMobile && group.title.includes("מחשב")) return true;
  return false;
});

/* בניית רשימת הסרטונים */
filteredGroups.forEach(group => {
  const groupBox = document.createElement("div");
  groupBox.className = "video-group";

  const title = document.createElement("h3");
  title.textContent = group.title;

  const select = document.createElement("select");
  select.className = "video-select";

  const defaultOption = document.createElement("option");
  defaultOption.textContent = "בחר סרטון";
  defaultOption.value = "";
  select.appendChild(defaultOption);

  group.videos.forEach(video => {
    const option = document.createElement("option");
    option.textContent = video.title;
    option.value = video.id;
    select.appendChild(option);
  });

  select.addEventListener("change", () => {
    if (!select.value) return;

    const selectedVideo = group.videos.find(video => video.id === select.value);

    videoTitle.textContent = selectedVideo.title;
    youtubeFrame.src = `https://www.youtube.com/embed/${selectedVideo.id}`;
    videoPlayer.classList.remove("hidden");
  });

  groupBox.appendChild(title);
  groupBox.appendChild(select);
  videoGroupsContainer.appendChild(groupBox);
});