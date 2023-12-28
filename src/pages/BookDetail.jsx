import React from "react";
import { useParams } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import useFirestore from "../hooks/useFirestore";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";

export default function BookDetail() {
    let { id } = useParams();
    let { getDocument } = useFirestore();
    let { error, loading, data: book } = getDocument("books", id);

    let { isDark } = useTheme();

    return (
        <>
            {error && <p>{error}</p>}
            {loading && <p>Loading...</p>}
            {book && (
                <>
                    <div className={`grid grid-cols-2 ${isDark ? "text-white" : ""}`}>
                        <div>
                            <img src={book.cover} alt="" className="w-[60%]" />
                        </div>
                        <div className="space-y-3">
                            <h1 className="text-3xl font-semibold">{book.title}</h1>
                            <div className="space-x-2">
                                {book.categories.map((category) => (
                                    <span
                                        className="text-white rounded-full px-2 py-1 text-sm bg-primary"
                                        key={category}
                                    >
                                        {category}
                                    </span>
                                ))}
                            </div>
                            <p>{book.description}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-primary my-3 text-center">My Notes</h3>
                        <NoteForm />
                        <NoteList />
                    </div>
                </>
            )}
        </>
    );
}
