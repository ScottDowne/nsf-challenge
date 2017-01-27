var React = require(`react`);

import StickyContainer from './sticky-container.js';

var MenuLink = React.createClass({
  onClick: function() {
    this.props.activate(this.props.item);
  },
  render: function() {
    var className = "";
    if (this.props.active === this.props.item) {
      className += "active";
    }
    return (
      <a className={className} onClick={this.onClick} href={this.props.href}>{this.props.children}</a>
    );
  }
});

var StickyNav = React.createClass({
  getInitialState: function() {
    return {
      active: window.location.hash.replace("#", "") || ""
    };
  },
  activate: function(active) {
    this.setState({
      active: active || ""
    });
  },
  render: function() {
    var active = this.state.active;
    return (
      <StickyContainer className="sticky-container" stickyFrom={() => 600}>
        <div className="container">
          <MenuLink activate={this.activate} active={active} item="about" href="#about">About</MenuLink>
          <MenuLink activate={this.activate} active={active} item="events" href="#events">Events</MenuLink>
          <MenuLink activate={this.activate} active={active} item="details" href="#details">Details</MenuLink>
        </div>
      </StickyContainer>
    );
  }
});

module.exports = StickyNav;
