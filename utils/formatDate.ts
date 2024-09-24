export const formatCommitDate = (pushedAt: string) => {
  const pushedDate = new Date(pushedAt);
  const now = new Date();

  const isToday =
    pushedDate.getDate() === now.getDate() &&
    pushedDate.getMonth() === now.getMonth() &&
    pushedDate.getFullYear() === now.getFullYear();

  const isYesterday =
    pushedDate.getDate() === now.getDate() - 1 &&
    pushedDate.getMonth() === now.getMonth() &&
    pushedDate.getFullYear() === now.getFullYear();

  let hours = pushedDate.getHours();
  const minutes = pushedDate.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  const formattedTime = `${hours}:${minutes} ${ampm}`;

  if (isToday) {
    return `Today at ${formattedTime}`;
  }

  if (isYesterday) {
    return `Yesterday at ${formattedTime}`;
  }

  const year = pushedDate.getFullYear();
  const month = (pushedDate.getMonth() + 1).toString().padStart(2, '0');
  const day = pushedDate.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};
