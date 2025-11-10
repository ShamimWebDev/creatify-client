import { useEffect } from "react";

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title ? `${title} | Creatify` : "Creatify";
  }, [title]);
};

export default useDocumentTitle;
