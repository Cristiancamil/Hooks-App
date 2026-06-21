import { RouterProvider } from "react-router";
import { appRouter } from "./router/app.router";

export const ProfesionalApp = () => {
  return (
    <div className="bg-gradient">
      <RouterProvider router={appRouter} />
    </div>
  );
};
