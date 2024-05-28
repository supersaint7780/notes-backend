import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Note } from "../models/note.model.js";

const createNote = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(400, "No User Logged In");
  }
  const { title, content } = req.body;
  if (!title?.trim() || !content?.trim()) {
    throw new ApiError(400, "All Fields are required");
  }

  const note = await Note.create({
    title,
    content,
    owner: user._id,
  });

  const createdNote = await Note.findById(note._id);

  if (!createdNote) {
    throw new ApiError(500, "Something went wrong while creating the note");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdNote, "Note created successfully"));
});

const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  if (!user) {
    throw new ApiError(401, "User not authenticated");
  }
  const note = await Note.findById(id);

  if (!note) {
    throw new ApiError(404, "Note not found");
  }

  if (!note.owner.equals(user._id)) {
    throw new ApiError(403, "User not authorized to delete this note");
  }

  const deletedNote = await Note.findByIdAndDelete(id);

  if (!deletedNote) {
    throw new ApiError(500, "Internal Server Error: Unable to delete Note");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Note deleted successfully"));
});

const updateNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  if (!user) {
    throw new ApiError(401, "User not authenticated");
  }
  const note = await Note.findById(id);

  if (!note) {
    throw new ApiError(404, "Note not found");
  }

  if (!note.owner.equals(user._id)) {
    throw new ApiError(403, "User not authorized to update this note");
  }

  const { title, content } = req.body;

  if (!fullName || !email) {
    throw new ApiError(400, "All Fields are required");
  }

  const updatedNote = await Note.findByIdAndUpdate(
    id,
    {
      $set: {
        title,
        content,
      },
    },
    {
      new: true,
    }
  );

  if (!updatedNote) {
    throw new ApiError(
      500,
      "Internal Server Error: Note could not be updated successfully"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedNote, "Note Updated Succesfully"));
});

const pinNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  if (!user) {
    throw new ApiError(401, "Unauthorized: User not authenticated");
  }
  const note = await Note.findById(id);
  if (!note) {
    throw new ApiError(404, "Not Found: Note not found");
  }
  if (!note.owner.equals(user._id)) {
    throw new ApiError(
      403,
      `Forbidden: User not authorized to ${note.isPinned ? "unpin" : "pin"} this note`
    );
  }

  const updatedNote = await Note.findByIdAndUpdate(
    id,
    { isPinned: !note.isPinned },
    { new: true }
  );

  if (!updatedNote) {
    throw new ApiError(
      500,
      `Internal Server Error: Unable to ${note.isPinned ? "unpin" : "pin"} note`
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedNote,
        `Note ${note.isPinned ? "unpinned" : "pinned"} successfully`
      )
    );
});

const getPinnedNotes = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(400, "No User Logged In");
  }

  const pinnedNotes = await Note.find({ owner: user._id, isPinned: true }).sort(
    { createdAt: -1 }
  );
  if (!pinnedNotes || pinnedNotes.length === 0) {
    throw new ApiError(404, "Not Found: No notes found for this user");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, pinnedNotes, "Notes fetched successfully"));
});

const getAllNotes = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(400, "No User Logged In");
  }

  const notes = await Note.find({ owner: user._id }).sort({ createdAt: -1 });
  if (!notes || notes.length === 0) {
    throw new ApiError(404, "Not Found: No notes found for this user");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, notes, "Notes fetched successfully"));
});

export {
  createNote,
  getAllNotes,
  getPinnedNotes,
  deleteNote,
  updateNote,
  pinNote,
};
