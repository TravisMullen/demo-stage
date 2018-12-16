/* global HTMLElement:false */

const template = document.createElement('template')

const elements = Object.freeze({
  body: 'section',
  header: 'h1'
})

template.innerHTML = `
  <style>
    :host {
      display: block;
    }
    :host([hidden]) {
      display: none;
    }
    ${elements.body} {
      margin: 2rem;
      padding: 2rem;
      transition: background-color .5s ease-out;
    }
    ${elements.body} ${elements.header} {
      text-align: center;
      margin-top: 1rem;
      color: white;
    }
  </style>
  <${elements.body}>
    <${elements.header}></${elements.header}>
  </${elements.body}>
`

class DemoStage extends HTMLElement {
  constructor () {
    super()

    Object.defineProperty(this, 'defaults', {
      value: Object.freeze({
        headline: 'Default headline text.',
        color: '#444'
      }),
      enumerable: true,
      writable: false,
      configurable: false
    })

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this.displayVal = this.shadowRoot.querySelector(elements.header)
    this.styleElement = this.shadowRoot.querySelector(elements.body)
  }

  connectedCallback () {
    if (!this.hasAttribute('headline')) {
      this.setAttribute('headline', this.defaults.headline)
    }
    if (!this.hasAttribute('color')) {
      this.setAttribute('color', this.defaults.color)
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
      this.setAttribute('color', this.defaults.color)
    }
  }
}

window.customElements.define('demo-stage', DemoStage)

export { DemoStage as default }
