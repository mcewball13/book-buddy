import { useReadingList } from "../hooks/useReadingList";
import { ReadingListPresenter } from "../presenters/ReadingListPresenter";

export const ReadingListContainer = () => {
  const { readingList, removeFromReadingList } = useReadingList();

  return (
    <ReadingListPresenter
      books={readingList}
      onRemoveBook={removeFromReadingList}
    />
  );
};
