import { useReadingList } from "../hooks/useReadingList";
import { ReadingList } from "../sections/reading-list/view/ReadingList";

export const ReadingListPage = () => {
  const { readingList, removeFromReadingList } = useReadingList();

  return (
    <ReadingList books={readingList} onRemoveBook={removeFromReadingList} />
  );
};
