import React from "react";
import { useState, useEffect } from "react";
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

export default function App() {
  const [requestFromUser, setRequestFromUser] = useState("");
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("edle");
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  const handlerSubmit = (newRequestFromUser) => {
    console.log("NewhandlerSubmit:", newRequestFromUser);
    if (newRequestFromUser !== requestFromUser) {
      setRequestFromUser(newRequestFromUser);
      setImages([]);
      setPage(1);
    } else {
      Notiflix.Notify.info("Please, enter new search request.");
    }
  };

  const handlerLoaderMore = () => {
    setPage((prevState) => prevState + 1);
  };

  useEffect(() => {
    setStatus("pending");

    if (!requestFromUser) {
      setStatus("edle");
      Notiflix.Notify.info("Please, enter a new request.");
      return;
    }

    fetchImages(requestFromUser, page)
      .then((response) => {
        const imagesArr = response.data.hits;

        if (!imagesArr.length) {
          Notiflix.Notify.failure(
            "Sorry, there are no images matching your search query. Please try again."
          );
          setStatus("rejected");
          setImages([]);
          return;
        }
        console.log("response.data.hits", imagesArr);
        // this.setState({
        //   images: [...this.state.images, ...imagesArr],
        //   status: "resolved",
        // });
        //imagesArr ?
        //   setImages((imagesArr) => [ ...imagesArr])
        // :
        // setImages((imagesArr) => [...imagesArr]);
        //setImages([...imagesArr]);
        setImages(images.concat(imagesArr));
        setStatus("resolved");
      })
      .catch((error) => {
        setStatus("rejected");
        setError(error);
      });
  }, [requestFromUser, page]);

  return (
    <>
      <Searchbar onSubmit={handlerSubmit} />
      {status !== "edle" && status !== "rejected" && (
        <>
          {status === "pending" && <Loader />}
          {status === "resolved" && (
            <>
              <ImageGallery images={images} />
              <Button type="button" onClick={handlerLoaderMore}></Button>
            </>
          )}
        </>
      )}
    </>
  );
}
// class App extends Component {
//   state = {
//     requestFromUser: "",
//     images: [],
//     status: "edle",
//     page: 1,
//     error: null,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const prevRequestFromUser = prevState.requestFromUser;
//     const nextRequestFromUser = this.state.requestFromUser;
//     const prevPage = prevState.page;
//     const newPage = this.state.page;

//     if (prevRequestFromUser !== nextRequestFromUser || prevPage !== newPage) {
//       this.setState({ status: "pending" });

//       fetchImages(nextRequestFromUser, newPage)
//         .then((response) => {
//           const imagesArr = response.data.hits;

//           if (!imagesArr.length) {
//             Notiflix.Notify.failure(
//               "Sorry, there are no images matching your search query. Please try again."
//             );
//             this.setState({ status: "rejected", images: [] });
//             return;
//           }
//           console.log("response.data.hits", imagesArr);
//           this.setState({
//             images: [...this.state.images, ...imagesArr],
//             status: "resolved",
//           });
//         })
//         .catch((error) => this.setState({ error, status: "rejected" }));
//     }
//   }

//   handlerSubmit = ({ requestFromUser }) => {
//     console.log("handlerSubmit:", requestFromUser);
//     if (requestFromUser !== this.state.requestFromUser) {
//       this.setState({ requestFromUser: requestFromUser, images: [], page: 1 });
//     } else {
//       Notiflix.Notify.info("Please, enter new search request.");
//     }
//   };

//   handlerLoaderMore = () => {
//     this.setState((prevState) => ({ page: prevState.page + 1 }));
//   };

//   render() {
//     const { status, images } = this.state;

//     return (
//       <>
//         <Searchbar onSubmit={this.handlerSubmit} />
//         {status !== "edle" && status !== "rejected" && (
//           <>
//             {status === "pending" && <Loader />}
//             {status === "resolved" && (
//               <>
//                 <ImageGallery images={images} />
//                 <Button type="button" onClick={this.handlerLoaderMore}></Button>
//               </>
//             )}
//           </>
//         )}
//       </>
//     );
//   }
// }

// export default App;
