switchTab = (documentId, selectedTabClassName, thisParam) => {
	let idElement = document.getElementById(documentId);
	let classElement = document.getElementsByClassName(selectedTabClassName);
	let activeTabElement = document.getElementsByClassName("promisepay--navtablinkactive");
	activeTabElement[0].setAttribute("aria-selected", false);
	activeTabElement[0].classList.remove("promisepay--navtablinkactive");
	thisParam.classList.add("promisepay--navtablinkactive");
	thisParam.setAttribute("aria-selected", true);
	classElement[0].classList.remove(selectedTabClassName);
	idElement.classList.add(selectedTabClassName);
}

switchParentTab = (tabId, focusOnNotes) => {
	let tabElement = document.getElementById("tab-"+tabId);
	let panelElement = document.getElementById("tab-panel-"+tabId);
	let panelElements = document.getElementsByClassName("accountsTabPanel");
	let tabElements = document.getElementsByClassName("accountsTab");
	for (element of tabElements) {
		if (tabId == 3 && element.id === "tab-0") {
			element.setAttribute("aria-selected", true);
		} else{
			element.setAttribute("aria-selected", false);
		}
	}
	for (element of panelElements) {
		element.removeAttribute("active");
		element.setAttribute("aria-hidden", true);
		element.setAttribute("tabindex", "-1");
	}
	tabElement.setAttribute("aria-selected", true);
	panelElement.setAttribute("active", true);
	panelElement.setAttribute("aria-hidden", false);
	panelElement.setAttribute("tabindex", "0");
	if (tabId == 3) {
		document.getElementById("promiseActivity").click();
		document.getElementById("promise__actsection").children[0].children[1].children[0].classList.add("promisepay--linkactive");
	}
	if (focusOnNotes) {
		let accountsActivityElement = document.getElementById("accountsActivity");
		let accountsNotesElement = accountsActivityElement.children[1];
			getElement(accountsActivity, false, 0, accountsNotesElement);
		let noteElement = document.getElementById("notes__text");
			noteElement.focus();
	}
}

setTabAria = (element, setProperty, setTabindex) => {
	element.setAttribute("aria-hidden", setProperty);
	element.setAttribute("tabindex", setTabindex);
}

setAllElements = (elements, setProperty, setTabindex) => {
	for (element of elements) {
		setTabAria(element, true, -1);
		if (element.children.length) {
			setAllElements(element.children, setProperty, setTabindex);
		}
	}
}

getElement = (elementId, setProperty, setTabindex, element) => {
	let activityElement = element || document.getElementById(elementId);
		setTabAria(activityElement, setProperty, setTabindex);
	if (activityElement.children.length) {
		setAllElements(activityElement.children, setProperty, setTabindex);
	}
}

let path = window.location.pathname;
let page = path.split("/").pop();
let headerElement = document.getElementById("header");
let headerLogo = document.getElementById("header__logoid");
let headerLogodesc = document.getElementById("header__logodescid");
let headerRightLinks = document.querySelectorAll(".header__link");
let property = (!page || page === "index.html") ? false : true;
let tabindex = (!page || page === "index.html") ? 0 : -1;
setTabAria(headerElement, property, tabindex);
setTabAria(headerLogo, property, tabindex);
setTabAria(headerLogodesc, property, tabindex);
getElement("profileActivities", true, -1);
getElement("promise__actsection", true, -1);
getElement("promiseProfile", true, -1);
getElement("goHome", true, -1);
// getElement("closeCase", true, -1);
let accountsActivityElement = document.getElementById("accountsActivity");
let accountsNotesElement = accountsActivityElement.children[1];
getElement(accountsActivity, true, -1, accountsNotesElement);
// getElement("tabNav", true, -1);

for (element of headerRightLinks) {
	setTabAria(element, property, tabindex);
}

toggleMemo = () =>{
	let memoElement = document.getElementsByClassName("memodetail");
	for (element of memoElement){
		let activeValue = element.getAttribute("active") == "true" ? false : true;
		element.setAttribute("active", activeValue);
	}
}

// let contactPhoneElement = document.getElementById("contactPhone");
// contactPhoneElement.addEventListener('focus',function(e){
// 	getElement("tabNav", false, 0);
// 	getElement("tab-0", false, 0);
// 	getElement("tab-1", false, 0);
// }, true);

// contactPhoneElement.addEventListener('blur',function(e){
// 	setTimeout(function(){
// 		let accountTabElement = document.getElementById("tab-0");
// 			accountTabElement.focus();
// 	}, 1);
// }, true);