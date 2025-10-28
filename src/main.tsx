import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ReactDays from "./components/Fed/React Challeneg/ReactDays.tsx";
import Layout from "./components/Layout.tsx";
import Dashboard from "./components/Fed/Dashboard/Dashboard.tsx";
import ChallengeDetails from "./components/Fed/ChallengeDetails/ChallengeDetails.tsx";
import { ChallengeProvider } from "./components/Common/ChallengeContext.tsx";
import AboutUs from "./components/Fed/AboutUs/AboutUs.tsx";
import ContactUS from "./components/Fed/ContactUS/ContactUS.tsx";
import Planner from "./components/Fed/Planner/Planner.tsx";
import Resources from "./components/Fed/Resources/Resources.tsx";
import { NotesProvider } from "./components/Common/NotesContext.tsx";
import MoreChallenges from "./components/Fed/MoreChallenges/MoreChallenges.tsx";
import CategoryChallenges from "./components/Fed/MoreChallenges/CategoryChallenges.tsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "30-days-challenge", element: <ReactDays /> },
        { path: "30-days-challenge/challenge-details/:id", element: <ChallengeDetails /> },
        { path: "about-us", element: <AboutUs /> },
        { path: "contact-us", element: <ContactUS /> },
        { path: "my-planner", element: <Planner /> },
        { path: "CodePad-page", element: <Resources /> },
        { path: "More-hands-on-Challenges", element: <MoreChallenges /> },
        { path: "More-hands-on-Challenges/:categoryName", element: <CategoryChallenges /> },
        {
          path: "More-hands-on-Challenges/:categoryName/challenge-details/:id",
          element: <ChallengeDetails />,
        },
      ],
    },
  ],
  {
    basename: "/react-fed",
  }
);


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NotesProvider>
      <ChallengeProvider>
        <RouterProvider router={router} />
      </ChallengeProvider>
    </NotesProvider>
  </StrictMode>
);
