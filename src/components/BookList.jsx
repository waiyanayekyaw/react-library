import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import trash from "../assets/trash.svg";
import pencil from "../assets/pencil.svg";
import useFirestore from "../hooks/useFirestore";
import { AuthContext } from "../contexts/AuthContext";

export default function BookList() {
    let location = useLocation();
    let navigate = useNavigate();
    let params = new URLSearchParams(location.search);
    let search = params.get("search");

    let { getCollection, deleteDocument } = useFirestore();

    let { user } = useContext(AuthContext);
    let {
        error,
        loading,
        data: books,
    } = getCollection("books", ["uid", "==", user.uid], {
        field: "title",
        value: search,
    });

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
                                <img src={b.cover} alt="" className="w-full h-56" />
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
                                            <img
                                                src={pencil}
                                                alt=""
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    navigate(`/edit/${b.id}`);
                                                }}
                                            />

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
