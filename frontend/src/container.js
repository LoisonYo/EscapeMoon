export class Container {
	constructor(element) {
		this.element = element;
		this.content = this.element.firstElementChild;
		this.mouseOver = false;

		// Check if mouse is over the container
		// getBoundingClientRect() doesnt work since it doesnt check visibility
		element.addEventListener('mouseover', () => { this.mouseOver = true; });
		element.addEventListener('mouseout', () => { this.mouseOver = false; });
	}	
		
	freeContent() {
		this.element.innerHTML = "";
		this.content = null;
	}
	
	setContent(element) {
		let content = this.content;
		this.freeContent();
		this.content = element;
		this.element.appendChild(element);
		
		return content;
	}
}