import { Routes, Route } from "react-router";

import { NotFound } from "../pages/NotFound";
import { TimeLine } from "../pages/TimeLine";
import { AppLayout } from "../components/AppLayout";

export function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<TimeLine />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
