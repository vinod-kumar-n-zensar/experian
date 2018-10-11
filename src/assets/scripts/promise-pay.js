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
	let accountsActivityElement = document.getElementById("accountsActivity");
	if (focusOnNotes) {
		let accountsNotesElement = accountsActivityElement.children[1];
		getElement("accountsActivity", false, 0, accountsNotesElement, true);
		let noteElement = document.getElementById("notes__text");
			noteElement.focus();
	} else {
		let accountsNotesElement = accountsActivityElement.children[1];
		getElement("accountsActivity", true, -1, accountsNotesElement);
	}
}

setTabAria = (element, setProperty, setTabindex, removeAttr) => {
	if (element && !removeAttr) {
		element.setAttribute("aria-hidden", setProperty);
		element.setAttribute("tabindex", setTabindex);
	} else if (element && removeAttr) {
		element.removeAttribute("aria-hidden");
		element.removeAttribute("tabindex");
	}
}

setAllElements = (elements, setProperty, setTabindex, removeAttr) => {
	for (element of elements) {
		setTabAria(element, setProperty, setTabindex, removeAttr);
		if (element.children.length) {
			setAllElements(element.children, setProperty, setTabindex, removeAttr);
		}
	}
}

getElement = (elementId, setProperty, setTabindex, element, removeAttr) => {
	let activityElement = element || document.getElementById(elementId);
		setTabAria(activityElement, setProperty, setTabindex, removeAttr);
	if (activityElement && activityElement.children && activityElement.children.length) {
		setAllElements(activityElement.children, setProperty, setTabindex, removeAttr);
	}
}

getElement("profileActivities", true, -1);
getElement("promise__actsection", true, -1);
getElement("promiseProfile", true, -1);
let accountsActivityElement = document.getElementById("accountsActivity");
if (accountsActivityElement){
	let accountsNotesElement = accountsActivityElement.children[1];
	getElement("accountsActivity", true, -1, accountsNotesElement);
}
let profileElement = document.getElementById("profileContact");
if (profileElement) {
	let profileThirdElement = profileElement.children[2];
	getElement("profileContact", true, -1, profileThirdElement);
}

toggleMemo = () =>{
	let memoElement = document.getElementsByClassName("memodetail");
	for (element of memoElement){
		let activeValue = element.getAttribute("active") == "true" ? false : true;
		element.setAttribute("active", activeValue);
		element.children[0].setAttribute("aria-expanded", activeValue);
	}
}

document.getElementsByClassName("textNote")[1].removeAttribute("for");
document.getElementsByClassName("textNote")[2].removeAttribute("for");
// document.addEventListener('focus',function(e){
// 	console.log(e);
// }, true);
addRemoveClass = (headingId, panelId) => {
	let collectionElement = document.getElementById(headingId);
	let collectionPanel = document.getElementById(panelId);
	collectionElement.addEventListener('focus',function(e){
		collectionPanel.classList.add("focus");
	}, true);
	collectionElement.addEventListener('blur',function(e){
		collectionPanel.classList.remove("focus");
	}, true);
}
addRemoveClass("accountFirstHeading", "accountFirstPanel");
addRemoveClass("collectionHeading", "collectionPanel");