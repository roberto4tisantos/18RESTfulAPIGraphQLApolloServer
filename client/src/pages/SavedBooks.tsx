import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import { useQuery, useMutation } from "@apollo/client";
import { REMOVE_BOOK } from '../utils/mutations';
import { GET_ME } from "../utils/queries";

interface Book {
  bookId: string;
  image?: string;
  title: string;
  authors: string[];
  description: string;
}

const SavedBooks = () => {
  // Fetch user data using Apollo's useQuery hook
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || { savedBooks: [] }; // Default to empty array if no data

  // Apollo mutation hook for removing books
  const [removeBook] = useMutation(REMOVE_BOOK, {
    update(cache, { data: { removeBook } }) {
      cache.modify({
        fields: {
          me(existingUserData = {}) {
            return {
              ...existingUserData,
              savedBooks: existingUserData.savedBooks.filter(
                (book: { bookId: string }) => book.bookId !== removeBook.bookId
              ),
            };
          },
        },
      });
    },
  });

  // Create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId: string) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await deleteBook(bookId, token);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const updatedUser = await response.json();
      // Upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // If data isn't here yet, show a loading message
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className='text-light bg-dark p-5'>
        <Container>
          <h1>{userData.username ? `Viewing ${userData.username}'s saved books!` : 'Viewing saved books!'}</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book: { bookId: Key | null | undefined; image: string | undefined; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; authors: any[]; description: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => {
            return (
              <Col md='4' key={book.bookId}>
                <Card border='dark'>
                  {book.image && (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant='top'
                    />
                  )}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors.join(", ")}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button
                      className='btn-block btn-danger'
                      onClick={() => handleDeleteBook(book.bookId)}
                    >
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;

// 01==================================================================
// import { useState, useEffect } from 'react';
// import { Container, Card, Button, Row, Col } from 'react-bootstrap';

// import { getMe, deleteBook } from '../utils/API';
// import Auth from '../utils/auth';
// import { removeBookId } from '../utils/localStorage';
// import type { User } from '../models/User';

// // import Auth from "../utils/auth";
// // import { useQuery, useMutation, ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
// import { useQuery, useMutation } from "@apollo/client";
// // import { REMOVE_BOOK } from "../graphql/mutations"; // Import GraphQL mutation
// // import { GET_ME } from "../graphql/queries"; // Import GraphQL query
// import { REMOVE_BOOK } from '../utils/mutations';
// import { GET_ME } from "../utils/queries"; // Import GraphQL query
// import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

// // const SavedBooks = () => {
// //   const [userData, setUserData] = useState<User>({
// //     username: '',
// //     email: '',
// //     password: '',
// //     savedBooks: [],
// //   });

//   const SavedBooks = () => {
//     // State to store user data
//     const [setUserData] = useState({ savedBooks: [] });
      
//     // Fetch user data using Apollo's useQuery hook
//     const { loading, data } = useQuery(GET_ME);
//     const userData = data?.me || { savedBooks: [] };
  
//     // Apollo mutation hook for removing books
//     const [removeBook] = useMutation(REMOVE_BOOK, {
//       update(cache, { data: { removeBook } }) {
//         cache.modify({
//           fields: {
//             me(existingUserData = {}) {
//               return {
//                 ...existingUserData,
//                 savedBooks: existingUserData.savedBooks.filter(
//                   (book: { bookId: any; }) => book.bookId !== removeBook.bookId
//                 ),
//               };
//             },
//           },
//         });
//       },
//     });  

//   // use this to determine if `useEffect()` hook needs to run again
//   const userDataLength = Object.keys(userData).length;

//   useEffect(() => {
//     const getUserData = async () => {
//       try {
//         const token = Auth.loggedIn() ? Auth.getToken() : null;

//         if (!token) {
//           return false;
//         }

//         const response = await getMe(token);

//         if (!response.ok) {
//           throw new Error('something went wrong!');
//         }

//         const user = await response.json();
//         setUserData(user);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     getUserData();
//   }, [userDataLength]);

//   // create function that accepts the book's mongo _id value as param and deletes the book from the database
//   const handleDeleteBook = async (bookId: string) => {
//     const token = Auth.loggedIn() ? Auth.getToken() : null;

//     if (!token) {
//       return false;
//     }

//     try {
//       const response = await deleteBook(bookId, token);

//       if (!response.ok) {
//         throw new Error('something went wrong!');
//       }

//       const updatedUser = await response.json();
//       setUserData(updatedUser);
//       // upon success, remove book's id from localStorage
//       removeBookId(bookId);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // if data isn't here yet, say so
//   if (!userDataLength) {
//     return <h2>LOADING...</h2>;
//   }

//   return (
//     <>
//       <div className='text-light bg-dark p-5'>
//         <Container>
//           {userData.username ? (
//             <h1>Viewing {userData.username}'s saved books!</h1>
//           ) : (
//             <h1>Viewing saved books!</h1>
//           )}
//         </Container>
//       </div>
//       <Container>
//         <h2 className='pt-5'>
//           {userData.savedBooks.length
//             ? `Viewing ${userData.savedBooks.length} saved ${
//                 userData.savedBooks.length === 1 ? 'book' : 'books'
//               }:`
//             : 'You have no saved books!'}
//         </h2>
//         <Row>
//           {userData.savedBooks.map((book: { bookId: Key | null | undefined; image: string | undefined; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; authors: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; description: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => {
//             return (
//               <Col md='4'>
//                 <Card key={book.bookId} border='dark'>
//                   {book.image ? (
//                     <Card.Img
//                       src={book.image}
//                       alt={`The cover for ${book.title}`}
//                       variant='top'
//                     />
//                   ) : null}
//                   <Card.Body>
//                     <Card.Title>{book.title}</Card.Title>
//                     <p className='small'>Authors: {book.authors}</p>
//                     <Card.Text>{book.description}</Card.Text>
//                     <Button
//                       className='btn-block btn-danger'
//                       onClick={() => handleDeleteBook(book.bookId)}
//                     >
//                       Delete this Book!
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             );
//           })}
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default SavedBooks;


//=========================================================================

// import { Container, Card, Button, Row, Col } from "react-bootstrap";
// // import Auth from "../utils/auth";
// import { removeBookId } from "../utils/localStorage";
// // import { useQuery, useMutation, ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
// import { useQuery, useMutation } from "@apollo/client";
// // import { REMOVE_BOOK } from "../graphql/mutations"; // Import GraphQL mutation
// // import { GET_ME } from "../graphql/queries"; // Import GraphQL query
// import { REMOVE_BOOK } from '../utils/mutations';
// import { GET_ME } from "../utils/queries"; // Import GraphQL query
// import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

// const SavedBooks = () => {
//   // Fetch user data using Apollo's useQuery hook
//   const { loading, data } = useQuery(GET_ME);
//   const userData = data?.me || { savedBooks: [] };

//   // Apollo mutation hook for removing books
//   const [removeBook] = useMutation(REMOVE_BOOK, {
//     update(cache, { data: { removeBook } }) {
//       cache.modify({
//         fields: {
//           me(existingUserData = {}) {
//             return {
//               ...existingUserData,
//               savedBooks: existingUserData.savedBooks.filter(
//                 (book: { bookId: any; }) => book.bookId !== removeBook.bookId
//               ),
//             };
//           },
//         },
//       });
//     },
//   });

//   // Function to handle book deletion
//   const handleDeleteBook = async (bookId: string) => {
//     try {
//       await removeBook({
//         variables: { bookId }, // Pass bookId to the mutation
//       });

//       // Remove book ID from localStorage
//       removeBookId(bookId);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // If data isn't loaded yet, show a loading message
//   if (loading) {
//     return <h2>LOADING...</h2>;
//   }

//   return (
//     <>
//       <div className="text-light bg-dark p-5">
//         <Container>
//           <h1>Viewing {userData.username ? `${userData.username}'s` : "saved"} books!</h1>
//         </Container>
//       </div>
//       <Container>
//         <h2 className="pt-5">
//           {userData.savedBooks.length
//             ? `Viewing ${userData.savedBooks.length} saved ${
//                 userData.savedBooks.length === 1 ? "book" : "books"
//               }:`
//             : "You have no saved books!"}
//         </h2>
//         <Row>
//           {userData.savedBooks.map((book: { bookId: Key | null | undefined; image: string | undefined; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; authors: any[]; description: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (
//             <Col md="4" key={book.bookId}>
//               <Card border="dark">
//                 {book.image && <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant="top" />}
//                 <Card.Body>
//                   <Card.Title>{book.title}</Card.Title>
//                   <p className="small">Authors: {book.authors.join(", ")}</p>
//                   <Card.Text>{book.description}</Card.Text>
//                   <Button className="btn-block btn-danger" onClick={() => handleDeleteBook(book.bookId)}>
//                     Delete this Book!
//                   </Button>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default SavedBooks;
