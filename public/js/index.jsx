import React from 'react';
import ReactDOM from 'react-dom';


class CarouselItem extends React.Component {
  constructor() {
    super();
  }

  render() {
    // Change class names if active
    let classNames = "imgcarousel-item-image";
    if (this.props.isActive) {
      classNames += " imgcarousel-item-image-active";
    }
    return(
      <div className="imgcarousel-item" style={this.props.size}>
        <img className={classNames} src={this.props.src} style={this.props.size} />
      </div>
    );
  }
}

class ImgCarousel extends React.Component {
  constructor() {
    super();

    this.state = {
      "active": 0,
      "timeElapsed": 0,
    };

    this.render = this.render.bind(this);
    this.updateRotation = this.updateRotation.bind(this);
    this.transitionToIndex = this.transitionToIndex.bind(this);
    this.transitionForward = this.transitionForward.bind(this);
    this.transitionBackward = this.transitionBackward.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this.updateRotation, 1000);
  }

  // Counts to rotationTime, then transitions to next image
  updateRotation() {
    this.setState({"timeElapsed": this.state.timeElapsed + 1});
    if (this.state.timeElapsed >= this.props.rotationTime) {
      this.transitionForward();
    }
  }

  // Transition to next image
  transitionForward() {
    this.transitionToIndex((this.state.active + 1) % this.props.items.length);
  }

  // Transition to previous image
  transitionBackward() {
    this.transitionToIndex((this.state.active + this.props.items.length - 1) % this.props.items.length);
  }

  // Transitions to image at index
  transitionToIndex(index) {
    if (index >= 0 && index < this.props.items.length) {
      this.setState({"active": index});
      this.setState({"timeElapsed": 0});
    }
  }

  render() {
    let self = this;

    // Set carousel size according to props
    let carouselSize = {
      height: this.props.height,
      width: this.props.width,
    }

    return(
      <div className="imgcarousel-carousel" style={carouselSize}>
      	{this.props.items.map(function(listValue, index){
            let isActive = (self.state.active == index);
            return <CarouselItem key={index} name={listValue.name} src={listValue.src} isActive={isActive} size={carouselSize}/>;
          })}
        <div className="imgcarousel-select-group-container">
          <div className="imgcarousel-select-group">
            <div className="imgcarousel-arrow imgcarousel-arrow-left" onClick={this.transitionBackward}>
              <img src="images/icons/arrow-left.svg"/>
            </div>
            {this.props.items.map(function(listValue, index){
                let isActive = (self.state.active == index);
                return <CarouselSelect key={index} id={index} transition={self.transitionToIndex} isActive={isActive}/>;
              })}
            <div className="imgcarousel-arrow imgcarousel-arrow-right" onClick={this.transitionForward}>
              <img src="images/icons/arrow-right.svg"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class CarouselSelect extends React.Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  // When clicked, make parent transition to item (id)
  onClick(event) {
    if (!this.props.isActive) {
      this.props.transition(this.props.id)
    }
  }

  render() {
    // Change class names if active
    let classNames = "imgcarousel-select";
    if (this.props.isActive) {
      classNames += " imgcarousel-select-active";
    }
    return(
      <div className={classNames} onClick={this.onClick} />
    );
  }
}

ReactDOM.render(
  <ImgCarousel 
    rotationTime="8" 
    height="400px" 
    width="100%" 
    items={[
      {"name": "image1", "src": "images/river.jpg"}, 
      {"name": "image2", "src": "images/rock.jpg"}, 
      {"name": "image3", "src": "images/sky.jpg"},
      {"name": "image4", "src": "images/snow.jpg"}
    ]}/>,
  document.getElementById('carousel')
);
