class AppBody extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = "Hello App";
	}
}
customElements.define("app-body", AppBody);
