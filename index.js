/* global HTMLElement:false */

const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host {
      all: initial;
      display: block;
      contain: content;
    }
    :host([hidden]) {
      display: none;
    }
    article {
      margin: 2rem;
      padding: 2rem;
      transition: background-color .5s ease-out;
    }
    article h1 {
      text-align: center;
      margin-top: 1rem;
      color: white;
    }
  </style>
  <article>
    <h1></h1>
  </article>
`

export class DemoStage extends HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this.displayVal = this.shadowRoot.querySelector('h1')
    this.styleElement = this.shadowRoot.querySelector('article')
  }

  connectedCallback () {
    if (!this.hasAttribute('headline')) {
      this.setAttribute('headline', 'Stage for state preview.')
    }
    if (!this.hasAttribute('color')) {
      this.setAttribute('color', '#444')
    }
  }

  static get observedAttributes () {
    return ['headline', 'color']
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'headline') {
      this.displayVal.innerText = this.headline
    }
    if (name === 'color') {
      this.styleElement.style.backgroundColor = this.color
    }
  }

  get headline () {
    return this.getAttribute('headline')
  }

  get color () {
    return this.getAttribute('color')
  }

  set headline (newValue) {
    this.setAttribute('headline', newValue)
  }

  set color (newValue) {
    this.setAttribute('color', newValue)
  }
}

window.customElements.define('demo-stage', DemoStage)

export default DemoStage