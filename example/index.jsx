import React, { Component, PropTypes, Children, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import { AriaManager, AriaToggle, AriaPopover, AriaItem, AriaTabList, AriaTab, AriaPanel } from 'react-aria'
import FluidContainer from '../src/react-fluid-container'

import './main.scss'

class Accordion extends Component {
  state = {
    tabs: [{
      tab: 'one',
      panel: <div>Some cool content for accordion one.</div>
    }, {
      tab: 'two',
      panel: <div style={{ padding: 1 }}><p>Some cool content for accordion two.</p><p>Some extra cool content for accordion two 💃</p></div>
    }, {
      tab: 'three',
      panel: <div>Some cool content for accordion three.</div>
    }]
  }

  render() {
    const { tabs } = this.state
    return (
      <AriaManager type="accordion">
        <div>
          <h3>Accordion</h3>
          <AriaTabList className="accordion-group">
            {tabs.map(({ tab, panel }) =>
              <div key={tab} className="accordion">
                <AriaTab id={tab} className="accordion-tab">
                  {tab}
                </AriaTab>
                <AriaPanel controlledBy={tab}>
                  {(props, isActive) => (
                    <FluidContainer
                      {...props}
                      height={isActive ? 'auto' : 0}
                      style={{ overflow: 'hidden' }}
                      className="accordion-panel"
                    >
                      {panel}
                    </FluidContainer>
                  )}
                </AriaPanel>
              </div>
            )}
          </AriaTabList>
        </div>
      </AriaManager>
    )
  }
}

class Tabs extends Component {
  state = {
    tabs: [{
      id: 't1',
      title: '🍗 Bacon',
      panel: <div><p>Bacon ipsum dolor amet pork prosciutto tail ground round cow pancetta ham beef.  Brisket cupim shoulder drumstick turkey sausage cow pork beef pig venison boudin.  Ham hock bacon hamburger alcatra boudin shank shankle porchetta short ribs.  Jowl shank shoulder, pork belly tail ham hock ribeye fatback sirloin doner beef swine ground round meatball hamburger.</p><p>Venison pork turkey jerky pig.  Kevin andouille pastrami, ham hock sausage landjaeger sirloin tri-tip spare ribs boudin kielbasa tenderloin bresaola.  Short loin ribeye biltong capicola salami tenderloin, fatback ground round rump sirloin meatloaf porchetta.  Pork loin alcatra short loin ham hock kevin salami beef ribs filet mignon leberkas.  Bresaola pork landjaeger, tail jowl t-bone corned beef.  Cupim ground round tail brisket, pork belly short loin t-bone.  Beef ribs pork chop kevin short ribs frankfurter alcatra ball tip ground round jerky.</p></div>
    }, {
      id: 't2',
      title: '👨🏿 Sam L Jackson',
      panel: <div><h1>No man, I don't eat pork</h1><p>Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass.</p><p>Your bones don't break, mine do. That's clear. Your cells react to bacteria and viruses differently than mine. You don't get sick, I do. That's also clear. But for some reason, you and I react the exact same way to water. We swallow it too fast, we choke. We get some in our lungs, we drown. However unreal it may seem, we are connected, you and I. We're on the same curve, just on opposite ends.</p> <Accordion/></div>
    }, {
      id: 't3',
      title: '💀 Zombiez',
      panel: <div><p>Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris. Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium. Qui animated corpse, cricket bat max brucks terribilem incessu zomby. The voodoo sacerdos flesh eater, suscitat mortuos comedere carnem virus. Zonbi tattered for solum oculi eorum defunctis go lum cerebro.</p></div>
    }],
    activeId: 'two',
    height: 'auto'
  }

  _handleChange = (activeId) => {
    this.setState({ activeId })
  }

  render() {
    const { tabs, activeId, height } = this.state
    return (
      <AriaManager type="tabs">
        <div className="tab-set">
          <h3>Tabs</h3>
          <div style={{ marginBottom: 12 }}>
            <button onClick={() => this.setState({ height: 'auto' })}>
              Auto Height
            </button>
            <input
              type="number"
              step={10}
              onChange={({ target }) => this.setState({ height: +target.value })}
            />
          </div>
          <AriaTabList className="tab-list">
            {tabs.map(({ id, title }) =>
              <AriaTab key={id} id={id}>
                {(props, isActive) => (
                  <div {...props} className={`tab-list-item ${isActive ? 'is-active' : ''}`}>
                    {title}
                  </div>
                )}
              </AriaTab>
            )}
          </AriaTabList>
          <div className="tab-panels">
            <FluidContainer
              height={height}
              style={{ overflow: 'hidden' }}
            >
              <div>
                {tabs.map(({ id, panel }) =>
                  <AriaPanel
                    key={id}
                    controlledBy={id}
                    className="tab-panel"
                  >
                    {panel}
                  </AriaPanel>
                )}
              </div>
            </FluidContainer>
          </div>
        </div>
      </AriaManager>
    )
  }
}

ReactDOM.render(<Tabs/>, document.getElementById('app'))
