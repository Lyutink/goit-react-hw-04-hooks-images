import React, { Component } from "react";
import Notiflix from "notiflix";

import { fetchImages } from "./services/fetchImages";
import Searchbar from "./Components/Searchbar/Searchbar";
import ImageGallery from "./Components/ImageGallery/ImageGallery";
import Loader from "./Components/Loader/Loader";
import Button from "./Components/Button/Button";

// 'edle' стоит на месте, простой
// 'pending' ожидается выполнения
// 'resolved' выполнилось с результатом
// 'rejected' отклонено

class App extends Component {
  state = {
    requestFromUser: "",
    images: [],
    status: "edle",
    page: 1,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevRequestFromUser = prevState.requestFromUser;
    const nextRequestFromUser = this.state.requestFromUser;
    const prevPage = prevState.page;
    const newPage = this.state.page;

    if (prevRequestFromUser !== nextRequestFromUser || prevPage !== newPage) {
      this.setState({ status: "pending" });

      fetchImages(nextRequestFromUser, newPage)
        .then((response) => {
          const imagesArr = response.data.hits;

          if (!imagesArr.length) {
            Notiflix.Notify.failure(
              "Sorry, there are no images matching your search query. Please try again."
            );
            this.setState({ status: "rejected", images: [] });
            return;
          }
          console.log("response.data.hits", imagesArr);
          this.setState({
            images: [...this.state.images, ...imagesArr],
            status: "resolved",
          });
        })
        .catch((error) => this.setState({ error, status: "rejected" }));
    }
  }

  handlerSubmit = ({ requestFromUser }) => {
    console.log("handlerSubmit:", requestFromUser);
    if (requestFromUser !== this.state.requestFromUser) {
      this.setState({ requestFromUser: requestFromUser, images: [], page: 1 });
    } else {
      Notiflix.Notify.info("Please, enter new search request.");
    }
  };

  handlerLoaderMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  render() {
    const { status, images } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handlerSubmit} />
        {status !== "edle" && status !== "rejected" && (
          <>
            {status === "pending" && <Loader />}
            {status === "resolved" && (
              <>
                <ImageGallery images={images} />
                <Button type="button" onClick={this.handlerLoaderMore}></Button>
              </>
            )}
          </>
        )}
      </>
    );
  }
}

export default App;
