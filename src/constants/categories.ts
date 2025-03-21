
export const categories = [
  { id: 'work', label: 'Work', color: 'bg-purple-500' },
  { id: 'personal', label: 'Personal', color: 'bg-blue-500' },
  { id: 'health', label: 'Health', color: 'bg-green-500' },
  { id: 'study', label: 'Study', color: 'bg-amber-500' },
  { id: 'social', label: 'Social', color: 'bg-pink-500' },
];

export const getCategoryById = (categoryId: string) => {
  return categories.find(category => category.id === categoryId);
};
