import { useForm, usePage } from "@inertiajs/inertia-react";
import React from "react";
import Layout from "../../components/Layout";
import { IQuestion } from "../../lib/types";

interface IQuestionsProps {
  questions: IQuestion[];
  createError?: string;
}

const Question = () => false;

const Questions: React.FC<IQuestionsProps> = ({
  questions,
}: IQuestionsProps) => {
  const { props: { csrf_token } } = usePage();
  const { setData, data, post, processing, errors, reset } = useForm({
    text: "",
    hint: "",
    answer: "",
    csrf_token
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setData(e.target.name as never, e.target.value as never);

  return (
    <Layout links={[{ href: "/admin", label: "Home" }]}>
      <div className="w-full sm:max-w-screen-sm mx-auto h-full">
        <div className="w-full p-6 bg-white rounded-lg shadow-sm">
          <h1 className="font-bold text-2xl text-center">Questions</h1>
        </div>

        <div className="w-full p-6 py-2 bg-white rounded-lg shadow-sm my-4">
          <form
            onSubmit={(e: React.SyntheticEvent) => {
              e.preventDefault();
              post("/admin/questions", {
                preserveState: true,
                onSuccess: () => reset()
              });
            }}>
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

        {questions.map(({ id, text, hint, answer }, i) => (
          <div
            className="w-full p-6 bg-white rounded-lg shadow-sm my-4"
            key={i}
          >
            <h1 className="font-bold text-lg">Question {id}</h1>
            <div>Text: {text}</div>
            <div>Hint: {hint}</div>
            <div>Answer: {answer}</div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Questions;
