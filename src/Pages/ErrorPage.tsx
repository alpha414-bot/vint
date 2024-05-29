// ErrorPage: Page responsible for handling any thrown error in the web app;
import MainLayout from "@/Layouts/MainLayout";
import { getErrorMessageViaStatus } from "@/System/function";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError() as RouteErrorInterface;
  const { shortMessage: statusText, longMessage: message } =
    getErrorMessageViaStatus(error);
  return (
    <MainLayout title={statusText} description={message}>
      <div className="container maincontent">
        <div className="jumbotron overview owners backyard">
          <h1>Whoops!</h1>
          <div className="row">
            <div className="col-md-12 manuals">
              <h2>{statusText}</h2>
              <p>{message}</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ErrorPage;
