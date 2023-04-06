import "./FeaturedNews.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}

const FeaturedNews = () => {
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    // nextArrow: <SampleNextArrow/>,
    // prevArrow: <SamplePrevArrow/>,
  };

  return (
    <div className="section-featurednews">
      <div className="featurednews-content">
        <Slider {...settings}>
          <div className="img-custom">
            <h3>1</h3>
          </div>
          <div className="img-custom">
            <h3>2</h3>
          </div>
          <div className="img-custom">
            <h3>3</h3>
          </div>
          <div className="img-custom">
            <h3>4</h3>
          </div>
          <div className="img-custom">
            <h3>5</h3>
          </div>
          <div className="img-custom">
            <h3>6</h3>
          </div>
          
        </Slider>
      </div>
    </div>
  );
};

export { FeaturedNews };
