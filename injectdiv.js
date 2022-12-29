const helper = document.createElement('div');
helper.setAttribute('id', 'helper-root');
css(helper, {
  'z-index': 20000,
  position: 'fixed',
  bottom: '1em',
  left: '1em',
  padding: '.5em',
  'background-color': 'white',
  border: '1px solid #dcdcdc',
  'border-radius': '0.25rem',
  opacity: '0.95',
  'max-height': '400px',
  'overflow-y': 'scroll'
})
document.body.appendChild(helper);

function css(element, style) {
  for (const prop in style) {
    element.style[prop] = style[prop]
  }
}