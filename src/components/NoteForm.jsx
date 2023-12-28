import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFirestore from "../hooks/useFirestore";

export default function NoteForm({ type = "create", editNote, setEditNote }) {
    let { id } = useParams();
    let [body, setBody] = useState("");

    let { addCollection, updateDocument } = useFirestore();

    useEffect(() => {
        if (type == "update") {
            setBody(editNote.body);
        }
    }, [type]);

    let submit = async (e) => {
        e.preventDefault();

        if (type == "create") {
            let data = {
                body,
                bookUid: id,
            };
            await addCollection("notes", data);
        } else {
            editNote.body = body;
            await updateDocument("notes", editNote.id, editNote, false);
            setEditNote(null);
        }
        setBody("");
    };

    return (
        <form onSubmit={submit}>
            <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="bg-gray-50 w-full shadow-md border-2 p-3"
                name=""
                id=""
                cols="30"
                rows="5"
            ></textarea>

            <div className="flex space-x-3">
                <button
                    type="submit"
                    className="text-white bg-primary px-3 py-2 rounded-lg flex items-center gap-1 mt-3"
                >
                    <span>{type == "create" ? "Add" : "Update"} Note</span>
                </button>
                {type == "update" && (
                    <button
                        onClick={() => {
                            setEditNote(null);
                        }}
                        type="button"
                        className="text-primary border-primary border-2 px-3 py-2 rounded-lg flex items-center gap-1 mt-3"
                    >
                        <span>Cancel</span>
                    </button>
                )}
            </div>
        </form>
    );
}
