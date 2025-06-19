import Note from "../models/Note.js";

export const getNotes = async (req, res) => {
  try {
    const note = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(note);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getNoteSpe = async (req, res) => {
  try {
    const spnote = await Note.findById(req.params.id);
    if (!spnote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json( spnote);
  } catch (error) {
    console.error("Error fetching note:", error);
    res.status(500).json({ message: "Internel server error " + error.message });
  }
}

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json("Note created successfully");
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ message: "Internel server error " + error.message });
  }
};

export const updateNotes = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updateNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!updateNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json("update Note successfully");
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ message: "Internel Server error " + error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const deleteNote = await Note.findByIdAndDelete(req.params.id);
    if (!deleteNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json("delete Note successfully");
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ message: "Internel Server error " + error.message });
  }
};
