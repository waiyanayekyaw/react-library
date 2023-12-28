import React, { useState } from "react";
import useFirestore from "../hooks/useFirestore";
import { useParams } from "react-router-dom";
import moment from "moment";
import trash from "../assets/trash.svg";
import pencil from "../assets/pencil.svg";
import NoteForm from "../components/NoteForm";

export default function NoteList() {
    let { id } = useParams();
    let { getCollection, deleteDocument } = useFirestore();
    let { error, loading, data: notes } = getCollection("notes", ["bookUid", "==", id]);
    let [editNote, setEditNote] = useState(null);

    let deleteNote = async (id) => {
        await deleteDocument("notes", id);
    };

    return (
        !!notes.length &&
        notes.map((note) => (
            <div key={note.id} className="border-2 shadow-md p-3 my-3">
                <div className="flex justify-between space-x-3">
                    <div>
                        <img
                            src="https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH=w240-h480-rw"
                            alt=""
                            className="w-12 h-12 rounded-full"
                        />
                        <div>
                            <h3>Joy</h3>
                            <p className="text-gray-400">
                                {moment(note?.date?.seconds * 1000).fromNow()}
                            </p>
                        </div>
                    </div>

                    <div>
                        <img
                            src={pencil}
                            onClick={() => setEditNote(note)}
                            className="cursor-pointer"
                        />
                        <img
                            src={trash}
                            onClick={() => deleteNote(note.id)}
                            className="cursor-pointer"
                        />
                    </div>
                </div>
                <div className="mt-3">{editNote?.id !== note.id && note.body}</div>
                {editNote?.id == note.id && (
                    <NoteForm type="update" editNote={editNote} setEditNote={setEditNote} />
                )}
            </div>
        ))
    );
}
