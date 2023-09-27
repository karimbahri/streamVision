import Movie from "./movie";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MoviesSlider(props: any) {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return props.data.length ? (
    <div className={"movies-sliders"}>
      <h1 className={"movies-sliders__header"}>{props.section}</h1>
      <Slider {...settings}>
        {props.data.map((movie: any) => (
          <Movie key={movie.id} />
        ))}
      </Slider>
    </div>
  ) : undefined;
}
//
