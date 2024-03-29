"use client";

import type { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setAppState } from "@/redux/features/appStateSlice";

type PageWrapperParams = {
  state: string;
  children: React.ReactElement;
};

interface PageWrapperProps {
  (params: PageWrapperParams): React.ReactElement;
}

const PageWrapper: PageWrapperProps = ({ state, children }) => {
  const useAppDispatch = useDispatch.withTypes<AppDispatch>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setAppState(state));
  }, [state]);
  return children;
};

export default PageWrapper;
