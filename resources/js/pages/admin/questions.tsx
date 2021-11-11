import { InertiaLink, useForm, usePage } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import { IQuestion } from "../../lib/types";

interface IQuestionsProps {
  questions: IQuestion[];
  createError?: string;
}

interface IQuestionProps {
  question: IQuestion;
}

const Question: React.FC<IQuestionProps> = ({
  question: { id, text, hint, answer },
}: IQuestionProps) => {
  const [editing, setEditing] = useState<boolean>(false);
  const { setData, data, post, processing, errors } = useForm({
    text,
    hint,
    answer,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setData(e.target.name as never, e.target.value as never);

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-sm my-4">
      <div className="input-group flex items-center justify-end mb-2">
        <h1 className="font-bold text-xl flex-1">Question {id}</h1>
        <a className="button" onClick={() => setEditing(!editing)}>
          {editing ? "Reset" : "Edit"}
        </a>
      </div>
      {editing ? (
        <form
          onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault();
            post(`/admin/questions/${id}`, {
              preserveState: true,
              preserveScroll: true,
              onSuccess: () => setEditing(false),
            });
          }}
        >
          <div className="input-group my-4">
            <label>Text</label>
            <textarea
              placeholder="When is German Unity Day?"
              name="text"
              value={data.text}
              onChange={(e) => setData("text", e.target.value as never)}
              disabled={processing}
            ></textarea>
            {errors.text && <div className="error">{errors.text}</div>}
          </div>
          <div className="input-group my-4">
            <label>Hint</label>
            <input
              type="text"
              placeholder="German Unity Day is the annual celebration of the unification of Germany"
              name="hint"
              value={data.hint}
              onChange={handleChange}
              disabled={processing}
            />
            {errors.hint && <div className="error">{errors.hint}</div>}
          </div>
          <div className="input-group my-4">
            <label>Answer</label>
            <input
              type="text"
              placeholder="3 october"
              name="answer"
              value={data.answer}
              onChange={handleChange}
              disabled={processing}
            />
            {errors.answer && <div className="error">{errors.answer}</div>}
          </div>
          <div className="input-group flex my-2">
            <button type="submit" className="button w-full">
              Save
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="input-group my-2">
            <label>Text</label>
            <div dangerouslySetInnerHTML={{ __html: data.text }} />
          </div>
          <div className="input-group my-2">
            <label>Hint</label>
            <div>{data.hint}</div>
          </div>
          <div className="input-group my-2 break-words">
            <label>Answer</label>
            <div>{data.answer}</div>
          </div>
        </>
      )}
    </div>
  );
};

const Questions: React.FC<IQuestionsProps> = ({
  questions,
}: IQuestionsProps) => {
  const { setData, data, post, processing, errors, reset } = useForm({
    text: "",
    hint: "",
    answer: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setData(e.target.name as never, e.target.value as never);

  return (
    <Layout links={[{ href: "/admin", label: "Home" }]}>
      <div className="w-full sm:max-w-screen-sm mx-auto h-full">
        <div className="w-full p-6 bg-white rounded-lg shadow-sm flex items-center">
          <InertiaLink
            href="/admin"
            className="flex justify-center items-center mr-3"
          >
            <div className="flex justify-center items-center bg-gray-bg p-3 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </div>
          </InertiaLink>
          <h1 className="font-bold text-3xl flex-1">Questions</h1>
        </div>

        <div className="w-full p-6 py-2 bg-white rounded-lg shadow-sm my-4">
          <form
            onSubmit={(e: React.SyntheticEvent) => {
              e.preventDefault();
              post("/admin/questions", {
                preserveState: true,
                onSuccess: () => reset(),
              });
            }}
          >
            <div className="input-group my-4">
              <label>Text</label>
              <input
                type="text"
                placeholder="When is German Unity Day?"
                name="text"
                value={data.text}
                onChange={handleChange}
                disabled={processing}
              />
              {errors.text && <div className="error">{errors.text}</div>}
            </div>
            <div className="input-group my-4">
              <label>Hint</label>
              <input
                type="text"
                placeholder="German Unity Day is the annual celebration of the unification of Germany"
                name="hint"
                value={data.hint}
                onChange={handleChange}
                disabled={processing}
              />
              {errors.hint && <div className="error">{errors.hint}</div>}
            </div>
            <div className="input-group my-4">
              <label>Answer</label>
              <input
                type="text"
                placeholder="3 october"
                name="answer"
                value={data.answer}
                onChange={handleChange}
                disabled={processing}
              />
              {errors.answer && <div className="error">{errors.answer}</div>}
            </div>
            <div className="input-group my-4">
              <button type="submit" className="w-full button">
                Create
              </button>
            </div>
          </form>
        </div>

        {questions.map((question, i) => (
          <Question question={question} key={i} />
        ))}
      </div>
    </Layout>
  );
};

export default Questions;
