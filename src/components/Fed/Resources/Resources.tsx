import { useState } from "react";
import { useNotes } from "../../Common/NotesContext";


const ResourcesPage = () => {

  const { notes, setNotes, links, setLinks } = useNotes()

  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  const [linkTitle, setLinkTitle] = useState("");
  const [linkURL, setLinkURL] = useState("");

  const addNote = () => {
    if (!noteTitle.trim() || !noteContent.trim()) return;
    const date = new Date();
    const formattedDate = `${date.getDate()} ${date.toLocaleString("default", {
      month: "short",
    })}, ${date.getFullYear()}`;
    const newNote = {
      title: noteTitle,
      content: noteContent,
      date: formattedDate,
    };
    const updated = [...notes, newNote];
    setNotes(updated);
    localStorage.setItem("notes", JSON.stringify(updated));
    setNoteTitle("");
    setNoteContent("");
  };

  const addLink = () => {
    if (!linkTitle.trim() || !linkURL.trim()) return;
    const newLink = { title: linkTitle, url: linkURL };
    const updated = [...links, newLink];
    setLinks(updated);
    localStorage.setItem("links", JSON.stringify(updated));
    setLinkTitle("");
    setLinkURL("");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-10">
      <h1 className="text-3xl font-bold text-[#563A9C] mb-6">Resources</h1>

      {/* Notes Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-[#563A9C] mb-4">Add Notes</h2>
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Note Title"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#563A9C]"
          />
        </div>
        <textarea
          placeholder="Note Content"
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#563A9C] mb-3"
        />
        <button
          onClick={addNote}
          className="bg-[#563A9C] hover:bg-[#472F85] text-white px-4 py-2 rounded-lg"
        >
          Add Note
        </button>

        {/* Display Notes */}
        <ul className="mt-6 space-y-4">
          {notes.map((note:any, i:any) => (
            <li
              key={i}
              className="border border-gray-200 rounded-lg p-4 bg-gray-50"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-700">{note.title}</h3>
                <span className="text-gray-400 text-sm">{note.date}</span>
              </div>
              <p className="text-gray-600">{note.content}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Links Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-[#563A9C] mb-4">Add Links</h2>
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="text"
            placeholder="Link Title"
            value={linkTitle}
            onChange={(e) => setLinkTitle(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#563A9C]"
          />
          <input
            type="text"
            placeholder="URL"
            value={linkURL}
            onChange={(e) => setLinkURL(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#563A9C]"
          />
          <button
            onClick={addLink}
            className="bg-[#563A9C] hover:bg-[#472F85] text-white px-4 py-2 rounded-lg w-full sm:w-auto"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
