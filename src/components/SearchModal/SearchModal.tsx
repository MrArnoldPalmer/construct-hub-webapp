import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Portal,
  Stack,
  Button,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { useAnalytics } from "../../contexts/Analytics";
import { clickEvent } from "../../contexts/Analytics/util";
import { useCatalogSearch } from "../../hooks/useCatalogSearch";
import { HEADER_ANALYTICS } from "../Header/constants";
import { SearchBar } from "../SearchBar";
import testIds from "./testIds";

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: FunctionComponent<SearchModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { trackCustomEvent } = useAnalytics();
  const { query, onQueryChange, onSubmit, onSearch } = useCatalogSearch();

  return (
    <Portal>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent data-testid={testIds.container} mx={4}>
            <ModalCloseButton
              data-event={HEADER_ANALYTICS.SEARCH_MODAL.CLOSE}
              onClick={() => {
                trackCustomEvent(
                  clickEvent({ name: HEADER_ANALYTICS.SEARCH_MODAL.CLOSE })
                );
              }}
            />
            <ModalHeader>Search</ModalHeader>
            <ModalBody>
              <Stack pb={4} spacing={4}>
                <SearchBar
                  data-event={HEADER_ANALYTICS.SEARCH_MODAL.SEARCH}
                  onChange={onQueryChange}
                  onSubmit={(e) => {
                    onClose();
                    onSubmit(e);
                  }}
                  value={query}
                ></SearchBar>
                <Button colorScheme="blue" onClick={() => onSearch()}>
                  Find Constructs
                </Button>
              </Stack>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </Portal>
  );
};
