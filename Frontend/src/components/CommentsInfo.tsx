// Frontend/src/components/CommentsInfo.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import "../styles/CommentsInfo.css";

interface Comment {
  id: number;
  teaId: number;
  title: string;
  comment: string;
  created_at: string;
}

interface CommentsProps {
  teaId: number;
}

interface FormValues {
  title: string;
  comment: string;
}

const Comments = ({ teaId }: CommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5555/comments/${teaId}`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, [teaId]);

  const handleEdit = (commentId: number) => {
    setEditingCommentId(commentId);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
  };

  const handleSubmit = (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>,
  ) => {
    if (editingCommentId) {
      handleUpdate(editingCommentId, values);
    } else {
      axios
        .post("http://localhost:5555/comments", { ...values, teaId })
        .then((response) => {
          setComments([...comments, response.data.comment]);
          resetForm();
        })
        .catch((error) => {
          console.error("Error adding comment:", error);
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  };

  const handleUpdate = (
    commentId: number,
    updatedComment: Partial<FormValues>,
  ) => {
    axios
      .put(`http://localhost:5555/comments/${commentId}`, updatedComment)
      .then((response) => {
        const updatedComments = comments.map((comment) => {
          if (comment.id === commentId) {
            return response.data;
          }
          return comment;
        });
        setComments(updatedComments);
        setEditingCommentId(null);
      })
      .catch((error) => {
        console.error("Error updating comment:", error);
      });
  };

  const handleDelete = (commentId: number) => {
    axios
      .delete(`http://localhost:5555/comments/${commentId}`)
      .then(() => {
        setComments(comments.filter((comment) => comment.id !== commentId));
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
      });
  };

  return (
    <div className="comments-container">
      <h2>Comment about the tea here below!</h2>
      <Formik
        initialValues={{ title: "", comment: "" }}
        validationSchema={Yup.object({
          title: Yup.string().required("Title is required"),
          comment: Yup.string()
            .required("Comment is required")
            .max(50, "Comment must be at most 50 characters"),
        })}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting, handleChange }) => (
          <Form className="comment-form">
            <div>
              <label id="commentTop" htmlFor="title">
                Title
              </label>
              <Field
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
              />
              <ErrorMessage
                name="title"
                component="div"
                className="error-message"
              />
            </div>

            <div>
              <label htmlFor="comment">Comment (max 50 characters)</label>
              <Field
                as="textarea"
                name="comment"
                maxLength="50"
                value={values.comment}
                onChange={handleChange}
              />
              <ErrorMessage
                name="comment"
                component="div"
                className="error-message"
              />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {editingCommentId ? "Update Comment" : "Add Comment"}
            </button>

            {editingCommentId && (
              <button
                className="cancelCommentEdit"
                type="button"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            )}
          </Form>
        )}
      </Formik>

      <ul className="comments-list">
        {comments.map((comment) => (
          <li key={comment.id} className="comment-item">
            {editingCommentId === comment.id ? (
              <>
                <p>Editing comment...</p>
                <p>
                  <a href="#commentTop">Scroll up</a> to edit.
                </p>
              </>
            ) : (
              <>
                <div className="comment-info">
                  <h3>{comment.title}</h3>
                  <p>{comment.comment}</p>
                </div>
                <p id="CommentTimeLine">
                  Published at: {new Date(comment.created_at).toLocaleString()}
                </p>
                <div className="comment-actions">
                  <button type="button" onClick={() => handleEdit(comment.id)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(comment.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
