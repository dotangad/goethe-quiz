import { usePage } from "@inertiajs/inertia-react";
// import { Inertia, Method } from "@inertiajs/inertia";
import { compareAsc } from "date-fns";
import React from "react";
import Layout from "../components/Layout";
import PlayComponent from "../components/Play";
import { IPageProps, IQuestion } from "../lib/types";

interface IPlayPageProps {
  question?: IQuestion;
  showHint: boolean;
}

const Play: React.FC<IPlayPageProps> = ({
  question,
  showHint,
}: IPlayPageProps) => {
  const {
    props: { user, endDate, startDate },
  } = usePage<IPageProps>();
  const [started, setStarted] = React.useState<boolean>(
    compareAsc(new Date(), new Date(startDate)) === 1
  );
  const [ended, setEnded] = React.useState<boolean>(
    compareAsc(new Date(), new Date(endDate)) === 1
  );

  React.useEffect(() => {
    const interval = setInterval(() => {
      setStarted(compareAsc(new Date(), new Date(startDate)) == 1);
      setEnded(compareAsc(new Date(), new Date(endDate)) == 1);
      if (compareAsc(new Date(), new Date(endDate)) == 1) {
        clearInterval(interval);
        // Auto logout
        // Inertia.visit("/auth/logout", { method: "get" as Method });
      }
    }, 500);

    // Disable right click
    // @ts-ignore
    const contextMenuHandler = (event: unknown) => event.preventDefault();
    document.addEventListener('contextmenu', contextMenuHandler);


    return () => {
      clearInterval(interval);
      document.removeEventListener('contextmenu', contextMenuHandler);
    }
  }, []);

  return (
    <Layout links={[{ href: "/", label: "Rules" }]}>
      <div className="flex w-full h-full items-center justify-center">
        <div className="bg-white border-none border-gray-200 rounded-lg w-full max-w-[600px] p-6 mx-2 shadow-sm">
          {!started ? (
            <div className="font-bold text-center text-md">
              DPS Goethe Quiz has not started yet
            </div>
          ) : !ended ? (
            <PlayComponent question={question} showHint={showHint} />
          ) : (
            <div className="font-bold text-center text-md">
              DPS Goethe Quiz has ended
            </div>
          )}

          <div className="mt-4">
            <div className="text-xs text-center">
              {user.student_name}, {user.school?.name}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Play;
