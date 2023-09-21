import notFound from "../../assets/Image/not-found-404-error.webp";
function NotFound() {
    return (
        <div className="not-found alert alert-danger">
            <img className="img_not-found" src={notFound} alt="not found error" />
        </div>
    );
}

export default NotFound;
