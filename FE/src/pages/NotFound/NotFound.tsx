// import { Button, Result } from "antd";
// import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const NotFound = ({ subTitle }: { subTitle?: string }) => {
  const navigate = useNavigate();
  //   const { t } = useTranslation();

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <>
      status="404" title="404" subTitle={subTitle || "errors.pageNotFound"}
      extra={<button onClick={navigateBack}>{"errors.back"}</button>}
    </>
  );
};
