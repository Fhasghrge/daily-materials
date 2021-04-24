import { createContext, useCallback, useEffect, useContext, useRef } from "react";
import { useInstance } from "./useInstace";

export const ServiceContext = createContext({
  getInstance: null,
});

export const useInjector = (ServiceClasses) => {
  const container = useInstance(Map);
  useEffect(() => {
    ServiceClasses.forEach((eachServie) => {
      if (!container.has(eachServie.name)) {
        container.set(eachServie.name, new eachServie());
      }
    });
  }, [ServiceClasses, container]);
  const getInstance = useCallback(
    (serviceClass) => {
      if (!container.has(serviceClass.name)) {
        container.set(serviceClass.name, new serviceClass());
      }
      return container.get(serviceClass.name);
    },
    [container]
  );
  return { getInstance };
};

export const useInject = (serviceClass) => {
  const currInstance = useRef();
  const injector = useContext(ServiceContext);
  return (
    currInstance.current || (currInstance.current = injector.getInstance(serviceClass))
    );
};
