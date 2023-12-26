import React from "react";
import book from "../assets/book.jpg";
import { Link, useLocation } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import trash from "../assets/trash.svg";
import pencil from "../assets/pencil.svg";
import useFirestore from "../hooks/useFirestore";

export default function BookList() {
    let location = useLocation();
    let params = new URLSearchParams(location.search);

    let search = params.get("search");

    let { getCollection, deleteDocument } = useFirestore();
    let { error, loading, data: books } = getCollection("books");

    const deleteBook = async (e, id) => {
        e.preventDefault();
        await deleteDocument("books", id);
    };

    // let {
    //     data: books,
    //     loading,
    //     error,
    // } = useFetch(`http://localhost:3000/books${search ? `?q=${search}` : ""}`);

    if (error) {
        return <p>{error}</p>;
    }

    let { isDark } = useTheme();

    return (
        <div>
            {loading && <p>Loading...</p>}
            {!!books && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-3">
                    {books.map((b) => (
                        <Link to={`books/${b.id}`} key={b.id}>
                            <div
                                className={`p-4 border border-1 min-h-[420px] ${
                                    isDark ? "bg-dcard text-white border-primary" : ""
                                }`}
                            >
                                <img src={book} alt="" className="w-full h-56" />
                                <div className="text-center space-y-2 mt-3">
                                    <h1>{b.title}</h1>
                                    <p>{b.description}</p>
                                    {/* genres */}
                                    <div className="flex flex-wrap justify-between items-center">
                                        <div>
                                            {b.categories.map((c) => (
                                                <span
                                                    key={c}
                                                    className="mx-1 my-1 text-white rounded-full px-2 py-1 text-sm bg-primary"
                                                >
                                                    {c}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex space-x-4 items-center">
                                            <Link to={`/edit/${b.id}`}>
                                                <img src={pencil} alt="" />
                                            </Link>
                                            <img
                                                src={trash}
                                                alt=""
                                                onClick={(e) => deleteBook(e, b.id)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
            {books && !books.length && (
                <p className="text-center text-xl text-gray-500">No Search Results Found</p>
            )}
        </div>
    );
}
