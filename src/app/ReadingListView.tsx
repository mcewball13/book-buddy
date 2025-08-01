import { useReadingList } from "../hooks/useReadingList";
import { ReadingListPresenter } from "../sections/reading-list/ReadingList";

export const ReadingListContainer = () => {
  const { readingList, removeFromReadingList } = useReadingList();

  return (
    <ReadingListPresenter
      books={readingList}
      onRemoveBook={removeFromReadingList}
    />
  );
};
