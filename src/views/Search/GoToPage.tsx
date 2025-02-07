import { Flex, Input, Text } from "@chakra-ui/react";
import {
  FormEventHandler,
  FunctionComponent,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { useHistory } from "react-router-dom";
import { clickEvent, useAnalytics } from "../../contexts/Analytics";

export interface GoToPageProps {
  "data-event"?: string;
  "data-testid"?: string;
  pageLimit: number;
  offset: number;
  getPageUrl: (params: { offset: number }) => string;
}

export const GoToPage: FunctionComponent<GoToPageProps> = ({
  "data-event": dataEvent,
  "data-testid": dataTestid,
  pageLimit,
  offset,
  getPageUrl,
}) => {
  const { trackCustomEvent } = useAnalytics();
  const [inputValue, setInputValue] = useState((offset + 1).toString());
  const { push } = useHistory();

  useEffect(() => {
    setInputValue((offset + 1).toString());
  }, [offset]);

  const onInputChange = (e: SyntheticEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputValue((e.target as HTMLInputElement).value);
  };

  const onSubmit: FormEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    push(getPageUrl({ offset: parseInt(inputValue) - 1 }));
  };

  return (
    <Flex align="center" as="form" mx={2} onSubmit={onSubmit}>
      <Input
        colorScheme="blue"
        data-testid={dataTestid}
        h={10}
        max={pageLimit + 1}
        min={1}
        name="page"
        onChange={onInputChange}
        onFocus={() => {
          if (dataEvent) {
            trackCustomEvent(clickEvent({ name: dataEvent }));
          }
        }}
        p={0}
        textAlign="center"
        type="number"
        value={inputValue}
        w={10}
      />
      <Text ml={2} w="max-content">
        of {pageLimit + 1}
      </Text>
    </Flex>
  );
};
