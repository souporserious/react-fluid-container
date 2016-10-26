## React Fluid Container

[![npm version](https://badge.fury.io/js/react-fluid-container.svg)](https://badge.fury.io/js/react-fluid-container)
[![Dependency Status](https://david-dm.org/souporserious/react-fluid-container.svg)](https://david-dm.org/souporserious/react-fluid-container)

Graceful dynamic/variable height animation.

## Install

`npm install react-fluid-container --save`

```html
<script src="https://unpkg.com/react-fluid-container/dist/react-fluid-container.js"></script>
(UMD library exposed as `ReactFluidContainer`)
```

### Example

[Codepen Demo](http://codepen.io/souporserious/pen/akjyWv)

```js
import FluidContainer from 'react-fluid-container'

class App extends Component {
  constructor() {
    super(props)
    this.state = {
      showPanel: false
    }
  }

  render() {
    const { showPanel } = this.state
    return (
      <div className="accordion">
        <div
          onClick={() => this.setState({ showPanel: !showPanel })}
          className="accordion-title"
        >
          Toggle accordion
        </div>
        <FluidContainer
          height={showPanel ? 'auto' : 0}
          className="accordion-panel"
        >
          <div>Auto height animation!</div>
        </FluidContainer>
      </div>
    )
  }
}
```

## Props

#### `tag`: PropTypes.string

The wrapping element around your only `child` element. Defaults to `div`. Any other valid props like `className` will be passed to this element.

#### `height`: PropTypes.oneOf(['auto', PropTypes.number])

The height value you want to animate to. Defaults to `auto`.

#### `rmConfig`: React.PropTypes.objectOf(React.PropTypes.number)

Pass in any valid [React Motion config object](https://github.com/chenglou/react-motion#--spring-val-number-config-springhelperconfig--opaqueconfig).

#### `children`: PropTypes.node.isRequired (only one child allowed)

Only one child is allowed and is what the measurements will be based off of. This should be considered a pretty "dumb" element that is just a wrapper to measure off of. Make sure there are no margins are "hanging" outside of your elements. You can use 1px padding to avoid this.

#### `beforeAnimation`: PropTypes.func(currentHeight, nextHeight)

Callback before animation has started. Passes in previous and next heights.

#### `afterAnimation`: PropTypes.func

Callback after animation has completed.

## Running Locally

clone repo

`git clone git@github.com:souporserious/react-fluid-container.git`

move into folder

`cd ~/react-fluid-container`

install dependencies

`npm install`

run dev mode

`npm run dev`

open your browser and visit: `http://localhost:8080/`
