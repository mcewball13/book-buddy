import { useReadingList } from "../hooks/useReadingList";
import { ReadingListPresenter } from "../sections/reading-list/reading-list";

export const ReadingListView= () => {
  const { readingList, removeFromReadingList } = useReadingList();

  return (
    <ReadingListPresenter
      books={readingList}
      onRemoveBook={removeFromReadingList}
    />
  );
};
