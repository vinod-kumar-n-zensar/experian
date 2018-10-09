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
switchParentTab = tabId => {
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
}

let path = window.location.pathname;
let page = path.split("/").pop();
let headerElement = document.getElementById("header");
let headerLogo = document.getElementById("header__logoid");
let headerLogodesc = document.getElementById("header__logodescid");
let headerRightLinks = document.querySelectorAll(".header__link");
let property = page === "index.html" ? false : true;
let tabindex = (!page || page === "index.html") ? 0 : -1;
headerElement.setAttribute("aria-hidden", property);
headerElement.setAttribute("tabindex", tabindex);
headerLogo.setAttribute("tabindex", tabindex);
headerLogo.setAttribute("aria-hidden", property);
headerLogodesc.setAttribute("tabindex", tabindex);
headerLogodesc.setAttribute("aria-hidden", property);
for(element of headerRightLinks){
element.setAttribute("tabindex", tabindex);
element.setAttribute("aria-hidden", property);
}

toggleMemo = () =>{
	let memoElement = document.getElementsByClassName("memodetail");
	for (element of memoElement){
		let activeValue = element.getAttribute("active") == "true" ? false : true;
		element.setAttribute("active", activeValue);
	}
}