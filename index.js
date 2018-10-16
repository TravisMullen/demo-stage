/* global HTMLElement:false */

const template = document.createElement('template')

const elements = Object.freeze({
  main: 'section',
  header: 'h1'
})

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
    ${elements.main} {
      margin: 2rem;
      padding: 2rem;
      transition: background-color .5s ease-out;
    }
    ${elements.main} ${elements.header} {
      text-align: center;
      margin-top: 1rem;
      color: white;
    }
  </style>
  <${elements.main}>
    <${elements.header}></${elements.header}>
  </${elements.main}>
`

const defaults = Object.freeze({
  headline: 'Stage for state preview.',
  color: '#444'
})

class DemoStage extends HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this.displayVal = this.shadowRoot.querySelector(elements.header)
    this.styleElement = this.shadowRoot.querySelector(elements.main)
  }

  connectedCallback () {
    if (!this.hasAttribute('headline')) {
      this.setAttribute('headline', defaults.headline)
    }
    if (!this.hasAttribute('color')) {
      this.setAttribute('color', defaults.color)
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
    if (newValue) {
      this.setAttribute('color', newValue)
    } else {
      this.setAttribute('color', defaults.color)
    }
  }
}

window.customElements.define('demo-stage', DemoStage)

export default DemoStage
