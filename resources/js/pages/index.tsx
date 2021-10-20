import React from "react";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import { compareAsc, subDays } from "date-fns";
import { IPageProps } from "../lib/types";
import useTitle from "../lib/use-title";
import Layout from "../components/Layout";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Index: React.FC = () => {
  const {
    props: { authenticated, user, regDate, startDate, regEndDate, endDate },
  } = usePage<IPageProps>();
  useTitle("DPS Goethe Quiz");

  const teamLoginOpen =
    compareAsc(new Date(startDate), new Date()) === -1 &&
    compareAsc(new Date(), new Date(endDate)) === -1;
  const schoolRegOpen = compareAsc(new Date(regDate), new Date()) === -1;
  const schoolRegClosed = compareAsc(new Date(), new Date(regEndDate)) === 1;

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const images = Array.from(Array(18).keys()).map(
    (i) => `/img/carousel/${i + 1}.jpg`
  );

  return (
    <Layout
      links={
        {
          team: [{ href: "/play", label: "Play" }],
          school: [{ href: "/dashboard", label: "Dashboard" }],
          admin: [{ href: "/admin", label: "Admin" }],
          default: [],
        }[(user?.type as never) || "default"] as {
          href: string;
          label: string;
        }[]
      }
    >
      <div className="flex w-full h-full items-center justify-center">
        <div className="bg-white rounded-lg w-full max-w-screen-md py-6 px-3 sm:p-6 mx-2 shadow-sm">
          <div>
            <div className="flex items-center justify-center sm:justify-between flex-wrap mb-5">
              <div className="order-1">
                <img
                  src="/img/dpslogo-index.png"
                  className="hidden sm:block h-24 w-auto"
                />
              </div>
              <div className="sm:flex-1 px-0 sm:px-5 order-last sm:order-2 w-full flex flex-col items-center text-center">
                <div className="font-bold text-gray-600 text-sm sm:text-base">
                  DPS Society in association with
                </div>
                <div className="font-bold text-gray-600 text-sm sm:text-base mb-3">
                  Goethe Institut / Max Mueller Bhavan New Delhi
                </div>
                <div className="flex justify-center w-full">
                  <img
                    src="/img/Wunderkind.png"
                    alt="Wunderkind"
                    className="w-full max-w-[500px]"
                  />
                </div>
                <div className="text-xl sm:text-3xl text-goethe-dark font-bold">
                  School Quiz on Germany 2021
                </div>
              </div>
              <div className="order-3">
                <img
                  src="/img/goethelogo-square.png"
                  className="hidden sm:block h-24 w-auto"
                />
              </div>
            </div>

            <div className="my-5">
              <Carousel responsive={responsive} autoPlay={true} infinite={true}>
                {Array.from(
                  Array(17),
                  (_, i) => `/img/carousel/${i + 1}.webp`
                ).map((img, index) => (
                  <div key={index} className="m-4">
                    <img
                      src={img}
                      alt={img}
                      style={{ height: "180px", objectFit: "cover" }}
                    />
                  </div>
                ))}
              </Carousel>
            </div>

            <div className="my-5 text-center text-red-500 font-bold">
              [Registration and login links are at the bottom]
            </div>

            <div className="my-5">
              <div className="text-red-500 uppercase font-bold text-sm">
                Aim
              </div>
              <div className="">
                To create interest in the students and schools for German
                language and German culture and to build on commonalities
                respecting diversity.
              </div>
            </div>

            <div className="my-5">
              <div className="text-red-500 uppercase font-bold text-sm">
                Participation Eligibility
              </div>
              <div className="">
                The Quiz is open to all school students of Classes 6 to 12 in
                India.
              </div>
            </div>

            <div className="my-5">
              <div className="text-red-500 uppercase font-bold text-sm">
                Schedule of Activities
              </div>
              <div className="sm:hidden">
                <div className="my-5 mt-0">
                  <div className="font-bold">Online Registration</div>
                  <div>(only through school)</div>
                  <div className="text-sm">
                    <div className="font-bold">
                      From Thursday, 21st October 2021
                    </div>
                    <div>(9 am onwards)</div>
                    <div className="font-bold">
                      Till Sunday, 31st October 2021
                    </div>
                    <div>(5 pm - registration closes)</div>
                  </div>
                </div>

                <div className="my-5">
                  <div className="font-bold">Online Quiz</div>
                  <div className="text-sm">
                    <div className="font-bold">
                      From Saturday, 13th November 2021
                    </div>
                    <div>(9 am onwards)</div>
                    <div className="font-bold">
                      Till Sunday, 14th November 2021
                    </div>
                    <div>(9 am - quiz will be closed)</div>
                  </div>
                </div>

                <div className="my-5 mb-0">
                  <div className="font-bold">Declaration of Results</div>
                  <div className="text-sm">Results will be intimated later</div>
                </div>
              </div>

              <div className="hidden sm:block">
                <table className="w-full border border-gray-800 mt-2">
                  <tbody>
                    <tr className="border border-gray-800">
                      <td className="sm:px-3 py-3 flex flex-col items-start justify-start height-full">
                        <div className="font-bold">Online Registration</div>
                        <div>(only through school)</div>
                      </td>
                      <td className="border border-gray-800 sm:px-3 py-3">
                        <div className="font-bold">
                          From Thursday, 21st October 2021
                        </div>
                        <div>(9 am onwards)</div>

                        <div className="font-bold mt-5">
                          Till Sunday, 31st October 2021
                        </div>
                        <div>(5 pm - registration closes)</div>
                      </td>
                    </tr>
                    <tr className="border border-gray-800">
                      <td className="flex items-start justify-start sm:px-3 py-3">
                        <div className="font-bold">Online Quiz</div>
                      </td>
                      <td className="border border-gray-800 sm:px-3 py-3">
                        <div className="font-bold">
                          From Saturday, 13th November 2021
                        </div>
                        <div>(9 am onwards)</div>

                        <div className="font-bold mt-5">
                          Till Sunday, 14th November 2021
                        </div>
                        <div>(9 am - quiz will be closed)</div>
                      </td>
                    </tr>
                    <tr className="border border-gray-800">
                      <td className="sm:px-3 py-3">
                        <div className="font-bold">Declaration of Results</div>
                      </td>
                      <td className="border border-gray-800 sm:px-3 py-3">
                        Results will be intimated later
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="my-5">
                <div className="text-red-500 uppercase font-bold text-sm">
                  Rules for online Registration
                </div>
                <div className="">
                  <ul className="list-disc pl-5">
                    <li>
                      There is no participation fee to register. To participate,
                      the schools can register online at{" "}
                      <a
                        href="https://dpsgoethequiz.com/"
                        className="text-goethe-dark font-bold"
                      >
                        dpsgoethequiz.com
                      </a>{" "}
                      from <strong>21st October to 31st October 2021</strong>.
                    </li>
                    <li>No student is allowed to register directly.</li>
                    <li>
                      Individual students&apos; registration can be done online
                      by the School Coordinator through the school account till
                      31st October, 2021 only.
                    </li>
                    <li>
                      There is no restriction on the number of students
                      registering per school.
                    </li>
                    <li>
                      School accounts will be available to the school after
                      successful completion of the school registration process
                      for registration of students.
                    </li>
                    <li>
                      All students should be encouraged to participate in the
                      Quiz.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="my-5">
                <div className="text-red-500 uppercase font-bold text-sm">
                  Rules for online Quiz
                </div>
                <div className="">
                  <ul className="list-disc pl-5">
                    <li className="font-bold">
                      The Quiz is open to all students from Classes VI to XII.
                    </li>
                    <li>
                      The Online quiz is not a team event. Students should
                      participate as individuals only.
                    </li>
                    <li>
                      The Quiz is to be attempted within 24 hours. It will be
                      open from Saturday, 13th November 2021 (9 am onwards) till
                      Sunday, 14th November 2021 (9 am - Quiz will be closed)
                    </li>
                    <li>
                      Content (syllabus) for online Quiz - It is a general
                      knowledge quiz on Germany. The questions will revolve
                      around the following topics:
                      <div className="font-bold text-center">
                        History, Geography, Current Affairs, Science and
                        Technology and Architecture
                      </div>
                    </li>
                    <li>
                      Online Quiz is an independent event for each participating
                      student.
                    </li>
                    <li>
                      Each student will come online to access the quiz through
                      her/his personal LOGIN-PASSWORD issued at the time of
                      registration by respective school Quiz coordinators. The
                      students can attempt the quiz from home or from school and
                      each student should sit separately.{" "}
                    </li>
                    <li>
                      Students are not allowed to discuss or disclose any
                      questions on any online forum/Social Networking
                      Sites/Chat/Emails. Students/Schools will be immediately
                      debarred from participating in the quiz for non-compliance
                      of rules.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="my-5">
                <div className="text-red-500 uppercase font-bold text-sm">
                  Prizes
                </div>
                <div className="">
                  <ul className="list-disc pl-5">
                    <li>
                      Top hundred (100) scorers will get attractive goodie bags
                      from Goethe-Institut, Max Mueller Bhavan New Delhi
                    </li>
                    <li>
                      10 lucky participants amongst the top 100 get a Kindle,
                      sponsored by Goethe-Institut, Max Mueller Bhavan New
                      Delhi. The selection would be through a lucky draw
                      conducted by Goethe-Institut, Max Mueller Bhavan New Delhi
                      and the decision would be final and cannot be contested.
                    </li>
                    <li>
                      Top 10% of the participants in the online Quiz will be
                      awarded Merit Certificates.
                    </li>
                    <li>
                      Appreciation certificates will be awarded to the top ten
                      schools with maximum number of student participation in
                      the online quiz event.
                    </li>
                    <li>
                      E certificate will be awarded to all students who
                      successfully complete the quiz.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {!authenticated && (
              <ul className="list-disc pl-5 mt-5">
                {schoolRegOpen && (
                  <li className="my-3">
                    For schools:
                    <div className="flex flex-wrap justify-start">
                      <div className="w-full sm:w-1/2 sm:odd:pr-3 sm:even:pl-3 mt-2">
                        <InertiaLink
                          href="/auth/school/login"
                          className="w-full button"
                        >
                          School Login
                        </InertiaLink>
                      </div>
                      {!schoolRegClosed && (
                        <div className="w-full sm:w-1/2 sm:odd:pr-3 sm:even:pl-3 mt-2">
                          <InertiaLink
                            href="/auth/school/register"
                            className="w-full button"
                          >
                            School Registration
                          </InertiaLink>
                        </div>
                      )}
                    </div>
                  </li>
                )}

                {teamLoginOpen && (
                  <li className="my-3">
                    For teams:
                    <div className="flex flex-wrap justify-start">
                      <div className="w-full sm:w-1/2 sm:odd:pr-3 sm:even:pl-3 mt-2">
                        <InertiaLink
                          href="/auth/team/login"
                          className="w-full button"
                        >
                          Team Login
                        </InertiaLink>
                      </div>
                    </div>
                  </li>
                )}
              </ul>
            )}

            <div className="text-center text-sm mt-5">
              For technical queries regarding registrations, please contact{" "}
              <a
                href="mailto:dpsgoethequiz@dpsrkp.net"
                className="text-goethe-dark font-bold"
              >
                dpsgoethequiz@dpsrkp.net
              </a>{" "}
              or{" "}
              <a
                href="mailto:jagriti.budhiraja@goethe.de"
                className="text-goethe-dark font-bold"
              >
                jagriti.budhiraja@goethe.de
              </a>{" "}
              for any other information.
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
