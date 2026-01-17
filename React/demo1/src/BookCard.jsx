const BookCard = ({book}) => {
    const {title,status} = book;
  return (
    <>
    <strong>Title: {title}</strong>
    <p>Status: {status.toString()}</p>
    </>
  )
}

export default BookCard