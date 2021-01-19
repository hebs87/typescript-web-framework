export class UserForm {
  constructor(public parent: Element) {}

  template = (): string => {
    return `
      <div>
        <h1>User Form</h1>
        <input type="text"/>
      </div>
    `;
  };

  render = (): void => {
    // Create a template element, set its inner HTMl to the string rendered in the template method
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();
    // Append the templateElement content to the parent element - content is the actual HTML that gets appended
    this.parent.append(templateElement.content);
  };
}
