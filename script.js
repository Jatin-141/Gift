// Performance optimizations
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isLowEndDevice = navigator.hardwareConcurrency <= 4 || navigator.deviceMemory <= 4;

// Global variables for typewriter effects - Slower for emotional impact
const typewriterSpeed = isMobile ? 180 : 120; // Slower for better readability and emotion
let currentSection = 0;
let isTyping = false;
let typewriterTimeouts = [];
let scrollTimeouts = [];

// Initialize the application
window.addEventListener('load', () => {
  // Aggressive preload optimization
  optimizeForDevice();
  preloadVideos();

  // Fix mobile viewport issues
  if (isMobile) {
    fixMobileViewport();
  }

  setTimeout(() => {
    startInitialTypewriter();
  }, 1000);
});

// Simple mobile viewport fix - just center the login
function fixMobileViewport() {
  // Ensure login stays centered
  const ensureLoginCentered = () => {
    const loginContainer = document.querySelector('.login-container');
    if (loginContainer) {
      loginContainer.style.cssText = `
        position: fixed !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        z-index: 9999 !important;
        margin: 0 !important;
        right: auto !important;
        bottom: auto !important;
      `;
    }
  };

  // Run immediately and on any changes
  ensureLoginCentered();

  // Keep checking every 100ms while login is visible
  const checkInterval = setInterval(() => {
    const loginContainer = document.querySelector('.login-container');
    if (loginContainer && !loginContainer.classList.contains('hidden')) {
      ensureLoginCentered();
    } else if (loginContainer && loginContainer.classList.contains('hidden')) {
      clearInterval(checkInterval);
    }
  }, 100);
}

// Device-specific optimizations for performance and heat prevention
function optimizeForDevice() {
  if (isMobile || isLowEndDevice) {
    // Disable expensive effects on mobile/low-end devices
    const doodles = document.querySelectorAll('.floating-doodle');
    doodles.forEach(doodle => {
      doodle.style.animationDuration = '20s';
      doodle.style.animationTimingFunction = 'ease-in-out';
      // Reduce animation intensity
      doodle.style.transform = 'scale(0.8)';
    });

    // Basic mobile video setup
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      video.playsInline = true;
      video.setAttribute('playsinline', 'true');
      video.setAttribute('webkit-playsinline', 'true');
    });

    // Reduce transition effects on mobile
    document.documentElement.style.setProperty('--transition-duration', '0.1s');

    // Enable hardware acceleration for critical elements only
    const criticalElements = document.querySelectorAll('.story-container, .login-container');
    criticalElements.forEach(el => {
      el.style.transform = 'translateZ(0)';
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
  const initialText = "So now the time has come to see what I made for you. Are u ready for your farewell gift🫵😋 🌟\n\n But first write the password\n Letter dekho :-)..";
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

  if (password === "I'll not be anxious anymore") {
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

  if (password === "Shoyo Hinata") {
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

  if (password === "password") {
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
  const firstText = "First thought ye kya hai ( I think smjh toh aa raha hoga?),\n aesa kya gift hai maybe a little bit more questions in Mind. \n But don't worry sbh pta chl jaayga. 😼🤧";
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

  const videoText = "Let's see a video first 👇 \n click the video please😙";

  typewriterEffect(videoTextEl, videoText, () => {
    // Wait for text to complete, THEN show video
    const timeout1 = setTimeout(() => {
      const video = document.getElementById("mainVideo");
      video.classList.remove("hidden");
      autoScrollToNext(500);

      // Video will not autoplay - user must click to play

      video.addEventListener('ended', () => {
        const timeout2 = setTimeout(showPhotoSection, 3000);
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

  const photoText = "This is the place where the person lives to whom this gift is dedicated. 😍\n\n We both don't have many photos and memories but jitni hai utni hi kaafi hai.👀❤️\n\n  Now let's see a photo where we met first time❤️🫂.";

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

  const photoDescription = "Yes mene dono ko photo se remove kr dia🌝😚\n\nIf you remembered we had a group for this exhibition where you sent your sketches and anime banner. From that moment I'm a fan of your art style 😍❤️\n I was like: kya art hai iss ladki ki🤩, bcs that time me itna drawing nhi krta tha, bcs of you, sid and other societies memebers ki art ki vjh se hi mene sketches krna start kra :)\n\nKamaal h na, me toh jaanta bhi nhi tha tujhe🤥, When I came to college, I was not a friendly person. From the starting, I just want a small amount of people in my life.\n And joh kaafi ache ho bcs I already told my past to you.😞\n\nAnd in college from the first day till now this college life is very opposite to me. Jesi meri schl me life thi ye ek dum hi opposite h\n even my school friend told me kya ho gya tujhe😭 \n\n Things were going crazy like always and then you came to my life😶‍🌫️ \n Yaad hai How did I start talking with you?\n\n Hey 👋🏻 arushee aap ko ye aata hai? \n\n Hlo arushee aap ke pass previous year papers h? \n\n Hlo arushee kya aap ye smjha skte ho? \n\n Arushee jyoti sir ne phadhya hai? \n\n Arushee aap, arushee kya aapne ye kra,  aap kl aa rhe ho \n \n arushee🤧?    \n\n Arushee🙃\n\n ARUSHEEEE😚\n\n Arushee🥺😭 \n\n Then aese hi krte krte me insta reels thoda send krne lga whatsapp pr 👀\n I had a fear ki safe hai bjhna ki nhi h,  aesa na lge creep 🙃 mujhe kyu bjh raha hai but\n thanks to you aesa kuch nhi tha🫶🏻\n\nThen after some days I told you about my college life kesi jaa rhi hai mene ye glt kr dia mere marks gye I had breakdown ( logo ka breakup se hota hai mera meri life se🫠)\n  Mujhse handle nhi ho raha spanish hai time nhi hai schedule nhi ho raha🥺\n\n Then aese hi I told you about my friends. \n\n After some days passed we getting sit together, hn for small time but yes, sath me thoda bhot hi pdha. Aese hi lunch time mene hi phone kr lia kidhr ho, same tumne kr lia☺️\n but thoda bhot lunch saath khaya😚 \n Aese hi krte krte days passed then months \n We went to many competitions and exhibitions together \n We went for gift shopping for my friend, then we shared our personal life with each other, not much, yeah, but most of it, yes😚\n Phir connection feel hota raha and dheere dheere we get in touch more❤️ \n\n\n (Kya abhi tk emotional hui😏?) \n\n\n  Yr Mene iss part ke liye site me Yes and No ka option daala tha pr saala code chla nhi dimag kharab kr dia phir remove Krna pdha🫠\n chl koi ni aese hi bta de🙃 \n\n\n Hn so are you liking so far🥺 and kya hui emotional 😏if yes toh me shi kr raha hu🥳 if nhi toh shit yr😩.... :(\n\n\nChl let's have fun abhi thoda bich me\n Type kr password🤧 ";

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

  const hiddenPhotoText = "Tera fav anime ka main character🌝 ( kya kru smjh hi nhi aa rha kya rkhu password)🫠...";
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
    const revealText = "He he he 😼 gotcha girl👾 kesi lgi image, hn hn baba me and kirti hi hai iske orginal creator🙂‍↕️ kudos to kirti for this photo🫶🏻 😙";
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

  const secondHiddenText = "Chl ek one more, Type the password 😏\nAnother hidden surprise awaits😚🫶🏻...";
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
    const secondRevealText = "👀haaye iss baar akele me click krwa hi li photo 😍❤️ \n Pta hai jbse letter dia na mere pass time aa gya thoda aur customize krne ka😙\n\n Back to continuation.......\n\n\nShi hai tu and aastha last volunteer work me bhi gye and me bhi aa gya thank god❤️\n thoda hi time spend kra mene🤏🏻 but koi ni\nEk toh me depressed saala kya kru yr abh chize hi aesi hai🥺 upr se voh river dekh kr sirf freedom hi yaad aa rha tha😞nazar hi nhi htt rhi thi😞 \nAnd upr se me bhi toh introvert hi hu \n If introvert nhi hota ye baate saamne keh deta na ki text me😩\n\n \"Kya kre jbh saamne hote hai nhi hoti baate, na koi yaad aa paati hai. Jbh late ho jaate hai jbhi yaad aati hai\" ~ jatin \n \n If ye phle hi daasta keh deta toh abhi kya likhta🫠 \n but but\n ek baat hai currently joh tune boli thi😵‍💫\n pgl ladki tune ek word kaha tha tune mera heart melt kr dia tha😭\n Mene kaha tha \"sahi hai your all fav birthdays in the same month and you said nhi sirf tu️❤️😭\n Ae kudiye ye ki keh ditta tu mennu😭\n Phir soch lia tha mene ye gift best dunga❤️❤️";

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
  // Skip the "liking it so far" section and go directly to hidden photo
  showHiddenPhotoSection();
}

// Function removed - replaced by showLikingProgressSection

// Continued story - Fixed timing with delay
function showContinuedStory() {
  document.getElementById("continuedStory").classList.remove("hidden");
  autoScrollToNext(500);

  // ADD DELAY before showing this text
  const timeout1 = setTimeout(() => {
    const storyText = "Aese baate toh me bhot saari baat yaad dila du, har ek choti moments ko  yaadgiri bna du but abh ye sbh likhte likhte me na emotional ho jau🥹 toh let's move out from the past. 🙂‍↕️\n\n But usse Phele Chl ek chota🎁dekh💖";
    const storyTextEl = document.getElementById("continuedStoryText");

    typewriterEffect(storyTextEl, storyText, () => {
      // Wait for text to COMPLETELY finish, then show video
      const timeout2 = setTimeout(() => {
        const compilationVideo = document.getElementById("compilationVideo");
        compilationVideo.classList.remove("hidden");



        autoScrollToNext(500);

        // Video will not autoplay - user must click to play

        compilationVideo.addEventListener('ended', () => {
          const timeout3 = setTimeout(showFinalSection1, 3000);
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

  const finalText1 = "Achi lgi hn? Hn kya keh rhi hai? Achha lga, Phew... 😮‍💨🤧 💕\n kash apn dono ki bhi photos hoti jese kirti and krishna ke pass hai😔🥹\n\n Ye sbh likhte waqt and krte waqt kaafi time mujhe apni chats ko scroll Krna pda\n shit yr kitna roya hu me tere saamne 🫩 \n Pr koi gul nhi ji achi baat hai tujhe hi toh btaya hai koi toh mila cllg me jisko bta ska💖\n Pr me hi emotional ho gya tha ki kitni baat kri humne🥹\n\n";
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

  const screenText = "Mene tujhe kaafi baar btaya hai ki me wish krta hu ki kaash me teri hi class me hota 💖🫂but shyd hum iss trh frnd nhi hote joh itna share kre, hn class friend hote ache but close friend mushkil tha. Aesa na ho isly me junior hu🫂 👀\n\nYe abh ye site end pr hi aa rhi hai toh thodi mehnat hi dikha du kitna lga time watch a video again pls 👇 🖥️✨";
  const screenTextEl = document.getElementById("screenRecordingText");

  typewriterEffect(screenTextEl, screenText, () => {
    // Text COMPLETES first, THEN video appears
    const timeout1 = setTimeout(() => {
      const screenVideo = document.getElementById("screenRecordingVideo");
      screenVideo.classList.remove("hidden");



      autoScrollToNext(500);

      // Video will not autoplay - user must click to play

      screenVideo.addEventListener('ended', () => {
        const timeout2 = setTimeout(showDekhaSection, 3000);
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

  const dekhaText = "Dekha?\nKaafi mehnat lgi tere gift bnane me itna ups and down dekhe oof...😮‍💨\n\nMe isse simple koi website me copy paste text krke kr skta tha but un sbh me limitations hai and subscription maangte hai🥲 and itna paisa nhi\n\nIsly code choose kra isme mene code nhi kra\n max AI se krawaya hai bus jidhr changes lge vhi kre\n But AI se bhi bhot hi jyda baar shi karwaya saala shi bnate hi nhi hai😑\n kabhi late work kra iss pr\n 2 ya 3 chat gpt ki chats bhr di baaki dusre AIs use kre phew...🤧too much work\n\n  Itna kaam krne ke baad ye 90% work 6 June ko hua jitna mujhe chayie,\n I wanted shuru se hi ki ek base level bna du uske baad customiziton easy  hai but ye base level bnane me hi kaafi time lg gya 🥲. \n\n Ek aur chiz btata hu mene sbse phle ek company find kri usse pe 2 ya 3 work kra uske baad unhone msg bjha ki we closing our company 🫩🥲🫠\nPhir change kra kahi aur kra phir ek jgh mili usspe itni mehnat ke baad pta chla ki iss website ko share nhi kr skta means thodi der chlegi phir bnd🫩🫩\n Tune iss video me ek jgh dekhi hogi maximum time, uss jgh se isse publish nhi kr skta bcs they also want subscription to publish the site 🥲 \n Phir yaad aaya kidhr publish kr skta hu\n See, here I'm with your 🎁\n\n Mene ye sbh kaafi phle hi soch lia tha like khud hi, IT lab me \n jbh toh exams me bhi time tha, dono ki liye gift soch liye the bhaisahab itna tough soch lia 😩 dono ko krne me halat tight hogi.\n\n Yaad hai our last birayni and me kha raha tha but phone chla raha tha uss time hi, Me Chatgpt ki help se idea ke liye path dekh raha tha ki krna kese hai😚\n\n And mid of exams Society members ne bola ki exam ke baad hi means 17 ya 19 ko kr denge farewell🫠 mere dimag kharab ho gya,\n I was like wtf😑 then kya me exams ke bich me bna raha tha gift\n\n tera decide kra tha ki 1 ya 2 din me bna dunga if 19 ko rkhte hai toh, but aesa nhi hua 30th ka rkha\n\n thank you God😭❤\n\n shyd god ka pta tha, mujhse nhi ho payega itna jldi isly late rkha🫠 🙃\n\n Bcs I want to make your and aastha farewell special🤧❤️.\n\nI have backup ka backup plan, mujhe pta tha ki kuch bhi dunga acha lagega but but mujhe apna plan A hi dena tha.\n and also fews days phle farewell se\n I had dream ki farewell ke time mene gift hi nhi dia bcs kuch bhi ready nhi tha🤧🥺\n\n But mene kr dia🤞\n\n Pr yr tere gift me late ho gya bcs kaafi problems aa gyi thi isme 😔\n\n Srry ☹\n\nBut mere pass ideas ki kmi thodi hai mene soch lia tha ki tujhe substitute me letter de dunga and time mil jayega😁 and i was right\n\n And ye gift special day pr dunga\n I tried very hard ki tujhe jbh birthday wish kru raat ko ussi time link de du but nhi hua🥺😭😭\n koi baat ni🥺, Mene socha pura din hai de dunga but nhi hua🥺😭\n\nBut mere pass ek aur idea aaya me tujhe aaj dunga bcs ye mera special day hai😙\n toh thought aaya ki tera special day bna du🫶\n And ek aur chiz ye ki me farewell ke din kyu mood kharab tha nd mene society ki help bhi nhi kri farewell ke time ye baat baad btayoonga but puch lio vrna me khud bhool jayoonga🫠\n\n\nNow this site is end hope you really like it❤️🫂 \n\nBye Bye Arushee🫂👋\n I'll miss you verrryyy muuccchh🥹😭🫂🫶";
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

  const waitText = "Are wait wait kidhr jaa rhi hai abhi ek aur toh 🎁✨ Dekh kr ja👀❤️😁🫂... ";
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

  // Video will not autoplay - user must click to play

  // Hide the reveal button
  const button = document.querySelector('#waitSection .enter-btn');
  if (button) button.style.display = 'none';

  surpriseVideo.addEventListener('ended', () => {
    const timeout = setTimeout(showConclusion, 3000);
    typewriterTimeouts.push(timeout);
  });

  // Remove automatic timeout - wait for video to end completely
  // const timeout = setTimeout(showConclusion, 8000);
  // typewriterTimeouts.push(timeout);
}

function showConclusion() {
  document.getElementById("conclusionSection").classList.remove("hidden");
  autoScrollToNext(500);

  const conclusionText = "Dekha ek gift me kaafi blasts de diye na 👀❤️\n thnx to kirti again for this lovely video🫶🏻\n\n I told you na gift acha hoga (shi me acha ho plss....)\nBs bs abh meri tears rokne ki power khtm ho jaaygi🥹❤️ ye bnate bnate 🥹\nAbh ye complete ye site\n\n Your quote \"memento mori, memento vivere - Remember you must die, so remember to live\" \n\nDhyan rkhio kudiye apna🥺\nBye meri arushee 🥹🫂💖\n\nLove you 3000 ❤️\n\n✨ THE END ✨";
  const conclusionTextEl = document.getElementById("conclusionText");

  typewriterEffect(conclusionTextEl, conclusionText);
}

// Background Music Management
let backgroundMusic = {
  currentTrack: 0,
  isPlaying: false,
  volume: 30,
  tracks: [
    'IpFX2vq8HKw',
    'Ip6cw8gfHHI',
    'nyuo9-OjNNg',
    'MgNItWdfEIU',
    'n89SKAymNfA',
    'QQQ_eSi8kAo'
  ],
  player: null,
  isPaused: false
};

// YouTube API integration
function initializeBackgroundMusic() {
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// YouTube API ready callback
window.onYouTubeIframeAPIReady = function() {
  backgroundMusic.player = new YT.Player('hiddenMusicPlayer', {
    height: '1',
    width: '1',
    videoId: backgroundMusic.tracks[backgroundMusic.currentTrack],
    playerVars: {
      autoplay: 0,
      loop: 1,
      controls: 0,
      showinfo: 0,
      rel: 0,
      modestbranding: 1,
      iv_load_policy: 3
    },
    events: {
      onReady: onMusicPlayerReady,
      onStateChange: onMusicPlayerStateChange
    }
  });
};

function onMusicPlayerReady(event) {
  event.target.setVolume(backgroundMusic.volume);
  updateMusicToggleButton();

  // Setup music toggle button
  const musicToggle = document.getElementById('musicToggle');
  if (musicToggle) {
    musicToggle.addEventListener('click', toggleBackgroundMusic);
  }
}

function onMusicPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    backgroundMusic.currentTrack = (backgroundMusic.currentTrack + 1) % backgroundMusic.tracks.length;
    backgroundMusic.player.loadVideoById(backgroundMusic.tracks[backgroundMusic.currentTrack]);
  }
}

function pauseBackgroundMusic() {
  if (backgroundMusic.player && backgroundMusic.isPlaying && !backgroundMusic.isPaused) {
    backgroundMusic.player.pauseVideo();
    backgroundMusic.isPaused = true;
  }
}

function resumeBackgroundMusic() {
  if (backgroundMusic.player && backgroundMusic.isPlaying && backgroundMusic.isPaused) {
    backgroundMusic.player.playVideo();
    backgroundMusic.isPaused = false;
  }
}

function toggleBackgroundMusic() {
  if (backgroundMusic.player) {
    if (backgroundMusic.isPlaying) {
      backgroundMusic.player.pauseVideo();
      backgroundMusic.isPlaying = false;
    } else {
      backgroundMusic.player.playVideo();
      backgroundMusic.isPlaying = true;
      backgroundMusic.isPaused = false;
    }
    updateMusicToggleButton();
  }
}

function updateMusicToggleButton() {
  const button = document.getElementById('musicToggle');
  if (button) {
    button.textContent = (backgroundMusic.isPlaying && !backgroundMusic.isPaused) ? '🎵' : '🔇';
    button.title = backgroundMusic.isPlaying ? 'Pause Music' : 'Play Music';
  }
}

// Gift video function removed - using existing video in Wait section as the gift

// Initialize background music when page loads
document.addEventListener('DOMContentLoaded', () => {
  initializeBackgroundMusic();

  // Auto-start music after first user interaction
  const startMusicOnInteraction = () => {
    if (backgroundMusic.player && !backgroundMusic.isPlaying) {
      backgroundMusic.player.playVideo();
      backgroundMusic.isPlaying = true;
      updateMusicToggleButton();
    }
    document.removeEventListener('click', startMusicOnInteraction);
  };

  document.addEventListener('click', startMusicOnInteraction);
});

// Performance cleanup
window.addEventListener('beforeunload', () => {
  clearAllTimeouts();

  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.pause();
    video.src = '';
  });

  if (backgroundMusic.player) {
    backgroundMusic.player.destroy();
  }
});

// Video control setup function - manual play/pause only
function setupVideoControls() {
  const videos = document.querySelectorAll('video');
  videos.forEach((video) => {
    video.controls = false;
    video.autoplay = false;
    video.loop = false;

    // Add click functionality for play/pause
    video.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        video.classList.add('enlarged');
      } else {
        video.pause();
        video.classList.remove('enlarged');
      }
    });

    video.addEventListener('ended', () => {
      video.pause();
      video.classList.remove('enlarged');
      resumeBackgroundMusic();
    });

    // Pause background music when video starts
    video.addEventListener('play', () => {
      pauseBackgroundMusic();
    });

    // Resume background music when video pauses
    video.addEventListener('pause', () => {
      resumeBackgroundMusic();
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
