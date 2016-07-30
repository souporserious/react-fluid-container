import React, { Component, PropTypes, Children, createElement } from 'react'
import { Motion, spring, presets } from 'react-motion'
import Measure from 'react-measure'
import getPublicProps from './get-public-props'

const privateProps = {
  tag: PropTypes.string,
  height: PropTypes.any,
  rmConfig: React.PropTypes.objectOf(React.PropTypes.number),
  children: PropTypes.node.isRequired,
  beforeAnimation: PropTypes.func,
  afterAnimation: PropTypes.func
}

class FluidContainer extends Component {
  static propTypes = privateProps

  static defaultProps = {
    tag: 'div',
    height: 'auto',
    rmConfig: presets.noWobble,
    beforeAnimation: () => null,
    afterAnimation: () => null
  }

  state = {
    height: 0
  }

  _heightReady = this.props.height !== 'auto'
  _currHeight = null

  componentDidUpdate(lastProps, lastState) {
    // don't apply height until we have our first real measurement
    if (this.props.height > 0 || lastState.height > 0) {
      this._heightReady = true
    }
  }

  _handleMeasure = ({ height }) => {
    // store the height so we can apply it to the element immediately
    // and avoid any element jumping
    if (height > 0) {
      this._currHeight = height
    }
    if (height !== this.state.height) {
      this.props.beforeAnimation(height, this.state.height)
      this.setState({ height })
    }
  }

  _handleRest = () => {
    this.props.afterAnimation()
  }

  render() {
    const { tag, height, rmConfig, children } = this.props
    const publicProps = getPublicProps(this.props, privateProps)
    const rmHeight = (height === 'auto') ? this.state.height : height
    const child = (
      <Measure whitelist={['height']} onMeasure={this._handleMeasure}>
        {Children.only(children)}
      </Measure>
    )

    return (
      <Motion
        defaultStyle={{ _height: rmHeight }}
        style={{
          _height: spring(rmHeight, { precision: 0.5, ...rmConfig })
        }}
        onRest={this._handleRest}
      >
        { ({ _height }) =>
          createElement(tag, {
            ...publicProps,
            style: {
              height: this._heightReady ? _height : (this._currHeight || 'auto'),
              ...publicProps.style
            }
          }, child)
        }
      </Motion>
    )
  }
}

export default FluidContainer
