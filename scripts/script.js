// ---------- ALAB 316.1.1: DOM Manipulation (Part One) ----------
// Menu data structure
var menuLinks = [
  { text: "about", href: "/about" },
  {
    text: "catalog",
    href: "#",
    subLinks: [
      { text: "all", href: "/catalog/all" },
      { text: "top selling", href: "/catalog/top" },
      { text: "search", href: "/catalog/search" },
    ],
  },
  {
    text: "orders",
    href: "#",
    subLinks: [
      { text: "new", href: "/orders/new" },
      { text: "pending", href: "/orders/pending" },
      { text: "history", href: "/orders/history" },
    ],
  },
  {
    text: "account",
    href: "#",
    subLinks: [
      { text: "profile", href: "/account/profile" },
      { text: "sign out", href: "/account/signout" },
    ],
  },
];

// ---------- Part 1: Getting Started ----------
// Select and cache the <main> element in a variable named mainEl.
let mainEl = document.querySelector(`main`);
console.log(mainEl);

// Set the background color of mainEl to the value stored in the --main-bg CSS custom property.
// Hint: Assign a string that uses the CSS var() function like this: 'var(--main-bg)'.
mainEl.style.backgroundColor = `var(--main-bg)`;

// Set the content of mainEl to <h1>DOM Manipulation</h1>. There are a variety of ways to do this; pick whichever one that you think works best in this situation.
mainEl.innerHTML = `<h1>DOM Manipulation</h1>`;

// Add a class of flex-ctr to mainEl.
mainEl.classList.add(`flex-ctr`);

// ---------- Part 2: Creating a Menu Bar ----------
// Select and cache the <nav id="top-menu"> element in a variable named topMenuEl.
let topMenuEl = document.getElementById(`top-menu`);

// Set the height of the topMenuEl element to be 100%.
topMenuEl.style.height = `100%`;

// Set the background color of topMenuEl to the value stored in the --top-menu-bg CSS custom property.
topMenuEl.style.backgroundColor = `var(--top-menu-bg)`;

// Add a class of flex-around to topMenuEl.
topMenuEl.classList.add(`flex-around`);

// ---------- (In Class) Part 3: Adding Menu Buttons ----------
// Iterate over the entire menuLinks array and for each "link" object:
menuLinks.forEach((link) => {
  // Create an <a> element.
  let newLink = document.createElement(`a`);
  // On the new element, add an href attribute with its value set to the href property of the "link" object.
  newLink.setAttribute(`href`, link.href);
  // Set the new element's content to the value of the text property of the "link" object.
  newLink.textContent = link.text;
  // Append the new element to the topMenuEl element.
  topMenuEl.appendChild(newLink);
});

// ---------- R-ALAB 316.3.1:DOM Manipulation (Part Two) ----------
// ---------- Part 3: Creating the Submenu ----------
// 1. Select and cache the <nav id="sub-menu"> element in a variable named subMenuEl.
let subMenuEl = document.getElementById(`sub-menu`);

// 2. Set the height subMenuEl element to be "100%".
subMenuEl.style.height = `100%`;

// 3. Set the background color of subMenuEl to the value stored in the --sub-menu-bg CSS custom property.
subMenuEl.style.backgroundColor = `var(--sub-menu-bg)`;

// 4. Add the class of flex-around to the subMenuEl element.
subMenuEl.classList.add(`flex-around`);

// 1. Set the CSS position property of subMenuEl to the value of absolute.
subMenuEl.style.position = `absolute`;

// 2. Set the CSS top property of subMenuEl to the value of 0.
subMenuEl.style.top = `0`;

// ---------- Part 4: Adding Menu Interaction ----------
// 1. Select and cache the all of the <a> elements inside of topMenuEl in a variable named topMenuLinks.
let topMenuLinks = topMenuEl.getElementsByTagName(`a`);
// 2. Attach a delegated 'click' event listener to topMenuEl.
topMenuEl.addEventListener(`click`, handleClick);

function handleClick(event) {
  //   console.log(event);
  // The first line of code of the event listener function should call the event object's preventDefault() method.
  event.preventDefault();
  // The second line of code of the function should immediately return if the element clicked was not an <a> element.
  if (event.target.nodeName != `A`) return;
  // Log the content of the <a> to verify the handler is working.
  console.log(event.target.textContent);

  // 1. The event listener should add the active class to the <a> element that was clicked, unless it was already active, in which case it should remove it.
  // 2. The event listener should remove the active class from each other <a> element in topMenuLinks - whether the active class exists or not.
  // Hint: Removing a non-existent class from an element does not cause an error!
  for (i = 0; i < topMenuLinks.length; i++) {
    topMenuLinks[i].classList.remove(`active`);
  }
  event.target.classList.add(`active`);
  //differentiate two tag names by class

  // ---------- Part 5: Adding Submenu Interaction ----------
  for (let j = 0; j < menuLinks.length; j++) {
    if (menuLinks[j].text === event.target.textContent) {
      item = menuLinks[j];
      //   console.log(item)
      if (menuLinks[j].subLinks) {
        // console.log(menuLinks[j].subLinks);
        subItems = menuLinks[j].subLinks;
        subMenuEl.style.top = `100%`;
        buildSubmenu(subItems);
      } else {
        subMenuEl.style.top = `0`;
      }
    }
  }
}

// Helper function
function buildSubmenu(subLinks) {
  // 1. Clear the current contents of subMenuEl.
  subMenuEl.innerHTML = ``;
  // 2. Iterate over the subLinks array, passed as an argument, and for each "link" object:
  subLinks.forEach((link) => {
    // a. Create an <a> element.
    const anchor = document.createElement(`a`);
    // b. Add an href attribute to the <a>, with the value set by the href property of the "link" object.
    anchor.setAttribute(`href`, link.href);
    // c. Set the element's content to the value of the text property of the "link" object.
    anchor.textContent = link.text;
    // d. Append the new element to the subMenuEl.
    subMenuEl.appendChild(anchor);
  });
}

// 1. Attach a delegated 'click' event listener to subMenuEl.
subMenuEl.addEventListener(`click`, handleSubClick);

// The first line of code of the event listener function should call the event object's preventDefault() method.
function handleSubClick(evt) {
  evt.preventDefault();
  // The second line of code within the function should immediately return if the element clicked was not an <a> element.
  if (evt.target.nodeName != `A`) return;
  // Log the content of the <a> to verify the handler is working.
  console.log(evt.target.textContent);
  // 2. Next, the event listener should set the CSS top property of subMenuEl to 0.
  subMenuEl.style.top = `0`;
  // 3. Remove the active class from each <a> element in topMenuLinks.
  for (i = 0; i < topMenuLinks.length; i++) {
    topMenuLinks[i].classList.remove(`active`);
  }
  // 4. Update the contents of mainEl, within an <h1>, to the contents of the <a> element clicked within subMenuEl.
  //   console.log(mainEl.getElementsByTagName(`h1`))

  let heading = mainEl.getElementsByTagName(`h1`);
  // heading.textContent = subMenuEl.textContent;
  for (i = 0; i < heading.length; i++) {
    // console.log(heading[i]);
    //     // for(let k in heading.)

    let subHeading = subMenuEl.getElementsByTagName(`a`);
    for (f = 0; f < subHeading.length; f++) {
      let subHeadingList = subHeading[f];
      for (c = 0; c < subHeadingList.length; c++) {
        console.log(subHeadingList[c].textContent);

        // heading[i].textContent = subMenuEl.textContent;
        // console.log(heading[i].textContent);
        // console.log(subMenuEl.textContent)
        // })
        heading[i].textContent = subHeadingList[c].textContent;
      }
    }
  }
  //   for(let el in mainEl){
  //     console.log(el)
  //   }

  // 5. If the ABOUT link is clicked, an <h1>About</h1> should be displayed.
}

// ---------- Part 6: Completion and Code Review ----------
