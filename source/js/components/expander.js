import React from 'react';
import classnames from "classnames";

var Expander = React.createClass({
  render: function() {
    return (
      <div className="expander">
        {this.props.children}
      </div>
    );
  }
});

var Panel = React.createClass({
  propTypes: {
    children: React.PropTypes.any.isRequired,
    itemKey: React.PropTypes.string.isRequired,
    activeKey: React.PropTypes.string.isRequired,
    index: React.PropTypes.number.isRequired,
    header: React.PropTypes.string.isRequired
  },
  onClick: function() {
    var itemKey = this.props.itemKey;

    if (itemKey === this.props.activeKey) {
      itemKey = ``;
    }
    this.props.activateKey(itemKey);
  },
  scrollStep: function(initialTime, initialTop) {
    var container = this.container;
    var currentTop = container.getBoundingClientRect().top;
    var timeDiff = new Date().getTime() - initialTime;
    if (timeDiff <= 300) {
      if (currentTop < initialTop) {
        window.scrollTo(0, window.scrollY - (initialTop - currentTop));
      }
      window.requestAnimationFrame(() => {
        this.scrollStep(initialTime, initialTop);
      });
    }
  },
  setHeight: function() {
    var expanded = this.props.itemKey === this.props.activeKey;
    var container = this.container;
    var finalScrollPosition = `0`;

    if (this.content) {
      if (expanded) {
        finalScrollPosition = this.headerElement.offsetParent.offsetTop + ((this.headerElement.offsetHeight) * this.props.index);
        if (window.scrollY + 50 > finalScrollPosition) {
          this.scrollStep(new Date().getTime(), container.getBoundingClientRect().top);
        }
        container.style.height = this.content.offsetHeight + `px`;
      } else if (container.style.height !== `0`) {
        container.style.height = `0`;
      }
    }
  },
  componentDidUpdate: function() {
    this.setHeight();
  },
  componentDidMount: function() {
    this.setHeight();
    document.addEventListener(`resize`, this.setHeight);
  },
  componentWillUnmount: function() {
    document.removeEventListener(`resize`, this.setHeight);
  },
  render: function() {
    var itemClassName = classnames(`expander-item`, {
      "expander-item-active": this.props.itemKey === this.props.activeKey
    });

    return (
      <div className={itemClassName}>
        <div id={this.props.itemKey} className="nav-offset"></div>
        <div ref={(element) => { this.headerElement = element; }} onClick={this.onClick} className="expander-header">{this.props.header}</div>
        <div ref={(element) => { this.container = element; }} className="expander-content">
          <div ref={(element) => { this.content = element; }}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = {
  Expander,
  Panel
};
