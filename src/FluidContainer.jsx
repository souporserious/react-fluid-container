import React, { Component, PropTypes, Children, createElement, cloneElement } from 'react'
import { Motion, spring, presets } from 'react-motion'
import Measure from 'react-measure'

class FluidContainer extends Component {
  static propTypes = {
    tag: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
    rmConfig: React.PropTypes.objectOf(React.PropTypes.number),
    children: PropTypes.node.isRequired,
    beforeAnimation: PropTypes.func,
    afterAnimation: PropTypes.func
  }

  static defaultProps = {
    tag: 'div',
    height: 'auto',
    rmConfig: presets.noWobble,
    beforeAnimation: () => null,
    afterAnimation: () => null
  }

  constructor(props) {
    super(props)
    this.state = {
      height: 0
    }
    this._heightReady = props.height !== 'auto'
    this._currHeight = null
    this._firstMeasure = true
  }

  componentDidUpdate(lastProps, lastState) {
    // if height has changed fire a callback before animation begins
    if (lastProps.height !== this.props.height) {
      this.props.beforeAnimation(lastProps.height, this.props.height)
    }

    // don't apply height until we have our first real measurement
    if (lastState.height > 0 || this.props.height > 0) {
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
      // don't fire callback on first measure
      if (!this._firstMeasure) {
        this.props.beforeAnimation(this.state.height, height)
      } else {
        this._firstMeasure = false
      }

      this.setState({ height })
    }
  }

  _handleRest = () => {
    this.props.afterAnimation()
  }

  _handleInput = (e) => {
    const child = Children.only(this.props.children)

    this._measureComponent.measure()

    if (typeof child.props.onInput === 'function') {
      child.props.onInput(e)
    }
  }

  render() {
    const { tag, height, rmConfig, children, beforeAnimation, afterAnimation, ...restProps } = this.props
    const rmHeight = (height === 'auto') ? this.state.height : height
    const child = (
      <Measure
        ref={c => this._measureComponent = c}
        whitelist={['height']}
        onMeasure={this._handleMeasure}
      >
        {cloneElement(Children.only(children), { onInput: this._handleInput })}
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
            ...restProps,
            style: {
              height: this._heightReady ? _height : (this._currHeight || 'auto'),
              ...restProps.style
            }
          }, child)
        }
      </Motion>
    )
  }
}

export default FluidContainer
