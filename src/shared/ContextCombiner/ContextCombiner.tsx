import ReactQueryProvider from "@/src/context/ReactQueryProvider/ReactQueryProvider";
import { FC, PropsWithChildren, ComponentProps } from "react";

export const ContextCombiner = (props: PropsWithChildren) => {
  const providers = [ReactQueryProvider];

  const combineComponents = (
    components: FC<PropsWithChildren>[]
  ): FC<PropsWithChildren> => {
    return components.reduce((AccumulatedComponents, CurrentComponent) => {
      return ({
        children,
      }: ComponentProps<FC<PropsWithChildren>>): JSX.Element => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };
    });
  };

  const AppProviders = combineComponents(providers as FC<PropsWithChildren>[]);
  return <AppProviders>{props.children}</AppProviders>;
};
