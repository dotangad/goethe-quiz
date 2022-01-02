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
    props: {
      authenticated,
      user,
      regDate,
      startDate,
      regEndDate,
      endDate,
      flash,
    },
  } = usePage<IPageProps>();
  useTitle("DPS Goethe Quiz");

  const teamLoginOpen =
    compareAsc(new Date(startDate), new Date()) === -1 &&
    compareAsc(new Date(), new Date(endDate)) === -1;
  const teamRegOpen = compareAsc(new Date(regDate), new Date()) === -1;
  const teamRegClosed = compareAsc(new Date(), new Date(regEndDate)) === 1;

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
                  Quiz on Germany 2022
                </div>
              </div>
              <div className="order-3">
                <img
                  src="/img/goethelogo-square.png"
                  className="hidden sm:block h-24 w-auto"
                />
              </div>
            </div>

            {flash.message && (
              <div className="w-full border-red-500 border-2 p-6 rounded text-center">
                <h3 className="text-md text-red-500 uppercase font-bold">
                  {flash.message}
                </h3>
              </div>
            )}

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
              <div className="">The Quiz is open to everyone in India.</div>
            </div>

            <div className="my-5">
              <div className="text-red-500 uppercase font-bold text-sm">
                Schedule of Activities
              </div>
              <div className="sm:hidden">
                <div className="my-5 mt-0">
                  <div className="font-bold">Online Registration</div>
                  <div className="text-sm">
                    <div className="font-bold">
                      From Monday, 3rd January 2022
                    </div>
                    <div>(9 am onwards)</div>
                    <div className="font-bold">
                      Till Tuesday, 11th January 2022
                    </div>
                    <div>(5 pm - registration closes)</div>
                  </div>
                </div>

                <div className="my-5">
                  <div className="font-bold">Online Quiz</div>
                  <div className="text-sm">
                    <div className="font-bold">
                      From Friday, 28th January 2022
                    </div>
                    <div>(9 am onwards)</div>
                    <div className="font-bold">
                      Till Saturday, 29th January 2022
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
                      </td>
                      <td className="border border-gray-800 sm:px-3 py-3">
                        <div className="font-bold">
                          From Monday, 3rd January 2022
                        </div>
                        <div>(9 am onwards)</div>
                        <div className="font-bold">
                          Till Tuesday, 11th January 2022
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
                          From Friday, 28th January 2022
                        </div>
                        <div>(9 am onwards)</div>
                        <div className="font-bold">
                          Till Saturday, 29th January 2022
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
                      the students can register online at{" "}
                      <a
                        href="https://dpsgoethequiz.com/"
                        className="text-goethe-dark font-bold"
                      >
                        dpsgoethequiz.com
                      </a>{" "}
                      from <strong>3rd January to 11th January 2022</strong>.
                    </li>
                    <li>
                      Please register only once. Candidates can use the Email
                      and the password they used while registering for the quiz
                      to login again.
                    </li>
                    <li>
                      Wunderkind 2021 candidates are requested not to register.
                    </li>
                    <li>
                      There is no restriction on the age of candidates
                      registering for the Quiz
                    </li>
                    <li>
                      The quiz is meant to motivate participants to research and
                      read about Germany.
                    </li>
                    <li>
                      The speed of finishing the quiz is not a criteria for
                      better ranking.
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
                    <li>
                      The Online quiz is not a team event. Registered candidates
                      should participate as individuals only.{" "}
                    </li>
                    <li>
                      There are in total 140 Questions in the Quiz, to be
                      attempted within 24 hours.{" "}
                      <strong>
                        After the first three unsuccessful attempts, the
                        participant will be provided with a hint. In case a
                        candidate is unable to answer a question even after a
                        total of five attempts, they will be prompted with a
                        SKIP button to roll over to the next question.
                      </strong>
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
                      Each participant will come online to access quiz questions
                      online through her/his personal LOGIN-PASSWORD entered
                      during registration.
                    </li>
                    <li>
                      Participants are not allowed to discuss or disclose any
                      questions on any online forum/Social Networking
                      Sites/Chat/Emails. He/she will be immediately debarred
                      from participating in the quiz for non-compliance of
                      rules. However, the participants are encouraged to
                      research before and during the Quiz to be able to crack
                      all the Questions.
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
                      Top fifty (50) meritorious performers of the online Quiz
                      will be awarded attractive prizes.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {!authenticated && (
              <ul className="list-disc pl-5 mt-5">
                {teamRegOpen && !teamRegClosed && (
                  <li className="my-3">
                    <div className="flex flex-wrap justify-start">
                      <div className="w-full sm:w-1/2 sm:odd:pr-3 sm:even:pl-3 mt-2">
                        <InertiaLink
                          href="/auth/team/register"
                          className="w-full button"
                        >
                          Register
                        </InertiaLink>
                      </div>
                      {teamLoginOpen ? (
                        <div className="w-full sm:w-1/2 sm:odd:pr-3 sm:even:pl-3 mt-2">
                          <InertiaLink
                            href="/auth/team/login"
                            className="w-full button"
                          >
                            Login
                          </InertiaLink>
                        </div>
                      ) : (
                        <>
                          <div className="w-full sm:w-1/2 sm:odd:pr-3 sm:even:pl-3 my-2">
                            <InertiaLink
                              href="/auth/team/login"
                              className={`w-full cursor-not-allowed bg-gray-400 block rounded-lg
                                      p-4 text-center uppercase leading-none font-bold border-2
                                      border-gray-400 text-sm text-gray-800 transition
                                      focus:outline-none focus:shadow-none`}
                              disabled={true}
                            >
                              Login
                            </InertiaLink>
                          </div>
                          <div className="">
                            Student Login will open when the quiz begins.
                          </div>
                        </>
                      )}
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
