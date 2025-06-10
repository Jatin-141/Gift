// Performance optimizations
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isLowEndDevice = navigator.hardwareConcurrency <= 4 || navigator.deviceMemory <= 4;

// Global variables for typewriter effects - Ultra Mobile Optimized
const typewriterSpeed = isMobile ? 150 : 100; // Much slower for mobile
let currentSection = 0;
let isTyping = false;
let typewriterTimeouts = [];
let scrollTimeouts = [];

// Initialize the application
window.addEventListener('load', () => {
  // Aggressive preload optimization
  optimizeForDevice();
  preloadVideos();

  setTimeout(() => {
    startInitialTypewriter();
  }, 1000);
});

// Device-specific optimizations
function optimizeForDevice() {
  if (isMobile || isLowEndDevice) {
    // Disable expensive effects on mobile/low-end devices
    const doodles = document.querySelectorAll('.floating-doodle');
    doodles.forEach(doodle => {
      doodle.style.animationDuration = '15s';
      doodle.style.animationTimingFunction = 'ease-in-out';
    });

    // Reduce video quality
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      video.preload = 'none';
      video.muted = true;
      video.playsInline = true;
    });
  }
}

// Optimized video preloading
function preloadVideos() {
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.preload = isMobile ? 'none' : 'metadata';
    video.addEventListener('loadedmetadata', () => {
      console.log('Video metadata loaded');
    });
  });
}

// Clear all timeouts to prevent memory leaks
function clearAllTimeouts() {
  typewriterTimeouts.forEach(timeout => clearTimeout(timeout));
  scrollTimeouts.forEach(timeout => clearTimeout(timeout));
  typewriterTimeouts = [];
  scrollTimeouts = [];
}

// Initial typewriter for welcome message
function startInitialTypewriter() {
  const initialText = "Welcome to Arushee's Special Gift Page 🌟\nSomething amazing awaits you... Please wait...";
  const typewriterEl = document.getElementById("typewriter");

  typewriterEffect(typewriterEl, initialText, () => {
    const timeout = setTimeout(() => {
      document.getElementById("passwordSection").classList.remove("hidden");
    }, 1500);
    typewriterTimeouts.push(timeout);
  });
}

// Ultra-optimized typewriter effect
function typewriterEffect(element, text, callback = null, speed = typewriterSpeed) {
  if (isTyping) return;

  isTyping = true;
  let index = 0;
  element.innerHTML = '';

  function type() {
    if (index < text.length) {
      const char = text.charAt(index);
      element.innerHTML += char === "\n" ? "<br>" : char;
      index++;

      const timeout = setTimeout(type, reducedMotion ? 10 : speed);
      typewriterTimeouts.push(timeout);
    } else {
      isTyping = false;
      if (callback) {
        const timeout = setTimeout(callback, 300);
        typewriterTimeouts.push(timeout);
      }
    }
  }

  type();
}

// Setup all password toggles
document.addEventListener('DOMContentLoaded', () => {
  setupPasswordToggle("toggleEye", "password");
  setupPasswordToggle("toggleEye2", "secondPassword");
  setupPasswordToggle("toggleEye3", "thirdPassword");

  // Add enter key listeners
  addEnterKeyListener("password", checkPassword);
  addEnterKeyListener("secondPassword", checkSecondPassword);
  addEnterKeyListener("thirdPassword", checkThirdPassword);
});

function setupPasswordToggle(eyeId, passwordId) {
  const toggleEye = document.getElementById(eyeId);
  if (toggleEye) {
    toggleEye.addEventListener("click", () => {
      const pwd = document.getElementById(passwordId);
      const eye = document.getElementById(eyeId);

      if (pwd.type === "password") {
        pwd.type = "text";
        eye.textContent = "👁️‍🗨️";
      } else {
        pwd.type = "password";
        eye.textContent = "👁️";
      }
    });
  }
}

function addEnterKeyListener(passwordId, checkFunction) {
  const password = document.getElementById(passwordId);
  if (password) {
    password.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        checkFunction();
      }
    });
  }
}

// Hint functions
function showHint() {
  const hintElement = document.getElementById("hintText");
  hintElement.classList.remove("hidden");
  hintElement.style.animation = "fadeIn 0.3s ease";
}

function showSecondHint() {
  const hintElement = document.getElementById("secondHintText");
  hintElement.classList.remove("hidden");
  hintElement.style.animation = "fadeIn 0.3s ease";
}

function showThirdHint() {
  const hintElement = document.getElementById("thirdHintText");
  hintElement.classList.remove("hidden");
  hintElement.style.animation = "fadeIn 0.3s ease";
}

// Optimized auto-scroll function
function autoScrollToNext(delay = 1000) {
  if (reducedMotion) return;

  const timeout = setTimeout(() => {
    const scrollAmount = isMobile ? window.innerHeight * 0.4 : window.innerHeight * 0.3;
    window.scrollBy({
      top: scrollAmount,
      behavior: 'smooth'
    });
  }, delay);
  scrollTimeouts.push(timeout);
}

// Enhanced scroll to specific element
function smoothScrollToElement(elementId, delay = 500) {
  const timeout = setTimeout(() => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'nearest'
      });
    }
  }, delay);
  scrollTimeouts.push(timeout);
}

// Password check functions
function checkPassword() {
  const password = document.getElementById("password").value.trim();

  if (password.toLowerCase() === "arushee") {
    document.getElementById("passwordContainer").classList.add("hidden");
    document.getElementById("mainContent").classList.remove("hidden");

    autoScrollToNext(500);
    startMainContent();
  } else {
    alert("Wrong password. Try again!");
    document.getElementById("password").value = "";
  }
}

function checkSecondPassword() {
  const password = document.getElementById("secondPassword").value.trim();

  if (password.toLowerCase() === "jatin" || password.toLowerCase() === "love") {
    document.getElementById("hiddenPhotoSection").classList.add("hidden");

    // Show hidden photo immediately, NO emoji buttons yet
    const timeout = setTimeout(() => {
      showHiddenPhotoContent();
    }, 1000);
    typewriterTimeouts.push(timeout);
  } else {
    alert("Wrong password. Try again!");
    document.getElementById("secondPassword").value = "";
  }
}

function checkThirdPassword() {
  const password = document.getElementById("thirdPassword").value.trim();

  if (password.toLowerCase() === "special" || password.toLowerCase() === "connection") {
    document.getElementById("secondHiddenPhotoSection").classList.add("hidden");

    const timeout = setTimeout(() => {
      showSecondHiddenPhotoContent();
    }, 1000);
    typewriterTimeouts.push(timeout);
  } else {
    alert("Wrong password. Try again!");
    document.getElementById("thirdPassword").value = "";
  }
}

// Removed emoji response functionality

// Main content - Fixed timing
function startMainContent() {
  const firstText = "So you're thinking, what is this? Don't worry, sbh kuch pta chl jaayga but last me. 😏😛";
  const firstTextEl = document.getElementById("firstText");

  typewriterEffect(firstTextEl, firstText, () => {
    autoScrollToNext(1000);
    const timeout = setTimeout(() => {
      showVideoSection();
    }, 2000);
    typewriterTimeouts.push(timeout);
  });
}

// Video section - Text first, THEN video
function showVideoSection() {
  const videoTextEl = document.getElementById("videoText");
  videoTextEl.classList.remove("hidden");

  const videoText = "But phle ek video hai see that 👇";

  typewriterEffect(videoTextEl, videoText, () => {
    // Wait for text to complete, THEN show video
    const timeout1 = setTimeout(() => {
      const video = document.getElementById("mainVideo");
      video.classList.remove("hidden");
      autoScrollToNext(500);

      video.play().catch(e => {
        console.log("Autoplay prevented");
        video.controls = true;
      });

      video.addEventListener('ended', () => {
        const timeout2 = setTimeout(showPhotoSection, 2000);
        typewriterTimeouts.push(timeout2);
      });

      const timeout3 = setTimeout(showPhotoSection, 15000);
      typewriterTimeouts.push(timeout3);
    }, 2000); // 2 second delay after text
    typewriterTimeouts.push(timeout1);
  });
}

// Photo section - Fixed text placement
function showPhotoSection() {
  const photoTextEl = document.getElementById("photoText");
  photoTextEl.classList.remove("hidden");

  const photoText = "This is the place where my fav person lives 😍\n\nyehi vohi place where we met first time.";

  typewriterEffect(photoTextEl, photoText, () => {
    autoScrollToNext(800);
    const timeout1 = setTimeout(() => {
      const photoWrapper = document.querySelector(".photo-wrapper");
      photoWrapper.classList.remove("hidden");

      const timeout2 = setTimeout(() => {
        showPhotoDescription();
      }, 2000);
      typewriterTimeouts.push(timeout2);
    }, 1500);
    typewriterTimeouts.push(timeout1);
  });
}

function showPhotoDescription() {
  const photoDescEl = document.getElementById("photoDescription");
  photoDescEl.classList.remove("hidden");

  const photoDescription = "Do I have any thoughts about you when i first met you personally? No thoughts bcs I don't judge people but I like your drawing when you sent in the group. From that moment I'm fan of your art style.\n\nSee I don't know your exact location, but what I know is tu katakji me rhti hai islv Kalkaji ka hi view daal dia😅\n\nsorry 😅😭";

  typewriterEffect(photoDescEl, photoDescription, () => {
    autoScrollToNext(1000);
    const timeout = setTimeout(showLikingProgressSection, 3000);
    typewriterTimeouts.push(timeout);
  });
}

function showHiddenPhotoSection() {
  const hiddenSection = document.getElementById("hiddenPhotoSection");

  // Prevent duplicate calls
  if (!hiddenSection.classList.contains("hidden")) {
    return;
  }

  hiddenSection.classList.remove("hidden");
  autoScrollToNext(500);

  const hiddenPhotoText = "Now there's a hidden photo (like Arushee's solo pic).\nEnter the second password to unlock it...";
  const hiddenPhotoTextEl = document.getElementById("hiddenPhotoText");

  typewriterEffect(hiddenPhotoTextEl, hiddenPhotoText);
}

// First hidden photo revealed - NO emoji buttons yet
function showHiddenPhotoContent() {
  const revealedSection = document.getElementById("hiddenPhotoRevealed");

  // Prevent duplicate calls
  if (!revealedSection.classList.contains("hidden")) {
    return;
  }

  revealedSection.classList.remove("hidden");
  autoScrollToNext(500);

  // Show photo first, then text after 3 seconds
  const timeout1 = setTimeout(() => {
    const revealText = "Hmm... toh akele me photo aa hi gyi and all... 😏";
    const revealTextEl = document.getElementById("hiddenPhotoRevealText");

    typewriterEffect(revealTextEl, revealText, () => {
      autoScrollToNext(1000);
      const timeout2 = setTimeout(showSecondHiddenPhotoSection, 3000);
      typewriterTimeouts.push(timeout2);
    });
  }, 3000);
  typewriterTimeouts.push(timeout1);
}

// Second hidden photo section
function showSecondHiddenPhotoSection() {
  const secondHiddenSection = document.getElementById("secondHiddenPhotoSection");

  // Prevent duplicate calls
  if (!secondHiddenSection.classList.contains("hidden")) {
    return;
  }

  secondHiddenSection.classList.remove("hidden");
  autoScrollToNext(500);

  const secondHiddenText = "Chal, ek one more try 😏\nAnother hidden surprise awaits...";
  const secondHiddenTextEl = document.getElementById("secondHiddenPhotoText");

  typewriterEffect(secondHiddenTextEl, secondHiddenText);
}

// Second hidden photo revealed - NOW show emoji buttons
function showSecondHiddenPhotoContent() {
  const secondRevealedSection = document.getElementById("secondHiddenPhotoRevealed");

  // Prevent duplicate calls
  if (!secondRevealedSection.classList.contains("hidden")) {
    return;
  }

  secondRevealedSection.classList.remove("hidden");
  autoScrollToNext(500);

  // Show photo first, then text after 3 seconds
  const timeout1 = setTimeout(() => {
    const secondRevealText = "Here's another special moment... 💕";
    const secondRevealTextEl = document.getElementById("secondHiddenPhotoRevealText");

    typewriterEffect(secondRevealTextEl, secondRevealText, () => {
      const timeout2 = setTimeout(() => {
        showContinuedStory();
      }, 3000);
      typewriterTimeouts.push(timeout2);
    });
  }, 3000);
  typewriterTimeouts.push(timeout1);
}

function showJourneyFeeling() {
  document.getElementById("journeyFeelingSection").classList.remove("hidden");
  autoScrollToNext(500);

  const journeyText = "How are you feeling about this journey?";
  const journeyTextEl = document.getElementById("journeyFeelingText");

  typewriterEffect(journeyTextEl, journeyText, () => {
    const timeout = setTimeout(showLikingProgress, 3000);
    typewriterTimeouts.push(timeout);
  });
}

function showLikingProgressSection() {
  // Show liking progress with 2-3 second delay as requested
  const timeout = setTimeout(() => {
    document.getElementById("likingProgressSection").classList.remove("hidden");
    autoScrollToNext(500);

    const likingText = "Hope you're liking it so far... 💕";
    const likingTextEl = document.getElementById("likingProgressText");

    typewriterEffect(likingTextEl, likingText, () => {
      // Continue to hidden photo section
      const nextTimeout = setTimeout(() => {
        showHiddenPhotoSection();
      }, 3000);
      typewriterTimeouts.push(nextTimeout);
    });
  }, 2500);
  typewriterTimeouts.push(timeout);
}

// Function removed - replaced by showLikingProgressSection

// Continued story - Fixed timing with delay
function showContinuedStory() {
  document.getElementById("continuedStory").classList.remove("hidden");
  autoScrollToNext(500);

  // ADD DELAY before showing this text
  const timeout1 = setTimeout(() => {
    const storyText = "Here's a compilation video for you... 💖";
    const storyTextEl = document.getElementById("continuedStoryText");

    typewriterEffect(storyTextEl, storyText, () => {
      // Text FIRST, then video after delay
      const timeout2 = setTimeout(() => {
        const compilationVideo = document.getElementById("compilationVideo");
        autoScrollToNext(500);

        compilationVideo.play().catch(e => {
          console.log("Autoplay prevented");
          compilationVideo.controls = true;
        });

        compilationVideo.addEventListener('ended', () => {
          const timeout3 = setTimeout(showFinalSection1, 2000);
          typewriterTimeouts.push(timeout3);
        });

        const timeout4 = setTimeout(showFinalSection1, 12000);
        typewriterTimeouts.push(timeout4);
      }, 3000); // 3 second delay after text
      typewriterTimeouts.push(timeout2);
    });
  }, 2500); // 2.5 second delay before showing text
  typewriterTimeouts.push(timeout1);
}

function showFinalSection1() {
  document.getElementById("finalSection1").classList.remove("hidden");
  autoScrollToNext(500);

  const finalText1 = "Hope you like it and all... 💕\n\nNow see how much time it took me to build this thing...";
  const finalText1El = document.getElementById("finalText1");

  typewriterEffect(finalText1El, finalText1, () => {
    autoScrollToNext(1000);
    const timeout = setTimeout(showScreenRecording, 2000);
    typewriterTimeouts.push(timeout);
  });
}

// Screen recording - Fixed text/video sync
function showScreenRecording() {
  document.getElementById("screenRecordingSection").classList.remove("hidden");
  autoScrollToNext(500);

  const screenText = "Here's my screen recording of building this for you... 🖥️✨";
  const screenTextEl = document.getElementById("screenRecordingText");

  typewriterEffect(screenTextEl, screenText, () => {
    // Text COMPLETES first, THEN video appears
    const timeout1 = setTimeout(() => {
      const screenVideo = document.getElementById("screenRecordingVideo");
      autoScrollToNext(500);

      screenVideo.play().catch(e => {
        console.log("Autoplay prevented");
        screenVideo.controls = true;
      });

      screenVideo.addEventListener('ended', () => {
        const timeout2 = setTimeout(showDekhaSection, 2000);
        typewriterTimeouts.push(timeout2);
      });

      const timeout3 = setTimeout(showDekhaSection, 15000);
      typewriterTimeouts.push(timeout3);
    }, 3000); // 3 second delay after text completes
    typewriterTimeouts.push(timeout1);
  });
}

// Dekha section - Fixed to appear only ONCE
function showDekhaSection() {
  const dekhaEl = document.getElementById("dekhaSection");
  if (!dekhaEl.classList.contains("hidden")) return; // Prevent double execution

  dekhaEl.classList.remove("hidden");
  autoScrollToNext(500);

  const dekhaText = "Dekha? 😎\n\nBye Arushee. 👋";
  const dekhaTextEl = document.getElementById("dekhaText");

  typewriterEffect(dekhaTextEl, dekhaText, () => {
    autoScrollToNext(1000);
    const timeout = setTimeout(showWaitSection, 3000);
    typewriterTimeouts.push(timeout);
  });
}

// Wait section - Fixed missing text
function showWaitSection() {
  document.getElementById("waitSection").classList.remove("hidden");
  autoScrollToNext(500);

  const waitText = "Wait... wait... wait... kidhr jaa rhi hai ek chotta gift aur... 🎁✨";
  const waitTextEl = document.getElementById("waitText");

  typewriterEffect(waitTextEl, waitText, () => {
    const timeout = setTimeout(() => {
      showHiddenGiftReveal();
    }, 3000);
    typewriterTimeouts.push(timeout);
  });
}

function showHiddenGiftReveal() {
  const giftButton = document.createElement('button');
  giftButton.textContent = '🎁 Hidden Gift';
  giftButton.className = 'enter-btn';
  giftButton.style.marginTop = '20px';
  giftButton.onclick = revealSurpriseVideo;

  document.getElementById("waitSection").appendChild(giftButton);
}

function revealSurpriseVideo() {
  const surpriseVideo = document.getElementById("surpriseVideo");
  surpriseVideo.classList.remove("hidden");
  autoScrollToNext(500);

  surpriseVideo.play().catch(e => {
    console.log("Autoplay prevented");
    surpriseVideo.controls = true;
  });

  // Hide the reveal button
  const button = document.querySelector('#waitSection .enter-btn');
  if (button) button.style.display = 'none';

  surpriseVideo.addEventListener('ended', () => {
    const timeout = setTimeout(showConclusion, 2000);
    typewriterTimeouts.push(timeout);
  });

  const timeout = setTimeout(showConclusion, 12000);
  typewriterTimeouts.push(timeout);
}

function showConclusion() {
  document.getElementById("conclusionSection").classList.remove("hidden");
  autoScrollToNext(500);

  const conclusionText = "Abh complete ye site, I told you na gift acha hoga (shi me acha ho plss) 🎉\n\nAbh bye meri Arushee girl 👧💖\n\nLove you 3000 ❤️\n\n✨ THE END ✨";
  const conclusionTextEl = document.getElementById("conclusionText");

  typewriterEffect(conclusionTextEl, conclusionText);
}

// Gift video function removed - using existing video in Wait section as the gift

// Performance cleanup
window.addEventListener('beforeunload', () => {
  clearAllTimeouts();

  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.pause();
    video.src = '';
  });
});

// Video control setup function - tap to play/pause/replay
function setupVideoControls() {
  const videos = document.querySelectorAll('video');
  videos.forEach((video) => {
    video.controls = false;
    video.autoplay = true;
    video.loop = false;

    // Add tap/click functionality
    video.addEventListener('click', () => {
      if (video.ended) {
        // If video ended, replay from beginning
        video.currentTime = 0;
        video.play();
      } else if (video.paused) {
        // If paused, play
        video.play();
      } else {
        // If playing, pause
        video.pause();
      }
    });

    video.addEventListener('ended', () => {
      video.pause();
    });
  });
}

// Mobile-specific optimizations
if (isMobile) {
  document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      video.setAttribute('playsinline', 'true');
      video.setAttribute('webkit-playsinline', 'true');
      video.style.maxWidth = '100%';
      video.style.height = 'auto';
    });

    // Setup video controls after DOM is loaded
    setupVideoControls();
  });

  // Disable hover effects completely on mobile
  const style = document.createElement('style');
  style.textContent = `
    @media (hover: none) {
      *:hover {
        transform: none !important;
        box-shadow: none !important;
      }
    }
  `;
  document.head.appendChild(style);
} else {
  // Setup video controls for desktop
  document.addEventListener('DOMContentLoaded', setupVideoControls);
}

// Throttled scroll for performance
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }

  scrollTimeout = setTimeout(() => {
    // Handle scroll events if needed
  }, 100);
});

document.documentElement.style.scrollBehavior = 'smooth';

// Hidden gift video function
function showHiddenGiftVideo() {
  let giftVideoSection = document.getElementById("hiddenGiftVideoSection");
  if (!giftVideoSection) {
    giftVideoSection = document.createElement("div");
    giftVideoSection.id = "hiddenGiftVideoSection";
    giftVideoSection.className = "hidden";
    giftVideoSection.innerHTML = `
      <div id="giftVideoText" class="typewriter-text fun-text"></div>
      <div class="reveal-video-container">
        <button id="giftRevealBtn" class="reveal-btn" onclick="revealGiftVideo()">🎁 Gift</button>
        <video id="giftVideo" class="hidden story-video" muted playsinline controls>
          <source src="attached_assets/new project.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    `;
    document.querySelector(".story-container").appendChild(giftVideoSection);
  }

  giftVideoSection.classList.remove("hidden");
  autoScrollToNext(500);

  const giftText = "One more special surprise for you...";
  const giftTextEl = document.getElementById("giftVideoText");

  typewriterEffect(giftTextEl, giftText);
}

function revealGiftVideo() {
  const giftVideo = document.getElementById("giftVideo");
  const giftBtn = document.getElementById("giftRevealBtn");

  giftBtn.style.display = "none";
  giftVideo.classList.remove("hidden");
  giftVideo.play();
  autoScrollToNext(1000);
}