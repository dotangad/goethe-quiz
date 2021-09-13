import { useForm } from "@inertiajs/inertia-react";
import React from "react";
import { IQuestion } from "../lib/types";

interface IPlayProps {
  question?: IQuestion;
  showHint: boolean;
}

const Play: React.FC<IPlayProps> = ({ question, showHint }: IPlayProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { setData, data, post, processing, errors } = useForm({
    answer: "",
  });

  React.useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  return (
    <div className="w-full mb-8">
      {question ? (
        <>
          <div className="text-sm font-bold">Question {question?.id}</div>
          {showHint ? (
            <>
              <div className="text-md">{question?.text}</div>
              <div className="text-md mb-4">Hint: {question?.hint}</div>
            </>
          ) : (
            <div className="text-md mb-4">{question?.text}</div>
          )}

          <form
            onSubmit={(e: React.SyntheticEvent) => {
              e.preventDefault();
              post("/play", {
                preserveState: true,
                onFinish: () => {
                  setData("answer", "");
                  inputRef.current?.focus();
                },
              });
            }}
          >
            <div>
              <div className="flex border-2 border-gray-100 rounded-lg h-12 focus-within:border-goethe">
                <input
                  type="text"
                  name="answer"
                  placeholder="Answer"
                  className="focus:outline-none p-3 w-full flex-1 h-full flex items-center border-none rounded-lg"
                  autoComplete="off"
                  ref={inputRef}
                  disabled={processing}
                  value={data.answer}
                  onChange={(e) =>
                    setData(
                      "answer",
                      String(e.target.value)
                        .split("")
                        .filter((x) => /^([a-z0-9_-]){1}$/.test(x))
                        .join("") as never
                    )
                  }
                />
                <button
                  type="submit"
                  className="block font-bold uppercase text-sm h-full px-3 py-3 bg-gray-100 border-2 border-gray-100 rounded-tr-lg rounded-br-lg focus:outline-none focus:bg-gray-200 focus:border-gray-200"
                >
                  Check
                </button>
              </div>
              {errors.answer && (
                <div className="mt-3 text-red-500 text-sm text-center">
                  {errors.answer}
                </div>
              )}
            </div>
          </form>
        </>
      ) : (
        <div className="text-center">
          Congralutations, you&apos;ve finished the game!
        </div>
      )}
    </div>
  );
};

export default Play;