import React, { useState, useEffect } from "react";
import StarRatingComponent from 'react-star-rating-component';


class Star extends React.Component {
  constructor(props) {
    super(props);
    var rating = props.likeText  == "Liked" ? true: false;
    console.log("ayoyoo", rating )
    this.state = {
      rating: rating,
    };

  }



  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }

  render() {
    const { rating } = this.state;
    return (
      <div className = "dv-star-rating.star">
        <h2>{rating}</h2>
        <StarRatingComponent
          name="rate1"
          starCount={1}
          value = {rating === true ? 1: 0 }
          onStarClick={this.onStarClick.bind(this)}
        />
      </div>
    );
  }
}

export default Star;
