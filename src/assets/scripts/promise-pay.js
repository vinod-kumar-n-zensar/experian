switchTab = (documentId, selectedTabClassName, thisParam) => {
	console.log(this);
	let idElement = document.getElementById(documentId);
	let classElement = document.getElementsByClassName(selectedTabClassName);
	let activeTabElement = document.getElementsByClassName("promisepay--navtablinkactive");
	activeTabElement[0].classList.remove("promisepay--navtablinkactive");
	thisParam.classList.add("promisepay--navtablinkactive");
	classElement[0].classList.remove(selectedTabClassName);
	idElement.classList.add(selectedTabClassName);
}
switchParentTab = tabId => {
	let tabElement = document.getElementById("tab-"+tabId);
	let panelElement = document.getElementById("tab-panel-"+tabId);
	let panelElements = document.getElementsByClassName("accountsTabPanel");
	let tabElements = document.getElementsByClassName("accountsTab");
	for (element of tabElements) {
		element.setAttribute("aria-selected", false);
	}
	for (element of panelElements) {
		element.removeAttribute("active");
	}
	tabElement.setAttribute("aria-selected", true);
	panelElement.setAttribute("active", true);
	if (tabId == 3) {
		document.getElementById("promiseActivity").click();
	}
}