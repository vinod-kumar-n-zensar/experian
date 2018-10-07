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